import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

// Illustrations live in public/assets/kriya/ so they work on any deployment
// (Vercel included), not only on Lovable's asset CDN.
const KRIYA = "/assets/kriya";

const poses = {
  working: { src: `${KRIYA}/kriya-working.png`, alt: "Illustration of Kriya, in her round glasses, sitting with a laptop and typing" },
  talking: { src: `${KRIYA}/kriya-talking.png`, alt: "Illustration of Kriya, in her round glasses, laptop tucked away, talking with one hand raised" },
  reading: { src: `${KRIYA}/kriya-reading.png`, alt: "Illustration of Kriya, in her round glasses, reading a book on a stack of books" },
  eating: { src: `${KRIYA}/kriya-eating.png`, alt: "Illustration of Kriya, in her round glasses, sitting cross-legged eating from a plate" },
  roaming: { src: `${KRIYA}/kriya-roaming.png`, alt: "Illustration of Kriya, in her round glasses, mid-step, wandering" },
  farewell: { src: `${KRIYA}/kriya-farewell.png`, alt: "Illustration of Kriya, in her round glasses, waving goodbye" },
} as const;

export type PoseName = keyof typeof poses;

const loop: Record<PoseName, Record<string, number[]>> = {
  working: { y: [0, -3, 0] },
  talking: { rotate: [0, 1.2, 0] },
  reading: { y: [0, -2.5, 0] },
  eating: { rotate: [0, -1.5, 0] },
  roaming: { rotate: [-1.5, 1.5, -1.5] },
  farewell: { rotate: [0, 2, 0] },
};

const durations: Record<PoseName, number> = {
  working: 1.4,
  talking: 3.2,
  reading: 4,
  eating: 2.2,
  roaming: 4.5,
  farewell: 1.8,
};

/** One-shot reaction played when the character is tapped. */
const reaction: Record<PoseName, { keyframes: Record<string, number[]>; duration: number; note: string }> = {
  working: {
    keyframes: { scaleY: [1, 0.9, 1.02, 1], rotate: [0, -3, 1, 0], y: [0, 6, -2, 0] },
    duration: 0.9,
    note: "laptop closed.",
  },
  talking: {
    keyframes: { rotate: [0, -6, 6, -3, 0] },
    duration: 1,
    note: "hi there!",
  },
  reading: {
    keyframes: { rotate: [0, 4, -2, 0], y: [0, -8, 0] },
    duration: 1,
    note: "one more chapter.",
  },
  eating: {
    keyframes: { scale: [1, 1.06, 1], rotate: [0, -4, 3, 0] },
    duration: 0.9,
    note: "worth it.",
  },
  roaming: {
    keyframes: { rotate: [0, -10, 10, -6, 0], y: [0, -10, 0] },
    duration: 1.1,
    note: "waving!",
  },
  farewell: {
    keyframes: { rotate: [0, -9, 9, -5, 0] },
    duration: 1.1,
    note: "see you soon.",
  },
};

/** A single character pose. Tap or press it for a one-shot reaction. */
export function MiniKriya({
  pose,
  className = "",
  width = 200,
}: {
  pose: PoseName;
  className?: string;
  width?: number;
}) {
  const reduce = useReducedMotion();
  const { src, alt } = poses[pose];
  const controls = useAnimationControls();
  const [note, setNote] = useState(false);

  useEffect(() => {
    if (reduce) return;
    void controls.start(loop[pose], {
      duration: durations[pose],
      repeat: Infinity,
      ease: "easeInOut",
    });
  }, [controls, pose, reduce]);

  async function react() {
    setNote(true);
    window.setTimeout(() => setNote(false), 1600);
    if (reduce) return;
    const r = reaction[pose];
    await controls.start(r.keyframes, { duration: r.duration, ease: "easeInOut" });
    void controls.start(loop[pose], {
      duration: durations[pose],
      repeat: Infinity,
      ease: "easeInOut",
    });
  }

  return (
    <motion.div
      className={`relative shrink-0 ${className}`}
      style={{ width }}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
    >
      {pose === "reading" && !reduce && <Sparkle />}

      <AnimatePresence>
        {note && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-paper px-3 py-1 font-hand text-lg text-wine shadow-sm"
          >
            {reaction[pose].note}
          </motion.span>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={react}
        aria-label={`${alt}. Activate for a small animation.`}
        className="block w-full cursor-pointer rounded-md"
      >
        <motion.img
          src={src}
          alt={alt}
          width={width}
          className="h-auto w-full select-none"
          draggable={false}
          animate={controls}
          style={{ transformOrigin: "50% 90%" }}
        />
      </button>
    </motion.div>
  );
}

function Sparkle() {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute left-2 top-4 z-10 font-hand text-2xl text-gold"
      animate={{ opacity: [0.2, 1, 0.2], scale: [0.85, 1.15, 0.85] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      ✦
    </motion.span>
  );
}

/**
 * The roaming companion: she doesn't follow the whole page — once you're past
 * the hero she wanders in at random intervals, stays a few seconds, and leaves.
 * Tapping her makes her wave.
 */
export function RoamingKriya() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const rawDrift = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const drift = useSpring(rawDrift, { stiffness: 60, damping: 20 });

  const [pastHero, setPastHero] = useState(false);
  const [visible, setVisible] = useState(false);
  const [waving, setWaving] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setPastHero(v > 0.1));
    return unsub;
  }, [scrollYProgress]);

  useEffect(() => {
    if (!pastHero) {
      setVisible(false);
      return;
    }
    let hideTimer: number | undefined;
    let showTimer: number | undefined;

    const schedule = (delay: number) => {
      showTimer = window.setTimeout(() => {
        setVisible(true);
        hideTimer = window.setTimeout(() => {
          setVisible(false);
          schedule(14000 + Math.random() * 16000);
        }, 6500);
      }, delay);
    };

    schedule(2500 + Math.random() * 4000);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [pastHero]);

  function wave() {
    setWaving(true);
    window.setTimeout(() => setWaving(false), 1400);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 right-3 z-30 w-16 sm:w-20 md:w-24"
          style={{ y: reduce ? 0 : drift }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 0.95, x: 0 }}
          exit={{ opacity: 0, x: 60 }}
          transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
          <button
            type="button"
            onClick={wave}
            aria-label="Say hello to the illustrated character"
            className="block w-full cursor-pointer"
          >
            <motion.img
              src={poses.roaming.src}
              alt=""
              className="h-auto w-full drop-shadow-[0_10px_18px_rgba(43,33,24,0.22)]"
              animate={
                reduce
                  ? {}
                  : waving
                    ? { rotate: [0, -12, 12, -8, 0], y: [0, -10, 0] }
                    : { rotate: [-1.5, 1.5, -1.5], y: [0, -4, 0] }
              }
              transition={
                waving
                  ? { duration: 1.2, ease: "easeInOut" }
                  : { duration: 5, repeat: Infinity, ease: "easeInOut" }
              }
              style={{ transformOrigin: "50% 95%" }}
            />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
