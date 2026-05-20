import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const MAX_EUR  = 15420;
const MAX_PCT  = 82;
const MAX_SRC  = 247;

function fmtEur(n: number) {
  return '€ ' + Math.round(n).toLocaleString('de-DE');
}

// ─── Animated stat badge (appears after number fills) ─────────────────────────
interface BadgeProps { val: string; label: string; color?: string }
function Badge({ val, label, color = 'var(--blue)' }: BadgeProps) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16, padding: '18px 24px',
      border: '0.5px solid rgba(0,35,102,.1)',
      boxShadow: '0 2px 12px rgba(0,35,102,.05)',
      textAlign: 'center', minWidth: 120,
    }}>
      <div style={{
        fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-.04em',
        lineHeight: 1, color, marginBottom: 5,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {val}
      </div>
      <div style={{ fontSize: '.7rem', fontWeight: 600, color: 'var(--secondary)', letterSpacing: '.04em' }}>
        {label}
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function ValueCounter() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Map scroll → raw values
  const rawEur = useTransform(scrollYProgress, [0.04, 0.82], [0, MAX_EUR]);
  const rawPct = useTransform(scrollYProgress, [0.08, 0.82], [0, MAX_PCT]);
  const rawSrc = useTransform(scrollYProgress, [0.08, 0.82], [0, MAX_SRC]);

  // Spring smoothing — tuned for buttery mobile touch-scroll
  const springEur = useSpring(rawEur, { stiffness: 55, damping: 22, mass: 0.7 });
  const springPct = useSpring(rawPct, { stiffness: 55, damping: 22, mass: 0.7 });
  const springSrc = useSpring(rawSrc, { stiffness: 55, damping: 22, mass: 0.7 });

  const [eur, setEur] = useState(0);
  const [pct, setPct] = useState(0);
  const [src, setSrc] = useState(0);

  useMotionValueEvent(springEur, 'change', (v) => setEur(v));
  useMotionValueEvent(springPct, 'change', (v) => setPct(v));
  useMotionValueEvent(springSrc, 'change', (v) => setSrc(v));

  // Number entrance / exit scale + opacity
  const numScale   = useTransform(scrollYProgress, [0, 0.08, 0.88, 1], [0.86, 1, 1, 0.86]);
  const numOpacity = useTransform(scrollYProgress, [0, 0.08, 0.88, 1], [0,    1, 1, 0   ]);

  // Stats + copy fade in mid-scroll
  const lowerOpacity = useTransform(scrollYProgress, [0.28, 0.5], [0, 1]);

  // Thin progress rail at bottom of sticky panel
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="value"
      ref={ref}
      style={{ minHeight: '280vh', position: 'relative' }}
    >
      {/* ── Sticky viewport ── */}
      <div style={{
        position: 'sticky',
        top: 'var(--nav-h)',
        height: `calc(100vh - var(--nav-h))`,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 32px',
        overflow: 'hidden',
      }}>

        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,31,63,.05), transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} aria-hidden />

        {/* ── Eyebrow ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: 28, textAlign: 'center' }}
        >
          <span className="pill pill-blue"><span className="pill-dot" />Finanzieller Hebel</span>
        </motion.div>

        {/* ── Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.8vw, 3rem)',
            fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.08,
            color: 'var(--dark)', margin: 0,
          }}>
            Geld, das Sie aktuell<br />
            <span style={{ color: 'var(--blue)' }}>auf dem Tisch liegen lassen.</span>
          </h2>
        </motion.div>

        {/* ── THE NUMBER ── */}
        <motion.div
          style={{ scale: numScale, opacity: numOpacity, textAlign: 'center' }}
        >
          <div
            aria-live="polite"
            aria-label={`${fmtEur(eur)} identifiziertes Optimierungspotenzial`}
            style={{
              fontSize: 'clamp(3rem, 14vw, 9.5rem)',
              fontWeight: 800,
              letterSpacing: '-.045em',
              lineHeight: 1,
              color: '#001F3F',
              fontVariantNumeric: 'tabular-nums',
              fontFeatureSettings: '"tnum" 1',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            {fmtEur(eur)}
          </div>
        </motion.div>

        {/* ── Subtext ── */}
        <motion.p
          style={{
            opacity: numOpacity,
            fontSize: '.875rem', color: 'var(--secondary)', lineHeight: 1.6,
            maxWidth: 380, textAlign: 'center',
            margin: '20px auto 52px',
          }}
        >
          Identifiziertes Optimierungspotenzial für eine Muster-GmbH.
        </motion.p>

        {/* ── Stat badges ── */}
        <motion.div
          style={{
            opacity: lowerOpacity,
            display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <Badge val={`${Math.round(pct)} %`} label="Zeitersparnis Ø" color="var(--blue)" />
          <Badge val={`${Math.round(src)}+`}  label="Quellen geprüft" color="#34AADC"    />
          <Badge val="3×"                      label="ROI im Quartal"  color="var(--green)" />
        </motion.div>

        {/* ── Copy ── */}
        <motion.p
          style={{
            opacity: lowerOpacity,
            maxWidth: 480, textAlign: 'center',
            fontSize: '.9375rem', lineHeight: 1.7, color: 'var(--body)',
            margin: 0,
          }}
        >
          Unser Swarm-Auditor durchleuchtet Ihre Daten tiefer als jeder
          menschliche Berater. Das Ergebnis ist schwarz auf weiß —
          mit vollständiger Quellenangabe.
        </motion.p>

        {/* ── Scroll progress rail ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 2, background: 'rgba(0,35,102,.06)',
        }}>
          <motion.div style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--blue), #34AADC)',
            scaleX: railScale,
            transformOrigin: 'left center',
          }} />
        </div>

        {/* ── Scroll hint (fades out quickly) ── */}
        <motion.div
          style={{
            position: 'absolute', bottom: 28,
            opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          }}
        >
          <span style={{ fontSize: '.7rem', color: 'var(--secondary)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
            Scrollen
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 32, background: 'linear-gradient(180deg,rgba(0,35,102,.35),transparent)' }}
          />
        </motion.div>

      </div>
    </section>
  );
}
