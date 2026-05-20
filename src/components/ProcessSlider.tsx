import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ─── Shared ───────────────────────────────────────────────────────────────────
function CheckIcon({ color }: { color: string }) {
  return (
    <svg className="check-icon" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="8" fill={color} fillOpacity="0.12"/>
      <path d="M5 9L7.5 11.5L13 6.5" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

const STEP_LABELS = ['Datensouveränität', 'Der Schwarm', 'Die Umsetzung'];

// Slide transition — shared between desktop and mobile
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.42, ease: EASE } },
  exit:  (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0, transition: { duration: 0.28, ease: EASE } }),
};

// ─── Desktop step dots ────────────────────────────────────────────────────────
function StepDots({ active, onJump }: { active: number; onJump: (i: number) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
      {STEP_LABELS.map((label, i) => (
        <motion.button
          key={label}
          title={label}
          aria-label={`Schritt ${i + 1}: ${label}`}
          aria-current={active === i ? 'step' : undefined}
          tabIndex={0}
          onClick={() => onJump(i)}
          animate={{
            scale: active === i ? 1.8 : 1,
            backgroundColor: active === i ? '#1d1d1f' : 'rgba(0,0,0,0.15)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          style={{ width: 6, height: 6, borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer' }}
        />
      ))}
    </div>
  );
}

// ─── Desktop step content (simple render, no AnimatePresence) ─────────────────

function StepDataSov() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', maxWidth: 960, width: '100%' }}>
      <div>
        <span className="pill pill-blue" style={{ marginBottom: 24, display: 'inline-flex' }}>
          <span className="pill-dot" /> Schritt 1 · Datensouveränität
        </span>
        <h2 style={{ fontSize: 'clamp(2rem,4vw,3.8rem)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.05, color: 'var(--dark)', marginBottom: 20 }}>
          Keine Public Cloud.<br/><span style={{ color: 'var(--blue)' }}>Niemals.</span>
        </h2>
        <p style={{ fontSize: '1.0625rem', lineHeight: 1.65, color: 'var(--body)', marginBottom: 28, maxWidth: 400 }}>
          Während ChatGPT Ihre Mandantendaten durch amerikanische Server schleust,
          verarbeitet unser Cluster alles lokal — auf dedizierter Apple-Hardware in Deutschland.
        </p>
        <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '20px 22px' }}>
          <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 12 }}>
            Was das für Sie bedeutet
          </div>
          <ul className="check-list">
            {['Null Haftungsrisiko bei Datenlecks','Rechtlich abgesichert in Deutschland','Session-Ende = vollständige Datenlöschung'].map(item => (
              <li key={item} className="check-item"><CheckIcon color="var(--blue)"/>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '28px 24px' }}>
        <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 16 }}>
          Private Hardware Cluster · DE
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          {[{ val: '4', label: 'Mac Studios', color: 'var(--blue)' },{ val: '100%', label: 'Lokal in DE', color: '#30D158' },{ val: 'DE', label: 'Standort', color: 'var(--dark)' },{ val: '0', label: 'Cloud-Kontakte', color: 'var(--dark)' }].map(m => (
            <div key={m.label} className="metric">
              <div className="metric-val" style={{ color: m.color }}>{m.val}</div>
              <div className="metric-lbl">{m.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ fontSize: '.75rem', color: 'var(--secondary)', marginBottom: 10 }}>Datenpfad</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.78rem', flexWrap: 'wrap' }}>
            {[{ text: 'Client', bg: 'var(--surface)', color: 'var(--dark)', border: 'rgba(0,0,0,.1)' }, null,
              { text: 'VPN-Tunnel', bg: '#EEF7EE', color: 'var(--green)', border: 'rgba(48,209,88,.3)' }, null,
              { text: 'Cluster', bg: '#EEF7EE', color: 'var(--green)', border: 'rgba(48,209,88,.3)' }].map((node, i) =>
              node === null
                ? <svg key={i} width="24" height="12" viewBox="0 0 24 12" fill="none"><path d="M0 6H17M13 2L17 6L13 10" stroke="#30D158" strokeWidth="1.5" strokeLinecap="round"/></svg>
                : <span key={node.text} style={{ background: node.bg, border: `0.5px solid ${node.border}`, borderRadius: 8, padding: '5px 10px', fontWeight: 500, color: node.color }}>{node.text}</span>
            )}
          </div>
          <div style={{ fontSize: '.72rem', color: 'var(--secondary)', marginTop: 8 }}>
            Kein amerikanischer Server. Keine Weitergabe an Dritte.
          </div>
        </div>
      </div>
    </div>
  );
}

function StepSchwarm() {
  const agents = [
    { num: '01', name: 'Analyst',    color: 'var(--blue)',  pulse: '1.8s',      pct: 85, note: 'Verarbeitet 247 Dokumente, Datenbanken, Marktdaten',  label: 'AKTIV',         gradient: 'linear-gradient(90deg,var(--blue),#34AADC)' },
    { num: '02', name: 'Auditor',    color: 'var(--amber)', pulse: '1.8s 0.6s', pct: 55, note: 'Falsifiziert 14 Claims, sucht Widersprüche & Bias',   label: 'PRÜFT',         gradient: 'linear-gradient(90deg,var(--amber),#FF6B00)' },
    { num: '03', name: 'Strategist', color: '#34AADC',      pulse: '1.8s 1.2s', pct: 28, note: 'Erstellt CEO-ready Handlungsempfehlung',              label: 'SYNTHETISIERT', gradient: 'linear-gradient(90deg,#34AADC,#BF5AF2)' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', maxWidth: 960, width: '100%' }}>
      <div style={{ background: 'var(--surface)', borderRadius: 20, padding: '28px 24px' }}>
        <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 20 }}>
          Adversarieller Schwarm · Live
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {agents.map(a => (
            <div key={a.name} style={{ background: '#fff', borderRadius: 14, padding: '14px 16px', border: `0.5px solid ${a.color}26` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '.78rem', fontWeight: 700, color: a.color }}>{a.num} · {a.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: a.color, display: 'inline-block', animation: `dot-pulse ${a.pulse} infinite` }} />
                  <span style={{ fontSize: '.72rem', color: a.color }}>{a.label}</span>
                </div>
              </div>
              <div style={{ fontSize: '.75rem', color: 'var(--secondary)', marginBottom: 8 }}>{a.note}</div>
              <div style={{ height: 3, borderRadius: 2, background: 'var(--surface)' }}>
                <div style={{ height: '100%', width: `${a.pct}%`, background: a.gradient, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <span className="pill pill-amber" style={{ marginBottom: 24, display: 'inline-flex' }}>
          <span className="pill-dot" /> Schritt 2 · Der Schwarm
        </span>
        <h2 style={{ fontSize: 'clamp(2rem,4vw,3.8rem)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.05, color: 'var(--dark)', marginBottom: 20 }}>
          Findet, was<br/><span style={{ color: 'var(--blue)' }}>Menschen übersehen.</span>
        </h2>
        <p style={{ fontSize: '1.0625rem', lineHeight: 1.65, color: 'var(--body)', marginBottom: 28, maxWidth: 400 }}>
          Drei KI-Agenten arbeiten gegeneinander — nicht miteinander. Der Auditor sucht
          aktiv nach Fehlern in der Primäranalyse. Adversarielle Validierung statt Groupthink.
        </p>
        <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '20px 22px' }}>
          <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 12 }}>
            Was das für den CEO bedeutet
          </div>
          <ul className="check-list">
            {['Kein Confirmation Bias in Analyse-Ergebnissen','Ø 94% Konfidenz-Score durch Triple-Validierung','Klickbare Quellen — jede Aussage belegbar'].map(item => (
              <li key={item} className="check-item"><CheckIcon color="var(--amber)"/>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StepUmsetzung() {
  const trail = [
    { time: '14:32', text: 'GmbH-Vertrag: Analyse start',  agent: 'Analyst',  agentColor: 'var(--blue)'  },
    { time: '14:34', text: '§15 GmbHG Konflikt erkannt',   agent: 'Auditor',  agentColor: 'var(--amber)' },
    { time: '14:42', text: 'Empfehlung: Klausel anpassen', agent: 'Strateg.', agentColor: '#34AADC'      },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center', maxWidth: 960, width: '100%' }}>
      <div>
        <span className="pill pill-green" style={{ marginBottom: 24, display: 'inline-flex' }}>
          <span className="pill-dot" /> Schritt 3 · Die Umsetzung
        </span>
        <h2 style={{ fontSize: 'clamp(2rem,4vw,3.8rem)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.05, color: 'var(--dark)', marginBottom: 20 }}>
          Automatisiert.<br/><span style={{ color: 'var(--blue)' }}>Nachvollziehbar.</span>
        </h2>
        <p style={{ fontSize: '1.0625rem', lineHeight: 1.65, color: 'var(--body)', marginBottom: 28, maxWidth: 400 }}>
          Der Report landet direkt im Dashboard — priorisiert, quellbelegbar, mit konkreten
          nächsten Schritten. Kein Rauschen. Nur Entscheidungsgrundlagen.
        </p>
        <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '20px 22px' }}>
          <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 12 }}>
            Was das für den CEO bedeutet
          </div>
          <ul className="check-list">
            {['Analyse-Report in < 6 Stunden','Vollständiger Audit Trail mit PDF-Verlinkung','Echtzeit-Alert bei kritischen Anomalien'].map(item => (
              <li key={item} className="check-item"><CheckIcon color="var(--green)"/>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,.08),0 20px 60px rgba(0,0,0,.10)', border: '0.5px solid rgba(0,0,0,.07)' }}>
        <div style={{ background: '#f0f0f5', display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px', borderBottom: '0.5px solid rgba(0,0,0,.07)' }}>
          {['#FF5F57','#FEBC2E','#28C840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
          ))}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,.8)', border: '0.5px solid rgba(0,0,0,.1)', borderRadius: 6, padding: '2px 14px', fontSize: '.72rem', color: 'var(--secondary)' }}>
              s-o-labs.app
            </div>
          </div>
        </div>
        <div style={{ background: '#fff', padding: '16px 18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
            {[{ val: '94%', label: 'Konfidenz', color: 'var(--blue)' },{ val: '247', label: 'Quellen', color: 'var(--dark)' },{ val: '<6h', label: 'Lieferzeit', color: 'var(--green)' }].map(m => (
              <div key={m.label} className="metric" style={{ padding: '11px 14px' }}>
                <div className="metric-val" style={{ color: m.color, fontSize: '1.3rem' }}>{m.val}</div>
                <div className="metric-lbl">{m.label}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: 6, padding: '0 4px' }}>
            Audit Trail
          </div>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '0.5px solid rgba(0,0,0,.06)' }}>
            {trail.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 65px 32px', alignItems: 'center', padding: '9px 14px', borderBottom: i < trail.length - 1 ? '0.5px solid rgba(0,0,0,.05)' : 'none', fontSize: '.8rem' }}>
                <span style={{ color: 'var(--secondary)' }}>{row.time}</span>
                <span style={{ color: 'var(--dark)' }}>{row.text}</span>
                <span style={{ color: row.agentColor, fontWeight: 600, fontSize: '.75rem' }}>{row.agent}</span>
                <span style={{ color: 'var(--blue)', cursor: 'pointer' }}>↗</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile compact step data ─────────────────────────────────────────────────
interface MobileStep {
  pill: string;
  pillClass: string;
  color: string;
  headline: React.ReactNode;
  body: string;
  items: string[];
  stats: { val: string; label: string }[];
}

const MOBILE_STEPS: MobileStep[] = [
  {
    pill: 'Schritt 1 · Datensouveränität',
    pillClass: 'pill-blue',
    color: 'var(--blue)',
    headline: <>Keine Public Cloud.<br /><span style={{ color: 'var(--blue)' }}>Niemals.</span></>,
    body: 'Unser Cluster verarbeitet alles lokal — auf dedizierter Apple-Hardware in Deutschland. Kein AWS. Kein Azure. Kein Datenleck.',
    items: ['Null Haftungsrisiko', 'Rechtlich abgesichert in Deutschland', 'Session-Ende = Datenlöschung'],
    stats: [{ val: '4', label: 'Mac Studios' }, { val: 'DE', label: 'Standort' }, { val: '0', label: 'Cloud-Kontakte' }],
  },
  {
    pill: 'Schritt 2 · Der Schwarm',
    pillClass: 'pill-amber',
    color: 'var(--amber)',
    headline: <>Findet, was<br /><span style={{ color: 'var(--blue)' }}>Menschen übersehen.</span></>,
    body: 'Drei KI-Agenten arbeiten adversariell gegeneinander. Der Auditor sucht aktiv nach Fehlern in der Primäranalyse. Kein Groupthink.',
    items: ['Kein Confirmation Bias', 'Ø 94% Konfidenz-Score', 'Jede Aussage quellbelegbar'],
    stats: [{ val: '3', label: 'Agenten' }, { val: '94%', label: 'Konfidenz' }, { val: '247+', label: 'Quellen' }],
  },
  {
    pill: 'Schritt 3 · Die Umsetzung',
    pillClass: 'pill-green',
    color: 'var(--green)',
    headline: <>Automatisiert.<br /><span style={{ color: 'var(--blue)' }}>Nachvollziehbar.</span></>,
    body: 'Der Report landet direkt in Ihrem Dashboard — priorisiert, quellbelegbar, mit konkreten nächsten Schritten in unter 6 Stunden.',
    items: ['Report in < 6 Stunden', 'Vollständiger Audit Trail', 'Echtzeit-Alert bei Anomalien'],
    stats: [{ val: '<6h', label: 'Lieferzeit' }, { val: '100%', label: 'Belegbar' }, { val: '24/7', label: 'Monitoring' }],
  },
];

function MobileStepContent({ data }: { data: MobileStep }) {
  return (
    <div>
      <span className={`pill ${data.pillClass}`} style={{ marginBottom: 16, display: 'inline-flex' }}>
        <span className="pill-dot" />{data.pill}
      </span>
      <h2 style={{ fontSize: 'clamp(2rem, 9vw, 2.8rem)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.06, color: 'var(--dark)', margin: '14px 0 14px' }}>
        {data.headline}
      </h2>
      <p style={{ fontSize: '.9375rem', lineHeight: 1.65, color: 'var(--body)', marginBottom: 18 }}>
        {data.body}
      </p>
      <div style={{ background: 'var(--surface)', borderRadius: 14, padding: '14px 16px', marginBottom: 14 }}>
        <div style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: data.color, marginBottom: 10 }}>
          Was das für den CEO bedeutet
        </div>
        <ul className="check-list" style={{ gap: 8 }}>
          {data.items.map(item => (
            <li key={item} className="check-item">
              <CheckIcon color={data.color} />{item}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {data.stats.map(s => (
          <div key={s.label} className="metric" style={{ padding: '12px 14px' }}>
            <div className="metric-val" style={{ color: data.color, fontSize: '1.25rem' }}>{s.val}</div>
            <div className="metric-lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Nav buttons (shared layout) ─────────────────────────────────────────────
function NavBar({
  step, isMobile, onBack, onNext,
}: {
  step: number; isMobile: boolean;
  onBack: () => void; onNext: () => void;
}) {
  const isFirst = step === 0;
  const isLast  = step === 2;
  const pad     = isMobile ? '20px 20px 0' : '20px 48px 0';

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: pad, flexShrink: 0 }}>
      <motion.button
        aria-label="Vorheriger Schritt"
        tabIndex={0}
        whileTap={{ scale: 0.96 }}
        onClick={onBack}
        disabled={isFirst}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: '0.5px solid rgba(0,35,102,.2)',
          borderRadius: 50, padding: isMobile ? '10px 16px' : '10px 20px',
          fontSize: '.875rem', fontWeight: 600, color: 'var(--blue)',
          cursor: isFirst ? 'default' : 'pointer',
          opacity: isFirst ? 0 : 1, transition: 'opacity .2s',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M11 7H3M7 11L3 7L7 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
        Zurück
      </motion.button>

      <motion.span
        key={step}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        style={{ fontSize: '.75rem', color: 'var(--secondary)', letterSpacing: '.02em' }}
      >
        {STEP_LABELS[step]}
      </motion.span>

      <motion.button
        aria-label={isLast ? 'Zur Kontakt-Sektion springen' : 'Nächster Schritt'}
        tabIndex={0}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'var(--blue)', color: '#fff',
          borderRadius: 50, padding: isMobile ? '10px 16px' : '10px 22px',
          fontSize: '.875rem', fontWeight: 600,
          border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,35,102,.25)',
        }}
      >
        {isLast ? 'Das Mandat sehen' : 'Weiter'}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7H11M7 3L11 7L7 11" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </motion.button>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
interface ProcessSliderProps {
  onJump: (sectionIndex: number) => void;
}

export default function ProcessSlider({ onJump }: ProcessSliderProps) {
  const [step, setStep] = useState(0);
  const [dir,  setDir]  = useState(1);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  function go(next: number) {
    if (next === step) return;
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  function handleNext() {
    if (step < 2) go(step + 1);
    else onJump(8);
  }

  const contentPad = isMobile ? '0 20px' : '0 48px';

  return (
    <section
      id="process"
      style={{
        minHeight: '100vh',
        paddingTop: 'calc(var(--nav-h) + 32px)',
        paddingBottom: 48,
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '0 20px 24px', flexShrink: 0 }}>
        <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 12 }}>
          Wie es funktioniert
        </div>
        <StepDots active={step} onJump={go} />
      </div>

      {/* Sliding content area */}
      <div style={{ overflow: 'hidden', flex: 1, padding: contentPad }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ width: '100%' }}
            >
              {isMobile ? (
                <MobileStepContent data={MOBILE_STEPS[step]} />
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {step === 0 && <StepDataSov />}
                  {step === 1 && <StepSchwarm />}
                  {step === 2 && <StepUmsetzung />}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <NavBar
        step={step}
        isMobile={isMobile}
        onBack={() => go(step - 1)}
        onNext={handleNext}
      />
    </section>
  );
}
