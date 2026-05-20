import { useScroll, useTransform, motion } from 'framer-motion';

interface NavProps {
  sections: { id: string; label: string }[];
  activeSection: number;
  onJump: (index: number) => void;
}

export default function Nav({ sections, activeSection, onJump }: NavProps) {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 40], [0, 0.12]);
  const bgBlur        = useTransform(scrollY, [0, 60], [0.8, 0.95]);

  // Only 3 text links — keeps nav uncluttered
  const NAV_LINKS = [
    { label: 'Start',        idx: 0 },
    { label: 'Wer wir sind', idx: 1 },
    { label: 'Anfrage',      idx: sections.length - 1 },
  ];

  return (
    <motion.nav
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 'var(--nav-h)', zIndex: 300,
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '0 36px',
        gap: 24,
      }}
    >
      {/* Animated background layer */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, zIndex: -1,
          background: `rgba(255,255,255,${bgBlur.get()})`,
          borderBottom: `0.5px solid rgba(0,0,0,${borderOpacity.get()})`,
        }}
      />

      {/* Left — 3 text links */}
      <div className="desk-only" style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {NAV_LINKS.map(link => (
          <button
            key={link.label}
            onClick={() => onJump(link.idx)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '.8125rem',
              fontWeight: activeSection === link.idx ? 600 : 400,
              color: activeSection === link.idx ? 'var(--dark)' : 'var(--body)',
              transition: 'color .15s, font-weight .15s',
              letterSpacing: '-.01em',
            }}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Center — wordmark */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={() => {
            window.location.hash = '';
            setTimeout(() => onJump(0), 50);
          }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: 0, userSelect: 'none',
            fontSize: '1rem', fontWeight: 800,
            letterSpacing: '-.03em', color: 'var(--dark)',
            lineHeight: 1,
          }}
        >
          S&amp;O Labs
        </button>
      </div>

      {/* Right — CTA */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <motion.button
          className="btn-primary"
          style={{ fontSize: '.8125rem', padding: '8px 18px' }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onJump(sections.length - 1)}
        >
          Session anfragen →
        </motion.button>
      </div>
    </motion.nav>
  );
}
