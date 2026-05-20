import { useState } from 'react';
import { motion } from 'framer-motion';
import { flyUp, staggerContainer, viewport } from './variants';
import RequestAccess from './RequestAccess';
import FAQ from './FAQ';
import boPhoto from '../assets/bo-szramek.jpg';
import linusPhoto from '../assets/linus-osowski.jpg';

const LS_KEY = 'so_access_v1';
const ACCESS_CODE = 'SO-2026';

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function LandingNav({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 52,
      background: 'var(--glass-bg)',
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      borderBottom: '0.5px solid var(--glass-border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px',
    }}>
      <div style={{
        fontSize: '.85rem', fontWeight: 800,
        letterSpacing: '-.02em', color: 'var(--blue)',
      }}>
        S&amp;O Labs
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {[
          { label: 'Wie es funktioniert', id: 'how' },
          { label: 'Wer wir sind', id: 'team' },
          { label: 'FAQ', id: 'faq' },
        ].map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '.8125rem', fontWeight: 600, color: 'var(--body)',
              fontFamily: 'inherit', padding: '4px 0',
            }}
          >
            {label}
          </button>
        ))}
        <button
          onClick={onLoginClick}
          style={{
            background: 'var(--blue)', color: '#fff',
            border: 'none', borderRadius: 8, cursor: 'pointer',
            fontSize: '.8125rem', fontWeight: 700,
            padding: '7px 16px', fontFamily: 'inherit',
          }}
        >
          Einloggen
        </button>
      </div>
    </nav>
  );
}

// ─── Login modal ──────────────────────────────────────────────────────────────
function LoginModal({ onClose, onUnlock }: { onClose: () => void; onUnlock: () => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim() === ACCESS_CODE) {
      localStorage.setItem(LS_KEY, '1');
      onUnlock();
    } else {
      setError(true);
      setShakeKey(k => k + 1);
      setCode('');
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(6px)',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: '#fff', borderRadius: 20,
          padding: '36px 32px', width: '100%', maxWidth: 380,
          boxShadow: '0 20px 80px rgba(0,35,102,.2)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <picture>
            <source srcSet="/so-labs-logo.webp" type="image/webp" />
            <img src="/so-labs-logo.webp" alt="S&O Labs" width={52} height={52}
              style={{ margin: '0 auto 16px', display: 'block', objectFit: 'contain' }} />
          </picture>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--dark)', marginBottom: 6 }}>
            Zugangscode eingeben
          </div>
          <div style={{ fontSize: '.8125rem', color: 'var(--secondary)' }}>
            Zugang erhalten Sie nach Ihrer Anfrage.
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <motion.div
            key={shakeKey}
            animate={shakeKey > 0 ? { x: [0, -8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.42 }}
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
              placeholder="••••••••"
              value={code}
              onChange={e => { setCode(e.target.value); setError(false); }}
              style={{
                width: '100%', padding: '13px 16px', boxSizing: 'border-box',
                borderRadius: 12,
                border: `1px solid ${error ? '#c0392b' : 'rgba(0,35,102,.15)'}`,
                background: error ? 'rgba(192,57,43,.04)' : 'rgba(0,35,102,.03)',
                fontSize: '1.05rem', letterSpacing: '0.2em',
                fontFamily: 'inherit', color: '#1d1d1f', outline: 'none',
              }}
            />
          </motion.div>
          <button
            type="submit"
            style={{
              width: '100%', padding: '13px',
              borderRadius: 12, border: 'none', cursor: 'pointer',
              background: 'var(--blue)', color: '#fff',
              fontSize: '.9375rem', fontWeight: 600,
              fontFamily: 'inherit',
            }}
          >
            Eintreten
          </button>
        </form>
        <button
          onClick={() => scrollTo('zugang')}
          style={{
            width: '100%', marginTop: 12, padding: '10px',
            background: 'none', border: '0.5px solid rgba(0,35,102,.2)',
            borderRadius: 12, cursor: 'pointer',
            fontSize: '.8375rem', color: 'var(--blue)', fontWeight: 600,
            fontFamily: 'inherit',
          }}
          onMouseEnter={() => void 0}
        >
          Noch kein Zugangscode? Jetzt anfragen →
        </button>
      </motion.div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'calc(52px + 80px) 48px 80px',
      textAlign: 'center',
      background: '#fff',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 800, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,35,102,.04), transparent 65%)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} aria-hidden />
      <motion.div
        initial="hidden" animate="show"
        variants={staggerContainer(0.12)}
        style={{ maxWidth: 780, position: 'relative' }}
      >
        <motion.div variants={flyUp} style={{ marginBottom: 20 }}>
          <span className="pill pill-blue"><span className="pill-dot"/>KI-gestützte Steueroptimierung · Bochum</span>
        </motion.div>
        <motion.h1 variants={flyUp} style={{
          fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1.0,
          color: 'var(--dark)', marginBottom: 28,
        }}>
          Ihr Unternehmen zahlt<br/>
          <span style={{ color: 'var(--blue)' }}>wahrscheinlich zu viel</span><br/>
          Steuern.
        </motion.h1>
        <motion.p variants={flyUp} style={{
          fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', lineHeight: 1.7,
          color: 'var(--body)', maxWidth: 560, margin: '0 auto 40px',
        }}>
          Wir zeigen Ihnen in <strong>48 Stunden</strong>, wo Sie Geld verlieren —
          automatisiert, sicher und ohne Fachjargon.
        </motion.p>
        <motion.div variants={flyUp} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => scrollTo('zugang')}
            style={{
              padding: '15px 32px',
              background: 'var(--blue)', color: '#fff',
              border: 'none', borderRadius: 12, cursor: 'pointer',
              fontSize: '.9375rem', fontWeight: 700,
              fontFamily: 'inherit', letterSpacing: '-.01em',
            }}
          >
            Kostenlos anfragen →
          </button>
          <button
            onClick={() => scrollTo('how')}
            style={{
              padding: '15px 32px',
              background: 'var(--surface)', color: 'var(--dark)',
              border: '0.5px solid rgba(0,35,102,.12)', borderRadius: 12, cursor: 'pointer',
              fontSize: '.9375rem', fontWeight: 600,
              fontFamily: 'inherit',
            }}
          >
            Wie es funktioniert
          </button>
        </motion.div>

        <motion.div variants={flyUp} style={{
          marginTop: 56, display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap',
        }}>
          {[
            { val: '48 Std.', label: 'Analyse-Lieferzeit' },
            { val: '100%', label: 'DSGVO-konform' },
            { val: 'Kostenlos', label: 'Erstanfrage' },
          ].map(({ val, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--blue)', letterSpacing: '-.04em' }}>{val}</div>
              <div style={{ fontSize: '.75rem', color: 'var(--secondary)', fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Problem ──────────────────────────────────────────────────────────────────
function Problem() {
  const items = [
    {
      icon: '⏳',
      title: 'Steuerberater haben keine Zeit',
      body: 'Manuelle Detailanalysen sind aufwendig. Was nicht auffällt, wird nicht optimiert.',
    },
    {
      icon: '🔍',
      title: 'Potenziale bleiben verborgen',
      body: 'Viele Unternehmen zahlen jährlich tausende Euro zu viel — ohne es zu wissen.',
    },
    {
      icon: '📅',
      title: 'Analysen dauern zu lange',
      body: 'Klassische Beratung braucht Wochen und kostet entsprechend viel.',
    },
  ];

  return (
    <section style={{ padding: '100px 48px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.1)}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <motion.div variants={flyUp} style={{ marginBottom: 16 }}>
            <span className="pill pill-blue"><span className="pill-dot"/>Das Problem</span>
          </motion.div>
          <motion.h2 variants={flyUp} style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.05,
            color: 'var(--dark)',
          }}>
            Warum Unternehmen<br/>
            <span style={{ color: 'var(--blue)' }}>zu viel zahlen.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.1)}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
        >
          {items.map(({ icon, title, body }) => (
            <motion.div
              key={title}
              variants={flyUp}
              style={{
                background: '#fff', borderRadius: 18,
                padding: '28px 24px',
                border: '0.5px solid rgba(0,35,102,.08)',
                boxShadow: '0 2px 12px rgba(0,35,102,.05)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: 16 }}>{icon}</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--dark)', marginBottom: 10 }}>{title}</div>
              <div style={{ fontSize: '.875rem', color: 'var(--body)', lineHeight: 1.6 }}>{body}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Unterlagen schicken',
      body: 'Sie laden Ihre Buchhaltungsdaten, Belege und relevante Zahlen hoch. Sicher, verschlüsselt, direkt zu uns.',
    },
    {
      num: '02',
      title: 'Wir analysieren alles',
      body: 'Unsere Software prüft automatisch auf Optimierungspotenziale — gründlicher und schneller als jede manuelle Prüfung.',
    },
    {
      num: '03',
      title: 'Sie bekommen klare Ergebnisse',
      body: 'Ein verständlicher Report: Was kostet Sie Geld? Was können Sie ändern? Konkrete Zahlen, keine Floskeln.',
    },
  ];

  return (
    <section id="how" style={{ padding: '100px 48px', background: '#fff' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.1)}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <motion.div variants={flyUp} style={{ marginBottom: 16 }}>
            <span className="pill pill-blue"><span className="pill-dot"/>So funktioniert es</span>
          </motion.div>
          <motion.h2 variants={flyUp} style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.05, color: 'var(--dark)',
          }}>
            In 3 Schritten zu<br/>
            <span style={{ color: 'var(--blue)' }}>mehr Geld für Ihr Unternehmen.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.12)}
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          {steps.map(({ num, title, body }) => (
            <motion.div
              key={num}
              variants={flyUp}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 28,
                background: 'var(--surface)', borderRadius: 18,
                padding: '28px 32px',
                border: '0.5px solid rgba(0,35,102,.06)',
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: 'var(--blue)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '.8rem', fontWeight: 800, letterSpacing: '.02em',
              }}>
                {num}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--dark)', marginBottom: 8 }}>
                  {title}
                </div>
                <div style={{ fontSize: '.9375rem', color: 'var(--body)', lineHeight: 1.7 }}>
                  {body}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: 20,
            background: 'rgba(26,158,63,.04)',
            border: '0.5px solid rgba(26,158,63,.2)',
            borderRadius: 14, padding: '16px 24px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="9" cy="9" r="8" fill="rgba(26,158,63,.15)"/>
            <path d="M6 9L8 11L12 7" stroke="#1A9E3F" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <p style={{ margin: 0, fontSize: '.875rem', color: 'var(--dark)', lineHeight: 1.6 }}>
            <strong>Erste Kunden bereits erfolgreich beraten.</strong>{' '}
            Konkrete Einsparungen identifiziert — sprechen Sie uns gerne direkt darauf an.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────
function Team() {
  return (
    <section id="team" style={{ padding: '100px 48px', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.1)}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <motion.div variants={flyUp} style={{ marginBottom: 16 }}>
            <span className="pill pill-blue"><span className="pill-dot"/>Wer wir sind</span>
          </motion.div>
          <motion.h2 variants={flyUp} style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.05, color: 'var(--dark)',
            marginBottom: 20,
          }}>
            Zwei aus Bochum,<br/>
            <span style={{ color: 'var(--blue)' }}>die KI wirklich verstehen.</span>
          </motion.h2>
          <motion.p variants={flyUp} style={{
            fontSize: '1.0625rem', color: 'var(--body)', lineHeight: 1.7,
            maxWidth: 580, margin: '0 auto',
          }}>
            Wir sind 18 Jahre alt und keine Steuerberater. Aber wir wissen, was KI heute
            leisten kann — und setzen das konkret für Ihr Unternehmen ein.
          </motion.p>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 20, maxWidth: 600, margin: '0 auto 48px',
        }}>
          {[
            { name: 'Bo Szramek', role: 'KI-Automatisierung & Prozesse', photo: boPhoto, initials: 'Bo', color: 'var(--blue)' },
            { name: 'Linus Ossowski', role: 'KI-Analyse & Implementierung', photo: linusPhoto, initials: 'Li', color: '#34AADC' },
          ].map(({ name, role, photo, initials, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              style={{
                background: '#fff', borderRadius: 20,
                padding: '28px 24px',
                border: '0.5px solid rgba(0,35,102,.08)',
                boxShadow: '0 2px 12px rgba(0,35,102,.05)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                textAlign: 'center', gap: 14,
              }}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={photo}
                  alt={name}
                  style={{
                    width: 100, height: 100, borderRadius: '50%',
                    objectFit: 'cover',
                    border: `2px solid ${color}30`,
                    display: 'block',
                  }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: 30, height: 30, borderRadius: '50%',
                  background: color, color: '#fff',
                  fontSize: '.6rem', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #fff',
                }}>
                  {initials}
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--dark)', marginBottom: 4 }}>{name}</div>
                <div style={{ fontSize: '.78rem', color: 'var(--secondary)', lineHeight: 1.5 }}>18 Jahre · Bochum<br/>{role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            maxWidth: 700, margin: '0 auto',
            background: '#fff', borderRadius: 20,
            border: '0.5px solid rgba(0,35,102,.08)',
            padding: '28px 32px',
          }}
        >
          <p style={{
            margin: '0 0 16px', fontSize: '.9375rem', lineHeight: 1.7,
            color: 'var(--dark)', fontStyle: 'italic',
          }}>
            "Wir haben gesehen, wie viel Zeit und Geld Steueroptimierung unnötig kostet.
            Also haben wir eine Lösung gebaut, die das automatisiert — klar, schnell und
            ohne unnötigen Aufwand für Sie."
          </p>
          <div style={{ fontSize: '.78rem', color: 'var(--secondary)', fontWeight: 600 }}>
            — Bo &amp; Linus, S&amp;O Labs GbR
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function LandingFooter({ onLoginClick }: { onLoginClick: () => void }) {
  return (
    <footer style={{
      background: 'var(--blue)', color: 'rgba(255,255,255,.7)',
      padding: '48px 48px 36px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <button
            onClick={() => scrollTo('zugang')}
            style={{
              padding: '13px 28px',
              background: '#fff', color: 'var(--blue)',
              border: 'none', borderRadius: 12, cursor: 'pointer',
              fontSize: '.9375rem', fontWeight: 700,
              fontFamily: 'inherit',
            }}
          >
            Kostenlos anfragen →
          </button>
        </div>
        <div style={{ fontSize: '.75rem', lineHeight: 2, marginBottom: 20 }}>
          S&amp;O Labs GbR · Bochum · Deutschland
        </div>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Impressum', hash: 'impressum' },
            { label: 'Datenschutz', hash: 'datenschutz' },
            { label: 'AGB', hash: 'agb' },
          ].map(({ label, hash }) => (
            <a
              key={hash}
              href={`#${hash}`}
              style={{
                fontSize: '.78rem', color: 'rgba(255,255,255,.5)',
                textDecoration: 'none', fontWeight: 500,
              }}
            >
              {label}
            </a>
          ))}
          <button
            onClick={onLoginClick}
            style={{
              fontSize: '.78rem', color: 'rgba(255,255,255,.5)',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontWeight: 500, padding: 0,
            }}
          >
            Kundenportal →
          </button>
        </div>
      </div>
    </footer>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function LandingPage({ onUnlock }: { onUnlock: () => void }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <div className="bg-grid" aria-hidden />
      <LandingNav onLoginClick={() => setShowLogin(true)} />
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onUnlock={onUnlock}
        />
      )}
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Team />
        <RequestAccess />
        <FAQ />
        <LandingFooter onLoginClick={() => setShowLogin(true)} />
      </main>
    </>
  );
}
