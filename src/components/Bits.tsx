import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.2, 0.65, 0.3, 0.9] as const;

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="font-hand text-2xl text-wine">
      {children}
      <span className="ml-2 inline-block h-px w-16 align-middle bg-line" />
    </p>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-1 text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
      {children}
    </h2>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line bg-paper-2/70 px-3 py-1 text-xs tracking-wide text-ink-soft">
      {children}
    </span>
  );
}

export function LinkedInMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM2.9 21h4.16V9.6H2.9V21Zm7.2-11.4V21h4.16v-6.2c0-1.66.63-2.6 2-2.6 1.25 0 1.86.86 1.86 2.6V21H22.3v-6.9c0-3.24-1.73-4.8-4.32-4.8-2.08 0-3.02 1.14-3.55 1.95V9.6H10.1Z" />
    </svg>
  );
}

export function GitHubMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 1.8a10.2 10.2 0 0 0-3.23 19.88c.51.1.7-.22.7-.49v-1.7c-2.84.62-3.44-1.37-3.44-1.37-.46-1.18-1.14-1.5-1.14-1.5-.93-.63.07-.62.07-.62 1.03.08 1.57 1.06 1.57 1.06.91 1.57 2.4 1.12 2.98.85.1-.66.36-1.12.65-1.38-2.27-.26-4.65-1.13-4.65-5.05 0-1.12.4-2.03 1.05-2.75-.11-.26-.46-1.3.1-2.71 0 0 .86-.27 2.8 1.05a9.7 9.7 0 0 1 5.1 0c1.94-1.32 2.8-1.05 2.8-1.05.56 1.41.21 2.45.1 2.71.66.72 1.05 1.63 1.05 2.75 0 3.93-2.39 4.79-4.67 5.04.37.32.7.94.7 1.9v2.82c0 .27.18.6.7.49A10.2 10.2 0 0 0 12 1.8Z" />
    </svg>
  );
}
