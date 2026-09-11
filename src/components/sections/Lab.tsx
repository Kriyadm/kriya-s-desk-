import { motion } from "framer-motion";

import { Kicker, Reveal, SectionTitle } from "@/components/Bits";
import { labNotes } from "@/data/content";

const bars = [
  { label: "LogReg", value: 0.86 },
  { label: "RF", value: 0.94 },
  { label: "SVM", value: 0.9 },
];

export function Lab() {
  return (
    <section id="lab" className="scroll-mt-20 bg-paper-3 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Kicker>chapter three.</Kicker>
          <SectionTitle>The lab.</SectionTitle>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="grid gap-4">
            {labNotes.map((n, i) => (
              <Reveal key={n.title} delay={i * 0.07}>
                <article className="paper-card rounded-lg border-l-4 border-l-wine p-5">
                  <h3 className="font-display text-2xl text-ink">{n.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{n.body}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="paper-card rounded-lg p-6">
              <p className="font-hand text-2xl text-wine">the pipeline —</p>
              <svg viewBox="0 0 320 90" className="mt-4 w-full" role="img" aria-label="Pipeline diagram: video frames to YOLO to DeepSORT">
                <motion.line
                  x1="18"
                  y1="45"
                  x2="302"
                  y2="45"
                  stroke="var(--gold)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                {[
                  { x: 6, label: "Video Frames" },
                  { x: 114, label: "YOLO" },
                  { x: 222, label: "DeepSORT" },
                ].map((b) => (
                  <g key={b.label}>
                    <rect
                      x={b.x}
                      y="28"
                      width="92"
                      height="34"
                      rx="5"
                      fill="var(--paper)"
                      stroke="var(--ink)"
                      strokeWidth="1.2"
                    />
                    <text
                      x={b.x + 46}
                      y="49"
                      textAnchor="middle"
                      fontSize="10"
                      fill="var(--ink)"
                      fontFamily="var(--font-sans)"
                    >
                      {b.label}
                    </text>
                  </g>
                ))}
              </svg>

              <p className="mt-8 font-hand text-2xl text-wine">model comparison —</p>
              <div className="mt-4 flex h-40 items-end gap-6">
                {bars.map((b, i) => (
                  <div key={b.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                    <motion.div
                      className="w-full origin-bottom rounded-t bg-wine"
                      style={{ height: `${b.value * 100}%` }}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.15 * i, ease: [0.2, 0.65, 0.3, 0.9] }}
                    />
                    <span className="text-xs text-ink-soft">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
