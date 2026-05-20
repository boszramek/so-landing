import { motion } from 'framer-motion';
import { flyUp, staggerContainer, viewport } from './variants';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Before / After rows ─────────────────────────────────────────────────────
interface Row { label: string; before: string; after: string }

const ROWS: Row[] = [
  { label: 'Beleg-Screening',  before: '3–8 Stunden',   after: '< 90 Sekunden'  },
  { label: 'Fehlerquote',      before: '4–12 %',         after: '< 0.1 %'        },
  { label: 'Quellen geprüft',  before: '10–30',          after: '200–400+'       },
  { label: 'Report-Lieferung', before: '2–5 Tage',       after: '< 6 Stunden'    },
  { label: 'Kosten pro Audit', before: '€ 800–2.400',    after: 'Inkl. Mandat'   },
];

// ─── Savings hero stat ───────────────────────────────────────────────────────
const HERO_STATS = [
  { val: '96 %',   label: 'Zeitersparnis'      },
  { val: '40×',    label: 'Mehr Quellen'        },
  { val: '< 6 h',  label: 'Liefergarantie'      },
];

function CompareRow({ row, i }: { row: Row; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.52, ease: EASE, delay: 0.08 + i * 0.07 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 0,
        borderBottom: '0.5px solid rgba(0,35,102,.07)',
      }}
    >
      {/* Label */}
      <div style={{
        padding: '16px 20px',
        fontSize: '.8125rem', fontWeight: 600, color: 'var(--dark)',
        display: 'flex', alignItems: 'center',
        borderRight: '0.5px solid rgba(0,35,102,.07)',
      }}>
        {row.label}
      </div>

      {/* Before */}
      <div style={{
        padding: '16px 20px',
        fontSize: '.875rem', color: '#8c8c8c',
        display: 'flex', alignItems: 'center', gap: 8,
        borderRight: '0.5px solid rgba(0,35,102,.07)',
        background: 'rgba(240,240,240,.4)',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="7" cy="7" r="6" stroke="#c0392b" strokeWidth="1.2" opacity="0.5"/>
          <path d="M4.5 4.5L9.5 9.5M9.5 4.5L4.5 9.5" stroke="#c0392b" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        {row.before}
      </div>

      {/* After */}
      <div style={{
        padding: '16px 20px',
        fontSize: '.875rem', fontWeight: 700, color: 'var(--dark)',
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(0,35,102,.03)',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
          <circle cx="7" cy="7" r="6" fill="rgba(0,35,102,.08)" stroke="var(--blue)" strokeWidth="1.2"/>
          <path d="M3.5 7L6 9.5L10.5 4.5" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        {row.after}
      </div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function EfficiencyMatrix() {
  return (
    <section
      id="efficiency"
      style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'calc(var(--nav-h) + 80px) 48px 80px',
        background: 'var(--surface)',
      }}
    >
      <div style={{ maxWidth: 1040, width: '100%' }}>

        {/* Header */}
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.1)}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <motion.div variants={flyUp} style={{ marginBottom: 20 }}>
            <span className="pill pill-blue"><span className="pill-dot"/>Effizienz-Matrix</span>
          </motion.div>
          <motion.h2 variants={flyUp} style={{
            fontSize: 'clamp(2.6rem,5.5vw,5rem)',
            fontWeight: 800, letterSpacing: '-.05em', lineHeight: 0.97,
            color: 'var(--dark)', marginBottom: 20,
          }}>
            Vom Belegchaos<br/>
            <span style={{ color: 'var(--blue)' }}>zur Strategie in Sekunden.</span>
          </motion.h2>
          <motion.p variants={flyUp} style={{
            maxWidth: 460, margin: '0 auto',
            fontSize: '1.0625rem', lineHeight: 1.65, color: 'var(--body)',
          }}>
            Was Ihr Team Tage kostet, erledigt der S&amp;O Labs Swarm in einer
            Kaffeepause — mit zehnfacher Quellenabdeckung.
          </motion.p>
        </motion.div>

        {/* Hero stats */}
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.12, 0.05)}
          style={{
            display: 'flex', justifyContent: 'center', gap: 40,
            flexWrap: 'wrap', marginBottom: 56,
          }}
        >
          {HERO_STATS.map(s => (
            <motion.div
              key={s.label}
              variants={flyUp}
              style={{
                textAlign: 'center',
                background: '#fff', borderRadius: 20, padding: '28px 36px',
                border: '0.5px solid rgba(0,35,102,.1)',
                boxShadow: '0 2px 16px rgba(0,35,102,.06)',
                minWidth: 160,
              }}
            >
              <div style={{
                fontSize: '2.8rem', fontWeight: 800, letterSpacing: '-.045em',
                lineHeight: 1, color: 'var(--blue)', marginBottom: 6,
              }}>
                {s.val}
              </div>
              <div style={{ fontSize: '.75rem', color: 'var(--secondary)', fontWeight: 500 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            background: '#fff', borderRadius: 24,
            border: '0.5px solid rgba(0,35,102,.1)',
            boxShadow: '0 4px 24px rgba(0,35,102,.06), 0 20px 60px rgba(0,35,102,.08)',
            overflow: 'hidden',
          }}
        >
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            gap: 0,
            borderBottom: '1px solid rgba(0,35,102,.1)',
          }}>
            <div style={{
              padding: '14px 20px',
              fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em',
              textTransform: 'uppercase', color: 'var(--secondary)',
              borderRight: '0.5px solid rgba(0,35,102,.07)',
            }}>
              Aufgabe
            </div>
            <div style={{
              padding: '14px 20px',
              fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em',
              textTransform: 'uppercase', color: '#c0392b',
              borderRight: '0.5px solid rgba(0,35,102,.07)',
              background: 'rgba(240,240,240,.4)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="#c0392b" strokeWidth="1.2" opacity="0.6"/>
                <path d="M3.5 3.5L8.5 8.5M8.5 3.5L3.5 8.5" stroke="#c0392b" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Manuell
            </div>
            <div style={{
              padding: '14px 20px',
              fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em',
              textTransform: 'uppercase', color: 'var(--blue)',
              background: 'rgba(0,35,102,.03)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" fill="rgba(0,35,102,.1)" stroke="var(--blue)" strokeWidth="1.2"/>
                <path d="M3 6L5.2 8.2L9 4" stroke="var(--blue)" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              S&amp;O Labs Swarm
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((r, i) => <CompareRow key={r.label} row={r} i={i} />)}

          {/* Footer banner */}
          <div style={{
            background: 'linear-gradient(120deg,#002366,#003B8E)',
            padding: '20px 28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 12,
          }}>
            <div style={{ color: '#fff', fontSize: '.9375rem', fontWeight: 600 }}>
              Ihre Analysten. Freigesetzt für das, was zählt.
            </div>
            <div style={{
              display: 'flex', gap: 16, flexWrap: 'wrap',
            }}>
              {['AES-256 · RAM-only', 'DSGVO-konform', 'Lokal in DE'].map(tag => (
                <span key={tag} style={{
                  fontSize: '.72rem', fontWeight: 600, color: 'rgba(255,255,255,.75)',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#30D158', display: 'inline-block' }} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
