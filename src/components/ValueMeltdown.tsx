import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import { flyUp, staggerContainer, viewport } from './variants';

// ─── Data ─────────────────────────────────────────────────────────────────────
const ITEMS = [
  { label: 'Verlorene Arbeitszeit',         amount: 6800 },
  { label: 'Steuerliche Blindspots',        amount: 4900 },
  { label: 'Manueller Verwaltungsaufwand',  amount: 3300 },
];
const TOTAL = 15000;

function fmtEur(n: number) {
  return '€ ' + Math.round(Math.max(0, n)).toLocaleString('de-DE');
}

// ─── Single cost line ─────────────────────────────────────────────────────────
function CostLine({
  label,
  springVal,
  original,
  isLast,
}: {
  label:     string;
  springVal: MotionValue<number>;
  original:  number;
  isLast:    boolean;
}) {
  const [val, setVal] = useState(original);
  useMotionValueEvent(springVal, 'change', (v) => setVal(v));

  const atZero = val <= 0.5;

  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 0',
      borderBottom: isLast ? 'none' : '0.5px solid rgba(0,0,0,.06)',
    }}>
      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <motion.div
          animate={{ backgroundColor: atZero ? '#1A9E3F' : '#F0F0F0' }}
          transition={{ duration: 0.4 }}
          style={{
            width: 28, height: 28, borderRadius: 8, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {atZero ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7L5.5 10L11.5 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 3V7M7 10V10.5" stroke="#C0392B" strokeWidth="1.6" strokeLinecap="round"/>
              <circle cx="7" cy="7" r="5.5" stroke="#C0392B" strokeWidth="1.2" opacity="0.4"/>
            </svg>
          )}
        </motion.div>
        <span style={{
          fontSize: '1rem', fontWeight: 600, color: '#1d1d1f',
          letterSpacing: '-.01em',
          textDecoration: atZero ? 'line-through' : 'none',
          opacity: atZero ? 0.4 : 1,
          transition: 'opacity 0.3s, text-decoration 0.3s',
        }}>
          {label}
        </span>
      </div>

      {/* Number — counts down */}
      <span style={{
        fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
        fontWeight: 800,
        letterSpacing: '-.04em',
        fontVariantNumeric: 'tabular-nums',
        color: atZero ? '#1A9E3F' : '#1d1d1f',
        transition: 'color 0.3s',
        minWidth: 120,
        textAlign: 'right',
      }}>
        {atZero ? '€ 0' : fmtEur(val)}
      </span>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function ValueMeltdown() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // ── Individual item countdowns — staggered, spring-smoothed ──
  // Spring spec matches task: stiffness:100, damping:20
  const rawItem0 = useTransform(scrollYProgress, [0.04, 0.36], [6800, 0]);
  const rawItem1 = useTransform(scrollYProgress, [0.26, 0.56], [4900, 0]);
  const rawItem2 = useTransform(scrollYProgress, [0.48, 0.76], [3300, 0]);

  const springCfg = { stiffness: 100, damping: 20 };
  const springItem0 = useSpring(rawItem0, springCfg);
  const springItem1 = useSpring(rawItem1, springCfg);
  const springItem2 = useSpring(rawItem2, springCfg);

  // ── Total counts UP and grows ──
  const rawTotal = useTransform(scrollYProgress, [0.56, 0.90], [0, TOTAL]);
  const springTotal = useSpring(rawTotal, springCfg);
  const [total, setTotal] = useState(0);
  useMotionValueEvent(springTotal, 'change', (v) => setTotal(v));

  // Total scale: grows from 1 → 1.45 as it approaches max
  const totalScale = useTransform(scrollYProgress, [0.58, 0.92], [1, 1.45]);

  // Total color: dark → navy → green
  const totalColor = useTransform(
    scrollYProgress,
    [0.58, 0.76, 0.93],
    ['#1d1d1f', '#002366', '#1A9E3F']
  );

  // Panel entrance (with 3D scroll effect)
  const panelY       = useTransform(scrollYProgress, [0, 0.07], [30, 0]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.07], [0, 1]);
  const panelRotateX = useTransform(scrollYProgress, [0, 0.15], [12, 0]);
  const panelZ = useTransform(scrollYProgress, [0, 0.15], [-50, 0]);

  // Progress rail
  const railScale = scrollYProgress;

  // "Savings label" that fades in alongside total
  const savingsOpacity = useTransform(scrollYProgress, [0.55, 0.72], [0, 1]);

  return (
    <section
      id="meltdown"
      ref={ref}
      style={{ minHeight: '260vh', position: 'relative' }}
    >
      <div style={{
        position: 'sticky',
        top: 'var(--nav-h)',
        height: 'calc(100vh - var(--nav-h))',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '24px 32px',
        overflow: 'hidden',
      }}>

        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '0%', left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,31,63,.04), transparent 65%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} aria-hidden />

        {/* ── Headline ── */}
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.08)}
          style={{ textAlign: 'center', marginBottom: 32 }}
        >
          <motion.div variants={flyUp} style={{ marginBottom: 14 }}>
            <span className="pill pill-blue"><span className="pill-dot" />Finanzieller Hebel</span>
          </motion.div>
          <motion.h2 variants={flyUp} style={{
            fontSize: 'clamp(1.6rem, 3.4vw, 2.6rem)',
            fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.08,
            color: '#1d1d1f', margin: 0,
          }}>
            Geld, das Sie aktuell<br />
            <span style={{ color: 'var(--blue)' }}>auf dem Tisch liegen lassen.</span>
          </motion.h2>
        </motion.div>

        {/* ── Balance sheet card ── */}
        <motion.div
          style={{
            opacity: panelOpacity,
            y: panelY,
            rotateX: panelRotateX,
            z: panelZ,
            width: '100%', maxWidth: 600,
            transformPerspective: 1200,
          }}
        >
          <div style={{
            background: '#fff',
            borderRadius: 24,
            border: '0.5px solid rgba(0,0,0,.08)',
            boxShadow: '0 4px 24px rgba(0,0,0,.06), 0 24px 60px rgba(0,0,0,.09)',
            padding: '28px 32px',
          }}>

            {/* Column headers */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '0 0 12px',
              borderBottom: '0.5px solid rgba(0,0,0,.08)',
              marginBottom: 4,
            }}>
              <span style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#86868b' }}>
                Kostenstelle
              </span>
              <span style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#86868b' }}>
                Jährlich
              </span>
            </div>

            {/* Line items */}
            <CostLine label={ITEMS[0].label} springVal={springItem0} original={ITEMS[0].amount} isLast={false} />
            <CostLine label={ITEMS[1].label} springVal={springItem1} original={ITEMS[1].amount} isLast={false} />
            <CostLine label={ITEMS[2].label} springVal={springItem2} original={ITEMS[2].amount} isLast={true} />

            {/* Der Strich */}
            <div style={{
              height: 4,
              background: 'linear-gradient(90deg, #001F3F, #34AADC)',
              borderRadius: 4,
              margin: '16px 0 24px',
            }} />

            {/* Total row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              {/* Left: label */}
              <motion.div style={{ opacity: savingsOpacity }}>
                <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#86868b', marginBottom: 3 }}>
                  S&amp;O Labs identifiziert für Sie
                </div>
                <div style={{ fontSize: '.8rem', color: '#424245' }}>
                  Optimierungspotenzial · Muster-GmbH
                </div>
              </motion.div>

              {/* Right: big growing number */}
              <motion.div style={{ scale: totalScale, transformOrigin: 'right center' }}>
                <motion.span style={{
                  color: totalColor,
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  fontWeight: 800,
                  letterSpacing: '-.045em',
                  fontVariantNumeric: 'tabular-nums',
                  display: 'block',
                  textAlign: 'right',
                }}>
                  {fmtEur(total)}
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* Sub-copy */}
          <motion.p style={{
            opacity: savingsOpacity,
            textAlign: 'center', marginTop: 18,
            fontSize: '.875rem', color: '#86868b', lineHeight: 1.6,
          }}>
            Unser Swarm-Auditor durchleuchtet Ihre Daten tiefer als jeder menschliche Berater.
            Das Ergebnis ist schwarz auf weiß.
          </motion.p>
        </motion.div>

        {/* Scroll progress rail */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 3, background: 'rgba(0,0,0,.06)',
        }}>
          <motion.div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #C0392B, #002366, #1A9E3F)',
            scaleX: railScale,
            transformOrigin: 'left center',
          }} />
        </div>
      </div>
    </section>
  );
}
