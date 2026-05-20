import { motion } from 'framer-motion';
import { flyUp, staggerContainer, viewport } from './variants';
import NotarySeal from './NotarySeal';

// ─── Feature icon set ────────────────────────────────────────────────────────
const Icons = {
  target: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="9" cy="9" r="1" fill="currentColor"/>
    </svg>
  ),
  agent: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L15.5 5.5V10C15.5 13.5 12.6 16.5 9 17C5.4 16.5 2.5 13.5 2.5 10V5.5L9 2Z"
        stroke="currentColor" strokeWidth="1.3" fill="none"/>
      <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),
  clock: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M9 5.5V9L11.5 11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  infinity: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6 9C6 7.3 7.3 6 9 6C10.7 6 12 7.3 12 9C12 10.7 10.7 12 9 12M9 12C7.3 12 6 10.7 6 9M6 9C6 10.7 4.7 12 3.5 12C2.1 12 1 10.9 1 9.5V8.5C1 7.1 2.1 6 3.5 6C4.7 6 6 7.3 6 9M12 9C12 7.3 13.3 6 14.5 6C15.9 6 17 7.1 17 8.5V9.5C17 10.9 15.9 12 14.5 12C13.3 12 12 10.7 12 9"
        stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),
  alert: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L16 14H2L9 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <line x1="9" y1="8" x2="9" y2="11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="9" cy="13" r="0.8" fill="currentColor"/>
    </svg>
  ),
  server: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="4" width="14" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="2" y="10" width="14" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="13.5" cy="6" r="1" fill="currentColor"/>
      <circle cx="13.5" cy="12" r="1" fill="currentColor"/>
    </svg>
  ),
  check: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 9L7.5 12.5L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  custom: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),
};

// ─── Grand Slam Value Stack ───────────────────────────────────────────────────
const STACK_ITEMS = [
  { label: 'Adversarieller Swarm-Analyse (3 KI-Agenten)',   value: '€ 1.800' },
  { label: 'CEO-Strategy-Report mit Quellen & Maßnahmen',   value: '€ 900'   },
  { label: 'Echtzeit-Anomalie-Alerts (E-Mail + Dashboard)', value: '€ 400'   },
  { label: 'Geheimhaltungsvertrag auf Wunsch',               value: '€ 200'   },
  { label: 'Ergebnis-Garantie — kein Ergebnis, kein Preis', value: '∞'       },
];

function GrandSlamStack() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
      style={{
        maxWidth: 700, margin: '0 auto 56px',
        background: '#fff',
        borderRadius: 20,
        border: '0.5px solid rgba(0,35,102,.1)',
        boxShadow: '0 4px 24px rgba(0,0,0,.06)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '18px 28px',
        borderBottom: '0.5px solid rgba(0,0,0,.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--blue)' }}>
          Was Sie erhalten
        </span>
        <span style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--secondary)' }}>
          Marktwert
        </span>
      </div>

      {/* Items */}
      {STACK_ITEMS.map((item, i) => (
        <div key={item.label} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 28px',
          borderBottom: i < STACK_ITEMS.length - 1 ? '0.5px solid rgba(0,0,0,.04)' : 'none',
          gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" fill="rgba(26,158,63,.1)"/>
              <path d="M4.5 8L6.5 10L11.5 5.5" stroke="#1A9E3F" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: '.875rem', color: 'var(--dark)', fontWeight: item.value === '∞' ? 600 : 400 }}>
              {item.label}
            </span>
          </div>
          <span style={{
            fontSize: '.875rem', fontWeight: 700,
            color: item.value === '∞' ? 'var(--green)' : 'var(--secondary)',
            flexShrink: 0,
          }}>
            {item.value === '∞' ? 'Unbezahlbar' : item.value}
          </span>
        </div>
      ))}

      {/* Total vs. Entry */}
      <div style={{ padding: '16px 28px', background: 'var(--surface)', borderTop: '0.5px solid rgba(0,0,0,.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: '.8rem', color: 'var(--secondary)' }}>Gesamtwert der Leistungen</span>
          <span style={{ fontSize: '.875rem', fontWeight: 600, color: 'var(--secondary)', textDecoration: 'line-through' }}>
            € 3.300+
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '.875rem', fontWeight: 700, color: 'var(--dark)' }}>Ihr Einstieg (Probe-Analyse)</span>
          <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-.04em', color: 'var(--blue)' }}>
            € 499
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Ergebnis-Garantie ────────────────────────────────────────────────────────
function Guarantee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
      style={{
        maxWidth: 700, margin: '0 auto 48px',
        background: 'rgba(26,158,63,.04)',
        border: '0.5px solid rgba(26,158,63,.22)',
        borderRadius: 18, padding: '24px 28px',
        display: 'flex', gap: 20, alignItems: 'flex-start',
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
        background: 'rgba(26,158,63,.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2L19 6V12C19 16.5 15.5 20.5 11 21C6.5 20.5 3 16.5 3 12V6L11 2Z"
            fill="rgba(26,158,63,.12)" stroke="#1A9E3F" strokeWidth="1.3"/>
          <path d="M7.5 11L10 13.5L15 8.5" stroke="#1A9E3F" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>
      <div>
        <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 8 }}>
          Die S&amp;O Ergebnis-Garantie
        </div>
        <p style={{ fontSize: '.9375rem', lineHeight: 1.65, color: 'var(--dark)', marginBottom: 10, margin: '0 0 10px' }}>
          <strong>Wenn wir in Ihrer Probe-Analyse keine identifizierbaren Einsparungen von mindestens €10.000 finden,</strong>{' '}
          erstatten wir Ihnen den vollen Betrag. Keine Fragen gestellt.
        </p>
        <div style={{ fontSize: '.8rem', color: 'var(--secondary)', fontStyle: 'italic' }}>
          — S&amp;O Labs GbR, Deutschland · Schriftlich fixierbar auf Wunsch
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tier definitions ─────────────────────────────────────────────────────────
interface Feature { icon: React.ReactNode; text: string }
interface Tier {
  eyebrow: string;
  name: string;
  price: string;
  sub: string;
  features: Feature[];
  featured?: boolean;
  ctaLabel: string;
}

const TIERS: Tier[] = [
  {
    eyebrow: 'Einstieg',
    name: 'Probe-Analyse',
    price: '€ 499',
    sub: 'einmalig · zzgl. MwSt.',
    ctaLabel: 'Anfragen',
    features: [
      { icon: Icons.target,  text: '1 fokussiertes Themenfeld' },
      { icon: Icons.agent,   text: '3-Agenten Adversarial Swarm' },
      { icon: Icons.clock,   text: 'Lieferung in 48 Stunden' },
      { icon: Icons.check,   text: 'CEO-ready Report mit Quellen' },
    ],
  },
  {
    eyebrow: 'Kontinuierliches Mandat',
    name: 'S&O Strategie-\nFundament',
    price: '€ 1.999',
    sub: 'monatlich · zzgl. MwSt.',
    ctaLabel: 'Mandat anfragen',
    featured: true,
    features: [
      { icon: Icons.infinity, text: 'Unbegrenzte Analyse-Anfragen' },
      { icon: Icons.clock,    text: 'Lieferung unter 6 Stunden' },
      { icon: Icons.alert,    text: 'Echtzeit-Anomalie-Alerts' },
      { icon: Icons.agent,    text: 'Dedizierter Analyse-Kanal' },
    ],
  },
  {
    eyebrow: 'Enterprise',
    name: 'White-Label Deploy',
    price: 'Custom',
    sub: 'Ihre Hardware · Ihr Cluster',
    ctaLabel: 'Gespräch anfragen',
    features: [
      { icon: Icons.server,  text: 'On-Premise Deployment' },
      { icon: Icons.custom,  text: 'Custom Agent-Training' },
      { icon: Icons.check,   text: '24 / 7 SLA-Garantie' },
      { icon: Icons.agent,   text: 'White-Label Branding' },
    ],
  },
];

// ─── Single tier card ─────────────────────────────────────────────────────────
function TierCard({ tier, onContact }: { tier: Tier; onContact: () => void }) {
  const isFeatured = !!tier.featured;
  const navyText = isFeatured ? '#fff' : 'var(--blue)';
  const bodyText = isFeatured ? 'rgba(255,255,255,.8)' : 'var(--body)';
  const divider  = isFeatured ? 'rgba(255,255,255,.15)' : 'rgba(0,35,102,.08)';

  return (
    <motion.div
      variants={flyUp}
      className="mandate-card"
      style={{
        borderRadius: 22,
        padding: '32px 28px',
        background: isFeatured ? 'linear-gradient(160deg,#002366,#003B8E)' : '#fff',
        border: isFeatured ? 'none' : '0.5px solid rgba(0,35,102,.1)',
        boxShadow: isFeatured
          ? '0 8px 32px rgba(0,35,102,.3), 0 32px 80px rgba(0,35,102,.2)'
          : '0 2px 12px rgba(0,35,102,.05)',
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        marginTop: isFeatured ? -12 : 0,
      }}
    >
      {/* "Empfohlen" badge */}
      {isFeatured && (
        <div style={{
          position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--dark)', color: '#fff',
          fontSize: '.6rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase',
          padding: '4px 14px', borderRadius: 20, whiteSpace: 'nowrap',
        }}>
          Empfohlen
        </div>
      )}

      {/* Eyebrow */}
      <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: isFeatured ? 'rgba(255,255,255,.5)' : 'var(--secondary)', marginBottom: 10 }}>
        {tier.eyebrow}
      </div>

      {/* Name */}
      <div style={{ fontSize: '1.15rem', fontWeight: 700, color: isFeatured ? '#fff' : 'var(--dark)', lineHeight: 1.3, marginBottom: 20, whiteSpace: 'pre-line' }}>
        {tier.name}
      </div>

      {/* Price */}
      <div style={{ marginBottom: 6 }}>
        <span style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-.045em', color: isFeatured ? '#fff' : 'var(--dark)', lineHeight: 1 }}>
          {tier.price}
        </span>
      </div>
      <div style={{ fontSize: '.75rem', color: isFeatured ? 'rgba(255,255,255,.5)' : 'var(--secondary)', marginBottom: 24 }}>
        {tier.sub}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: divider, marginBottom: 24 }} />

      {/* Features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1, marginBottom: 28 }}>
        {tier.features.map(f => (
          <div key={f.text} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
              background: isFeatured ? 'rgba(255,255,255,.12)' : 'var(--blue-tint)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: navyText,
            }}>
              {f.icon}
            </div>
            <span style={{ fontSize: '.875rem', color: bodyText, lineHeight: 1.5, paddingTop: 6 }}>
              {f.text}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onContact}
        style={{
          width: '100%', padding: '13px',
          borderRadius: 12, border: 'none', cursor: 'pointer',
          background: isFeatured ? '#fff' : 'var(--blue)',
          color: isFeatured ? 'var(--blue)' : '#fff',
          fontSize: '.9375rem', fontWeight: 600, letterSpacing: '-.01em',
          transition: 'opacity .18s, transform .15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '.88')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        {tier.ctaLabel}
      </button>
    </motion.div>
  );
}

// ─── Mandate section ──────────────────────────────────────────────────────────
interface MandateProps { onContact: () => void }

export default function Mandate({ onContact }: MandateProps) {
  return (
    <section
      id="mandate"
      style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'calc(var(--nav-h) + 80px) 48px 80px',
      }}
    >
      <div style={{ maxWidth: 1040, width: '100%' }}>

        {/* Notary Seal — trust anchor before pricing */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 56 }}
        >
          <NotarySeal />
        </motion.div>

        {/* Header */}
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.1)}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <motion.div variants={flyUp} style={{ marginBottom: 20 }}>
            <span className="pill pill-blue"><span className="pill-dot"/>Das S&amp;O Mandat</span>
          </motion.div>
          <motion.h2 variants={flyUp} style={{
            fontSize: 'clamp(2.4rem,5vw,4.2rem)',
            fontWeight: 800, letterSpacing: '-.045em', lineHeight: 1.0,
            color: 'var(--dark)', marginBottom: 14,
          }}>
            Ihr Strategie-Fundament.
          </motion.h2>
          <motion.p variants={flyUp} style={{ fontSize: '1rem', color: 'var(--body)', maxWidth: 460, margin: '0 auto' }}>
            Persönlich. Präzise. Maximal vier aktive Mandate.
          </motion.p>
        </motion.div>

        {/* Scarcity strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
          className="scarcity"
          style={{ maxWidth: 640, margin: '0 auto 48px', justifyContent: 'center' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 1L11.5 7H17L12.5 10.5L14 17L9 13L4 17L5.5 10.5L1 7H6.5L9 1Z" fill="var(--amber)"/>
          </svg>
          Aktuell 1 von 4 Retainer-Plätzen verfügbar — Erstgespräch kostenlos
        </motion.div>

        {/* Grand Slam value stack */}
        <GrandSlamStack />

        {/* Ergebnis-Garantie */}
        <Guarantee />

        {/* Value grid — 3 tier cards */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.14, 0.05)}
          className="mandate-grid"
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            gap: 20, alignItems: 'start',
            marginBottom: 36,
          }}
        >
          {TIERS.map(t => <TierCard key={t.name} tier={t} onContact={onContact} />)}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ textAlign: 'center', fontSize: '.75rem', color: 'var(--secondary)' }}
        >
          Alle Angebote zzgl. MwSt. · NDA beim Erstgespräch · Antwort in &lt;24h
        </motion.p>

      </div>
    </section>
  );
}
