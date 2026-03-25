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
            3. What Is Zodiacal Releasing?
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Zodiacal Releasing (ZR) is a predictive timing technique from the Hellenistic tradition of
            astrology, attributed to the 2nd-century astrologer Vettius Valens. It is considered one of
            the most powerful time-lord systems ever developed &mdash; a method for mapping the unfolding
            narrative of a person&apos;s life using their natal chart.
          </p>

          {/* Key concept box */}
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
              KEY CONCEPT
            </p>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.875rem', lineHeight: 1.7 }}>
              Unlike planetary hours (which are the same for everyone in your city) and personal numerology
              (which is derived from your birth <em>date</em>), Zodiacal Releasing is calculated from your
              exact <strong style={{ color: 'var(--tier-transcendent)' }}>birth time and birth location</strong>.
              It produces a completely unique timeline for each person, based on the precise positions of the
              Sun, Moon, and Ascendant at the moment of birth.
            </p>
          </div>

          {/* Hellenistic origins */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            Hellenistic Origins
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Zodiacal Releasing was practiced by astrologers in the Greco-Roman world over 1,800 years ago.
            Vettius Valens documented it in his <em>Anthology</em>, a nine-book compendium of astrological
            techniques. The method was largely lost for centuries until modern scholars of Hellenistic
            astrology &mdash; particularly Robert Schmidt, Chris Brennan, and others &mdash; translated
            the original Greek texts and revived the technique. Today, ZR is experiencing a renaissance
            among traditional astrologers who find it to be one of the most reliable predictive tools
            available.
          </p>

          {/* The Lot of Fortune */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            The Lot of Fortune
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            The starting point for Zodiacal Releasing is the <strong style={{ color: 'var(--text-primary)' }}>Lot of Fortune</strong> (also
            called the Part of Fortune). This is a mathematically derived point in your natal chart:
          </p>

          <div
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '1rem',
              marginBottom: '1.25rem',
              fontFamily: 'monospace',
              fontSize: '0.85rem',
            }}
          >
            <p style={{ color: 'var(--accent-amber)', fontWeight: 600, marginBottom: '0.5rem' }}>FORMULA</p>
            <p style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              <strong>Day chart:</strong> Lot = Ascendant + Moon &minus; Sun
            </p>
            <p style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              <strong>Night chart:</strong> Lot = Ascendant + Sun &minus; Moon
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.5 }}>
              The Ascendant is the degree of the zodiac rising on the eastern horizon at the moment of birth.
              A &quot;day chart&quot; means the Sun was above the horizon (you were born during the day); a
              &quot;night chart&quot; means it was below (born at night). The result is a specific degree that
              falls in one of the 12 zodiac signs &mdash; that sign becomes the foundation of your ZR timeline.
            </p>
          </div>

          {/* Why birth time matters */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            Why Birth Time Matters
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            The Ascendant changes approximately every 2 hours as the Earth rotates. Even a 30-minute
            difference in birth time can shift the Ascendant &mdash; and therefore the Lot of Fortune &mdash;
            into a different sign, which would produce an entirely different ZR timeline. This is why
            your birth certificate time is important. The more accurate your birth time, the more
            accurate your Zodiacal Releasing periods.
          </p>

          {/* The Four Levels */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            The Four Levels (L1&ndash;L4)
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            From the Lot of Fortune sign, ZR generates a cascading hierarchy of time periods. Each zodiac
            sign has a specific &quot;minor years&quot; value (inherited from Hellenistic tradition), which
            determines how long each sign&apos;s period lasts at each level:
          </p>

          <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.8rem',
              }}
            >
              <thead>
                <tr>
                  {['Sign', 'Minor Years', 'Ruler'].map((h) => (
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
                  { sign: '♈ Aries', years: 15, ruler: 'Mars' },
                  { sign: '♉ Taurus', years: 8, ruler: 'Venus' },
                  { sign: '♊ Gemini', years: 20, ruler: 'Mercury' },
                  { sign: '♋ Cancer', years: 25, ruler: 'Moon' },
                  { sign: '♌ Leo', years: 19, ruler: 'Sun' },
                  { sign: '♍ Virgo', years: 20, ruler: 'Mercury' },
                  { sign: '♎ Libra', years: 8, ruler: 'Venus' },
                  { sign: '♏ Scorpio', years: 15, ruler: 'Mars' },
                  { sign: '♐ Sagittarius', years: 12, ruler: 'Jupiter' },
                  { sign: '♑ Capricorn', years: 27, ruler: 'Saturn' },
                  { sign: '♒ Aquarius', years: 27, ruler: 'Saturn' },
                  { sign: '♓ Pisces', years: 12, ruler: 'Jupiter' },
                ].map((row) => (
                  <tr key={row.sign}>
                    <td style={{ padding: '0.375rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {row.sign}
                    </td>
                    <td style={{ padding: '0.375rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {row.years}
                    </td>
                    <td style={{ padding: '0.375rem 0.75rem', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      {row.ruler}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            The total of all 12 signs&apos; minor years is <strong style={{ color: 'var(--accent-cyan)' }}>129</strong>.
            At L1, each sign&apos;s period lasts its full minor years value (e.g., if your Lot of Fortune is
            in Cancer, your first L1 period is 25 years). Within each L1, the 12 signs cycle again at L2
            but proportionally shorter. This continues to L3 and finally L4, where periods can last just
            hours &mdash; giving us the fine-grained resolution Supreme Alignment needs.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {[
              { level: 'L1', name: 'Major Period', example: '8–27 years per sign', color: 'var(--accent-purple)' },
              { level: 'L2', name: 'Sub-Period', example: 'Months to a few years', color: 'var(--accent-cyan)' },
              { level: 'L3', name: 'Sub-Sub-Period', example: 'Days to weeks', color: 'var(--accent-amber)' },
              { level: 'L4', name: 'Micro-Period', example: 'Hours to days', color: 'var(--tier-transcendent)' },
            ].map((l) => (
              <div
                key={l.level}
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '0.625rem 1rem',
                  borderLeft: `3px solid ${l.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <span style={{ fontWeight: 700, color: l.color, fontSize: '0.95rem', minWidth: '2rem' }}>{l.level}</span>
                <div>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{l.name}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}> — {l.example}</span>
                </div>
              </div>
            ))}
          </div>

          {/* The Planetary Ruler Connection */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            The Planetary Ruler Connection
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            Every zodiac sign is ruled by one of the 7 classical planets. When you&apos;re in a ZR L4
            micro-period ruled by Leo, for example, the ruling planet is the Sun. If the current planetary
            hour also happens to be a Sun hour, your birth chart&apos;s time-lord and the cosmic clock are
            in agreement &mdash; that&apos;s a <strong style={{ color: 'var(--tier-transcendent)' }}>ZR alignment</strong>.
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
              EXAMPLE
            </p>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.875rem', lineHeight: 1.8 }}>
              Your Lot of Fortune is in Taurus. Right now your ZR L4 micro-period is in{' '}
              <strong style={{ color: 'var(--accent-amber)' }}>Leo</strong> (ruled by the{' '}
              <strong style={{ color: 'var(--accent-amber)' }}>Sun</strong>).
              <br />
              The current planetary hour is a <strong style={{ color: 'var(--accent-amber)' }}>Sun hour</strong>.
              <br />
              <span style={{ color: 'var(--tier-transcendent)' }}>&rarr; ZR alignment is active.</span> Your
              birth chart&apos;s time-lord confirms this planetary hour as personally significant to you.
            </p>
          </div>

          {/* Peak and Trough */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            Peak Periods &amp; Troughs
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            Within ZR, the angular relationship between your L2 (sub-period) sign and your L1 (major period)
            sign creates seasons of momentum:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', padding: '0.625rem 0.75rem', background: 'var(--bg-tertiary)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--accent-green)', fontWeight: 700, fontSize: '0.85rem' }}>PEAK</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Conjunction, trine, or sextile (0, 4, or 2 signs apart) &mdash; heightened productivity, opportunity, and forward momentum.</span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', padding: '0.625rem 0.75rem', background: 'var(--bg-tertiary)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--accent-pink)', fontWeight: 700, fontSize: '0.85rem' }}>TROUGH</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Square or opposition (3 or 6 signs apart) &mdash; challenges, restructuring, and inward focus.</span>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', padding: '0.625rem 0.75rem', background: 'var(--bg-tertiary)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.85rem' }}>NEUTRAL</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Other angular relationships &mdash; neither strongly accelerated nor challenged.</span>
            </div>
          </div>

          {/* Loosing of the Bond */}
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--accent-purple)',
              marginBottom: '0.75rem',
            }}
          >
            Loosing of the Bond
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>
            A special condition in ZR that occurs when the L2 sub-period sign is directly opposite your Lot
            of Fortune&apos;s natal sign (6 signs away). This signals a major transition or turning
            point &mdash; the narrative of your life is &quot;loosing&quot; (releasing) its bond with the
            current major period and reaching toward the next chapter. In traditional Hellenistic practice,
            this was considered one of the most significant timing indicators in a person&apos;s life.
            When active, it&apos;s shown on your dashboard&apos;s ZR panel.
          </p>
        </section>

        {/* ============================================ */}
        {/* SECTION 4: How They Work Together */}
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
            4. How They All Work Together
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Supreme Alignment cross-references three independent timing systems &mdash; planetary hours,
            personal numerology, and Zodiacal Releasing &mdash; to find moments when multiple layers of
            cosmic and personal timing converge on the same life theme.
          </p>

          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '0.75rem 1rem',
                textAlign: 'center',
                flex: '1',
                minWidth: '140px',
              }}
            >
              <div style={{ color: 'var(--accent-amber)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                Planetary Hour
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>External cosmic timing</div>
            </div>

            <div style={{ color: 'var(--accent-green)', fontSize: '1.1rem', fontWeight: 700 }}>&times;</div>

            <div
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '0.75rem 1rem',
                textAlign: 'center',
                flex: '1',
                minWidth: '140px',
              }}
            >
              <div style={{ color: 'var(--accent-purple)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                Personal Numerology
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Internal personal cycle</div>
            </div>

            <div style={{ color: 'var(--accent-green)', fontSize: '1.1rem', fontWeight: 700 }}>&times;</div>

            <div
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid rgba(var(--tier-transcendent-rgb), 0.3)',
                borderRadius: '6px',
                padding: '0.75rem 1rem',
                textAlign: 'center',
                flex: '1',
                minWidth: '140px',
              }}
            >
              <div style={{ color: 'var(--tier-transcendent)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                Zodiacal Releasing
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Birth chart time-lord</div>
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
              = Alignment Window (up to 5 layers deep)
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'block', marginTop: '0.25rem' }}>
              More layers converging = rarer and more powerful alignment. When all five agree, it&apos;s Transcendent.
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
