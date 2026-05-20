import { motion } from 'framer-motion';
import { flyUp, staggerContainer, viewport } from './variants';

export default function Datenschutz() {
  const goHome = () => window.location.hash = '';

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-24">
      <motion.div
        className="max-w-3xl w-full"
        variants={staggerContainer()}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div variants={flyUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h1 className="text-4xl font-bold">Datenschutzerklärung</h1>
          <button
            onClick={goHome}
            style={{
              background: 'var(--blue)',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 6,
              fontSize: '.85rem',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            ← Zurück zur Startseite
          </button>
        </motion.div>

        <motion.div variants={flyUp} className="prose prose-lg max-w-none space-y-6 text-gray-300">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">1. Verantwortlicher für die Datenverarbeitung</h2>
            <p><span className="text-gray-400">[Wird eingefügt nach Unternehmensgründung]</span></p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. Rechte der Nutzer</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Recht auf Auskunft</li>
              <li>Recht auf Berichtigung</li>
              <li>Recht auf Löschung</li>
              <li>Recht auf Einschränkung der Verarbeitung</li>
              <li>Recht auf Datenportabilität</li>
              <li>Recht auf Widerspruch</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. Kontaktformular</h2>
            <p className="text-gray-400">[Wird eingefügt mit Details zu Web3Forms und Datenspeicherung]</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">4. Hosting</h2>
            <p><strong>Hosting-Anbieter:</strong> Vercel (USA) <span className="text-gray-400">[Details folgen]</span></p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">5. Cookies</h2>
            <p className="text-gray-400">[Wird eingefügt falls Cookies genutzt werden]</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">6. Externe Dienste</h2>
            <p className="text-gray-400">[Wird eingefügt mit Liste aller genutzten Dienste]</p>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">Diese Datenschutzerklärung wird nach vollständiger Unternehmensgründung mit den erforderlichen rechtlichen Informationen aktualisiert.</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
