import { motion } from 'framer-motion';

interface SideDotsProps {
  count:  number;
  active: number;
  labels: string[];
  onJump: (i: number) => void;
}

export default function SideDots({ count, active, labels, onJump }: SideDotsProps) {
  return (
    <div
      className="desk-only"
      style={{
        position: 'fixed', right: 20, top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 250,
      }}
    >
      {/* Pill container (Glassmorphism) */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 10,
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        borderRadius: 24,
        padding: '14px 10px',
        border: '0.5px solid var(--glass-border)',
        boxShadow: '0 2px 16px rgba(0,0,0,.08)',
      }}>
        {Array.from({ length: count }, (_, i) => (
          <motion.button
            key={i}
            title={labels[i]}
            aria-label={`Zu Sektion ${i + 1}: ${labels[i]}`}
            aria-current={active === i ? 'page' : undefined}
            tabIndex={0}
            onClick={() => onJump(i)}
            animate={{
              height:          active === i ? 28 : 8,
              backgroundColor: active === i ? '#1d1d1f' : 'rgba(0,0,0,0.22)',
              opacity:         active === i ? 1 : 0.55,
            }}
            whileHover={{
              height:          active === i ? 28 : 14,
              backgroundColor: active === i ? '#1d1d1f' : 'rgba(0,0,0,0.45)',
              opacity:         1,
            }}
            transition={{ type: 'spring', stiffness: 340, damping: 36, mass: 0.5 }}
            style={{
              width: 4, borderRadius: 4,
              border: 'none', padding: 0, cursor: 'pointer',
              display: 'block', flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Active section label */}
      <motion.div
        key={active}
        initial={{ opacity: 0, x: 6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', right: 'calc(100% + 10px)',
          top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(29,29,31,0.88)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: '#fff',
          fontSize: '.6rem', fontWeight: 700,
          letterSpacing: '.08em', textTransform: 'uppercase',
          padding: '5px 10px', borderRadius: 8,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {labels[active]}
      </motion.div>
    </div>
  );
}
