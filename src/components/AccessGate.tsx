import { useState } from 'react';
import { motion } from 'framer-motion';

const ACCESS_CODE = 'SO-2026';
const LS_KEY = 'so_access_v1';

// ─── Logo mark ────────────────────────────────────────────────────────────────
function LogoMark() {
  return (
    <div style={{ textAlign: 'center' }}>
      <picture>
        <source srcSet="/so-labs-logo.webp" type="image/webp" />
        <img
          src="/so-labs-logo.webp"
          alt="S&O Labs"
          width={72}
          height={72}
          fetchPriority="high"
          decoding="sync"
          style={{ display: 'block', margin: '0 auto 20px', objectFit: 'contain' }}
        />
      </picture>
      <div style={{
        fontSize: '.6rem', fontWeight: 700, letterSpacing: '.18em',
        textTransform: 'uppercase', color: 'rgba(0,35,102,.4)',
      }}>
        Vertrauliches Analyse-Mandat
      </div>
    </div>
  );
}

// ─── Gate ─────────────────────────────────────────────────────────────────────
interface Props { children: React.ReactNode }

export default function AccessGate({ children }: Props) {
  const [unlocked, setUnlocked] = useState(
    () => localStorage.getItem(LS_KEY) === '1'
  );
  const [code, setCode]   = useState('');
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim() === ACCESS_CODE) {
      localStorage.setItem(LS_KEY, '1');
      setUnlocked(true);
    } else {
      setError(true);
      setShakeKey(k => k + 1);
      setCode('');
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,35,102,.05), transparent 65%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%', maxWidth: 400,
          padding: '0 24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 0,
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22,1,0.36,1] }}
          style={{ marginBottom: 40 }}
        >
          <LogoMark />
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.7, ease: [0.22,1,0.36,1] }}
          style={{
            width: '100%',
            background: '#fff',
            borderRadius: 20,
            padding: '32px 28px',
            border: '0.5px solid rgba(0,35,102,.1)',
            boxShadow: '0 4px 24px rgba(0,35,102,.07), 0 20px 60px rgba(0,35,102,.08)',
          }}
        >
          <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <div style={{
              fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-.02em',
              color: '#1d1d1f', marginBottom: 6,
            }}>
              Zugang anfordern
            </div>
            <div style={{ fontSize: '.8125rem', color: '#86868b', lineHeight: 1.5 }}>
              Bitte geben Sie Ihren persönlichen Zugangscode ein.
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Shake wrapper on wrong code */}
            <motion.div
              key={shakeKey}
              animate={shakeKey > 0
                ? { x: [0, -8, 8, -6, 6, -3, 3, 0] }
                : { x: 0 }
              }
              transition={{ duration: 0.42, ease: 'easeInOut' }}
              style={{ marginBottom: 14 }}
            >
              <div style={{
                fontSize: '.72rem', fontWeight: 600, letterSpacing: '.04em',
                color: error ? '#c0392b' : 'rgba(0,35,102,.6)',
                marginBottom: 6, textTransform: 'uppercase',
              }}>
                {error ? 'Ungültiger Zugangscode' : 'Zugangscode'}
              </div>
              <input
                type="password"
                autoFocus
                autoComplete="off"
                spellCheck={false}
                placeholder="••••••••"
                value={code}
                onChange={e => { setCode(e.target.value); setError(false); }}
                style={{
                  width: '100%', padding: '13px 16px',
                  borderRadius: 12,
                  border: `1px solid ${error ? '#c0392b' : 'rgba(0,35,102,.15)'}`,
                  background: error ? 'rgba(192,57,43,.04)' : 'rgba(0,35,102,.03)',
                  fontSize: '1.05rem', letterSpacing: '0.2em',
                  fontFamily: 'inherit', color: '#1d1d1f',
                  outline: 'none',
                  transition: 'border-color .18s, background .18s',
                }}
                onFocus={e => {
                  if (!error) e.currentTarget.style.borderColor = '#002366';
                }}
                onBlur={e => {
                  if (!error) e.currentTarget.style.borderColor = 'rgba(0,35,102,.15)';
                }}
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: '100%', padding: '13px',
                borderRadius: 12, border: 'none', cursor: 'pointer',
                background: '#002366', color: '#fff',
                fontSize: '.9375rem', fontWeight: 600, letterSpacing: '-.01em',
                transition: 'background .18s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#003B8E')}
              onMouseLeave={e => (e.currentTarget.style.background = '#002366')}
            >
              Eintreten
            </motion.button>
          </form>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            marginTop: 28, textAlign: 'center',
            fontSize: '.68rem', lineHeight: 1.6, color: '#86868b',
          }}
        >
          S&amp;O Labs · Deutschland · Vertraulich<br/>
          Unbefugter Zugriff wird protokolliert.
        </motion.div>
      </motion.div>
    </div>
  );
}
