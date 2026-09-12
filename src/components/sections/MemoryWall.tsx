import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Kicker, Reveal, SectionTitle } from "@/components/Bits";

const STORAGE_KEY = "kriya-memory-wall-photos";
const CANVAS_H = 620;
const CARD = 200;

type Photo = {
  id: string;
  src: string;
  rotation: number;
  caption: string;
  x: number;
  y: number;
};

function randomSpot(index: number, width: number) {
  const cols = Math.max(1, Math.floor((width - 40) / (CARD + 20)));
  const col = index % cols;
  const row = Math.floor(index / cols);
  const jitterX = Math.random() * 40 - 20;
  const jitterY = Math.random() * 40 - 20;
  return {
    x: Math.max(8, Math.min(width - CARD - 8, 20 + col * (CARD + 24) + jitterX)),
    y: Math.max(8, Math.min(CANVAS_H - CARD - 40, 24 + row * (CARD + 30) + jitterY)),
  };
}

export function MemoryWall() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Photo[];
        const width = canvasRef.current?.clientWidth ?? 900;
        setPhotos(
          saved.map((p, i) =>
            typeof p.x === "number" && typeof p.y === "number" ? p : { ...p, ...randomSpot(i, width) },
          ),
        );
      }
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
    const width = canvasRef.current?.clientWidth ?? 900;
    Array.from(files).forEach((file, offset) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotos((prev) => [
          ...prev,
          {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            src: String(reader.result),
            rotation: Math.random() * 10 - 5,
            caption: file.name.replace(/\.[^.]+$/, ""),
            ...randomSpot(prev.length + offset, width),
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

  function rename(id: string, caption: string) {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, caption } : p)));
  }

  function moveTo(id: string, x: number, y: number) {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, x, y } : p)));
  }

  function shuffle() {
    const width = canvasRef.current?.clientWidth ?? 900;
    setPhotos((prev) =>
      prev.map((p, i) => ({ ...p, ...randomSpot(i, width), rotation: Math.random() * 10 - 5 })),
    );
  }

  return (
    <section id="memory-wall" className="scroll-mt-20 bg-paper-2 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker>chapter six.</Kicker>
              <SectionTitle>The memory wall.</SectionTitle>
            </div>
            <div className="flex gap-2">
              {photos.length > 1 && (
                <button
                  onClick={shuffle}
                  className="rounded-md border border-line px-4 py-2 text-sm text-ink transition-transform hover:-translate-y-0.5"
                >
                  Scatter again
                </button>
              )}
              <button
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-md bg-wine px-4 py-2 text-sm text-paper transition-transform hover:-translate-y-0.5"
              >
                <Upload className="h-4 w-4" aria-hidden="true" />
                Add photos
              </button>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
            Drag the photos anywhere on the board, tap the pencil to rename one, and click a photo to
            see it big. Everything you pin stays in this browser after a refresh.
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

        <div
          ref={canvasRef}
          className="relative mt-10 overflow-hidden rounded-lg border-2 border-dashed border-line bg-paper/50"
          style={{ height: CANVAS_H }}
        >
          {photos.length === 0 ? (
            <button
              onClick={() => inputRef.current?.click()}
              className="grid h-full w-full place-items-center font-hand text-3xl text-wine"
            >
              pin your first photo here ✦
            </button>
          ) : (
            <AnimatePresence>
              {photos.map((p) => (
                <motion.div
                  key={p.id}
                  drag
                  dragConstraints={canvasRef}
                  dragElastic={0.08}
                  dragMomentum={false}
                  onDragEnd={(_, info) => moveTo(p.id, p.x + info.offset.x, p.y + info.offset.y)}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1, rotate: p.rotation, x: p.x, y: p.y }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 20 }}
                  whileDrag={{ rotate: 0, scale: 1.06, zIndex: 30 }}
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                  className="group absolute left-0 top-0 cursor-grab active:cursor-grabbing"
                >
                  <div className="bg-white p-3 pb-9 shadow-[0_18px_34px_-20px_rgba(43,33,24,0.85)]">
                    <button
                      onClick={() => setLightbox(p)}
                      className="block"
                      aria-label={`Open ${p.caption || "photo"}`}
                    >
                      <img
                        src={p.src}
                        alt={p.caption || "A pinned memory"}
                        draggable={false}
                        className="h-40 w-40 select-none object-cover"
                      />
                    </button>
                    {editing === p.id ? (
                      <input
                        autoFocus
                        defaultValue={p.caption}
                        aria-label="Photo name"
                        onBlur={(e) => {
                          rename(p.id, e.target.value);
                          setEditing(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") e.currentTarget.blur();
                          if (e.key === "Escape") setEditing(null);
                        }}
                        className="mt-1 w-40 rounded-sm border border-line bg-paper px-1 font-hand text-lg text-ink"
                      />
                    ) : (
                      <p className="mt-1 flex w-40 items-center gap-1 font-hand text-lg text-ink">
                        <span className="truncate">{p.caption || "untitled"}</span>
                        <button
                          onClick={() => setEditing(p.id)}
                          aria-label={`Rename ${p.caption || "photo"}`}
                          className="shrink-0 text-ink-soft hover:text-wine"
                        >
                          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </p>
                    )}
                  </div>
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
          )}
        </div>
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
              <p className="mt-3 text-center font-hand text-2xl text-paper">{lightbox.caption}</p>
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
