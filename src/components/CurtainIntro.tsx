import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Cinema-curtain reveal. Runs once on first load, skipped for reduced motion. */
export function CurtainIntro() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const a = setTimeout(() => setOpen(true), 250);
    const b = setTimeout(() => setDone(true), 1600);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] flex"
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative h-full w-1/2 bg-wine-deep"
            animate={{ x: open ? "-100%" : "0%" }}
            transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
          >
            <span className="absolute bottom-14 right-6 font-hand text-2xl text-rose/80">
              once upon a time
            </span>
          </motion.div>
          <motion.div
            className="h-full w-1/2 bg-wine-deep"
            animate={{ x: open ? "100%" : "0%" }}
            transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Near-subliminal film grain + vignette. */
export function GrainOverlay() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-20">
      <svg className="h-full w-full opacity-[0.045] mix-blend-overlay">
        <filter id="notebook-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#notebook-grain)" />
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 45%, transparent 55%, color-mix(in oklab, var(--ink) 26%, transparent) 100%)",
        }}
      />
    </div>
  );
}
