import { createFileRoute } from "@tanstack/react-router";

import { CurtainIntro, GrainOverlay } from "@/components/CurtainIntro";
import { Nav } from "@/components/Nav";
import { RoamingKriya } from "@/components/MiniKriya";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Lab } from "@/components/sections/Lab";
import { Loves } from "@/components/sections/Loves";
import { MemoryWall } from "@/components/sections/MemoryWall";
import { PingMe } from "@/components/sections/PingMe";
import { Story } from "@/components/sections/Story";
import { Work } from "@/components/sections/Work";

const title = "Kriya Morabia — AI/ML, Software Engineering, Design & Storytelling";
const description =
  "The Notebook Desk: portfolio of Kriya Morabia — computer engineer, AI/ML builder, designer and social media storyteller.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <CurtainIntro />
      <GrainOverlay />
      <Nav />
      <RoamingKriya />
      <main>
        <Hero />
        <Story />
        <Experience />
        <Work />
        <Lab />
        <Loves />
        <MemoryWall />
        <PingMe />
      </main>
    </>
  );
}
