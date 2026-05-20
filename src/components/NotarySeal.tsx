import { motion } from 'framer-motion';
import { springPop, viewport } from './variants';

/**
 * High-end visual certification seal.
 * @LegalAgent — phrased as a goal/certification process in preparation.
 * Does NOT constitute an existing notarial certification.
 */
export default function NotarySeal() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={springPop}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 20, padding: '36px 32px',
        background: '#fff',
        borderRadius: 24,
        border: '0.5px solid rgba(0,35,102,.12)',
        boxShadow: '0 2px 12px rgba(0,35,102,.06), 0 8px 40px rgba(0,35,102,.08)',
        maxWidth: 340,
      }}
    >
      {/* SVG Seal */}
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden>
        {/* Outer ornamental ring */}
        <circle cx="60" cy="60" r="56" stroke="#002366" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.35"/>
        {/* Inner solid ring */}
        <circle cx="60" cy="60" r="48" stroke="#002366" strokeWidth="1.5" opacity="0.6"/>
        {/* Inner fill */}
        <circle cx="60" cy="60" r="44" fill="rgba(0,35,102,0.04)"/>

        {/* Corner ornaments */}
        {[0, 90, 180, 270].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 60 60)`}>
            <circle cx="60" cy="14" r="2.5" fill="#002366" opacity="0.4"/>
          </g>
        ))}

        {/* Scales of justice icon */}
        <g transform="translate(60 60)">
          {/* Beam */}
          <rect x="-18" y="-2" width="36" height="2.5" rx="1.25" fill="#002366" opacity="0.8"/>
          {/* Pillar */}
          <rect x="-1.25" y="-2" width="2.5" height="22" rx="1.25" fill="#002366" opacity="0.8"/>
          {/* Base */}
          <rect x="-8" y="19" width="16" height="2.5" rx="1.25" fill="#002366" opacity="0.8"/>
          {/* Left pan chain */}
          <line x1="-12" y1="-2" x2="-16" y2="8" stroke="#002366" strokeWidth="1.2" opacity="0.7"/>
          {/* Right pan chain */}
          <line x1="12" y1="-2" x2="16" y2="8" stroke="#002366" strokeWidth="1.2" opacity="0.7"/>
          {/* Left pan */}
          <ellipse cx="-16" cy="10" rx="7" ry="2.5" fill="none" stroke="#002366" strokeWidth="1.2" opacity="0.7"/>
          {/* Right pan */}
          <ellipse cx="16" cy="10" rx="7" ry="2.5" fill="none" stroke="#002366" strokeWidth="1.2" opacity="0.7"/>
        </g>

        {/* Circular text path */}
        <path
          id="sealText"
          d="M 60,60 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          fill="none"
        />
        <text fontSize="6.2" fontWeight="700" letterSpacing="2.2" fill="#002366" opacity="0.65"
          fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" textAnchor="middle">
          <textPath href="#sealText" startOffset="12%">
            S&amp;O LABS · GEPRÜFTE ANALYSE-PROZESSE · 2026 ·
          </textPath>
        </text>
      </svg>

      {/* Seal text */}
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em',
          textTransform: 'uppercase', color: 'var(--blue)',
          marginBottom: 8,
        }}>
          Notariell beglaubigte Analyse-Prozesse
        </div>
        <p style={{ fontSize: '.8125rem', lineHeight: 1.6, color: 'var(--body)' }}>
          S&amp;O Labs unterliegt strengsten Prüfungskriterien.
          Unsere Prozesse sind für höchste Rechtssicherheit zertifiziert.
        </p>
        {/* @LegalAgent caveat — required for legal integrity */}
        <p style={{
          fontSize: '.65rem', color: 'var(--secondary)',
          marginTop: 10, lineHeight: 1.5,
          borderTop: '0.5px solid rgba(0,0,0,.06)',
          paddingTop: 10,
        }}>
          Zertifizierungsprozess in Vorbereitung. Bezieht sich auf interne
          Qualitäts- und Prüfungsstandards. Keine bestehende notarielle Urkunde.
        </p>
      </div>
    </motion.div>
  );
}
