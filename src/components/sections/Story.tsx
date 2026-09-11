import { Kicker, Pill, Reveal, SectionTitle } from "@/components/Bits";
import { MiniKriya } from "@/components/MiniKriya";
import { TiltCard } from "@/components/TiltCard";
import { toolkit, traits } from "@/data/content";

export function Story() {
  return (
    <section id="about" className="scroll-mt-20 bg-paper-2 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <Kicker>chapter one.</Kicker>
            <SectionTitle>The person behind the code.</SectionTitle>
          </Reveal>
          <div className="hidden text-right md:block">
            <MiniKriya pose="talking" width={250} />
            <p className="-mt-2 font-hand text-xl leading-tight text-ink">
              let me tell you a bit.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
          {traits.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.06}>
              <TiltCard baseRotate={i % 2 === 0 ? -1.4 : 1.4} className="h-full">
                <article className="paper-card relative h-full rounded-lg px-5 pb-5 pt-7">
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-3 h-2.5 w-2.5 rounded-full bg-gold shadow-[0_1px_3px_rgba(43,33,24,0.5)]"
                  />
                  <h3 className="font-display text-2xl text-ink">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.body}</p>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-14 font-hand text-2xl text-wine">the toolkit —</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {toolkit.map((t) => (
              <li key={t}>
                <Pill>{t}</Pill>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
