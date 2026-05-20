import { useState } from 'react';
import { motion } from 'framer-motion';
import { flyUp, staggerContainer, viewport } from './variants';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function RequestAccess() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xvgagnbe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '13px 16px',
    borderRadius: 10,
    border: '0.5px solid rgba(0,35,102,.2)',
    fontSize: '.9375rem', color: 'var(--dark)',
    background: '#fff',
    outline: 'none',
    transition: 'border-color .2s',
    fontFamily: 'inherit',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '.72rem', fontWeight: 700,
    letterSpacing: '.1em', textTransform: 'uppercase',
    color: 'var(--blue)', marginBottom: 6, display: 'block',
  };

  return (
    <section
      id="zugang"
      style={{
        padding: '100px 48px',
        background: '#fff',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.08)}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <motion.div variants={flyUp} style={{ marginBottom: 16 }}>
            <span className="pill pill-blue"><span className="pill-dot"/>Jetzt starten</span>
          </motion.div>
          <motion.h2 variants={flyUp} style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.05,
            color: 'var(--dark)', marginBottom: 16,
          }}>
            Zugang anfordern
          </motion.h2>
          <motion.p variants={flyUp} style={{
            fontSize: '1.0625rem', color: 'var(--body)', lineHeight: 1.7,
            maxWidth: 480, margin: '0 auto',
          }}>
            Wir melden uns innerhalb von <strong>24 Stunden</strong> persönlich bei Ihnen.
            Kostenlos und unverbindlich.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'var(--surface)',
            borderRadius: 24,
            border: '0.5px solid rgba(0,35,102,.08)',
            padding: '40px 40px',
          }}
        >
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'rgba(26,158,63,.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12L10 17L19 8" stroke="#1A9E3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--dark)', marginBottom: 12 }}>
                Anfrage erhalten!
              </h3>
              <p style={{ fontSize: '.9375rem', color: 'var(--body)', lineHeight: 1.7, margin: 0 }}>
                Bo oder Linus melden sich innerhalb von 24 Stunden persönlich bei Ihnen.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelStyle}>Ihr Name *</label>
                  <input
                    required
                    style={inputStyle}
                    placeholder="Max Mustermann"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Unternehmen *</label>
                  <input
                    required
                    style={inputStyle}
                    placeholder="Mustermann GmbH"
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>E-Mail-Adresse *</label>
                <input
                  required
                  type="email"
                  style={inputStyle}
                  placeholder="max@mustermann.de"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div>
                <label style={labelStyle}>Was möchten Sie optimieren? (optional)</label>
                <textarea
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                  placeholder="Z.B. Jahresumsatz, Unternehmensform, bisherige Herausforderungen..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                />
              </div>

              {status === 'error' && (
                <p style={{ margin: 0, fontSize: '.875rem', color: '#C0392B', textAlign: 'center' }}>
                  Etwas ist schiefgelaufen. Bitte schreib uns direkt an{' '}
                  <a href="mailto:info@so-labs.de" style={{ color: '#C0392B' }}>info@so-labs.de</a>
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  width: '100%',
                  padding: '15px 24px',
                  background: status === 'sending' ? 'rgba(0,35,102,.5)' : 'var(--blue)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: '.9375rem', fontWeight: 700,
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  transition: 'background .2s',
                  fontFamily: 'inherit',
                  letterSpacing: '-.01em',
                }}
              >
                {status === 'sending' ? 'Wird gesendet…' : 'Kostenlos anfragen →'}
              </button>

              <p style={{ margin: 0, fontSize: '.78rem', color: 'var(--secondary)', textAlign: 'center', lineHeight: 1.6 }}>
                Kein Spam. Keine Verpflichtung. Nur Bo oder Linus melden sich persönlich.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
