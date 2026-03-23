'use client'

import Link from 'next/link'

const themes = [
  {
    name: 'Financial & Power',
    emoji: '\ud83d\udcb0',
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
    emoji: '\ud83d\udc9c',
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
    emoji: '\ud83d\udd2e',
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
        {/* SECTION 1: The Four Alignment Themes */}
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
            1. The Four Alignment Themes
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
                Super Supreme Alignment \ud83d\udc51
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
                once-in-a-cycle convergence. Four independent timing mechanisms all pointing in the same
                direction at the same moment. This is the highest tier of alignment the system can detect.
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
                    Super Supreme \ud83d\udc51
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>4</td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    Planet + Hour + Day + Month
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    Once a month or less
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 3: Practical Tips */}
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
            3. Practical Tips
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
