import { useState } from "react";

import { Kicker, Reveal, SectionTitle } from "@/components/Bits";
import { experience } from "@/data/content";

const filters = ["All", "Engineering", "Design & Content"] as const;
type Filter = (typeof filters)[number];

export function Experience() {
  const [filter, setFilter] = useState<Filter>("All");
  const items = experience.filter((e) => filter === "All" || e.track === filter);

  return (
    <section id="experience" className="scroll-mt-20 bg-paper px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Kicker>chapter two.</Kicker>
          <SectionTitle>Experience.</SectionTitle>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-soft">
            Engineering internships, machine learning work, and the design and content roles
            I&apos;ve held alongside them.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`rounded-full border px-4 py-1.5 text-xs tracking-wide transition-colors ${
                filter === f
                  ? "border-wine bg-wine text-paper"
                  : "border-line text-ink-soft hover:text-ink"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <ol className="mt-12 border-l border-line pl-6 sm:pl-8">
          {items.map((e, i) => (
            <Reveal key={`${e.org}-${e.role}`} delay={i * 0.05}>
              <li className="relative pb-12 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[1.9rem] top-2 h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-paper sm:-left-[2.4rem]"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-2xl leading-tight text-ink">{e.role}</h3>
                  <p className="text-xs uppercase tracking-[0.16em] text-ink-soft">{e.period}</p>
                </div>
                <p className="mt-1 text-sm text-wine">{e.org}</p>
                <p className="mt-2 inline-block rounded-full border border-line px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-gold">
                  {e.track}
                </p>
                <ul className="mt-4 space-y-2">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-wine" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
