import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function up(delay: number) {
  return {
    initial: { opacity: 0, y: 36, rotateX: -20, z: -80 },
    animate: { opacity: 1, y: 0, rotateX: 0, z: 0 },
    transition: { duration: 0.8, ease: EASE, delay },
  };
}

function fadeIn(delay: number) {
  return {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: EASE, delay },
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SwarmCard() {
  return (
    <motion.div
      className="float-card yosc-a"
      {...fadeIn(0.55)}
      whileHover={{ rotateX: 4, rotateY: -4, scale: 1.02 }}
      style={{ position: 'absolute', top: 0, right: 0, width: 260, padding: '20px 22px', transformPerspective: 800 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#30D158',
          boxShadow: '0 0 8px rgba(48,209,88,.6)', display: 'inline-block',
          animation: 'dot-pulse 2s infinite' }} />
        <span style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--blue)' }}>Swarm · Live</span>
      </div>
      {[
        { label: 'Analyst',   color: 'var(--blue)',  sub: '#003B8E', pct: 78, note: '247 Quellen' },
        { label: 'Auditor',   color: 'var(--amber)', sub: '#FF6B00', pct: 52, note: '14 Claims'  },
        { label: 'Strategist',color: '#34AADC',      sub: '#BF5AF2', pct: 28, note: 'Synthese'   },
      ].map(a => (
        <div key={a.label} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: '.78rem', fontWeight: 600, color: a.color }}>{a.label}</span>
            <span style={{ fontSize: '.75rem', color: 'var(--secondary)' }}>{a.note}</span>
          </div>
          <div style={{ height: 3, borderRadius: 2, background: 'var(--surface)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${a.pct}%` }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
              style={{ height: '100%', background: `linear-gradient(90deg,${a.color},${a.sub})`, borderRadius: 2 }}
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function ConfidenceCard() {
  return (
    <motion.div
      className="float-card yosc-b"
      {...fadeIn(0.7)}
      whileHover={{ rotateX: 4, rotateY: 4, scale: 1.02 }}
      style={{ position: 'absolute', top: 148, left: 0, width: 180, padding: 22, transformPerspective: 800 }}
    >
      <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em',
        textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 10 }}>Konfidenz</div>
      <div style={{ fontSize: '2.6rem', fontWeight: 800, letterSpacing: '-.045em',
        color: 'var(--green)', lineHeight: 1 }}>94%</div>
      <div style={{ fontSize: '.75rem', color: 'var(--secondary)', marginTop: 4 }}>Swarm-validiert</div>
    </motion.div>
  );
}

function VaultCard() {
  return (
    <motion.div
      className="float-card yosc-c"
      {...fadeIn(0.82)}
      whileHover={{ rotateX: -4, rotateY: -4, scale: 1.02 }}
      style={{ position: 'absolute', bottom: 20, right: 20, width: 230, padding: '18px 20px', transformPerspective: 800 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L14 4V10C14 13 11.5 15.5 8 16C4.5 15.5 2 13 2 10V4L8 1Z"
            fill="rgba(26,158,63,.1)" stroke="#1A9E3F" strokeWidth="1.3"/>
          <path d="M5.5 8L7 9.5L10.5 6" stroke="#1A9E3F" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em',
          textTransform: 'uppercase', color: 'var(--green)' }}>Vault · Gesichert</span>
      </div>
      <div style={{ fontSize: '.875rem', fontWeight: 600, marginBottom: 4, color: 'var(--dark)' }}>
        Hardware-Encryption
      </div>
      <div style={{ fontSize: '.75rem', color: 'var(--secondary)' }}>Mac Studio · Secure Enclave · DE</div>
      <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
        <div style={{ height: 3, flex: 1, borderRadius: 2,
          background: 'linear-gradient(90deg,var(--blue),#30D158)' }} />
        <div style={{ height: 3, flex: 0.7, borderRadius: 2,
          background: 'linear-gradient(90deg,#30D158,transparent)' }} />
      </div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
interface HeroProps { onJump: (i: number) => void }

export default function Hero({ onJump }: HeroProps) {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'calc(var(--nav-h) + 60px) 48px 60px',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', top: '20%', left: '30%',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(0,35,102,.08),transparent 65%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} aria-hidden />

      <div style={{
        maxWidth: 1080, width: '100%',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
        alignItems: 'center',
      }}>
        {/* ── Left: copy ── */}
        <div>
          <motion.div {...up(0.05)} style={{ marginBottom: 28 }}>
            <span className="pill pill-blue">
              <span className="pill-dot" />
              KI-gestützte Steueroptimierung · Deutschland
            </span>
          </motion.div>

          <div style={{ marginBottom: 24, overflow: 'hidden', perspective: '1000px', transformStyle: 'preserve-3d' }}>
            {['Ihr Unternehmen', 'verliert Geld.', 'Nicht mehr.'].map((line, i) => (
              <motion.div key={line} {...up(0.15 + i * 0.1)} style={{ transformStyle: 'preserve-3d' }}>
                <span style={{
                  display: 'block',
                  fontSize: 'clamp(3.8rem,7.5vw,7.6rem)',
                  fontWeight: 800, letterSpacing: '-.05em', lineHeight: 0.95,
                  color: i === 2 ? 'var(--blue)' : 'var(--dark)',
                  marginBottom: i < 2 ? 4 : 0,
                }}>
                  {line}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            {...up(0.48)}
            style={{ maxWidth: 420, marginBottom: 8, fontSize: '1.0625rem', lineHeight: 1.65, color: 'var(--body)' }}
          >
            Verlorene Arbeitszeit. Steuerliche Blindspots. Manueller Aufwand.
            Im Schnitt <strong style={{ color: 'var(--dark)' }}>€15.000+ pro Jahr</strong> — versteckt in Ihren eigenen Daten.
          </motion.p>
          <motion.p
            {...up(0.54)}
            style={{ maxWidth: 420, marginBottom: 40, fontSize: '1.0625rem', fontWeight: 600, color: 'var(--dark)' }}
          >
            S&amp;O Labs findet diese Lücken in 48 Stunden. Garantiert.
          </motion.p>

          <motion.div {...up(0.62)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => onJump(9)}
            >
              Session sichern
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M7 3L11 7L7 11" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </motion.button>
            <motion.button
              className="btn-ghost"
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => onJump(4)}
            >
              Das System entdecken
            </motion.button>
          </motion.div>

          <motion.div
            {...up(0.74)}
            style={{ display: 'flex', gap: 24, marginTop: 40, flexWrap: 'wrap' }}
          >
            {[
              { color: '#30D158',      glow: 'rgba(48,209,88,.6)', pulse: true,  label: 'Daten bleiben in Deutschland'   },
              { color: 'var(--blue)',  glow: '',                   pulse: false, label: '100 % vertraulich'               },
              { color: 'var(--green)', glow: '',                   pulse: false, label: 'Ergebnis-Garantie'               },
            ].map(t => (
              <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%', background: t.color,
                  boxShadow: t.glow ? `0 0 6px ${t.glow}` : undefined,
                  animation: t.pulse ? 'dot-pulse 2s infinite' : undefined,
                }} />
                <span style={{ fontSize: '.75rem', color: 'var(--secondary)' }}>{t.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: floating cards ── */}
        <div className="desk-only" style={{ position: 'relative', height: 460 }}>
          <SwarmCard />
          <ConfidenceCard />
          <VaultCard />

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            style={{
              position: 'absolute', bottom: -60, left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            }}
          >
            <span style={{ fontSize: '.75rem', color: 'var(--secondary)' }}>Scroll</span>
            <div style={{
              width: 1, height: 40,
              background: 'linear-gradient(180deg,rgba(0,0,0,.2),transparent)',
              animation: 'dot-pulse 2s ease-in-out infinite',
            }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
