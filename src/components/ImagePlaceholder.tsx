import { motion } from 'framer-motion';

type Variant = 'server' | 'dataflow' | 'office';

interface Props {
  variant: Variant;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

function ServerSVG() {
  const racks = [0, 1, 2, 3];
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 220" fill="none">
      {/* Background */}
      <rect width="320" height="220" fill="#F8F9FC"/>
      {/* Grid */}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 36} x2="320" y2={i * 36} stroke="rgba(0,35,102,.05)" strokeWidth="1"/>
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="220" stroke="rgba(0,35,102,.05)" strokeWidth="1"/>
      ))}

      {/* Server racks */}
      {racks.map(i => (
        <g key={i} transform={`translate(${40 + i * 62}, 30)`}>
          {/* Rack body */}
          <rect x="0" y="0" width="44" height="160" rx="4" fill="#EEF2FA" stroke="rgba(0,35,102,.12)" strokeWidth="0.8"/>
          {/* Rack slots */}
          {Array.from({ length: 8 }, (_, j) => (
            <g key={j}>
              <rect x="4" y={8 + j * 18} width="36" height="13" rx="2" fill={j % 3 === 0 ? 'rgba(0,35,102,.1)' : 'rgba(0,35,102,.04)'} stroke="rgba(0,35,102,.1)" strokeWidth="0.5"/>
              {/* LED indicator */}
              <circle cx="10" cy={14.5 + j * 18} r="1.8" fill={j % 4 === 1 ? '#30D158' : 'rgba(0,35,102,.2)'}/>
            </g>
          ))}
          {/* Connection lines */}
          {i < 3 && (
            <line x1="44" y1="80" x2="62" y2="80" stroke="rgba(0,35,102,.2)" strokeWidth="1" strokeDasharray="3 2"/>
          )}
        </g>
      ))}

      {/* Central node */}
      <circle cx="160" cy="195" r="8" fill="rgba(0,35,102,.15)" stroke="#002366" strokeWidth="1.2"/>
      <circle cx="160" cy="195" r="4" fill="#002366" opacity=".5"/>

      {/* Bottom label */}
      <text x="160" y="215" textAnchor="middle" fontSize="9" fill="rgba(0,35,102,.35)" fontFamily="-apple-system, sans-serif" letterSpacing="1.5" fontWeight="600">
        PRIVATE CLUSTER · DE
      </text>
    </svg>
  );
}

function DataFlowSVG() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 220" fill="none">
      <rect width="320" height="220" fill="#F8F9FC"/>

      {/* Flow curves */}
      <path d="M 20 110 C 80 40, 140 180, 200 110 S 280 40, 300 80"
        stroke="rgba(0,35,102,.12)" strokeWidth="2" fill="none"/>
      <path d="M 20 130 C 80 60, 140 200, 200 130 S 280 60, 300 100"
        stroke="rgba(0,35,102,.08)" strokeWidth="1.5" fill="none"/>
      <path d="M 20 90 C 80 20, 140 160, 200 90 S 280 20, 300 60"
        stroke="rgba(0,35,102,.06)" strokeWidth="1" fill="none"/>

      {/* Nodes */}
      {[
        { cx: 20,  cy: 110 }, { cx: 80,  cy: 72  }, { cx: 140, cy: 148 },
        { cx: 200, cy: 110 }, { cx: 260, cy: 72  }, { cx: 300, cy: 80  },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r="10" fill="rgba(0,35,102,.07)" stroke="rgba(0,35,102,.2)" strokeWidth="1"/>
          <circle cx={n.cx} cy={n.cy} r="4"  fill="#002366" opacity=".4"/>
        </g>
      ))}

      {/* Data packets (animated via CSS) */}
      <circle cx="0" cy="0" r="4" fill="#002366" opacity=".7">
        <animateMotion dur="3s" repeatCount="indefinite"
          path="M 20 110 C 80 40, 140 180, 200 110 S 280 40, 300 80"/>
      </circle>
      <circle cx="0" cy="0" r="3" fill="#1A9E3F" opacity=".6">
        <animateMotion dur="4.5s" repeatCount="indefinite" begin="1.5s"
          path="M 20 130 C 80 60, 140 200, 200 130 S 280 60, 300 100"/>
      </circle>

      <text x="160" y="213" textAnchor="middle" fontSize="9" fill="rgba(0,35,102,.35)"
        fontFamily="-apple-system, sans-serif" letterSpacing="1.5" fontWeight="600">
        DATEN-ROUTING · AES-256
      </text>
    </svg>
  );
}

function OfficeSVG() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 320 220" fill="none">
      <rect width="320" height="220" fill="#F8F9FC"/>

      {/* Abstract architectural lines — premium office */}
      {/* Floor line */}
      <line x1="0" y1="170" x2="320" y2="170" stroke="rgba(0,35,102,.08)" strokeWidth="1"/>
      {/* Window grid */}
      <rect x="40" y="30" width="100" height="120" rx="2" fill="none" stroke="rgba(0,35,102,.1)" strokeWidth="1"/>
      {[1,2,3,4].map(i => <line key={`wh${i}`} x1="40" y1={30+i*24} x2="140" y2={30+i*24} stroke="rgba(0,35,102,.07)" strokeWidth="0.8"/>)}
      {[1,2].map(i => <line key={`wv${i}`} x1={40+i*33} y1="30" x2={40+i*33} y2="150" stroke="rgba(0,35,102,.07)" strokeWidth="0.8"/>)}

      {/* Monitor */}
      <rect x="180" y="80" width="90" height="60" rx="4" fill="rgba(0,35,102,.06)" stroke="rgba(0,35,102,.15)" strokeWidth="1"/>
      <rect x="185" y="85" width="80" height="50" rx="2" fill="rgba(0,35,102,.04)"/>
      {/* Screen content lines */}
      {[0,1,2,3].map(i => <line key={i} x1="190" y1={93+i*10} x2={220+i*5} y2={93+i*10} stroke="rgba(0,35,102,.2)" strokeWidth="1.5"/>)}
      {/* Monitor stand */}
      <rect x="220" y="140" width="10" height="10" rx="1" fill="rgba(0,35,102,.1)"/>
      <rect x="210" y="150" width="30" height="3" rx="1.5" fill="rgba(0,35,102,.1)"/>

      {/* Desk */}
      <rect x="160" y="168" width="140" height="4" rx="2" fill="rgba(0,35,102,.12)"/>

      {/* Ambient glow */}
      <ellipse cx="160" cy="110" rx="60" ry="40" fill="rgba(0,35,102,.03)"/>

      <text x="160" y="213" textAnchor="middle" fontSize="9" fill="rgba(0,35,102,.35)"
        fontFamily="-apple-system, sans-serif" letterSpacing="1.5" fontWeight="600">
        S&amp;O INTELLIGENCE · MÜNCHEN
      </text>
    </svg>
  );
}

const SVGS: Record<Variant, React.FC> = { server: ServerSVG, dataflow: DataFlowSVG, office: OfficeSVG };

export default function ImagePlaceholder({ variant, width = '100%', height = 220, style }: Props) {
  const SVGComponent = SVGS[variant];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width, height,
        borderRadius: 16,
        overflow: 'hidden',
        border: '0.5px solid rgba(0,35,102,.1)',
        ...style,
      }}
    >
      <SVGComponent />
    </motion.div>
  );
}
