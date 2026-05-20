import { motion } from 'framer-motion';
import { flyUp, staggerContainer, springPop, viewport } from './variants';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Industries ──────────────────────────────────────────────────────────────
const INDUSTRIES = [
  { icon: '🏢', label: 'Immobilien- &\nVerwaltungsgesellschaften'  },
  { icon: '⚖️', label: 'Kanzleien &\nRechtsbüros'                 },
  { icon: '🏗️', label: 'GmbH &\nMittelstand'                      },
  { icon: '🚀', label: 'Tech-Startups &\nScale-ups'               },
  { icon: '🏦', label: 'Family Offices &\nHoldings'               },
  { icon: '🏥', label: 'Healthcare &\nKliniken'                    },
];

function IndustryPill({ icon, label, delay }: { icon: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        background: '#fff', borderRadius: 18, padding: '20px 16px',
        border: '0.5px solid rgba(0,35,102,.1)',
        boxShadow: '0 2px 12px rgba(0,35,102,.05)',
        minWidth: 140, textAlign: 'center',
        cursor: 'default',
      }}
    >
      <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{icon}</span>
      <span style={{
        fontSize: '.72rem', fontWeight: 600, color: 'var(--dark)',
        lineHeight: 1.4, whiteSpace: 'pre-line',
      }}>
        {label}
      </span>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function Testimonial() {
  return (
    <section
      id="testimonial"
      style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'calc(var(--nav-h) + 80px) 48px 80px',
        background: 'var(--surface)',
      }}
    >
      <div style={{ maxWidth: 1040, width: '100%' }}>

        {/* ── Header ── */}
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.1)}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <motion.div variants={flyUp} style={{ marginBottom: 20 }}>
            <span className="pill pill-blue"><span className="pill-dot"/>Erste Referenzen</span>
          </motion.div>
          <motion.h2 variants={flyUp} style={{
            fontSize: 'clamp(2.6rem,5.5vw,5rem)',
            fontWeight: 800, letterSpacing: '-.05em', lineHeight: 0.97,
            color: 'var(--dark)', marginBottom: 20,
          }}>
            Für jedes Business.<br/>
            <span style={{ color: 'var(--blue)' }}>Ohne Ausnahme.</span>
          </motion.h2>
          <motion.p variants={flyUp} style={{
            maxWidth: 500, margin: '0 auto',
            fontSize: '1.0625rem', lineHeight: 1.65, color: 'var(--body)',
          }}>
            Ob Immobilienverwaltung, GmbH, Kanzlei oder Tech-Startup — S&amp;O Labs
            ist plattform-unabhängig und sofort einsatzbereit.
          </motion.p>
        </motion.div>

        {/* ── Featured testimonial card ── */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          variants={springPop}
          style={{ marginBottom: 52 }}
        >
          <div style={{
            background: 'linear-gradient(160deg,#002366,#003B8E)',
            borderRadius: 28, padding: '48px 44px',
            position: 'relative', overflow: 'hidden',
            boxShadow: '0 8px 40px rgba(0,35,102,.28), 0 32px 80px rgba(0,35,102,.18)',
          }}>
            {/* Decorative quote mark */}
            <div style={{
              position: 'absolute', top: 24, right: 36,
              fontSize: '9rem', fontWeight: 800, lineHeight: 1,
              color: 'rgba(255,255,255,.04)', fontFamily: 'Georgia, serif',
              userSelect: 'none', pointerEvents: 'none',
            }}>
              "
            </div>

            {/* Stars */}
            <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
              {[0,1,2,3,4].map(i => (
                <motion.svg
                  key={i}
                  width="18" height="18" viewBox="0 0 18 18" fill="none"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.07, type: 'spring', stiffness: 400 }}
                >
                  <path d="M9 1.5L11 6.5H16.5L12.2 9.7L13.8 15L9 11.8L4.2 15L5.8 9.7L1.5 6.5H7L9 1.5Z"
                    fill="#FFD60A"/>
                </motion.svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote style={{
              margin: 0, marginBottom: 32,
              fontSize: 'clamp(1.05rem,2.2vw,1.375rem)',
              fontWeight: 500, lineHeight: 1.55,
              color: '#fff', letterSpacing: '-.01em',
              maxWidth: 680,
            }}>
              "S&amp;O Labs hat unsere Finanzprozesse revolutioniert. Die Präzision
              des KI-Auditors ist menschlichen Prüfern weit überlegen — und das bei
              einem Bruchteil der Zeit und ohne Kompromisse beim Datenschutz."
            </blockquote>

            {/* Attribution */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* Avatar placeholder */}
              <div style={{
                width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(255,255,255,.15)',
                border: '1.5px solid rgba(255,255,255,.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="8" r="4.5" stroke="rgba(255,255,255,.7)" strokeWidth="1.4"/>
                  <path d="M3 20C3 16.7 6.6 14 11 14C15.4 14 19 16.7 19 20"
                    stroke="rgba(255,255,255,.7)" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '.9375rem', fontWeight: 700, color: '#fff', marginBottom: 2 }}>
                  Ruhr Living GmbH
                </div>
                <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.55)' }}>
                  Immobilien- &amp; Verwaltungsgesellschaft · Nordrhein-Westfalen
                </div>
              </div>

              {/* Industry badge */}
              <div style={{
                marginLeft: 'auto',
                background: 'rgba(255,255,255,.1)',
                border: '0.5px solid rgba(255,255,255,.2)',
                borderRadius: 10, padding: '6px 14px',
                fontSize: '.7rem', fontWeight: 700, color: 'rgba(255,255,255,.7)',
                letterSpacing: '.08em', textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>
                Immobilien
              </div>
            </div>

            {/* Bottom stat row */}
            <div style={{
              marginTop: 32, paddingTop: 24,
              borderTop: '0.5px solid rgba(255,255,255,.12)',
              display: 'flex', gap: 36, flexWrap: 'wrap',
            }}>
              {[
                { val: '84 %',   label: 'Prüfzeit reduziert'      },
                { val: '320+',   label: 'Quellen pro Report'       },
                { val: '< 4 h',  label: 'Lieferung (Ø)'            },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', letterSpacing: '-.03em' }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.5)', marginTop: 2 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Universal application grid ── */}
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.07, 0.05)}
          style={{ marginBottom: 48 }}
        >
          <motion.p variants={flyUp} style={{
            textAlign: 'center', fontSize: '.75rem', fontWeight: 700,
            letterSpacing: '.1em', textTransform: 'uppercase',
            color: 'var(--secondary)', marginBottom: 24,
          }}>
            Vertrauen in jeder Branche
          </motion.p>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center',
          }}>
            {INDUSTRIES.map((ind, i) => (
              <IndustryPill key={ind.label} icon={ind.icon} label={ind.label} delay={0.05 + i * 0.06} />
            ))}
          </div>
        </motion.div>

        {/* ── Scarcity strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.55, ease: EASE }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            background: 'rgba(255,193,7,.07)',
            border: '0.5px solid rgba(255,193,7,.3)',
            borderRadius: 14, padding: '16px 24px',
            flexWrap: 'wrap', textAlign: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1L10 6H15.5L11 9L12.5 15L8 11.5L3.5 15L5 9L0.5 6H6L8 1Z" fill="var(--amber)"/>
          </svg>
          <span style={{ fontSize: '.8125rem', color: 'var(--dark)', fontWeight: 500 }}>
            Aktuell&nbsp;
            <strong>1 von 4</strong>
            &nbsp;Retainer-Plätzen verfügbar — Erstgespräch kostenlos &amp; unverbindlich
          </span>
        </motion.div>

      </div>
    </section>
  );
}
