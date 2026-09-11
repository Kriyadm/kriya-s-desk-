import { AnimatePresence, motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Kicker, Reveal, SectionTitle } from "@/components/Bits";

const STORAGE_KEY = "kriya-memory-wall-photos";

type Photo = { id: string; src: string; rotation: number; caption: string };

export function MemoryWall() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setPhotos(JSON.parse(raw) as Photo[]);
    } catch {
      /* ignore unreadable storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch {
      /* storage full — photos stay for this session only */
    }
  }, [photos, ready]);

  function handleFiles(files: FileList | null) {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos((prev) => [
          ...prev,
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            src: String(reader.result),
            rotation: Math.random() * 8 - 4,
            caption: file.name.replace(/\.[^.]+$/, ""),
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  }

  function remove(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    setLightbox((cur) => (cur?.id === id ? null : cur));
  }

  return (
    <section id="memory-wall" className="scroll-mt-20 bg-paper-2 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker>chapter five.</Kicker>
              <SectionTitle>The memory wall.</SectionTitle>
            </div>
            <button
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-md bg-wine px-4 py-2 text-sm text-paper transition-transform hover:-translate-y-0.5"
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              Add photos
            </button>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
            A rolling scrapbook — hackathons, campus life, the chaos and the good moments. Photos
            you add here live in your browser&apos;s local storage, so they&apos;ll stay after a
            refresh but only on this device.
          </p>
        </Reveal>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          aria-label="Choose photos to pin to the memory wall"
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
        />

        {photos.length === 0 ? (
          <button
            onClick={() => inputRef.current?.click()}
            className="mt-10 grid h-56 w-full place-items-center rounded-lg border-2 border-dashed border-line bg-paper/50 font-hand text-3xl text-wine"
          >
            pin your first photo here ✦
          </button>
        ) : (
          <motion.div layout className="mt-10 flex flex-wrap gap-6">
            <AnimatePresence>
              {photos.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1, rotate: p.rotation }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  className="group relative"
                >
                  <button
                    onClick={() => setLightbox(p)}
                    className="block bg-white p-3 pb-8 shadow-[0_16px_30px_-20px_rgba(43,33,24,0.8)]"
                  >
                    <img
                      src={p.src}
                      alt={p.caption || "A pinned memory"}
                      className="h-44 w-44 object-cover"
                    />
                    <span className="absolute bottom-2 left-3 right-3 truncate font-hand text-lg text-ink">
                      {p.caption}
                    </span>
                  </button>
                  <button
                    onClick={() => remove(p.id)}
                    aria-label={`Remove ${p.caption || "photo"}`}
                    className="absolute -right-2 -top-2 hidden rounded-full bg-wine p-1 text-paper group-hover:block focus-visible:block"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-wine-deep/90 p-6"
          >
            <div className="relative max-h-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={lightbox.src}
                alt={lightbox.caption || "A pinned memory"}
                className="max-h-[80vh] max-w-full bg-white p-3"
              />
              <div className="mt-4 flex justify-center gap-3">
                <button
                  onClick={() => remove(lightbox.id)}
                  className="rounded-md border border-rose px-3 py-1.5 text-sm text-rose"
                >
                  Remove photo
                </button>
                <button
                  onClick={() => setLightbox(null)}
                  aria-label="Close photo"
                  className="rounded-md bg-paper px-3 py-1.5 text-sm text-ink"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
