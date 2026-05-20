import { motion } from 'framer-motion';
import { flyUp, staggerContainer, viewport } from './variants';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Flow steps ───────────────────────────────────────────────────────────────
interface Step {
  num: string;
  title: string;
  sub: string;
  detail: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Upload',
    sub: 'Gesicherte Übertragung',
    detail: 'Ihre Daten werden direkt in Ihrem Browser verschlüsselt — bevor auch nur ein Byte das Gerät verlässt.',
    color: 'var(--blue)',
    glow: 'rgba(0,35,102,.18)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="10" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M9 10V8C9 5.8 11.2 4 14 4C16.8 4 19 5.8 19 8V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="14" cy="17" r="2.2" fill="currentColor" opacity="0.7"/>
        <path d="M14 19.2V21.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Processing',
    sub: 'KI-Analyse · Lokal in Deutschland',
    detail: 'Mac Studio Cluster in Deutschland. Alle Daten werden im Arbeitsspeicher verarbeitet — sie verlassen nie das System.',
    color: '#34AADC',
    glow: 'rgba(52,170,220,.18)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="8" width="20" height="6" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="4" y="16" width="20" height="6" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="21" cy="11" r="1.4" fill="currentColor" opacity="0.8"/>
        <circle cx="21" cy="19" r="1.4" fill="currentColor" opacity="0.8"/>
        <circle cx="18" cy="11" r="1.4" fill="currentColor" opacity="0.5"/>
        <circle cx="18" cy="19" r="1.4" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Output',
    sub: 'Verifizierter Bericht',
    detail: 'CEO-ready Report mit vollständiger Quellenverknüpfung. Jede Aussage menschlich geprüft, jede Quelle klickbar.',
    color: 'var(--green)',
    glow: 'rgba(48,209,88,.18)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M7 4h10l6 6v14H7V4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M17 4v6h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11 15L13.5 17.5L18 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
];

// ─── Connector arrow ─────────────────────────────────────────────────────────
function Connector({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      style={{ transformOrigin: 'left center', display: 'flex', alignItems: 'center', flexShrink: 0 }}
      className="desk-only"
    >
      <div style={{
        width: 48, height: 1,
        background: 'linear-gradient(90deg,rgba(0,35,102,.15),rgba(0,35,102,.35))',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)',
          borderTop: '4px solid transparent',
          borderBottom: '4px solid transparent',
          borderLeft: '6px solid rgba(0,35,102,.35)',
        }} />
      </div>
    </motion.div>
  );
}

// ─── Single step card ─────────────────────────────────────────────────────────
function StepCard({ step, i }: { step: Step; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: EASE, delay: 0.1 + i * 0.14 }}
      style={{
        flex: 1, minWidth: 220,
        background: '#fff', borderRadius: 22, padding: '28px 24px',
        border: '0.5px solid rgba(0,35,102,.1)',
        boxShadow: '0 2px 12px rgba(0,35,102,.05), 0 8px 32px rgba(0,35,102,.06)',
        display: 'flex', flexDirection: 'column', gap: 16,
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Glow accent */}
      <div style={{
        position: 'absolute', top: -30, right: -30,
        width: 120, height: 120, borderRadius: '50%',
        background: `radial-gradient(circle, ${step.glow}, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Number badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: `color-mix(in srgb, ${step.color} 12%, transparent)`,
          border: `1px solid color-mix(in srgb, ${step.color} 25%, transparent)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: step.color,
        }}>
          {step.icon}
        </div>
        <span style={{
          fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-.04em',
          color: 'rgba(0,35,102,.06)', lineHeight: 1,
        }}>
          {step.num}
        </span>
      </div>

      {/* Text */}
      <div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)', marginBottom: 3 }}>
          {step.title}
        </div>
        <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em',
          textTransform: 'uppercase', color: step.color, marginBottom: 10 }}>
          {step.sub}
        </div>
        <p style={{ fontSize: '.8125rem', color: 'var(--body)', lineHeight: 1.65, margin: 0 }}>
          {step.detail}
        </p>
      </div>

      {/* Bottom lock indicator */}
      <div style={{
        marginTop: 'auto',
        display: 'flex', alignItems: 'center', gap: 6,
        paddingTop: 14,
        borderTop: '0.5px solid rgba(0,35,102,.07)',
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="var(--green)" strokeWidth="1.1"/>
          <path d="M4 5V3.5C4 2.1 4.7 1 6 1C7.3 1 8 2.1 8 3.5V5" stroke="var(--green)" strokeWidth="1.1" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: '.65rem', fontWeight: 600, color: 'var(--green)', letterSpacing: '.04em' }}>
          Ende-zu-Ende verschlüsselt
        </span>
      </div>
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function DataFlow() {
  return (
    <section
      id="security"
      style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'calc(var(--nav-h) + 80px) 48px 80px',
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
            <span className="pill pill-blue"><span className="pill-dot"/>Datensicherheit</span>
          </motion.div>
          <motion.h2 variants={flyUp} style={{
            fontSize: 'clamp(2.6rem,5.5vw,5rem)',
            fontWeight: 800, letterSpacing: '-.05em', lineHeight: 0.97,
            color: 'var(--dark)', marginBottom: 20,
          }}>
            Ihr Tresor<br/>
            <span style={{ color: 'var(--blue)' }}>bleibt in Deutschland.</span>
          </motion.h2>
          <motion.p variants={flyUp} style={{
            maxWidth: 480, margin: '0 auto',
            fontSize: '1.0625rem', lineHeight: 1.65, color: 'var(--body)',
          }}>
            Ende-zu-Ende verschlüsselt. Kein einziges Byte verlässt Ihren Perimeter
            oder berührt eine Public Cloud.
          </motion.p>
        </motion.div>

        {/* Flow cards */}
        <div style={{
          display: 'flex', alignItems: 'stretch', gap: 0,
          flexWrap: 'wrap',
        }}>
          {STEPS.map((step, i) => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 220, gap: 0 }}>
              <StepCard step={step} i={i} />
              {i < STEPS.length - 1 && <Connector delay={0.3 + i * 0.14} />}
            </div>
          ))}
        </div>

        {/* Trust callout strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          style={{
            marginTop: 40,
            background: 'linear-gradient(120deg,#002366 0%,#003B8E 100%)',
            borderRadius: 18, padding: '24px 32px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: 'rgba(255,255,255,.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 2L19 6V12C19 16.5 15.5 20.5 11 21C6.5 20.5 3 16.5 3 12V6L11 2Z"
                  fill="rgba(255,255,255,.12)" stroke="white" strokeWidth="1.4"/>
                <path d="M7.5 11L10 13.5L15 8.5" stroke="white" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '.9375rem', fontWeight: 700, color: '#fff', marginBottom: 3 }}>
                Hardware-gesicherte Verarbeitung · Secure Enclave
              </div>
              <div style={{ fontSize: '.8125rem', color: 'rgba(255,255,255,.65)' }}>
                Apple Mac Studio · Daten in Deutschland · Kein Cloud-Kontakt · Rechtlich abgesichert
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { val: '0',     label: 'Cloud-Kontakte'   },
              { val: '100%',  label: 'Lokal in DE'      },
              { val: '100%',  label: 'Vertraulich'      },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-.03em' }}>
                  {s.val}
                </div>
                <div style={{ fontSize: '.65rem', color: 'rgba(255,255,255,.5)', marginTop: 3 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
