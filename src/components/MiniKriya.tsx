import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

import workingAsset from "@/assets/kriya-working.png.asset.json";
import talkingAsset from "@/assets/kriya-talking.png.asset.json";
import readingAsset from "@/assets/kriya-reading.png.asset.json";
import eatingAsset from "@/assets/kriya-eating.png.asset.json";
import roamingAsset from "@/assets/kriya-roaming.png.asset.json";
import farewellAsset from "@/assets/kriya-farewell.png.asset.json";

const poses = {
  working: { src: workingAsset.url, alt: "Illustration of Kriya, in her round glasses, sitting with a laptop and typing" },
  talking: { src: talkingAsset.url, alt: "Illustration of Kriya, in her round glasses, laptop tucked away, talking with one hand raised" },
  reading: { src: readingAsset.url, alt: "Illustration of Kriya, in her round glasses, reading a book on a stack of books" },
  eating: { src: eatingAsset.url, alt: "Illustration of Kriya, in her round glasses, sitting cross-legged eating from a plate" },
  roaming: { src: roamingAsset.url, alt: "Illustration of Kriya, in her round glasses, mid-step, wandering" },
  farewell: { src: farewellAsset.url, alt: "Illustration of Kriya, in her round glasses, waving goodbye" },
} as const;

export type PoseName = keyof typeof poses;

/** A single character pose. Looping motion is opt-in per pose. */
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
      <motion.img
        src={src}
        alt={alt}
        width={width}
        className="h-auto w-full select-none"
        draggable={false}
        animate={reduce ? {} : loop[pose]}
        transition={{ duration: durations[pose], repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 90%" }}
      />
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
 * The floating "Roaming" companion: hidden over the hero, then follows scroll
 * with a spring-smoothed vertical drift, an idle sway, and a periodic wave.
 */
export function RoamingKriya() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const rawDrift = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const drift = useSpring(rawDrift, { stiffness: 60, damping: 20 });
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.12], [0, 0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.08, 0.14], [0.8, 0.8, 1]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-4 right-3 z-30 w-16 opacity-90 sm:w-20 md:w-24"
      style={{ y: reduce ? 0 : drift, opacity, scale }}
    >
      <motion.img
        src={poses.roaming.src}
        alt=""
        className="h-auto w-full drop-shadow-[0_10px_18px_rgba(43,33,24,0.22)]"
        animate={
          reduce ? {} : { rotate: [-1.5, 1.5, -1.5, 0.5, -1.5], y: [0, -4, 0, -2, 0] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 95%" }}
      />
    </motion.div>
  );
}
