import { motion } from 'framer-motion';
import { flyUp, staggerContainer, viewport } from './variants';
import boPhoto from '../assets/bo-szramek.jpg';
import linusPhoto from '../assets/linus-osowski.jpg';

// ─── Founder card ─────────────────────────────────────────────────────────────
function FounderCard({
  initials, name, role, color, delay, photoSrc,
}: {
  initials: string; name: string; role: string; color: string; delay: number; photoSrc?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22,1,0.36,1], delay }}
      style={{
        background: '#fff',
        borderRadius: 20,
        padding: '28px 24px',
        border: '0.5px solid rgba(0,35,102,.08)',
        boxShadow: '0 2px 12px rgba(0,35,102,.05)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: 16,
      }}
    >
      {/* Photo or placeholder */}
      <div style={{ position: 'relative' }}>
        {photoSrc ? (
          <img
            src={photoSrc}
            alt={name}
            width={100}
            height={100}
            loading="lazy"
            decoding="async"
            style={{
              width: 100, height: 100, borderRadius: '50%',
              objectFit: 'cover',
              border: `2px solid ${color}20`,
            }}
          />
        ) : (
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: `linear-gradient(135deg, ${color}10, ${color}20)`,
            border: `2px dashed ${color}50`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 5,
          }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M10 5H18L20 8H24C24.6 8 25 8.4 25 9V22C25 22.6 24.6 23 24 23H4C3.4 23 3 22.6 3 22V9C3 8.4 3.4 8 4 8H8L10 5Z"
                stroke={color} strokeWidth="1.4" strokeLinejoin="round" opacity="0.5"/>
              <circle cx="14" cy="15" r="4" stroke={color} strokeWidth="1.4" opacity="0.5"/>
            </svg>
            <span style={{ fontSize: '.48rem', fontWeight: 700, letterSpacing: '.1em', color, opacity: 0.5 }}>
              FOTO FOLGT
            </span>
          </div>
        )}
        {/* Initials badge */}
        <div style={{
          position: 'absolute', bottom: 0, right: 0,
          width: 30, height: 30, borderRadius: '50%',
          background: color, color: '#fff',
          fontSize: '.65rem', fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid #fff',
          letterSpacing: '-.01em',
        }}>
          {initials}
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--dark)', marginBottom: 4, letterSpacing: '-.02em' }}>
          {name}
        </div>
        <div style={{ fontSize: '.78rem', color: 'var(--secondary)', lineHeight: 1.5 }}>
          {role}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Simple step ──────────────────────────────────────────────────────────────
function HowStep({
  num, title, body,
}: {
  num: string; title: string; body: string;
}) {
  return (
    <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        background: 'var(--blue)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '.75rem', fontWeight: 800, letterSpacing: '-.01em',
      }}>
        {num}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: '.9375rem', color: 'var(--dark)', marginBottom: 4 }}>
          {title}
        </div>
        <div style={{ fontSize: '.875rem', color: 'var(--body)', lineHeight: 1.6 }}>
          {body}
        </div>
      </div>
    </div>
  );
}

// ─── About section ────────────────────────────────────────────────────────────
export default function About() {
  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'calc(var(--nav-h) + 80px) 48px 80px',
        background: 'var(--surface)',
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
            <span className="pill pill-blue"><span className="pill-dot"/>Wer wir sind</span>
          </motion.div>
          <motion.h2 variants={flyUp} style={{
            fontSize: 'clamp(2.8rem,5.5vw,5rem)',
            fontWeight: 800, letterSpacing: '-.05em', lineHeight: 1.0,
            color: 'var(--dark)', marginBottom: 20,
          }}>
            Wir sind keine<br/>
            <span style={{ color: 'var(--blue)' }}>Steuerberater.</span>
          </motion.h2>
          <motion.p variants={flyUp} style={{
            maxWidth: 560, margin: '0 auto',
            fontSize: '1.0625rem', lineHeight: 1.7, color: 'var(--body)',
          }}>
            Und das ist unser Vorteil. Wir bringen keine alten Gewohnheiten mit —
            sondern KI-Werkzeuge, die traditionelle Berater gar nicht kennen.
          </motion.p>
        </motion.div>

        {/* ── Founder cards ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 20, maxWidth: 560, margin: '0 auto 56px',
        }}>
          <FounderCard
            initials="Bo"
            name="Bo Szramek"
            role="18 Jahre · Bochum · KI-Automatisierung & Prozesse"
            color="var(--blue)"
            delay={0}
            photoSrc={boPhoto}
          />
          <FounderCard
            initials="Li"
            name="Linus Ossowski"
            role="18 Jahre · Bochum · KI-Analyse & Implementierung"
            color="#34AADC"
            delay={0.1}
            photoSrc={linusPhoto}
          />
        </div>

        {/* ── Honest callout ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          style={{
            maxWidth: 780, margin: '0 auto 56px',
            background: '#fff',
            borderRadius: 20,
            border: '0.5px solid rgba(0,35,102,.08)',
            boxShadow: '0 2px 16px rgba(0,35,102,.05)',
            overflow: 'hidden',
          }}
        >
          {/* Top row — what we're not */}
          <div style={{
            padding: '24px 28px',
            borderBottom: '0.5px solid rgba(0,0,0,.05)',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20,
          }}>
            <div>
              <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#C0392B', marginBottom: 12 }}>
                Was wir nicht sind
              </div>
              {[
                'Qualifizierte Steuerberater',
                'Jahrzehnte Steuererfahrung',
                'Etablierte Unternehmensberatung',
                'Experten für Steuerrecht',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize: '.8375rem', color: 'var(--body)' }}>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: 12 }}>
                Was wir sind
              </div>
              {[
                '2 Schüler, die KI wirklich verstehen',
                'Frischer Blick — keine alten Strukturen',
                'Direkt, persönlich, auf Augenhöhe',
                'Bereits erfolgreiche Aufträge absolviert',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="rgba(26,158,63,.1)"/>
                    <path d="M4 7L6 9L10 5" stroke="#1A9E3F" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize: '.8375rem', color: 'var(--body)' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div style={{ padding: '20px 28px', background: 'var(--surface)' }}>
            <p style={{ margin: 0, fontSize: '.9375rem', lineHeight: 1.7, color: 'var(--dark)', fontStyle: 'italic' }}>
              "Wir kennen uns selbst noch nicht tief im Steuerwesen aus —
              aber wir wissen, was KI heute in der Lage ist zu leisten.
              Und genau das setzen wir für Ihr Unternehmen ein."
            </p>
            <div style={{ marginTop: 10, fontSize: '.75rem', color: 'var(--secondary)', fontWeight: 600 }}>
              — Bo &amp; Linus, S&amp;O Labs
            </div>
          </div>
        </motion.div>

        {/* ── What we actually do ── */}
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.1)}
          style={{ maxWidth: 780, margin: '0 auto' }}
        >
          <motion.div variants={flyUp} style={{ marginBottom: 32, textAlign: 'center' }}>
            <div style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 16 }}>
              Was wir konkret anbieten
            </div>
            <h3 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.6rem)', fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.05, color: 'var(--dark)', margin: 0 }}>
              KI findet Steuersparpotenziale,<br/>
              <span style={{ color: 'var(--blue)' }}>die Menschen übersehen.</span>
            </h3>
          </motion.div>

          <motion.div
            variants={flyUp}
            style={{
              background: '#fff',
              borderRadius: 20,
              border: '0.5px solid rgba(0,35,102,.08)',
              padding: '28px 32px',
              display: 'flex', flexDirection: 'column', gap: 24,
            }}
          >
            <HowStep
              num="1"
              title="Wir verbinden KI mit Ihren Unternehmensdaten"
              body="Sie geben uns Ihre Dokumente, Zahlen, Belege. Unsere KI-Agenten lesen alles — schneller und gründlicher als jeder Mensch."
            />
            <div style={{ height: 1, background: 'rgba(0,0,0,.05)' }} />
            <HowStep
              num="2"
              title="Die KI findet, wo Geld auf dem Tisch bleibt"
              body="Steuerliche Spielräume, vermeidbare Kosten, optimierbare Prozesse — die KI zeigt auf, was übersehen wurde. Klar und ohne Fachjargon."
            />
            <div style={{ height: 1, background: 'rgba(0,0,0,.05)' }} />
            <HowStep
              num="3"
              title="Sie bekommen einen klaren Report — und sparen Geld"
              body="Kein 50-seitiges Gutachten. Ein klarer Bericht: Was kostet Sie gerade Geld? Was können Sie ändern? Was bringt das konkret?"
            />
          </motion.div>

          {/* Honest result claim */}
          <motion.div
            variants={flyUp}
            style={{
              marginTop: 20,
              background: 'rgba(26,158,63,.04)',
              border: '0.5px solid rgba(26,158,63,.2)',
              borderRadius: 14, padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: 12,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
              <path d="M9 1.5L10.8 6.4L16 6.8L12.3 10.1L13.5 15.3L9 12.5L4.5 15.3L5.7 10.1L2 6.8L7.2 6.4L9 1.5Z" fill="var(--green)" opacity=".8"/>
            </svg>
            <p style={{ margin: 0, fontSize: '.875rem', color: 'var(--dark)', lineHeight: 1.6 }}>
              <strong>Erste Aufträge erfolgreich abgeschlossen.</strong>{' '}
              Unsere Kunden sind zufrieden — und konnten durch unsere Analyse konkret Geld sparen.
              Gerne sprechen wir offen über bisherige Ergebnisse.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
