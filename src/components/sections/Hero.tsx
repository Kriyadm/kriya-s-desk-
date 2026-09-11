import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { MiniKriya } from "@/components/MiniKriya";
import { activities, heroTags } from "@/data/content";

const EASE = [0.2, 0.65, 0.3, 0.9] as const;

function stage(delay: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  };
}

function LiveStatus() {
  const [now, setNow] = useState<string | null>(null);
  const [i, setI] = useState(0);

  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    tick();
    const t = setInterval(tick, 1000);
    const r = setInterval(() => setI((v) => (v + 1) % activities.length), 3000);
    return () => {
      clearInterval(t);
      clearInterval(r);
    };
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
      <span className="flex items-center gap-2">
        <motion.span
          className="h-2 w-2 rounded-full bg-wine"
          animate={{ opacity: [1, 0.25, 1], scale: [1, 0.8, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="tabular-nums tracking-widest text-ink">{now ?? "--:--:--"}</span>
      </span>
      <span className="flex min-w-0 flex-wrap items-baseline gap-1">
        <span>right now, probably —</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="font-hand text-xl text-wine"
          >
            {activities[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center bg-gradient-to-b from-paper to-paper-2 px-5 pb-16 pt-28"
    >
      <div className="mx-auto grid w-full max-w-6xl items-end gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <motion.p {...stage(1.3)} className="font-display text-lg italic text-ink-soft sm:text-xl">
            Once upon a time, a techie fell in love with
          </motion.p>
          <motion.p
            {...stage(1.5)}
            className="font-display text-lg italic text-ink-soft sm:text-xl"
          >
            code, books, movies, good food, and beautifully designed things.
          </motion.p>

          <motion.h1
            {...stage(1.8)}
            className="mt-6 font-display text-[clamp(3rem,11vw,8rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-ink"
          >
            <span className="block">Kriya</span>
            <span className="block">Morabia</span>
          </motion.h1>

          <motion.ul {...stage(2.1)} className="mt-7 flex flex-wrap gap-2">
            {heroTags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line bg-paper/70 px-3 py-1 text-xs tracking-wide text-ink-soft"
              >
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div {...stage(2.35)} className="mt-7">
            <LiveStatus />
          </motion.div>

          <motion.div {...stage(2.6)} className="mt-10">
            <motion.p
              className="font-hand text-2xl text-wine"
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            >
              turn the page ↓
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.9, ease: EASE }}
          className="hidden justify-self-end md:block"
        >
          <MiniKriya pose="working" width={280} />
        </motion.div>
      </div>
    </section>
  );
}
