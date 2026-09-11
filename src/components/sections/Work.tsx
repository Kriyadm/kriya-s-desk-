import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

import { Kicker, Reveal, SectionTitle } from "@/components/Bits";
import { projects } from "@/data/content";

export function Work() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="work" className="scroll-mt-20 bg-paper-2 px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Kicker>chapter three.</Kicker>
          <SectionTitle>Project archive.</SectionTitle>
        </Reveal>

        <div className="mt-12 border-t border-line">
          {projects.map((p, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={p.title} delay={i * 0.05}>
                <div className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-4 py-6 text-left"
                  >
                    <span className="mt-1 font-hand text-xl text-gold">0{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-2xl leading-tight text-ink sm:text-3xl">
                        {p.title}
                      </span>
                      <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-ink-soft">
                        {p.meta}
                      </span>
                      <span className="mt-2 block text-sm text-ink-soft">{p.blurb}</span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className="mt-2 shrink-0 text-wine"
                    >
                      <Plus className="h-5 w-5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.2, 0.65, 0.3, 0.9] }}
                        className="overflow-hidden"
                      >
                        <dl className="grid gap-4 pb-7 pl-10 pr-2 sm:grid-cols-2">
                          {[
                            ["Problem", p.problem],
                            ["Built", p.built],
                            ["Tech", p.tech],
                            ["Result", p.result],
                          ]
                            .filter(([, v]) => v)
                            .map(([k, v]) => (
                              <div key={k as string}>
                                <dt className="font-hand text-lg text-wine">{k}</dt>
                                <dd className="text-sm text-ink-soft">{v}</dd>
                              </div>
                            ))}
                        </dl>
                        {p.links && (
                          <ul className="flex flex-wrap gap-2 pb-6 pl-10">
                            {p.links.map((l) => (
                              <li
                                key={l}
                                className="rounded border border-dashed border-line px-2 py-1 text-xs text-ink-soft"
                              >
                                {l}
                              </li>
                            ))}
                          </ul>
                        )}
                        {p.stamp && (
                          <p className="mb-7 ml-10 inline-block -rotate-2 rounded border border-wine/40 px-3 py-1 font-hand text-xl text-wine">
                            {p.stamp}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
