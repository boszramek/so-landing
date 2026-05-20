import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { flyUp, staggerContainer, viewport } from './variants';

// ─── Graph data ───────────────────────────────────────────────────────────────
interface GNode { id: number; x: number; y: number; r: number; label: string; isHub?: boolean }

const NODES: GNode[] = [
  { id: 0,  x: 240, y: 200, r: 10, label: 'Kern-Wissen', isHub: true },
  { id: 1,  x: 240, y: 88,  r: 6,  label: 'Verträge'   },
  { id: 2,  x: 350, y: 142, r: 5,  label: 'DSGVO'      },
  { id: 3,  x: 378, y: 234, r: 5,  label: 'Marktdaten' },
  { id: 4,  x: 328, y: 320, r: 6,  label: 'Risiken'    },
  { id: 5,  x: 192, y: 340, r: 4,  label: 'Mandate'    },
  { id: 6,  x: 108, y: 278, r: 5,  label: 'Strategie'  },
  { id: 7,  x: 96,  y: 165, r: 4,  label: 'Trends'     },
  { id: 8,  x: 158, y: 88,  r: 5,  label: 'Compliance' },
  { id: 9,  x: 298, y: 44,  r: 3,  label: ''           },
  { id: 10, x: 422, y: 170, r: 3,  label: ''           },
  { id: 11, x: 410, y: 295, r: 3,  label: ''           },
  { id: 12, x: 68,  y: 225, r: 3,  label: ''           },
  { id: 13, x: 145, y: 48,  r: 3,  label: ''           },
  { id: 14, x: 308, y: 368, r: 3,  label: ''           },
  { id: 15, x: 195, y: 148, r: 4,  label: ''           },
  { id: 16, x: 288, y: 150, r: 4,  label: ''           },
  { id: 17, x: 294, y: 258, r: 4,  label: ''           },
  { id: 18, x: 186, y: 262, r: 4,  label: ''           },
];

const EDGES: [number, number][] = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],
  [0,15],[0,16],[0,17],[0,18],
  [1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,1],
  [1,9],[2,10],[3,10],[4,11],[5,14],[6,12],[8,13],
  [15,1],[15,8],[16,2],[17,4],[17,5],[18,6],[18,7],
];

// ─── Obsidian-style graph ─────────────────────────────────────────────────────
function ObsidianGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: true, amount: 0.4 });
  const [showEdges, setShowEdges] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setShowEdges(true), 520);
    return () => clearTimeout(t);
  }, [isInView]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
      style={{
        background: 'linear-gradient(155deg,#080d1a,#001840)',
        borderRadius: 24,
        padding: '28px 28px 20px',
        border: '0.5px solid rgba(60,100,200,.25)',
        boxShadow: '0 8px 48px rgba(0,10,60,.4), 0 2px 8px rgba(0,0,0,.3)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(80,130,255,.12) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}/>

      <svg
        ref={svgRef}
        viewBox="0 0 480 420"
        style={{ width: '100%', height: 'auto', position: 'relative', display: 'block' }}
      >
        <defs>
          <radialGradient id="tbHubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(60,100,255,.2)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>

        <ellipse cx="240" cy="200" rx="108" ry="96" fill="url(#tbHubGlow)"/>

        {/* Edges — fade in after nodes settle */}
        {EDGES.map(([a, b], i) => (
          <motion.line
            key={`e${a}-${b}`}
            x1={NODES[a].x} y1={NODES[a].y}
            x2={NODES[b].x} y2={NODES[b].y}
            stroke="rgba(80,140,255,.15)"
            strokeWidth="0.85"
            initial={{ opacity: 0 }}
            animate={{ opacity: showEdges ? 1 : 0 }}
            transition={{ delay: i * 0.022, duration: 0.45 }}
          />
        ))}

        {/* Nodes — fly in from opposite direction */}
        {NODES.map((node, i) => {
          const dx = (node.x - 240) * 1.7;
          const dy = (node.y - 200) * 1.7;
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, x: dx, y: dy }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{
                delay: 0.07 + i * 0.042,
                type: 'spring', stiffness: 200, damping: 22, mass: 0.8,
              }}
            >
              {/* Pulse ring on hub */}
              {node.isHub && (
                <motion.circle
                  cx={node.x} cy={node.y} r={node.r + 12}
                  fill="none" stroke="rgba(100,160,255,.35)" strokeWidth="1"
                  animate={{
                    r: [node.r + 12, node.r + 26, node.r + 12],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <circle
                cx={node.x} cy={node.y} r={node.r}
                fill={
                  node.isHub
                    ? '#4A8AFF'
                    : node.r >= 6
                      ? 'rgba(100,160,255,.78)'
                      : node.r >= 4
                        ? 'rgba(80,130,220,.58)'
                        : 'rgba(60,100,185,.45)'
                }
              />
              {node.label && (
                <text
                  x={node.x}
                  y={node.y + node.r + 12}
                  textAnchor="middle"
                  fontSize={node.isHub ? '8.5' : '7.5'}
                  fontWeight={node.isHub ? '700' : '500'}
                  fill={node.isHub ? 'rgba(190,215,255,.95)' : 'rgba(140,185,255,.68)'}
                  fontFamily="-apple-system, sans-serif"
                  letterSpacing="0.4"
                >
                  {node.label}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>

      <div style={{
        fontSize: '.6rem', fontWeight: 700, letterSpacing: '.14em',
        textTransform: 'uppercase', color: 'rgba(100,150,255,.35)',
        textAlign: 'right', paddingTop: 4, fontFamily: '-apple-system, sans-serif',
      }}>
        Third Brain · Knowledge Graph · Local DE
      </div>
    </motion.div>
  );
}

// ─── Agent icons ──────────────────────────────────────────────────────────────
function ArchivarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M6 5V4C6 3 6.9 2 8 2H12C13.1 2 14 3 14 4V5" stroke="currentColor" strokeWidth="1.3"/>
      <line x1="6" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="6" y1="13" x2="11" y2="13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function AuditorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.3"/>
      <line x1="12.5" y1="12.5" x2="17" y2="17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="6" y1="8.5" x2="11" y2="8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="8.5" y1="6" x2="8.5" y2="11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function StrategeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L12.2 7.2L18 7.6L14 11.2L15.2 17L10 14L4.8 17L6 11.2L2 7.6L7.8 7.2L10 2Z"
        stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── Agent cards ──────────────────────────────────────────────────────────────
const AGENTS = [
  {
    num: '01',
    name: 'Der Sammler',
    role: 'Liest & Sortiert',
    desc: 'Dieser Agent liest alle Ihre Dokumente, Belege und Zahlen — und sortiert sie intelligent. Wie ein extrem schneller Buchhalter.',
    color: 'var(--blue)',
    tint: 'var(--blue-tint)',
    Icon: ArchivarIcon,
    badge: 'LIEST ALLES',
    pct: 92,
  },
  {
    num: '02',
    name: 'Der Prüfer',
    role: 'Hinterfragt & Kontrolliert',
    desc: 'Ein zweiter Agent sucht gezielt nach Fehlern im ersten. Wie ein Kollege, der alles noch einmal gegencheckt. Das erhöht die Qualität massiv.',
    color: 'var(--amber)',
    tint: 'rgba(255,159,10,.08)',
    Icon: AuditorIcon,
    badge: 'PRÜFT NACH',
    pct: 67,
  },
  {
    num: '03',
    name: 'Der Ratgeber',
    role: 'Fasst zusammen & Empfiehlt',
    desc: 'Der dritte Agent nimmt alles zusammen und erstellt Ihnen einen klaren, verständlichen Bericht: Was können Sie konkret einsparen?',
    color: 'var(--green)',
    tint: 'rgba(26,158,63,.08)',
    Icon: StrategeIcon,
    badge: 'EMPFIEHLT',
    pct: 41,
  },
] as const;

function AgentCard({ agent, index }: { agent: typeof AGENTS[number]; index: number }) {
  const { Icon } = agent;
  return (
    <motion.div
      variants={flyUp}
      style={{
        background: '#fff',
        borderRadius: 16,
        padding: '18px 20px',
        border: '0.5px solid rgba(0,35,102,.08)',
        boxShadow: '0 2px 10px rgba(0,35,102,.05)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        {/* Icon */}
        <div style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: agent.tint,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: agent.color,
        }}>
          <Icon />
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{ fontSize: '.72rem', fontWeight: 700, color: 'var(--secondary)', letterSpacing: '.05em' }}>
              {agent.num}
            </span>
            <span style={{
              fontSize: '.6rem', fontWeight: 700, letterSpacing: '.1em',
              color: agent.color, background: agent.tint,
              padding: '2px 8px', borderRadius: 20,
            }}>
              {agent.badge}
            </span>
          </div>
          <div style={{ fontWeight: 700, fontSize: '.9375rem', color: 'var(--dark)', marginBottom: 2 }}>
            {agent.name}
          </div>
          <div style={{ fontSize: '.72rem', color: agent.color, fontWeight: 600, marginBottom: 8 }}>
            {agent.role}
          </div>
          <div style={{ fontSize: '.8125rem', color: 'var(--body)', lineHeight: 1.55, marginBottom: 12 }}>
            {agent.desc}
          </div>
          {/* Activity bar */}
          <div style={{ height: 3, borderRadius: 2, background: 'var(--surface)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${agent.pct}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.15, duration: 1.0, ease: [0.22,1,0.36,1] }}
              style={{ height: '100%', borderRadius: 2, background: agent.color }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Video placeholder ────────────────────────────────────────────────────────
function VideoPlaceholder({
  title, sub, delay = 0, full = false,
}: {
  title: string; sub: string; delay?: number; full?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease: [0.22,1,0.36,1], delay }}
      style={{
        aspectRatio: '16/9',
        borderRadius: 20,
        background: 'linear-gradient(155deg,#080d1a,#001840)',
        border: '0.5px solid rgba(60,100,200,.22)',
        boxShadow: '0 4px 32px rgba(0,10,60,.3)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        width: full ? '100%' : undefined,
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(80,130,255,.08) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}/>

      {/* Play button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'rgba(255,255,255,.1)',
          border: '1px solid rgba(255,255,255,.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', marginBottom: 20,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M6 4L14 9L6 14V4Z" fill="rgba(255,255,255,.85)"/>
        </svg>
      </motion.div>

      {/* Labels */}
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{
          fontSize: '.6rem', fontWeight: 700, letterSpacing: '.14em',
          textTransform: 'uppercase', color: 'rgba(100,150,255,.5)', marginBottom: 6,
        }}>
          {sub}
        </div>
        <div style={{
          fontSize: full ? '1.1rem' : '.9rem', fontWeight: 700,
          color: 'rgba(255,255,255,.85)',
          letterSpacing: '-.02em',
        }}>
          {title}
        </div>
      </div>

      {/* Corner badge */}
      <div style={{
        position: 'absolute', top: 14, right: 16,
        fontSize: '.58rem', fontWeight: 700, letterSpacing: '.12em',
        color: 'rgba(100,150,255,.45)', textTransform: 'uppercase',
      }}>
        Video · Placeholder
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function ThirdBrain() {
  return (
    <section
      id="brain"
      style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'calc(var(--nav-h) + 80px) 48px 80px',
        background: '#fff',
      }}
    >
      <div style={{ maxWidth: 1040, width: '100%' }}>

        {/* ── Header ── */}
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.1)}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <motion.div variants={flyUp} style={{ marginBottom: 20 }}>
            <span className="pill pill-blue"><span className="pill-dot"/>Wie unser KI-System funktioniert</span>
          </motion.div>
          <motion.h2 variants={flyUp} style={{
            fontSize: 'clamp(2.4rem,5vw,4.2rem)',
            fontWeight: 800, letterSpacing: '-.045em', lineHeight: 1.0,
            color: 'var(--dark)', marginBottom: 14,
          }}>
            Drei KI-Agenten.<br/>
            <span style={{ color: 'var(--blue)' }}>Ein klares Ergebnis.</span>
          </motion.h2>
          <motion.p variants={flyUp} style={{
            fontSize: '1rem', color: 'var(--body)',
            maxWidth: 560, margin: '0 auto', lineHeight: 1.65,
          }}>
            Stellen Sie sich drei sehr schnelle, sehr gründliche Mitarbeiter vor —
            die niemals schlafen, niemals eine Seite überspringen, und niemals etwas vergessen.
            Das ist unser KI-System. Es liest Ihre Daten, prüft die Ergebnisse und liefert
            Ihnen konkrete Einsparungspotenziale.
          </motion.p>
        </motion.div>

        {/* ── Graph + Agents grid ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 32, alignItems: 'start', marginBottom: 40,
        }}
          className="desk-only"
        >
          {/* Graph */}
          <ObsidianGraph />

          {/* Agent cards */}
          <motion.div
            initial="hidden" whileInView="show" viewport={viewport}
            variants={staggerContainer(0.14, 0.1)}
          >
            <motion.div variants={flyUp} style={{
              fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em',
              textTransform: 'uppercase', color: 'var(--secondary)',
              marginBottom: 16,
            }}>
              Die 3 KI-Agenten im Detail
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {AGENTS.map((agent, i) => (
                <AgentCard key={agent.num} agent={agent} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Mobile: stacked graph + agents ── */}
        <div className="mob-only" style={{ display: 'none', marginBottom: 40 }}>
          <ObsidianGraph />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
            {AGENTS.map((agent, i) => (
              <AgentCard key={agent.num} agent={agent} index={i} />
            ))}
          </div>
        </div>

        {/* ── Video placeholders row ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 20, marginBottom: 48,
        }}
          className="desk-only"
        >
          <VideoPlaceholder
            title="Obsidian Graph Animation"
            sub="Video · Geplant"
            delay={0}
          />
          <VideoPlaceholder
            title="Swarm Processing Visual"
            sub="Video · Geplant"
            delay={0.1}
          />
        </div>

        {/* ── Hardware sovereignty ── */}
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.1)}
          style={{ textAlign: 'center', marginBottom: 28 }}
        >
          <motion.div variants={flyUp} style={{ marginBottom: 16 }}>
            <span className="pill pill-blue"><span className="pill-dot"/>Datensicherheit einfach erklärt</span>
          </motion.div>
          <motion.h3 variants={flyUp} style={{
            fontSize: 'clamp(1.6rem,3.5vw,2.8rem)',
            fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.05,
            color: 'var(--dark)', marginBottom: 10,
          }}>
            Ihre Daten bleiben<br/>
            <span style={{ color: 'var(--blue)' }}>bei Ihnen.</span>
          </motion.h3>
          <motion.p variants={flyUp} style={{
            fontSize: '.9375rem', color: 'var(--body)',
            maxWidth: 480, margin: '0 auto', lineHeight: 1.65,
          }}>
            Alles läuft auf unserer eigenen Hardware in Deutschland — nicht auf amerikanischen Servern
            wie bei ChatGPT oder Google. Ihre Dokumente verlassen niemals Ihren Perimeter.
            Einfach gesagt: Kein Fremder sieht Ihre Daten.
          </motion.p>
        </motion.div>

        <VideoPlaceholder
          title="Deutsche Server-Infrastruktur · Mac Studio Cluster"
          sub="Video · Geplant"
          delay={0.1}
          full
        />

        {/* ── Human-in-the-loop callout ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay: 0.15 }}
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 18,
            background: 'var(--blue-tint)',
            border: '0.5px solid var(--blue-border)',
            borderRadius: 16, padding: '20px 24px',
            marginTop: 32,
          }}
        >
          {/* Operator icon */}
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="6" r="3.5" stroke="white" strokeWidth="1.3"/>
              <path d="M3 18C3 14.7 6.1 12 10 12C13.9 12 17 14.7 17 18" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
              <circle cx="16" cy="10" r="1.5" fill="white" opacity=".6"/>
              <path d="M15.5 7.5L16 10L18 9" stroke="white" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '.9375rem', color: 'var(--dark)', marginBottom: 6 }}>
              Bo und Linus prüfen jeden Report persönlich.
            </div>
            <p style={{ fontSize: '.875rem', color: 'var(--body)', lineHeight: 1.6, margin: 0 }}>
              Die KI liefert die Rohdaten und Muster — aber wir, Bo und Linus, schauen danach
              selbst drüber, bevor Sie irgendetwas sehen.{' '}
              <strong style={{ color: 'var(--dark)' }}>Kein Report verlässt uns ungeprüft.</strong>{' '}
              Sie bekommen keine Maschinen-Ausgabe — Sie bekommen eine menschlich geprüfte Analyse.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
