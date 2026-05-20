import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { flyUp, staggerContainer, viewport } from './variants';

const FAQS = [
  {
    q: 'Was kostet das?',
    a: 'Unsere Analyse-Pakete starten bei einer einmaligen Gebühr — ohne versteckte Kosten. Den genauen Preis besprechen wir im persönlichen Gespräch, da er von der Größe Ihres Unternehmens abhängt. Anfragen sind kostenlos und unverbindlich.',
  },
  {
    q: 'Brauche ich dafür noch einen Steuerberater?',
    a: 'Wir ersetzen keinen Steuerberater — wir ergänzen ihn. Unsere Analyse zeigt, wo Potenzial liegt. Ihren Steuerberater brauchen Sie, um die konkreten Maßnahmen rechtssicher umzusetzen. Viele unserer Kunden arbeiten beides parallel.',
  },
  {
    q: 'Wie sicher sind meine Daten?',
    a: 'Ihre Daten werden ausschließlich auf Servern in Deutschland verarbeitet und gespeichert. Wir arbeiten vollständig DSGVO-konform. Zugriff haben nur Bo und Linus — keine weiteren Personen, keine Drittanbieter-Weitergabe.',
  },
  {
    q: 'Wie schnell bekomme ich Ergebnisse?',
    a: 'In der Regel liefern wir den ersten Analyse-Report innerhalb von 48 Stunden nach Erhalt Ihrer Unterlagen. Bei größeren Unternehmen kann es bis zu 5 Werktage dauern.',
  },
  {
    q: 'Für wen ist das geeignet?',
    a: 'Unsere Analyse eignet sich für GmbHs, UGs und Einzelunternehmer ab ca. 50.000 € Jahresumsatz. Je größer das Unternehmen, desto mehr Potenzial gibt es in der Regel zu entdecken.',
  },
  {
    q: 'Was passiert nach der Analyse?',
    a: 'Sie erhalten einen klaren, verständlichen Report mit konkreten Empfehlungen. Keine Verpflichtung für weitere Aufträge. Sie entscheiden selbst, welche Punkte Sie mit Ihrem Steuerberater umsetzen möchten.',
  },
  {
    q: 'Sind Bo und Linus qualifiziert dafür?',
    a: 'Wir sind 18 Jahre alt und keine Steuerberater — das sagen wir ganz offen. Unsere Stärke liegt in der KI-Technologie: Wir wissen, welche Muster Systeme erkennen, die Menschen übersehen. Für die steuerrechtliche Einordnung arbeiten wir mit erfahrenen Fachleuten zusammen.',
  },
];

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 14,
        border: '0.5px solid rgba(0,35,102,.08)',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={onToggle}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 24px', gap: 16,
      }}>
        <span style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--dark)', lineHeight: 1.4 }}>
          {q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2V14M2 8H14" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 24px 20px',
              fontSize: '.9rem', color: 'var(--body)', lineHeight: 1.7,
              borderTop: '0.5px solid rgba(0,35,102,.06)',
              paddingTop: 16,
            }}>
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      style={{
        padding: '100px 48px',
        background: 'var(--surface)',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.08)}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <motion.div variants={flyUp} style={{ marginBottom: 16 }}>
            <span className="pill pill-blue"><span className="pill-dot"/>Häufige Fragen</span>
          </motion.div>
          <motion.h2 variants={flyUp} style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 800, letterSpacing: '-.04em', lineHeight: 1.05,
            color: 'var(--dark)', marginBottom: 16,
          }}>
            Ihre Fragen,<br/>
            <span style={{ color: 'var(--blue)' }}>ehrlich beantwortet.</span>
          </motion.h2>
          <motion.p variants={flyUp} style={{
            fontSize: '1.0625rem', color: 'var(--body)', lineHeight: 1.7,
            maxWidth: 520, margin: '0 auto',
          }}>
            Wir antworten direkt — ohne Marketingsprache.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" whileInView="show" viewport={viewport}
          variants={staggerContainer(0.06)}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          {FAQS.map((item, i) => (
            <motion.div key={i} variants={flyUp}>
              <FAQItem
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
