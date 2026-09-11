import { motion } from "framer-motion";
import { Download, Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { GitHubMark, LinkedInMark, Reveal } from "@/components/Bits";
import { MiniKriya } from "@/components/MiniKriya";
import { contact } from "@/data/content";

function ContactLink({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="flex items-center gap-3 border-b border-rose/30 py-3 text-paper"
    >
      <span className="text-rose">{icon}</span>
      <span className="text-sm">{label}</span>
    </motion.a>
  );
}

export function PingMe() {
  return (
    <section id="contact" className="scroll-mt-20 bg-wine-deep px-5 pt-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-hand text-2xl text-rose">cut to:</p>
          <h2 className="mt-1 font-display text-4xl leading-[1.05] tracking-tight text-paper sm:text-5xl md:text-6xl">
            The next chapter.
          </h2>
          <p className="mt-5 max-w-lg text-paper/80">
            Want to build something interesting together?
          </p>
        </Reveal>

        <div className="mt-12 grid items-end gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
          <Reveal delay={0.1}>
            <div className="max-w-md">
              <ContactLink
                href={`mailto:${contact.email}`}
                icon={<Mail className="h-4 w-4" aria-hidden="true" />}
                label={contact.email}
              />
              <ContactLink
                href={contact.phoneHref}
                icon={<Phone className="h-4 w-4" aria-hidden="true" />}
                label={contact.phoneLabel}
              />
              <ContactLink
                href={contact.linkedin}
                icon={<LinkedInMark />}
                label="linkedin.com/in/kriya-m"
                external
              />
              <ContactLink
                href={contact.github}
                icon={<GitHubMark />}
                label="github.com/Kriyadm"
                external
              />

              <motion.a
                href={contact.resume}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3 }}
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-rose px-5 py-3 text-sm font-medium text-wine-deep"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download Resume
              </motion.a>
            </div>
          </Reveal>

          <div className="justify-self-center md:justify-self-end">
            <MiniKriya pose="farewell" width={240} />
          </div>
        </div>

        <footer className="mt-20 pb-16">
          <p className="font-hand text-3xl text-rose">THE END... FOR NOW.</p>
          <p className="mt-3 text-sm text-paper">
            Kriya Morabia — AI/ML · Software Engineering · Design · Storytelling
          </p>
          <p className="mt-1 text-sm text-paper/60">
            Designed with too many tabs open and one very persistent tiny character. No templates
            were harmed.
          </p>
        </footer>
      </div>
    </section>
  );
}
