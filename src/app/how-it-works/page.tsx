'use client'

import Link from 'next/link'

const themes = [
  {
    name: 'Financial & Power',
    emoji: '💰',
    color: 'var(--accent-amber)',
    planets: ['Jupiter', 'Venus'],
    planetWhy: 'Jupiter governs expansion and abundance; Venus rules money, attraction, and material magnetism.',
    numbers: [3, 8],
    numberWhy: 'Personal Hour 3 (creative expression to manifest desires) or 8 (material mastery and achievement).',
    explanation:
      'When a Jupiter or Venus planetary hour coincides with your Personal Hour hitting 3 or 8, the external energy of financial expansion meets your internal cycle of manifestation or material power. This creates a wealth frequency \u2014 the universe\'s abundance channel and your personal power cycle are tuned to the same station.',
  },
  {
    name: 'Love & Connection',
    emoji: '💜',
    color: 'var(--accent-pink)',
    planets: ['Venus', 'Moon'],
    planetWhy: 'Venus rules love, beauty, and harmony; the Moon governs emotion, intuition, and deep feeling.',
    numbers: [2, 6],
    numberWhy: 'Personal Hour 2 (partnership and diplomacy) or 6 (harmony, nurturing, and responsibility).',
    explanation:
      'Venus or Moon hours bathe the external world in relational, empathic energy. When your Personal Hour simultaneously cycles to 2 or 6, your inner state of partnership-seeking or nurturing resonates with that cosmic frequency. Emotional connections deepen, conversations feel effortless, and relationships find their groove.',
  },
  {
    name: 'Health & Wellness',
    emoji: '\u26a1',
    color: 'var(--accent-green)',
    planets: ['Sun', 'Mars'],
    planetWhy: 'The Sun is the life force and vitality itself; Mars channels physical energy, drive, and action.',
    numbers: [1, 4],
    numberWhy: 'Personal Hour 1 (new beginnings and initiative) or 4 (discipline and structure).',
    explanation:
      'Sun and Mars hours flood the environment with vital, kinetic energy. When your Personal Hour is at 1, you\'re primed to start something new \u2014 a workout, a health practice, a fresh routine. At 4, you have the discipline to stick with it. The body-energy connection is strongest when external vitality and internal structure align.',
  },
  {
    name: 'Creativity & Fun',
    emoji: '\u2728',
    color: 'var(--accent-cyan)',
    planets: ['Mercury', 'Sun'],
    planetWhy: 'Mercury sharpens intellect and communication; the Sun illuminates self-expression and creative confidence.',
    numbers: [3, 5],
    numberWhy: 'Personal Hour 3 (creative expression, joy, and communication) or 5 (freedom, adventure, and curiosity).',
    explanation:
      'Mercury and Sun hours open up channels of mental agility and creative confidence. Personal Hour 3 amplifies your expressive bandwidth \u2014 ideas flow, words come easily, art feels natural. Personal Hour 5 adds a restless curiosity and sense of adventure. Together, the planetary and personal cycles create a creative bandwidth where inspiration meets the confidence to act on it.',
  },
  {
    name: 'Spiritual & Intuition',
    emoji: '🔮',
    color: '#6366F1',
    planets: ['Saturn', 'Moon'],
    planetWhy: 'Saturn governs karmic discipline, deep structure, and the lessons of time; the Moon rules intuition, the subconscious mind, and inner knowing.',
    numbers: [7, 9],
    numberWhy: 'Personal Hour 7 (spiritual wisdom, introspection, and analysis) or 9 (transcendence, completion, and higher purpose).',
    explanation:
      'Saturn hours create a container of stillness and seriousness \u2014 perfect for confronting deeper truths and doing inner work. Moon hours open the gates to your subconscious, heightening intuition and emotional sensitivity. When your Personal Hour hits 7, you enter a naturally reflective, wisdom-seeking state. At 9, you access a broader, more transcendent perspective. The combination creates a spiritual bandwidth where the veil between conscious and unconscious thins, and profound insight becomes accessible.',
  },
]

export default function HowItWorksPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        padding: '2rem 1rem 4rem',
      }}
    >
      <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
        {/* Navigation */}
        <nav
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/dashboard"
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              textDecoration: 'none',
            }}
          >
            &larr; Dashboard
          </Link>
          <Link
            href="/learn"
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.05em',
              background: 'var(--bg-tertiary)',
              color: 'var(--accent-cyan)',
              border: '1px solid var(--border-color)',
              textDecoration: 'none',
            }}
          >
            &larr; The Science
          </Link>
        </nav>

        {/* Page Title */}
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--accent-cyan)',
            marginBottom: '0.5rem',
          }}
        >
          The Alignment Matrix
        </h1>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
          }}
        >
          How planetary hours and personal numerology combine into actionable alignment windows.
        </p>

        {/* ============================================ */}
        {/* SECTION 1: The Five Alignment Themes */}
        {/* ============================================ */}
        <section className="terminal-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              marginBottom: '1rem',
            }}
          >
            1. The Five Alignment Themes
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Supreme Alignment tracks five life domains. Each theme pairs specific planetary energies with
            specific personal numbers &mdash; and there&apos;s a reason behind every combination.
          </p>

          {/* Theme cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {themes.map((t) => (
              <div
                key={t.name}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '1.25rem',
                  borderLeft: `3px solid ${t.color}`,
                }}
              >
                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: t.color,
                    marginBottom: '0.75rem',
                  }}
                >
                  {t.emoji} {t.name}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' as const, fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                      Planetary Triggers
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {t.planets.join(' or ')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                      {t.planetWhy}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' as const, fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                      Number Triggers
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      Personal Hour {t.numbers.join(' or ')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                      {t.numberWhy}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: 'var(--bg-primary)',
                    borderRadius: '4px',
                    padding: '0.625rem 0.75rem',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    borderLeft: `2px solid ${t.color}`,
                  }}
                >
                  {t.explanation}
                </div>
              </div>
            ))}
          </div>

          {/* Alignment matrix table */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            Full Alignment Matrix
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.8rem',
              }}
            >
              <thead>
                <tr>
                  {['Theme', 'Planets', 'Personal Hour #', 'Trigger'].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '0.5rem 0.75rem',
                        color: 'var(--text-secondary)',
                        borderBottom: '1px solid var(--border-color)',
                        fontWeight: 600,
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {themes.map((t) => (
                  <tr key={t.name}>
                    <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: t.color, fontWeight: 600 }}>
                      {t.emoji} {t.name}
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                      {t.planets.join(', ')}
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {t.numbers.join(' or ')}
                    </td>
                    <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      Planet + Hour match
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 2: The Tier System */}
        {/* ============================================ */}
        <section className="terminal-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              marginBottom: '1rem',
            }}
          >
            2. The Tier System
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Not all alignments are equal. The tier system measures how many layers of your personal cycle
            are simultaneously resonating with the planetary energy. More layers = rarer and more powerful.
          </p>

          {/* Tier cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {/* Standard */}
            <div
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '1.25rem',
                position: 'relative',
              }}
            >
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--accent-green)',
                  marginBottom: '0.5rem',
                }}
              >
                Standard Alignment
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                2 LAYERS OF SYNCHRONICITY
              </div>

              {/* Layers visual */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ flex: 1, padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  Planet Match
                </div>
                <div style={{ flex: 1, padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-green)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  Personal Hour Match
                </div>
                <div style={{ flex: 1, padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', opacity: 0.4 }}>
                  Personal Day
                </div>
                <div style={{ flex: 1, padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', opacity: 0.4 }}>
                  Personal Month
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                The planetary energy supports your hourly micro-cycle. The external hour and your internal
                number are vibrating at the same frequency for a given theme. This is the baseline alignment
                and happens multiple times throughout most days.
              </p>
            </div>

            {/* Supreme */}
            <div
              className="glow-purple"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--accent-purple)',
                borderRadius: '8px',
                padding: '1.25rem',
                position: 'relative',
              }}
            >
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--accent-purple)',
                  marginBottom: '0.5rem',
                }}
              >
                Supreme Alignment &#9878;&#65039;
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                3 LAYERS OF SYNCHRONICITY
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ flex: 1, padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                  Planet Match
                </div>
                <div style={{ flex: 1, padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                  Personal Hour Match
                </div>
                <div style={{ flex: 1, padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                  Personal Day Match
                </div>
                <div style={{ flex: 1, padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', opacity: 0.4 }}>
                  Personal Month
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                Your entire day&apos;s energy is oriented toward this theme, and the hour and planet confirm it.
                Much rarer than Standard &mdash; this is a day-long resonance peaking at the right hour. When you
                see the &#9878;&#65039; badge, your daily cycle has already primed you for this theme before the
                hour even begins.
              </p>
            </div>

            {/* Super Supreme */}
            <div
              className="glow-amber"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--accent-amber)',
                borderRadius: '8px',
                padding: '1.25rem',
                position: 'relative',
              }}
            >
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: 'var(--accent-amber)',
                  marginBottom: '0.5rem',
                }}
              >
                Super Supreme Alignment
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                4 LAYERS OF SYNCHRONICITY
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ flex: 1, padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  Planet Match
                </div>
                <div style={{ flex: 1, padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  Personal Hour
                </div>
                <div style={{ flex: 1, padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  Personal Day
                </div>
                <div style={{ flex: 1, padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  Personal Month
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                Your monthly cycle, daily cycle, hourly cycle, AND the planetary hour are ALL vibrating at the
                same frequency for this theme. Extraordinarily rare &mdash; when this happens, it&apos;s a
                once-in-a-cycle convergence. All independent timing mechanisms pointing in the same
                direction at the same moment.
              </p>
            </div>

            {/* Transcendent */}
            <div
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--tier-transcendent)',
                borderRadius: '8px',
                padding: '1.25rem',
                position: 'relative',
                boxShadow: '0 0 20px rgba(var(--tier-transcendent-rgb), 0.15), inset 0 0 20px rgba(var(--tier-transcendent-rgb), 0.05)',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--tier-transcendent)', marginBottom: '0.5rem' }}>
                Transcendent Alignment 🌌
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                3 LAYERS — PLANET + PERSONAL HOUR + LOT BENEFIC
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '5rem', padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(var(--tier-transcendent-rgb), 0.15)', color: 'var(--tier-transcendent)', border: '1px solid rgba(var(--tier-transcendent-rgb), 0.3)' }}>
                  Planet Match
                </div>
                <div style={{ flex: 1, minWidth: '5rem', padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(var(--tier-transcendent-rgb), 0.15)', color: 'var(--tier-transcendent)', border: '1px solid rgba(var(--tier-transcendent-rgb), 0.3)' }}>
                  Personal Hour
                </div>
                <div style={{ flex: 1, minWidth: '5rem', padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(var(--tier-transcendent-rgb), 0.15)', color: 'var(--tier-transcendent)', border: '1px solid rgba(var(--tier-transcendent-rgb), 0.3)' }}>
                  Lot L4 Benefic
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                When the planetary hour and your personal hour align for a theme, AND the relevant Zodiacal
                Releasing Lot for that theme has a benefic L4 ruler, the alignment is Transcendent. Your birth
                chart&apos;s time-lord confirms that this domain is in a prosperous period. Each theme checks its
                specific Lot: Love checks Eros, Financial checks Victory, Health checks Fortune, and Creativity
                and Spiritual check Spirit.
              </p>

              <div
                style={{
                  marginTop: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  background: 'rgba(var(--tier-transcendent-rgb), 0.08)',
                  borderRadius: '4px',
                  borderLeft: '2px solid var(--tier-transcendent)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: 'var(--tier-transcendent)' }}>Requires birth time:</strong> Uses
                Zodiacal Releasing from four Lots (Fortune, Spirit, Eros, Victory), which require your exact
                birth time and birth city. Add these in Settings to unlock.
              </div>
            </div>

            {/* Super Transcendent */}
            <div
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--tier-super-transcendent)',
                borderRadius: '8px',
                padding: '1.25rem',
                position: 'relative',
                boxShadow: '0 0 20px rgba(var(--tier-super-transcendent-rgb), 0.15), inset 0 0 20px rgba(var(--tier-super-transcendent-rgb), 0.05)',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--tier-super-transcendent)', marginBottom: '0.5rem' }}>
                Super Transcendent Alignment 💎
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                4 LAYERS — PLANET + PERSONAL HOUR + LOT BENEFIC + PERSONAL MONTH
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '5rem', padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(var(--tier-super-transcendent-rgb), 0.15)', color: 'var(--tier-super-transcendent)', border: '1px solid rgba(var(--tier-super-transcendent-rgb), 0.3)' }}>
                  Planet Match
                </div>
                <div style={{ flex: 1, minWidth: '5rem', padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(var(--tier-super-transcendent-rgb), 0.15)', color: 'var(--tier-super-transcendent)', border: '1px solid rgba(var(--tier-super-transcendent-rgb), 0.3)' }}>
                  Personal Hour
                </div>
                <div style={{ flex: 1, minWidth: '5rem', padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(var(--tier-super-transcendent-rgb), 0.15)', color: 'var(--tier-super-transcendent)', border: '1px solid rgba(var(--tier-super-transcendent-rgb), 0.3)' }}>
                  Lot L4 Benefic
                </div>
                <div style={{ flex: 1, minWidth: '5rem', padding: '0.375rem', borderRadius: '4px', textAlign: 'center', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(var(--tier-super-transcendent-rgb), 0.15)', color: 'var(--tier-super-transcendent)', border: '1px solid rgba(var(--tier-super-transcendent-rgb), 0.3)' }}>
                  Personal Month
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                The absolute pinnacle. Transcendent conditions are met (planetary hour, personal hour, and
                benefic Lot), AND your personal month number also resonates with the same theme. This is the
                rarest alignment in Supreme Alignment &mdash; your birth chart&apos;s time-lord, the cosmos,
                your hourly cycle, and your monthly cycle are ALL synchronized. This is the moment your
                timeline was written for.
              </p>
            </div>
          </div>

          {/* Tier comparison table */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            Tier Comparison
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.8rem',
              }}
            >
              <thead>
                <tr>
                  {['Tier', 'Layers', 'Requirements', 'Rarity'].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '0.5rem 0.75rem',
                        color: 'var(--text-secondary)',
                        borderBottom: '1px solid var(--border-color)',
                        fontWeight: 600,
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.05em',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-green)', fontWeight: 600 }}>
                    Standard
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>2</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    Planet + Personal Hour
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    Several per day
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-purple)', fontWeight: 600 }}>
                    Supreme &#9878;&#65039;
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>3</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    Planet + Hour + Day
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    A few per week
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-amber)', fontWeight: 600 }}>
                    Super Supreme
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>4</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    Planet + Hour + Day + Month
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    Once a month or less
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--tier-transcendent)', fontWeight: 600 }}>
                    Transcendent 🌌
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>3</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    Planet + Hour + Benefic ZR Lot
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    Depends on L4 period length
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--tier-super-transcendent)', fontWeight: 600 }}>
                    Super Transcendent 💎
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>4</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    Planet + Hour + Benefic ZR Lot + Month
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    Extremely rare — once a year or less
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 3: Zodiacal Releasing */}
        {/* ============================================ */}
        <section className="terminal-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--tier-transcendent)',
              marginBottom: '1rem',
            }}
          >
            3. Zodiacal Releasing &amp; The Four Lots
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Zodiacal Releasing (ZR) is a Hellenistic time-lord technique that divides your entire life into
            cascading periods, each ruled by a zodiac sign and its planetary ruler. Supreme Alignment calculates
            ZR from <strong style={{ color: 'var(--text-primary)' }}>four different Lots</strong>, each governing
            a different life domain. Together they create a comprehensive &ldquo;life weather report&rdquo;
            that feeds into the Transcendent tier.
          </p>

          {/* The Four Lots */}
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>
            The Four Lots
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {[
              { icon: '🏦', name: 'Lot of Fortune', domain: 'Material & Health', formula: 'Day: Asc + Moon − Sun / Night: Asc + Sun − Moon', color: 'var(--accent-green)', desc: 'The most foundational Lot. Governs your body, material circumstances, livelihood, and physical well-being. Fortune describes what happens to you — the circumstances of your life.' },
              { icon: '🧠', name: 'Lot of Spirit', domain: 'Career & Purpose', formula: 'Day: Asc + Sun − Moon / Night: Asc + Moon − Sun', color: 'var(--accent-cyan)', desc: 'The reverse of Fortune. Spirit governs your mind, willpower, career actions, and sense of purpose. Where Fortune is what happens to you, Spirit is what you do about it — your agency and drive.' },
              { icon: '💜', name: 'Lot of Eros', domain: 'Love & Desire', formula: 'Day: Asc + Venus − Spirit / Night: Asc + Spirit − Venus', color: 'var(--accent-pink)', desc: 'Calculated from Venus and Spirit. Eros governs desire, romantic love, passion, and what you are drawn to. It reveals the timing of attraction, deepening connections, and heart-centered experiences.' },
              { icon: '🏆', name: 'Lot of Victory', domain: 'Achievement', formula: 'Day: Asc + Jupiter − Spirit / Night: Asc + Spirit − Jupiter', color: 'var(--accent-amber)', desc: 'Calculated from Jupiter and Spirit. Victory governs competition, professional achievement, recognition, and success in endeavors. It reveals windows of triumph and public accomplishment.' },
            ].map((lot) => (
              <div
                key={lot.name}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '0.75rem 1rem',
                  borderLeft: `3px solid ${lot.color}`,
                }}
              >
                <div style={{ fontWeight: 700, color: lot.color, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  {lot.icon} {lot.name} <span style={{ fontWeight: 400, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>— {lot.domain}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '0.375rem' }}>
                  {lot.desc}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', fontFamily: 'monospace' }}>
                  {lot.formula}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              borderLeft: '3px solid var(--accent-purple)',
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--accent-purple)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
              How They Connect
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
              Spirit is the reverse of Fortune (swap Sun and Moon). Eros and Victory both depend on Spirit&apos;s
              position — they use it as an input alongside Venus (for Eros) or Jupiter (for Victory). So the
              calculation chain is: <strong style={{ color: 'var(--text-primary)' }}>Fortune → Spirit → Eros &amp; Victory</strong>.
              All four require your exact birth time and birth city because they depend on the Ascendant.
            </p>
          </div>

          {/* Four Levels of Time */}
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>
            Four Levels of Time Periods
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            Each Lot generates its own independent ZR timeline with four nested levels:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginBottom: '1.25rem' }}>
            {[
              { level: 'L1', name: 'Major Period', duration: 'Years to decades', desc: 'The broadest life chapter. Sets the overarching theme of an entire era.' },
              { level: 'L2', name: 'Sub-Period', duration: 'Months to years', desc: 'Subdivisions within the major period, shifting focus within the larger theme.' },
              { level: 'L3', name: 'Sub-Sub-Period', duration: 'Weeks to months', desc: 'Finer timing. Weekly and monthly rhythms become visible here.' },
              { level: 'L4', name: 'Micro-Period', duration: 'Hours to days', desc: 'The finest resolution. The L4 ruler is the planet that Supreme Alignment evaluates for prosperity and alignment.' },
            ].map((l) => (
              <div key={l.level} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', padding: '0.375rem 0.5rem', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                <span style={{ color: 'var(--tier-transcendent)', fontWeight: 700, minWidth: '2rem' }}>{l.level}</span>
                <div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{l.name}</span>
                  <span style={{ color: 'var(--text-secondary)' }}> ({l.duration})</span>
                  <span style={{ color: 'var(--text-secondary)' }}> — {l.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Benefic/Malefic Classification */}
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>
            Prosperity Classification
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            For each Lot, the L4 micro-period ruler determines the prosperity level of that life domain right now.
            The classification follows the traditional Hellenistic benefic/malefic system, softened for practical use:
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr>
                  {['Planet Nature', 'Planets', 'Prosperity', 'Meaning'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.5rem 0.75rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em', fontSize: '0.7rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-green)', fontWeight: 600 }}>Benefic</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>Venus, Jupiter</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-green)', fontWeight: 600 }}>Prosperous</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>Highly favorable. The domain is supported by expansive, harmonious energy.</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-amber)', fontWeight: 600 }}>Mildly Benefic</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>Sun, Moon</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-amber)', fontWeight: 600 }}>Favorable</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>Positive conditions. The luminaries bring vitality and emotional support.</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600 }}>Neutral</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>Mercury</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600 }}>Variable</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>Context-dependent. Mercury adapts to what surrounds it.</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: '#ef4444', fontWeight: 600 }}>Malefic</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>Mars, Saturn</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: '#ef4444', fontWeight: 600 }}>Challenging</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>Demands caution and discipline. Not inherently bad, but requires more effort.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Cosmic Convergence */}
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--tier-transcendent)', marginBottom: '0.75rem' }}>
            Cosmic Convergence
          </h3>

          <div
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid rgba(var(--tier-transcendent-rgb), 0.3)',
              borderRadius: '6px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              borderLeft: '3px solid var(--tier-transcendent)',
            }}
          >
            <p style={{ color: 'var(--text-primary)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              When <strong style={{ color: 'var(--tier-transcendent)' }}>3 or more of the 4 Lots</strong> have
              benefic or mildly-benefic L4 rulers simultaneously, a{' '}
              <strong style={{ color: 'var(--tier-transcendent)' }}>Cosmic Convergence</strong> is active.
              This is a universally prosperous moment across multiple life domains. The convergence score
              (0&ndash;4) is shown on your dashboard&apos;s ZR panel.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
              During Cosmic Convergence, ALL alignment themes can qualify for the Transcendent tier
              (when the numerological layers are also aligned), because the overwhelming benefic energy
              spills across all domains.
            </p>
          </div>

          {/* Theme-to-Lot Mapping */}
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>
            How Lots Map to Alignment Themes
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            Each alignment theme is linked to the Lots most relevant to its domain. When the relevant Lot(s) have
            benefic L4 rulers, that theme becomes eligible for the Transcendent tier:
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr>
                  {['Theme', 'Relevant Lots', 'Why'].map((h) => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.5rem 0.75rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em', fontSize: '0.7rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { theme: '💰 Financial', lots: 'Victory + Spirit', why: 'Achievement energy + career purpose drive financial outcomes', color: '#10B981' },
                  { theme: '💜 Love', lots: 'Eros + Fortune', why: 'Desire/attraction + material circumstances shape relationships', color: '#EC4899' },
                  { theme: '⚡ Health', lots: 'Fortune + Victory', why: 'Body/material well-being + vitality of achievement', color: '#F59E0B' },
                  { theme: '✨ Creativity', lots: 'Spirit + Eros', why: 'Purpose/agency + passion fuel creative expression', color: '#8B5CF6' },
                  { theme: '🔮 Spiritual', lots: 'Spirit + Fortune', why: 'Mind/purpose + body/material create holistic transcendence', color: '#6366F1' },
                ].map((row) => (
                  <tr key={row.theme}>
                    <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: row.color, fontWeight: 600 }}>{row.theme}</td>
                    <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>{row.lots}</td>
                    <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Transcendent condition */}
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>
            How ZR Unlocks the Transcendent Tier
          </h3>

          <div
            className="terminal-card"
            style={{
              padding: '1rem',
              marginBottom: '1.25rem',
              background: 'var(--bg-tertiary)',
              border: '1px solid rgba(var(--tier-transcendent-rgb), 0.3)',
            }}
          >
            <p style={{ color: 'var(--tier-transcendent)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              THE TRANSCENDENT CONDITION
            </p>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.875rem', lineHeight: 1.7 }}>
              When you already have a <strong>Super Supreme</strong> alignment (planet + hour + day + month all
              matching), and <em>additionally</em> the relevant Lot(s) for that theme have benefic or
              mildly-benefic L4 rulers &mdash; OR a Cosmic Convergence is active &mdash; the alignment
              is promoted to <strong style={{ color: 'var(--tier-transcendent)' }}>Transcendent</strong>.
              Your birth chart&apos;s time-lord system confirms that this domain is in a prosperous period,
              making the convergence of all five timing layers complete.
            </p>
          </div>

          {/* Peak, Trough, Loosing of the Bond */}
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>
            Peak Periods, Troughs &amp; Loosing of the Bond
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.75rem 1rem', borderLeft: '3px solid var(--accent-green)' }}>
              <div style={{ fontWeight: 700, color: 'var(--accent-green)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Peak Periods</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                When a Lot&apos;s L2 sub-period sign forms a conjunction, trine, or sextile with its L1 sign
                (0, 2, 4, 8, or 10 signs apart), that Lot is in a <strong style={{ color: 'var(--accent-green)' }}>peak period</strong>.
                Times of heightened productivity, opportunity, and momentum in that domain.
              </p>
            </div>

            <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.75rem 1rem', borderLeft: '3px solid var(--accent-pink)' }}>
              <div style={{ fontWeight: 700, color: 'var(--accent-pink)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Trough Periods</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                When L2 forms a square or opposition with L1 (3, 6, or 9 signs apart), that Lot is in a{' '}
                <strong style={{ color: 'var(--accent-pink)' }}>trough period</strong>. Times of challenge and restructuring.
                Use these for reflection and preparation rather than aggressive action.
              </p>
            </div>

            <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.75rem 1rem', borderLeft: '3px solid var(--accent-amber)' }}>
              <div style={{ fontWeight: 700, color: 'var(--accent-amber)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Loosing of the Bond</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                When a Lot&apos;s L2 sign is directly opposite (6 signs from) that Lot&apos;s natal sign, a special
                condition called <strong style={{ color: 'var(--accent-amber)' }}>Loosing of the Bond</strong> is
                active. This signals a major pivot or turning point in that domain.
              </p>
            </div>
          </div>

          {/* ZR column explanation */}
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent-purple)', marginBottom: '0.75rem' }}>
            The ZR Column on Your Dashboard
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
            Once you add your birth time and birth city in Settings, the hour-by-hour table gains a{' '}
            <strong style={{ color: 'var(--tier-transcendent)' }}>ZR column</strong> showing a score from
            0/4 to 4/4. This score indicates how many of the four Lots have their L4 ruler matching that
            hour&apos;s planet. Hover over any score to see which specific Lots are aligned. A 4/4 means
            all four Lots&apos; time-lords agree with the cosmic clock for that hour &mdash; extraordinarily rare.
          </p>
        </section>

        {/* ============================================ */}
        {/* SECTION 4: Practical Tips */}
        {/* ============================================ */}
        <section className="terminal-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              marginBottom: '1rem',
            }}
          >
            4. Practical Tips
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              {
                title: 'Using Alignment Windows',
                color: 'var(--accent-green)',
                text: 'When you see an alignment activate on your dashboard, that is the optimal time to take action related to that theme. Schedule important meetings during Financial alignments, plan date nights during Love alignments, work out during Health alignments, brainstorm during Creativity alignments, and meditate or journal during Spiritual alignments. Even small actions taken during aligned hours carry more momentum.',
              },
              {
                title: 'When No Alignments Are Active',
                color: 'var(--accent-amber)',
                text: 'No active alignment does not mean the hour is bad. It simply means no specific theme is being amplified right now. Use neutral hours for routine tasks, rest, or preparation. Check the timeline on your dashboard to see when the next alignment window opens and plan accordingly.',
              },
              {
                title: 'Travel and Location',
                color: 'var(--accent-purple)',
                text: 'Planetary hours are calculated from sunrise and sunset at your specific location. If you travel to a different city or timezone, your planetary hours shift because sunrise and sunset times change. Always update your city in Settings when you travel so your alignment windows remain accurate.',
              },
              {
                title: 'Update Your City in Settings',
                color: 'var(--accent-pink)',
                text: 'Your location determines sunrise and sunset times, which determine planetary hour boundaries. If your city is wrong, every planetary hour on your dashboard will be offset. Go to Settings and update your city whenever you relocate or travel. The more precise your location, the more precise your alignment windows.',
              },
            ].map((tip) => (
              <div
                key={tip.title}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '0.75rem 1rem',
                  borderLeft: `3px solid ${tip.color}`,
                }}
              >
                <div style={{ fontWeight: 700, color: tip.color, fontSize: '0.875rem', marginBottom: '0.375rem' }}>
                  {tip.title}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <Link
            href="/learn"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: 'var(--accent-cyan)',
              color: 'var(--bg-primary)',
              textDecoration: 'none',
            }}
          >
            &larr; The Science Behind It
          </Link>
          <Link
            href="/dashboard"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              textDecoration: 'none',
            }}
          >
            Back to Dashboard &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
