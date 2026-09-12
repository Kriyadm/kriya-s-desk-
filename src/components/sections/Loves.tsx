import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, ImagePlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Kicker, Reveal, SectionTitle } from "@/components/Bits";
import { MiniKriya } from "@/components/MiniKriya";
import { TiltCard } from "@/components/TiltCard";
import { books, designSwatches, magazines, movieTickets, receiptLines, techLoves } from "@/data/content";

const tabs = ["Tech", "Design", "Magazines", "Books", "Movies", "Food"] as const;
type Tab = (typeof tabs)[number];

export function Loves() {
  const [tab, setTab] = useState<Tab>("Tech");

  return (
    <section id="loves" className="scroll-mt-20 bg-paper px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Kicker>chapter five.</Kicker>
          <SectionTitle>Things I love.</SectionTitle>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-1 border-b border-line" role="tablist" aria-label="Things I love">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`relative px-4 py-2 text-sm transition-colors ${
                tab === t ? "text-wine" : "text-ink-soft hover:text-ink"
              }`}
            >
              {t}
              {tab === t && (
                <motion.span
                  layoutId="loves-underline"
                  className="absolute inset-x-2 -bottom-px h-0.5 bg-wine"
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-10 min-h-[22rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.2, 0.65, 0.3, 0.9] }}
            >
              {tab === "Tech" && <TechTab />}
              {tab === "Design" && <DesignTab />}
              {tab === "Magazines" && <MagazineTab />}
              {tab === "Books" && <BooksTab />}
              {tab === "Movies" && <MoviesTab />}
              {tab === "Food" && <FoodTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function TechTab() {
  return (
    <div className="flex flex-wrap items-center gap-10 md:flex-nowrap">
      <div className="grid min-w-0 flex-1 gap-5 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
        {techLoves.map((t, i) => (
          <TiltCard key={t.title} baseRotate={i % 2 ? 1.4 : -1.4} className="h-full">
            <article className="paper-card h-full rounded-lg p-5">
              <h3 className="font-display text-xl leading-tight text-ink">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.body}</p>
            </article>
          </TiltCard>
        ))}
      </div>
      <div className="hidden lg:block">
        <MiniKriya pose="working" width={200} />
      </div>
    </div>
  );
}

function DesignTab() {
  return (
    <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(190px,1fr))]">
      {designSwatches.map((s, i) => (
        <TiltCard key={s.title} baseRotate={i % 2 ? 2.5 : -2.5}>
          <article className="paper-card rounded-md p-3">
            <div
              className="h-32 rounded-sm"
              style={{
                background:
                  i % 2
                    ? "linear-gradient(160deg, var(--wine), var(--rose))"
                    : "linear-gradient(160deg, var(--gold), var(--paper-3))",
              }}
            />
            <h3 className="mt-3 font-display text-lg text-ink">{s.title}</h3>
            <p className="text-xs text-ink-soft">{s.link}</p>
          </article>
        </TiltCard>
      ))}
    </div>
  );
}

function MagazineTab() {
  const [covers, setCovers] = useState<Record<number, string>>({});
  const fileRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kriya-magazine-covers");
      if (saved) setCovers(JSON.parse(saved) as Record<number, string>);
    } catch {
      /* Keep the gallery usable if browser storage is unavailable. */
    }
  }, []);

  function saveCover(index: number, file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const next = { ...covers, [index]: String(reader.result) };
      setCovers(next);
      try {
        localStorage.setItem("kriya-magazine-covers", JSON.stringify(next));
      } catch {
        /* The selected cover remains visible for this session. */
      }
    };
    reader.readAsDataURL(file);
  }

  function removeCover(index: number) {
    const next = { ...covers };
    delete next[index];
    setCovers(next);
    try {
      localStorage.setItem("kriya-magazine-covers", JSON.stringify(next));
    } catch {
      /* Ignore unavailable browser storage. */
    }
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {magazines.map((magazine, index) => (
        <article key={magazine.url} className="group relative">
          <div className="paper-card overflow-hidden rounded-md p-3 transition-transform duration-300 group-hover:-translate-y-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-paper-3">
              {covers[index] ? (
                <img src={covers[index]} alt={`${magazine.title} cover`} className="h-full w-full object-cover" />
              ) : (
                <button
                  type="button"
                  onClick={() => fileRefs.current[index]?.click()}
                  className="flex h-full w-full flex-col items-center justify-center gap-3 px-5 text-center text-ink-soft transition-colors hover:text-wine"
                >
                  <ImagePlus className="h-7 w-7" aria-hidden="true" />
                  <span className="text-sm">Add cover image</span>
                </button>
              )}
              {covers[index] && (
                <button
                  type="button"
                  onClick={() => removeCover(index)}
                  aria-label={`Remove ${magazine.title} cover`}
                  className="absolute right-2 top-2 rounded-full bg-wine p-1.5 text-paper opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
              <input
                ref={(element) => {
                  fileRefs.current[index] = element;
                }}
                type="file"
                accept="image/*"
                className="hidden"
                aria-label={`Choose a cover for ${magazine.title}`}
                onChange={(event) => {
                  saveCover(index, event.target.files?.[0]);
                  event.target.value = "";
                }}
              />
            </div>
            <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-gold">
              issue no. {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-1 font-display text-lg leading-tight text-ink">{magazine.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">{magazine.detail}</p>
            <a
              href={magazine.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-wine underline decoration-rose underline-offset-4"
            >
              Read on Canva
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

function BooksTab() {
  const [active, setActive] = useState<number | null>(null);
  const colors = ["var(--wine)", "var(--gold)", "var(--wine-deep)", "var(--rose)", "var(--ink)"];
  return (
    <div className="flex flex-wrap items-end gap-10 md:flex-nowrap">
      <div className="min-w-0 flex-1">
        <div className="flex items-end gap-2 overflow-x-auto border-b-8 border-paper-3 pb-2">
          {books.map((b, i) => (
            <button
              key={b.title}
              onClick={() => setActive(active === i ? null : i)}
              aria-pressed={active === i}
              className="shrink-0 rounded-t px-3 py-4 text-paper transition-transform hover:-translate-y-2"
              style={{
                background: colors[i % colors.length],
                height: `${190 + (i % 3) * 26}px`,
                writingMode: "vertical-rl",
              }}
            >
              <span className="font-display text-sm tracking-wide">{b.title}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {active !== null && (
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 font-hand text-2xl text-wine"
            >
              {books[active]?.note}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="hidden md:block">
        <MiniKriya pose="reading" width={190} />
      </div>
    </div>
  );
}

function MoviesTab() {
  return (
    <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-4">
      {movieTickets.map((m) => (
        <article
          key={m.title}
          className="relative min-w-[15rem] shrink-0 rounded-md border-2 border-dashed border-line bg-paper-2/70 p-6"
        >
          <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-paper" />
          <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-paper" />
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold">ticket stub</p>
          <h3 className="mt-2 font-display text-xl text-ink">{m.title}</h3>
          <p className="mt-2 font-hand text-lg text-wine">{m.note}</p>
        </article>
      ))}
    </div>
  );
}

function FoodTab() {
  return (
    <div className="flex flex-wrap items-center gap-10 md:flex-nowrap">
      <article className="paper-card -rotate-2 rounded-sm p-6 md:max-w-sm">
        <h3 className="text-center font-display text-lg tracking-[0.18em] text-ink">
          AHMEDABAD FIELD NOTES
        </h3>
        <div className="my-4 border-t border-dashed border-line" />
        <ul className="space-y-2 text-sm text-ink-soft">
          {receiptLines.map((l) => (
            <li key={l} className="flex justify-between gap-4">
              <span>{l}</span>
              <span className="text-wine">✓</span>
            </li>
          ))}
        </ul>
        <div className="my-4 border-t border-dashed border-line" />
        <p className="flex justify-between font-hand text-xl text-wine">
          <span>Total research hours</span>
          <span>[MANY]</span>
        </p>
      </article>
      <div className="hidden md:block">
        <MiniKriya pose="eating" width={200} />
      </div>
    </div>
  );
}
