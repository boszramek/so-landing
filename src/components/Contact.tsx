import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { flyUp, staggerContainer, viewport } from './variants';

const REVENUE_OPTIONS = [
  'Unter € 1 Mio. Jahresumsatz',
  '€ 1–5 Mio. Jahresumsatz',
  '€ 5–20 Mio. Jahresumsatz',
  '€ 20–50 Mio. Jahresumsatz',
  'Über € 50 Mio. Jahresumsatz',
];

const CHALLENGE_OPTIONS = [
  'Unklare Kosten- & Ertragsstruktur',
  'Manueller Verwaltungsaufwand & Prozesse',
  'Fehlende Entscheidungsgrundlagen für Geschäftsführung',
  'Steuerliche Optimierung & Blindspots',
  'Datensilos & fehlende Systemintegration',
  'Anderes',
];

const TIMELINE_OPTIONS = [
  'Sofort — wir wollen starten',
  'Innerhalb der nächsten 4 Wochen',
  'In 1–3 Monaten',
  'Ich sammle gerade Informationen',
];

interface FormState {
  name: string;
  company: string;
  email: string;
  revenue: string;
  challenge: string;
  timeline: string;
  details: string;
}

const EMPTY: FormState = {
  name: '', company: '', email: '',
  revenue: '', challenge: '', timeline: '',
  details: '',
};

function SelectInput({
  value, onChange, placeholder, options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        className="f-input"
        value={value}
        onChange={e => onChange(e.target.value)}
        required
        style={{
          appearance: 'none', WebkitAppearance: 'none',
          paddingRight: 36,
          color: value ? 'var(--dark)' : 'var(--secondary)',
        }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <svg
        width="12" height="12" viewBox="0 0 12 12" fill="none"
        style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--secondary)' }}
      >
        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);

  function set(key: keyof FormState) {
    return (val: string) => setForm(f => ({ ...f, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '82f03c19-bd15-4f8a-9e00-95c3f638c36b',
          to_email: 'boszramek204@gmail.com',
          from_name: form.name,
          email: form.email,
          company: form.company,
          revenue: form.revenue,
          challenge: form.challenge,
          timeline: form.timeline,
          details: form.details,
          subject: `Neue Anfrage von ${form.name} (${form.company})`,
        }),
      });

      if (response.ok) {
        setSent(true);
        setForm(EMPTY);
      } else {
        setError('Fehler beim Senden. Bitte versuchen Sie es später.');
      }
    } catch (err) {
      setError('Netzwerkfehler. Bitte kontrollieren Sie Ihre Verbindung.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'calc(var(--nav-h) + 72px) 48px 72px',
      }}
    >
      <div style={{ maxWidth: 580, width: '100%' }}>

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={staggerContainer(0.1)}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <motion.div variants={flyUp} style={{ marginBottom: 20 }}>
            <span className="pill pill-blue">
              <span className="pill-dot" />
              Mandat anfragen
            </span>
          </motion.div>
          <motion.h2
            variants={flyUp}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1.0,
              color: 'var(--dark)', marginBottom: 16,
            }}
          >
            Wir prüfen,<br />
            <span style={{ color: 'var(--blue)' }}>ob wir helfen können.</span>
          </motion.h2>
          <motion.p variants={flyUp} style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--body)' }}>
            Maximal 4 aktive Mandate. Bitte beschreiben Sie kurz Ihr Unternehmen —
            wir melden uns persönlich innerhalb von 24 Stunden.
          </motion.p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            background: '#fff', borderRadius: 24, padding: 36,
            boxShadow: '0 4px 24px rgba(0,0,0,.06),0 20px 60px rgba(0,0,0,.09)',
            border: '0.5px solid rgba(0,0,0,.07)',
          }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ textAlign: 'center', padding: '32px 0' }}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'rgba(26,158,63,.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12L9.5 16.5L19 7" stroke="var(--green)" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, letterSpacing: '-.03em', color: 'var(--dark)', marginBottom: 8 }}>
                  Bewerbung eingegangen.
                </h3>
                <p style={{ fontSize: '.9375rem', color: 'var(--body)', lineHeight: 1.6 }}>
                  S&amp;O Labs prüft Ihre Anfrage und meldet sich persönlich — in der Regel innerhalb weniger Stunden.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                {/* Row 1: Name + Company */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <input
                    className="f-input"
                    type="text"
                    placeholder="Ihr Name"
                    required
                    value={form.name}
                    onChange={e => set('name')(e.target.value)}
                  />
                  <input
                    className="f-input"
                    type="text"
                    placeholder="Unternehmen"
                    required
                    value={form.company}
                    onChange={e => set('company')(e.target.value)}
                  />
                </div>

                {/* Row 2: Email */}
                <input
                  className="f-input"
                  type="email"
                  placeholder="Geschäftliche E-Mail"
                  required
                  value={form.email}
                  onChange={e => set('email')(e.target.value)}
                />

                {/* Divider */}
                <div style={{ borderTop: '0.5px solid rgba(0,0,0,.06)', margin: '4px 0' }} />
                <div style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--secondary)' }}>
                  Kurzprofil — hilft uns bei der Prüfung
                </div>

                {/* Row 3: Revenue */}
                <SelectInput
                  value={form.revenue}
                  onChange={set('revenue')}
                  placeholder="Jahresumsatz Ihres Unternehmens"
                  options={REVENUE_OPTIONS}
                />

                {/* Row 4: Biggest challenge */}
                <SelectInput
                  value={form.challenge}
                  onChange={set('challenge')}
                  placeholder="Größte operative Herausforderung"
                  options={CHALLENGE_OPTIONS}
                />

                {/* Row 5: Timeline */}
                <SelectInput
                  value={form.timeline}
                  onChange={set('timeline')}
                  placeholder="Zeitrahmen für eine Entscheidung"
                  options={TIMELINE_OPTIONS}
                />

                {/* Row 6: Optional details */}
                <textarea
                  className="f-input"
                  placeholder="Optional: Kontext oder spezifische Fragen (1–2 Sätze)"
                  rows={2}
                  value={form.details}
                  onChange={e => set('details')(e.target.value)}
                  style={{ resize: 'none' }}
                />

                <motion.button
                  type="submit"
                  className="btn-submit"
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.97 } : {}}
                  disabled={loading}
                  style={{ marginTop: 4, opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? 'Wird gesendet...' : 'Mandat anfragen — Antwort in <24h'}
                </motion.button>
                {error && (
                  <div style={{ marginTop: 12, padding: '12px 14px', background: 'rgba(192,57,43,.08)', border: '0.5px solid rgba(192,57,43,.2)', borderRadius: 8, fontSize: '.85rem', color: '#C0392B' }}>
                    {error}
                  </div>
                )}
              </motion.form>
            )}
          </AnimatePresence>

          {!sent && (
            <p style={{ textAlign: 'center', fontSize: '.75rem', color: 'var(--secondary)', marginTop: 12 }}>
              Direkt an S&amp;O Labs · NDA auf Wunsch · Kein CRM · Kein Spam
            </p>
          )}
        </motion.div>

        {/* Legal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: 28, padding: '16px 20px',
            background: 'var(--surface)', borderRadius: 12,
            fontSize: '.68rem', lineHeight: 1.65, color: 'var(--secondary)',
          }}
        >
          <strong style={{ color: 'var(--body)' }}>Rechtlicher Hinweis:</strong>{' '}
          S&amp;O Labs GbR erbringt ausschließlich technische Analyse- und
          Entscheidungsunterstützungs-Dienstleistungen. Keine Rechtsberatung, keine
          Steuerberatung, keine Anlageberatung (StBerG/BRAO/WpHG). Datenschutz gemäß
          DSGVO §28. © 2026 S&amp;O Labs GbR · Deutschland
          <br />
          <div style={{ marginTop: 8, paddingTop: 8, borderTop: '0.5px solid var(--border)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="#impressum" style={{ color: 'var(--accent)', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>Impressum</a>
            <span style={{ color: 'var(--border)' }}>·</span>
            <a href="#datenschutz" style={{ color: 'var(--accent)', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>Datenschutzerklärung</a>
            <span style={{ color: 'var(--border)' }}>·</span>
            <a href="#agb" style={{ color: 'var(--accent)', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '0.8'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>AGB</a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
