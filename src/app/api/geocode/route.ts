import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 })
  }

  try {
    // Use OpenCage Geocoding API
    const apiKey = process.env.NEXT_PUBLIC_GEOCODING_API_KEY
    if (apiKey) {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}&limit=1`
      )
      const data = await res.json()

      if (data.results && data.results.length > 0) {
        const result = data.results[0]
        return NextResponse.json({
          latitude: result.geometry.lat,
          longitude: result.geometry.lng,
          formatted: result.formatted,
          timezone: result.annotations?.timezone?.name || 'UTC',
        })
      }
    }

    // Fallback: use free Nominatim API (OpenStreetMap)
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
      {
        headers: {
          'User-Agent': 'SupremeAlignment/1.0',
        },
      }
    )
    const data = await res.json()

    if (data && data.length > 0) {
      return NextResponse.json({
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
        formatted: data[0].display_name,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      })
    }

    return NextResponse.json({ error: 'Location not found' }, { status: 404 })
  } catch {
    return NextResponse.json({ error: 'Geocoding failed' }, { status: 500 })
  }
}
