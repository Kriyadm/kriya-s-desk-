import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { navItems } from "@/data/content";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3"
      >
        <button
          onClick={() => scrollToId("hero")}
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          K. Morabia
        </button>

        <ul className="hidden items-end gap-1 min-[860px]:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToId(item.id)}
                className="rounded-t-md border border-transparent px-3 py-2 text-sm text-ink-soft transition-colors hover:border-line hover:border-b-transparent hover:bg-paper-2 hover:text-wine"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="min-[860px]:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-paper px-5 min-[860px]:hidden"
          >
            {navItems.map((item) => (
              <li key={item.id} className="border-b border-line last:border-0">
                <button
                  onClick={() => {
                    setOpen(false);
                    scrollToId(item.id);
                  }}
                  className="w-full py-3 text-left text-sm text-ink"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
