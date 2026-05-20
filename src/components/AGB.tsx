import { motion } from 'framer-motion';
import { flyUp, staggerContainer, viewport } from './variants';

export default function AGB() {
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
          <h1 className="text-4xl font-bold">Allgemeine Geschäftsbedingungen</h1>
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
            <h2 className="text-xl font-semibold text-white mb-2">1. Geltungsbereich</h2>
            <p className="text-gray-400">[Wird eingefügt]</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. Leistungsbeschreibung</h2>
            <p className="text-gray-400">[Wird eingefügt]</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. Gebühren und Bezahlung</h2>
            <p className="text-gray-400">[Wird eingefügt]</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">4. Haftung</h2>
            <p className="text-gray-400">[Wird eingefügt - Haftungsbeschränkungen für Steuerberatung und KI-Analysen]</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">5. Gewährleistung</h2>
            <p className="text-gray-400">[Wird eingefügt]</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">6. Widerrufs- und Rückgaberecht</h2>
            <p className="text-gray-400">[Wird eingefügt]</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">7. Schlussbestimmungen</h2>
            <p className="text-gray-400">[Wird eingefügt]</p>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">Diese AGB werden nach vollständiger Unternehmensgründung mit den erforderlichen rechtlichen Informationen aktualisiert.</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
