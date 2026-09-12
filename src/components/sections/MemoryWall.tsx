import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Kicker, Reveal, SectionTitle } from "@/components/Bits";

const STORAGE_KEY = "kriya-memory-wall-photos";
const CANVAS_H = 680;
const LAYOUT_VERSION = 2;

type Photo = {
  id: string;
  src: string;
  rotation: number;
  caption: string;
  x: number;
  y: number;
  layoutVersion?: number;
};

function cardSize(width: number) {
  if (width < 500) return 152;
  if (width < 800) return 184;
  return 208;
}

function collageSpot(index: number, width: number) {
  const size = cardSize(width);
  const desktopSlots = [
    [0.04, 62], [0.35, 18], [0.68, 76], [0.16, 292], [0.48, 252], [0.74, 356],
    [0.02, 454], [0.39, 448], [0.65, 510],
  ] as const;
  const mobileSlots = [
    [0.02, 42], [0.49, 116], [0.08, 254], [0.52, 344], [0.03, 470], [0.48, 518],
  ] as const;
  const slots = width < 560 ? mobileSlots : desktopSlots;
  const slot = slots[index % slots.length] ?? slots[0];
  if (!slot) return { x: 8, y: 8 };
  const layer = Math.floor(index / slots.length);
  return {
    x: Math.max(8, Math.min(width - size - 8, width * slot[0] + layer * 12)),
    y: Math.max(8, Math.min(CANVAS_H - size - 28, slot[1] + layer * 18)),
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
            p.layoutVersion === LAYOUT_VERSION
              ? p
              : { ...p, ...collageSpot(i, width), layoutVersion: LAYOUT_VERSION },
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
            ...collageSpot(prev.length + offset, width),
            layoutVersion: LAYOUT_VERSION,
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

  function moveOrSwap(id: string, x: number, y: number) {
    const width = canvasRef.current?.clientWidth ?? 900;
    const size = cardSize(width);
    const boundedX = Math.max(0, Math.min(width - size, x));
    const boundedY = Math.max(0, Math.min(CANVAS_H - size, y));
    setPhotos((prev) => {
      const moved = prev.find((photo) => photo.id === id);
      if (!moved) return prev;
      const target = prev.find(
        (photo) =>
          photo.id !== id &&
          Math.hypot(photo.x - boundedX, photo.y - boundedY) < size * 0.62,
      );
      if (!target) {
        return prev.map((photo) =>
          photo.id === id ? { ...photo, x: boundedX, y: boundedY } : photo,
        );
      }
      return prev.map((photo) => {
        if (photo.id === id) return { ...photo, x: target.x, y: target.y };
        if (photo.id === target.id) return { ...photo, x: moved.x, y: moved.y };
        return photo;
      });
    });
  }

  function shuffle() {
    const width = canvasRef.current?.clientWidth ?? 900;
    setPhotos((prev) =>
      prev.map((p, i) => ({
        ...p,
        ...collageSpot(i, width),
        rotation: Math.random() * 8 - 4,
        layoutVersion: LAYOUT_VERSION,
      })),
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
            Drag a photo onto another to swap their places, or leave it anywhere you like. Rename,
            open and rearrange every memory — the collage stays saved in this browser.
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
          className="memory-collage relative mt-10 overflow-hidden rounded-md border border-line"
          style={{ height: CANVAS_H }}
        >
          <div aria-hidden="true" className="absolute left-[5%] top-7 h-16 w-24 -rotate-6 border border-line bg-paper-3/70" />
          <div aria-hidden="true" className="absolute right-[7%] top-8 font-hand text-5xl text-wine/50">↙</div>
          <div aria-hidden="true" className="absolute bottom-9 left-[7%] text-5xl text-gold/60">✿</div>
          <div aria-hidden="true" className="absolute bottom-8 right-[5%] h-12 w-28 rotate-3 border-y border-dashed border-line bg-paper/40" />
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
                  onDragEnd={(_, info) => moveOrSwap(p.id, p.x + info.offset.x, p.y + info.offset.y)}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1, rotate: p.rotation, x: p.x, y: p.y }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 20 }}
                  whileDrag={{ rotate: 0, scale: 1.06, zIndex: 30 }}
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                  className="group absolute left-0 top-0 cursor-grab touch-none active:cursor-grabbing"
                >
                  <div className="bg-paper p-2 pb-8 shadow-lg sm:p-3 sm:pb-9">
                    <button
                      onClick={() => setLightbox(p)}
                      className="block"
                      aria-label={`Open ${p.caption || "photo"}`}
                    >
                      <img
                        src={p.src}
                        alt={p.caption || "A pinned memory"}
                        draggable={false}
                        className="h-28 w-28 select-none object-cover sm:h-36 sm:w-36 md:h-40 md:w-40"
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
                        className="mt-1 w-28 rounded-sm border border-line bg-paper px-1 font-hand text-base text-ink sm:w-36 md:w-40 md:text-lg"
                      />
                    ) : (
                      <p className="mt-1 flex w-28 items-center gap-1 font-hand text-base text-ink sm:w-36 md:w-40 md:text-lg">
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
