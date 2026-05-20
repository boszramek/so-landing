import { motion } from 'framer-motion';
import { flyUp, staggerContainer, viewport } from './variants';

export default function Impressum() {
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
          <h1 className="text-4xl font-bold">Impressum</h1>
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
            <h2 className="text-xl font-semibold text-white mb-2">Angaben gemäß § 5 TMG</h2>
            <div className="space-y-2">
              <p><strong>Unternehmensname:</strong> <span className="text-gray-400">[Wird eingefügt]</span></p>
              <p><strong>Geschäftsführer/Gesellschafter:</strong> <span className="text-gray-400">[Wird eingefügt]</span></p>
              <p><strong>Adresse:</strong> <span className="text-gray-400">[Wird eingefügt]</span></p>
              <p><strong>Telefon:</strong> <span className="text-gray-400">[Wird eingefügt]</span></p>
              <p><strong>E-Mail:</strong> <span className="text-gray-400">[Wird eingefügt]</span></p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Registereintrag</h2>
            <p><strong>Handelsregister:</strong> <span className="text-gray-400">[Wird eingefügt]</span></p>
            <p><strong>Registernummer:</strong> <span className="text-gray-400">[Wird eingefügt]</span></p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Steuernummer</h2>
            <p><span className="text-gray-400">[Wird eingefügt]</span></p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Verantwortliche/r für den redaktionellen Inhalt</h2>
            <p><span className="text-gray-400">[Wird eingefügt]</span></p>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">Dieses Impressum wird nach vollständiger Unternehmensgründung mit den erforderlichen rechtlichen Informationen aktualisiert.</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
