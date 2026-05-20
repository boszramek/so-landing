import { useState, useEffect } from 'react';

/**
 * Detects which section is "active" using the middle-of-viewport trigger zone.
 * Uses rootMargin to shrink the detection area so only the section whose content
 * occupies the vertical center of the screen is considered active.
 * This correctly handles sections of varying heights (including 350vh process section).
 */
export function useActiveSection(sectionIds: string[]): number {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Keep track of which sections have entered the middle zone
    // so we can pick the most recent one
    const entering = new Map<number, number>(); // index → timestamp

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const i = sectionIds.indexOf(entry.target.id);
          if (i === -1) return;
          if (entry.isIntersecting) {
            entering.set(i, Date.now());
            // Activate the most recently entered section
            setActive(i);
          } else {
            entering.delete(i);
            // When a section leaves, re-activate whatever is still in the zone
            if (entering.size > 0) {
              const latest = [...entering.entries()].sort((a, b) => b[1] - a[1])[0][0];
              setActive(latest);
            }
          }
        });
      },
      {
        // Trigger only when section center crosses the middle 30% of the viewport.
        // rootMargin shrinks top and bottom by 35% each → middle 30% is the detection zone.
        rootMargin: '-35% 0px -35% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(',')]);

  return active;
}

/**
 * Smoothly scrolls to a section by id, with nav-height offset.
 */
export function scrollToSection(id: string, offset = 52) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
