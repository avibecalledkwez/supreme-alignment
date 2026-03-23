'use client'

import Link from 'next/link'

export default function LearnPage() {
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
            href="/how-it-works"
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
            How It Works &rarr;
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
          The Science Behind Supreme Alignment
        </h1>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
          }}
        >
          Understanding the ancient timing systems and personal cycles that power your alignment windows.
        </p>

        {/* ============================================ */}
        {/* SECTION 1: Planetary Hours */}
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
            1. What Are Planetary Hours?
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Planetary hours are an ancient Chaldean timing system that dates back thousands of years to the
            astronomers and astrologers of Mesopotamia. Unlike modern clock hours, planetary hours divide the
            day in a way that follows the natural rhythm of sunlight and darkness.
          </p>

          <div
            className="terminal-card"
            style={{
              padding: '1rem',
              marginBottom: '1.25rem',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
            }}
          >
            <p style={{ color: 'var(--accent-amber)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              KEY CONCEPT
            </p>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.875rem', lineHeight: 1.7 }}>
              The day is <strong>not</strong> divided into equal 60-minute hours. Instead, the time from
              <strong style={{ color: 'var(--accent-amber)' }}> sunrise to sunset</strong> is split into 12 equal
              parts (day hours), and the time from
              <strong style={{ color: 'var(--accent-purple)' }}> sunset to the next sunrise</strong> is split into
              12 equal parts (night hours). This means planetary hour length changes with the seasons &mdash;
              summer day hours are longer while winter day hours are shorter.
            </p>
          </div>

          {/* Chaldean Sequence */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            The Chaldean Sequence
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Each planetary hour is ruled by one of the 7 classical planets, cycling in a fixed order called the
            Chaldean sequence. The first hour of each day (starting at sunrise) is ruled by the Planet of the Day.
          </p>

          {/* Sequence visual */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '1.25rem',
              justifyContent: 'center',
            }}
          >
            {[
              { planet: 'Saturn', symbol: '土', color: 'var(--text-secondary)' },
              { planet: 'Jupiter', symbol: '木', color: 'var(--accent-purple)' },
              { planet: 'Mars', symbol: '火', color: 'var(--accent-pink)' },
              { planet: 'Sun', symbol: '☉', color: 'var(--accent-amber)' },
              { planet: 'Venus', symbol: '♀', color: 'var(--accent-green)' },
              { planet: 'Mercury', symbol: '☿', color: 'var(--accent-cyan)' },
              { planet: 'Moon', symbol: '☽', color: 'var(--text-primary)' },
            ].map((p, i, arr) => (
              <div key={p.planet} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    padding: '0.5rem 0.75rem',
                    textAlign: 'center',
                    minWidth: '5rem',
                  }}
                >
                  <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{p.symbol}</div>
                  <div style={{ fontSize: '0.7rem', color: p.color, fontWeight: 600 }}>{p.planet}</div>
                </div>
                {i < arr.length - 1 && (
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>&rarr;</span>
                )}
              </div>
            ))}
          </div>

          {/* Day rulers table */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            Planet of the Day
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            The first planetary hour after sunrise is always ruled by the day&apos;s ruling planet:
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.8rem',
              }}
            >
              <thead>
                <tr>
                  {['Day', 'Ruler'].map((h) => (
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
                {[
                  { day: 'Sunday', planet: 'Sun', color: 'var(--accent-amber)' },
                  { day: 'Monday', planet: 'Moon', color: 'var(--text-primary)' },
                  { day: 'Tuesday', planet: 'Mars', color: 'var(--accent-pink)' },
                  { day: 'Wednesday', planet: 'Mercury', color: 'var(--accent-cyan)' },
                  { day: 'Thursday', planet: 'Jupiter', color: 'var(--accent-purple)' },
                  { day: 'Friday', planet: 'Venus', color: 'var(--accent-green)' },
                  { day: 'Saturday', planet: 'Saturn', color: 'var(--text-secondary)' },
                ].map((row) => (
                  <tr key={row.day}>
                    <td
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderBottom: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {row.day}
                    </td>
                    <td
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderBottom: '1px solid var(--border-color)',
                        color: row.color,
                        fontWeight: 600,
                      }}
                    >
                      {row.planet}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Planetary Energies */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            What Each Planet Represents
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {[
              {
                planet: 'Saturn',
                symbol: '土',
                color: 'var(--text-secondary)',
                keywords: 'Discipline, structure, boundaries, long-term planning',
                desc: 'The taskmaster. Saturn hours favor setting limits, organizing, and building foundations that endure.',
              },
              {
                planet: 'Jupiter',
                symbol: '木',
                color: 'var(--accent-purple)',
                keywords: 'Expansion, abundance, luck, wisdom, growth',
                desc: 'The benefactor. Jupiter hours amplify opportunity, generosity, and big-picture vision.',
              },
              {
                planet: 'Mars',
                symbol: '火',
                color: 'var(--accent-pink)',
                keywords: 'Action, energy, courage, competition, physical drive',
                desc: 'The warrior. Mars hours fuel initiative, assertiveness, and physical exertion.',
              },
              {
                planet: 'Sun',
                symbol: '☉',
                color: 'var(--accent-amber)',
                keywords: 'Vitality, leadership, creativity, self-expression, success',
                desc: 'The sovereign. Sun hours illuminate your personal power, confidence, and creative vision.',
              },
              {
                planet: 'Venus',
                symbol: '♀',
                color: 'var(--accent-green)',
                keywords: 'Love, beauty, harmony, relationships, pleasure, money',
                desc: 'The attractor. Venus hours enhance social grace, romance, aesthetics, and financial magnetism.',
              },
              {
                planet: 'Mercury',
                symbol: '☿',
                color: 'var(--accent-cyan)',
                keywords: 'Communication, intellect, commerce, travel, adaptability',
                desc: 'The messenger. Mercury hours sharpen the mind, favor negotiations, writing, and quick thinking.',
              },
              {
                planet: 'Moon',
                symbol: '☽',
                color: 'var(--text-primary)',
                keywords: 'Emotion, intuition, nurturing, subconscious, cycles',
                desc: 'The reflector. Moon hours deepen intuition, emotional awareness, and receptivity.',
              },
            ].map((p) => (
              <div
                key={p.planet}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>{p.symbol}</span>
                  <span style={{ fontWeight: 700, color: p.color, fontSize: '0.875rem' }}>{p.planet}</span>
                </div>
                <p style={{ color: 'var(--accent-amber)', fontSize: '0.75rem', marginBottom: '0.375rem', fontStyle: 'italic' }}>
                  {p.keywords}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 2: Personal Numerology */}
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
            2. What Is Personal Numerology?
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Personal numerology maps your life into nested cycles using single-digit reduction &mdash; a process
            of adding digits together until you reach a number between 1 and 9.
          </p>

          {/* Single-digit reduction */}
          <div
            className="terminal-card"
            style={{
              padding: '1rem',
              marginBottom: '1.25rem',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
            }}
          >
            <p style={{ color: 'var(--accent-amber)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              SINGLE-DIGIT REDUCTION
            </p>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.875rem', lineHeight: 1.7 }}>
              Take any number and add its digits. Repeat until you have a single digit.
              <br />
              Example: <span style={{ color: 'var(--accent-cyan)' }}>1989</span> &rarr; 1 + 9 + 8 + 9 ={' '}
              <span style={{ color: 'var(--accent-amber)' }}>27</span> &rarr; 2 + 7 ={' '}
              <strong style={{ color: 'var(--accent-green)' }}>9</strong>
            </p>
          </div>

          {/* Four layers */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            The Four Nested Cycles
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              {
                name: 'Personal Year',
                formula: 'Birth Month + Birth Day + Current Year',
                desc: 'Your annual energy theme. Sets the overarching tone for the entire calendar year.',
                color: 'var(--accent-purple)',
              },
              {
                name: 'Personal Month',
                formula: 'Personal Year + Current Calendar Month',
                desc: 'Your monthly sub-cycle. Narrows the yearly theme into a monthly focus.',
                color: 'var(--accent-cyan)',
              },
              {
                name: 'Personal Day',
                formula: 'Personal Month + Current Calendar Day',
                desc: 'Your daily energy. The lens through which you experience each day.',
                color: 'var(--accent-amber)',
              },
              {
                name: 'Personal Hour',
                formula: 'Personal Day + Current Clock Hour (24h format)',
                desc: 'Your hourly micro-cycle. The finest granularity &mdash; changes every hour.',
                color: 'var(--accent-green)',
              },
            ].map((layer) => (
              <div
                key={layer.name}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '0.75rem 1rem',
                  borderLeft: `3px solid ${layer.color}`,
                }}
              >
                <div style={{ fontWeight: 700, color: layer.color, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  {layer.name}
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)',
                    fontFamily: 'monospace',
                    marginBottom: '0.375rem',
                    background: 'var(--bg-primary)',
                    display: 'inline-block',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '3px',
                  }}
                >
                  {layer.formula} &rarr; reduce to single digit
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>{layer.desc}</p>
              </div>
            ))}
          </div>

          {/* Worked example */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            Worked Example
          </h3>

          <div
            className="terminal-card"
            style={{
              padding: '1rem',
              marginBottom: '1.5rem',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.8rem',
              lineHeight: 2,
            }}
          >
            <p style={{ color: 'var(--accent-amber)', fontWeight: 600, marginBottom: '0.5rem' }}>
              Birth date: March 15, 1990 &nbsp;|&nbsp; Current date: March 23, 2026 &nbsp;|&nbsp; Hour: 14:00
            </p>
            <p style={{ color: 'var(--text-primary)' }}>
              <strong style={{ color: 'var(--accent-purple)' }}>Personal Year:</strong>{' '}
              3 (Mar) + 15 + 2026 &rarr; 3 + 1 + 5 + 2 + 0 + 2 + 6 = 19 &rarr; 1 + 9 = 10 &rarr; 1 + 0 ={' '}
              <strong style={{ color: 'var(--accent-green)' }}>1</strong>
            </p>
            <p style={{ color: 'var(--text-primary)' }}>
              <strong style={{ color: 'var(--accent-cyan)' }}>Personal Month:</strong>{' '}
              1 (PY) + 3 (Mar) = 4 &rarr;{' '}
              <strong style={{ color: 'var(--accent-green)' }}>4</strong>
            </p>
            <p style={{ color: 'var(--text-primary)' }}>
              <strong style={{ color: 'var(--accent-amber)' }}>Personal Day:</strong>{' '}
              4 (PM) + 23 (day) = 27 &rarr; 2 + 7 ={' '}
              <strong style={{ color: 'var(--accent-green)' }}>9</strong>
            </p>
            <p style={{ color: 'var(--text-primary)' }}>
              <strong style={{ color: 'var(--accent-green)' }}>Personal Hour:</strong>{' '}
              9 (PD) + 14 (hour) = 23 &rarr; 2 + 3 ={' '}
              <strong style={{ color: 'var(--accent-green)' }}>5</strong>
            </p>
          </div>

          {/* Number meanings */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            What Each Number Represents (1&ndash;9)
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
                  {['#', 'Theme', 'Keywords'].map((h) => (
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
                {[
                  { num: 1, theme: 'The Pioneer', keywords: 'New beginnings, leadership, independence, initiative' },
                  { num: 2, theme: 'The Diplomat', keywords: 'Partnership, diplomacy, sensitivity, cooperation' },
                  { num: 3, theme: 'The Creator', keywords: 'Expression, creativity, communication, joy, optimism' },
                  { num: 4, theme: 'The Builder', keywords: 'Structure, discipline, hard work, solid foundations' },
                  { num: 5, theme: 'The Explorer', keywords: 'Freedom, adventure, change, versatility, curiosity' },
                  { num: 6, theme: 'The Nurturer', keywords: 'Harmony, love, responsibility, nurturing, home' },
                  { num: 7, theme: 'The Seeker', keywords: 'Introspection, analysis, spirituality, wisdom, solitude' },
                  { num: 8, theme: 'The Powerhouse', keywords: 'Power, abundance, achievement, material mastery' },
                  { num: 9, theme: 'The Humanitarian', keywords: 'Completion, humanitarianism, wisdom, release, service' },
                ].map((row) => (
                  <tr key={row.num}>
                    <td
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderBottom: '1px solid var(--border-color)',
                        color: 'var(--accent-cyan)',
                        fontWeight: 700,
                        width: '2rem',
                      }}
                    >
                      {row.num}
                    </td>
                    <td
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderBottom: '1px solid var(--border-color)',
                        color: 'var(--accent-amber)',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.theme}
                    </td>
                    <td
                      style={{
                        padding: '0.5rem 0.75rem',
                        borderBottom: '1px solid var(--border-color)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {row.keywords}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 3: How They Work Together */}
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
            3. How They Work Together
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Supreme Alignment cross-references these two independent timing systems &mdash; the external
            planetary hour cycle and your internal personal numerology cycle &mdash; to find moments when both
            are synchronized around the same life theme.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '1rem',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <div style={{ color: 'var(--accent-amber)', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                Planetary Hour
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>External cosmic timing</div>
            </div>

            <div style={{ color: 'var(--accent-green)', fontSize: '1.25rem', fontWeight: 700 }}>&times;</div>

            <div
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '1rem',
                textAlign: 'center',
              }}
            >
              <div style={{ color: 'var(--accent-purple)', fontWeight: 700, fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                Personal Numerology
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Internal personal cycle</div>
            </div>
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '0.75rem',
              background: 'var(--bg-tertiary)',
              borderRadius: '6px',
              border: '1px solid var(--accent-green)',
            }}
          >
            <span style={{ color: 'var(--accent-green)', fontWeight: 700, fontSize: '0.875rem' }}>
              = Alignment Window
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'block', marginTop: '0.25rem' }}>
              When both systems resonate with the same theme, you&apos;re in flow.
            </span>
          </div>
        </section>

        {/* Bottom navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
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
            &larr; Back to Dashboard
          </Link>
          <Link
            href="/how-it-works"
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
            Next: The Alignment Matrix &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
