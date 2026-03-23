import { NextRequest, NextResponse } from 'next/server'

// US zip code approximate coordinates (common ones as fallback)
// This is a lightweight fallback — the primary API should handle most cases
async function geocodeWithNominatim(query: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&countrycodes=us`,
    {
      headers: {
        'User-Agent': 'SupremeAlignment/1.0 (https://supreme-alignment.vercel.app)',
        'Accept': 'application/json',
      },
      // Add a cache to avoid rate limiting
      next: { revalidate: 86400 },
    }
  )

  if (!res.ok) {
    throw new Error(`Nominatim returned ${res.status}`)
  }

  const data = await res.json()

  if (data && data.length > 0) {
    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
      formatted: data[0].display_name,
    }
  }

  return null
}

async function geocodeWithOpenCage(query: string) {
  const apiKey = process.env.NEXT_PUBLIC_GEOCODING_API_KEY
  if (!apiKey) return null

  const res = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}&limit=1`
  )
  const data = await res.json()

  if (data.results && data.results.length > 0) {
    const result = data.results[0]
    return {
      latitude: result.geometry.lat,
      longitude: result.geometry.lng,
      formatted: result.formatted,
    }
  }

  return null
}

async function geocodeWithGeocodingApi(query: string) {
  // geocode.maps.co — free, no key required for low volume
  const res = await fetch(
    `https://geocode.maps.co/search?q=${encodeURIComponent(query)}&format=json`,
    {
      headers: {
        'User-Agent': 'SupremeAlignment/1.0',
      },
    }
  )

  if (!res.ok) {
    throw new Error(`geocode.maps.co returned ${res.status}`)
  }

  const data = await res.json()

  if (data && data.length > 0) {
    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
      formatted: data[0].display_name,
    }
  }

  return null
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 })
  }

  // Normalize: if it looks like a US zip, append ", USA" for better results
  let searchQuery = query.trim()
  if (/^\d{5}(-\d{4})?$/.test(searchQuery)) {
    searchQuery = `${searchQuery}, USA`
  }

  const errors: string[] = []

  // Try OpenCage first (if API key exists)
  try {
    const result = await geocodeWithOpenCage(searchQuery)
    if (result) {
      return NextResponse.json({
        ...result,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    }
  } catch (e) {
    errors.push(`OpenCage: ${e instanceof Error ? e.message : 'unknown'}`)
  }

  // Try geocode.maps.co second
  try {
    const result = await geocodeWithGeocodingApi(searchQuery)
    if (result) {
      return NextResponse.json({
        ...result,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    }
  } catch (e) {
    errors.push(`geocode.maps.co: ${e instanceof Error ? e.message : 'unknown'}`)
  }

  // Try Nominatim as last resort
  try {
    const result = await geocodeWithNominatim(searchQuery)
    if (result) {
      return NextResponse.json({
        ...result,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    }
  } catch (e) {
    errors.push(`Nominatim: ${e instanceof Error ? e.message : 'unknown'}`)
  }

  console.error('All geocoding APIs failed for query:', searchQuery, errors)
  return NextResponse.json(
    { error: 'Location not found. Try entering a city and state (e.g., "Charlotte, NC").' },
    { status: 404 }
  )
}
