import type { Variants } from 'framer-motion';

/** Standard fly-up — used across all vertical sections */
export const flyUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Stagger container — wraps flyUp children */
export const staggerContainer = (stagger = 0.1, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Spring pop — for trust badges, seals, cards */
export const springPop: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show: {
    opacity: 1, scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 22, mass: 0.8 },
  },
};

/** Slide in from right with spring overshoot — for process step content */
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1, x: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20, mass: 0.9 },
  },
};

/** Default viewport config for whileInView triggers */
export const viewport = { once: true, amount: 0.25 };
