# Kriya's Notebook Desk

# LOVABLE PROMPT — "The Notebook Desk" — Kriya Morabia Portfolio (Full, Current Version)

This is the complete, up-to-date prompt. It supersedes any earlier portfolio prompts — paste this one in on its own; you don't need the older files.

---

## 0. WHAT THIS IS

A personal portfolio for **Kriya Morabia** — B.Tech Computer Engineering (minor: Marketing) at Nirma University, admitted to NJIT for a Master's — who is equally a **software/AI-ML builder** and a **social media content creator, visual storyteller, and graphics/marketing person** (CSI Nirma social media & graphics core team, Storytellers Club graphics head, campus content work, event brand work). Do NOT build a generic developer portfolio template. No Bootstrap cards, no purple/blue SaaS gradients, no glassmorphism, no default Inter/Poppins typography, no "About / Skills / Projects / Contact" section names.

Concept: **"The Notebook Desk"** — the site feels like looking down at Kriya's personal desk/journal: warm paper texture, handwritten annotations, book-spine and film-ticket motifs, and a small recurring illustrated character ("mini-Kriya," always wearing glasses) who appears in a different contextual pose per section. Editorial and premium, not scrapbook-cluttered.

Test before calling any part finished: **if you swapped the name for a random person, would it look identical?** If yes, redesign that part.

---

## 1. TECH STACK

- React + TypeScript, Vite
- Tailwind CSS v4, fully customized theme tokens (no default palette)
- Framer Motion for all animation
- lucide-react for generic icons (Mail, Phone, Download, Upload, X, Menu); LinkedIn and GitHub use small hand-built inline SVG marks since brand icons aren't guaranteed to exist in every icon-library version
- No backend. Content lives in one `src/data/content.ts` file. The Memory Wall (section 10) uses browser `localStorage` for persistence — this is a real, deployed site, not an in-chat preview, so `localStorage` is appropriate here.

---

## 2. DESIGN SYSTEM

### Palette (theme tokens, not default Tailwind colors)
```
paper:      #F3ECE1   paper-2: #EBE1D2   paper-3: #E4D7C4
ink:        #2B2118
wine:       #6E2B33   wine-deep: #4A1D24
rose:       #C98A82
gold:       #B98A4E
line:       rgba(43,33,24,0.16)
```
Background: paper color with a subtle 22px dot-grid texture (~6% opacity) for a textured-paper feel.

### Typography (load from Google Fonts — never Inter/Roboto/Poppins/Montserrat)
- **Fraunces** (400–700, italic available) — all headings, hero name, section titles
- **Space Grotesk** (400/500/600) — body copy, tags, nav, technical details
- **Caveat** (500/600) — handwritten touches only: chapter kickers, sticky-note stamps, speech-bubble text. Never body copy.

### Motion language — "more cinematic and real-time," specifically:
1. **Curtain-opening intro** — on first page load only, two `wine-deep` panels cover the full screen and slide apart from center (like a cinema curtain), revealing the hero underneath. Runs once (~1.3s total), skipped entirely if `prefers-reduced-motion` is set. A small handwritten "once upon a time" can fade on the left panel as it exits.
2. **Live status line in the hero** — a small real-time clock (updates every second, format `HH:MM:SS`) next to a pulsing dot, followed by rotating text: "right now, probably — {cycling activity}" that cycles through a short list of playful activities every ~3 seconds with a fade/slide transition. This is the "real-time" feel: the page visibly reflects the current moment, not a static screenshot.
3. **Cursor-driven 3D tilt** on key cards (personality trait cards, design swatches) — build a reusable `TiltCard` wrapper that tracks mouse position within the card and applies real per-frame `rotateX`/`rotateY` via Framer Motion `useMotionValue` + `useTransform` + a spring, springing back to flat on mouse leave. This is a genuine pointer-tracking effect, not a fixed CSS `:hover` transform.
4. **Scroll-triggered reveals** — every section's content fades/rises in via `whileInView`, `once: true`, custom ease `[0.2, 0.65, 0.3, 0.9]`.
5. **Subtle film-grain + vignette overlay** — a fixed, full-viewport, `pointer-events-none` layer sitting just below the nav in z-index: faint noise texture (SVG `feTurbulence` or a tiny repeating grain pattern) at ~4% opacity, blended with `mix-blend-mode: overlay`, plus a very soft radial vignette darkening the far edges of the viewport. This should be nearly subliminal — it should make the whole page feel a touch more "filmic" without anyone consciously noticing a grain layer is there.
6. Respect `prefers-reduced-motion` globally — this disables the curtain intro, shortens/removes all other transitions, and disables smooth scroll.

---

## 3. THE MINI-KRIYA CHARACTER SYSTEM (required, six poses)

Shared identity (identical across every pose — put in a shared `theme.ts`):
```ts
skin: "#E9C9A8", hair: "#2B1B12", top: "#3F6B4F", topAccent: "#B98A4E",
pants: "#2B2118", glassesFrame: "#2B2118", glassesLens: "#F3ECE1", blush: "#C98A82"
```
Chibi proportions (big head, small body), dark wavy shoulder-length hair, warm skin tone, simple dot eyes, curved-line mouth, deep green top with gold trim, dark pants. **Round black-framed glasses are worn in every pose without exception** — this is her single defining, non-negotiable trait. Built entirely from SVG primitives, not raster images or a real photo — an original cartoon mascot, not a photorealistic likeness of anyone.

1. **Working** (Hero, bottom-right) — sitting cross-legged, open laptop in her lap, hands doing a small alternating typing-bob loop. Fades in last in the hero sequence.
2. **Talking** (About/"The Story," beside the section title) — standing, laptop now *closed* beside her, one arm slowly gesturing on a loop, small hand-drawn speech bubble with two short lines ("hi, i'm kriya —" / "let me tell you a bit."). Reads as the moment she puts the laptop away and starts talking.
3. **Reading** (inside the Books tab of "Things I Love") — sitting on a small stack of colored books, glasses lowered slightly like reading glasses, half-closed content eyes, a tiny looping sparkle near the book.
4. **Eating** (inside the Food tab of "Things I Love") — cross-legged with a small plate in her lap, one arm looping up toward her mouth, closed happy eyes, blush marks.
5. **Roaming** (floating, fixed bottom-right, default across every other section) — hidden during the hero, fades/scales in once scrolled past it; continuous slow idle sway (±1.5°) driven by nothing but time, vertical position driven by actual scroll progress (`useScroll` + spring-smoothed `useTransform`); waves via a quick keyframe arm-rotation sequence every ~9 seconds. Legs drawn mid-step to read as "wandering."
6. **Farewell** (Ping Me / contact section) — laptop closed on a small desk shape, tiny packed bag beside her, one arm on a continuous goodbye-wave loop. Larger/more detailed than the other poses — this is the closing illustration of the whole page.

Looping animation is allowed ONLY on: Roaming's sway+wave, Working's typing hands, Reading's sparkle, Eating's arm-to-mouth loop, Farewell's wave. Everything else animates once on scroll into view.

---

## 4. NAVIGATION

Fixed top bar, translucent paper background + blur, hairline bottom border. Left: "K. Morabia" wordmark (Fraunces semibold) linking to the hero. Journal-tab nav items, click-to-smooth-scroll:
- The Story → about
- The Work → work
- The Lab → lab
- Things I Love → loves
- Memory Wall → memory-wall
- Let's Talk → contact

Mobile (<860px): collapses to a hamburger dropdown with the same items.

---

## 5. HERO SECTION

Full viewport height, staged reveal (each stage delayed after the previous):
1. Italic serif line: *"Once upon a time, a techie fell in love with"*
2. Italic serif line: *"code, books, movies, good food, and beautifully designed things."*
3. Huge Fraunces display name: **Kriya Morabia** (own lines, ~8rem desktop, responsive)
4. Tag chips: `AI / ML` · `Software Engineering` · `Design` · `Content Creation` · `Storytelling`
5. **Live status line** (see section 2.2): pulsing dot + live clock + rotating "right now, probably —" activity text. Sample activities: "debugging something that worked five minutes ago," "rereading the same paragraph of a book," "rewatching a comfort movie instead of sleeping," "arguing internally about a font pairing," "considering food."
6. Handwritten "turn the page ↓" prompt, bobbing gently.
7. The **Working** mini-Kriya pose, bottom-right, fading in last.

Background: paper transitioning to `paper-2` toward the bottom.

---

## 6. SECTION: THE STORY (about)

Kicker: "chapter one." Title: "The person behind the code." Place the **Talking** pose beside the title.

Six trait cards (grid, auto-fit min 230px), each wrapped in the `TiltCard` component, alternating slight static rotation that straightens on hover, small gold "pin" dot at top-left:

- **Techie** — "I like building things and understanding how systems work — from a role-based asset tracker used across ~900 devices to a drone detection pipeline chewing through 27GB of video."
- **Bookworm** — "I disappear into fictional worlds on a fairly regular basis. Ask me what I'm currently living inside of."
- **Rom-com enthusiast** — "I will defend unrealistic movie relationships with zero shame and a fully prepared argument."
- **Foodie** — "Good food is a legitimate personality trait. I have opinions about every under-₹200 spot in Ahmedabad."
- **Bollywood girl** — "Music, movies, drama, nostalgia — in that order, usually all at once."
- **Design nerd** — "I care, maybe too much, about how things look, feel, and move — this site is proof."

Below the cards, a small handwritten kicker "the toolkit —" followed by a row of small pill chips: Canva · CapCut · Instagram Insights · Google Sheets · Reels & Stories · Caption Writing · Graphic Design · Campaign Support.

---

## 7. SECTION: THE WORK (project archive + experience)

Kicker: "chapter two." Title: "Project archive."

Expandable file-rows (click to expand/collapse with animated height, not CSS max-height hack). Real content — do not invent numbers not listed:

1. **IT Asset Management System** — SDE Intern · Elsamex (EMSL) · 2026. "Replaced a manual, error-prone Excel process with a real tracking-and-reporting system." Problem: 894 highway-infrastructure assets tracked manually. Built: role-based access system, ~100 API endpoints. Tech: full-stack, REST APIs, role-based auth. Result: ~99% data accuracy. Stamp: "this one taught me what 'production' actually means."
2. **Enterprise API Integration** — SDE Intern · Amnex Infotechnologies · 2025. "Integrated RESTful APIs across ~300 endpoints with a 15-person cross-functional team." Built: Angular + Spring Boot. Result: 27% system performance improvement.
3. **Paper to X** — Smart India Hackathon · 2025. "Turned academic papers into podcasts, reels, and visual summaries — in 48 hours." Built: NLP pipeline for text extraction + summarization feeding audio/video generation. Links: [ADD GITHUB LINK]. Stamp: "built on 0 sleep, mildly proud of it."
4. **Movie Genre Prediction & Recommendation** — Personal project · 2025. "A FastAPI + Angular app that predicts genres and recommends what to watch next — obviously I built this one." Built: TF-IDF + word-embedding classifier/recommender. Links: [ADD GITHUB LINK] · [ADD DEMO LINK]
5. **Task & Student Management System** — Personal project · 2025. "A full-stack platform for task tracking and student records — CRUD done properly." Tech: Angular, REST APIs, CRUD. Links: [ADD GITHUB LINK]

Below the archive, a handwritten sub-heading: **"also part of, along the way —"** followed by a card grid (not expandable, simpler than the file-rows above) with real volunteering/creative/campus experience:

1. **CSI Nirma** — Social Media & Graphics Core Team. "Managed social content and creatives, supported event promotions, and created audience-focused visual content."
2. **Storytellers Club, Nirma** — Graphics Head. "Led visual direction and created aesthetic, audience-focused graphics and storytelling content."
3. **Hostel Instagram Account** — Content Manager. "Created and curated relatable posts, Stories, short-form videos, and community content."
4. **Personal + Friends' Instagram** — Reels · Photography · Trends. "Short-form content, captions, trend-based posts, and visual stories around everyday moments."
5. **Campus Ambassador** — Global Colliance · Internshala · Mood Indigo, IIT Bombay. "Promoted events, campaigns, and opportunities through student-focused content, digital outreach, and audience engagement."
6. **Hungrito Food Fest 2025 + Hungrito High Street** — Event & Brand Experience. "Supported event execution, audience engagement, brand interaction, and on-ground content opportunities in food and lifestyle environments."

---

## 8. SECTION: THE LAB (AI/ML)

Kicker: "chapter three." Title: "The lab." Two-column layout (stacks on mobile).

Left: three lab-note cards —
- **Drone detection & tracking** — "Implemented YOLO for real-time detection and DeepSORT for multi-object tracking across a ~27GB video dataset, keeping identification consistent frame-to-frame."
- **Heart disease prediction** — "Logistic Regression, Random Forest and SVM compared after preprocessing and feature scaling; evaluated on accuracy, precision-recall and ROC-AUC. ~94% accuracy."
- **Earlier ML work** — "Applied data preprocessing, feature engineering and model evaluation across several internship projects (Bharat Intern, Codesoft), consistently landing ~94% model accuracy."

Right: a small SVG diagram — "Video Frames → YOLO → DeepSORT" boxes connected by a line that draws itself in on scroll (`pathLength` animation), plus a 3-bar comparison chart (LogReg / RF / SVM) whose bars grow in on scroll.

---

## 9. SECTION: THINGS I LOVE (merged — do not build these as four separate sections)

Kicker: "chapter four." Title: "Things I love." This single section replaces what would otherwise be four thin, repetitive sections — build it as **one section with an animated tab switcher** (underline that slides between tabs via a shared `layoutId`, content cross-fades with `AnimatePresence mode="wait"`):

**Tabs: Design · Magazines · Books · Movies · Food**

- **Design tab** — 4 small rotated "swatch" cards (paint-chip/Polaroid hybrid), each wrapped in `TiltCard`, spring-tilt-to-straight on hover: "UI experiment" [ADD FIGMA LINK], "Website concept" [ADD LINK], "Interaction study" [ADD LINK], "Visual exploration" [ADD LINK].
- **Magazines tab** — a **flip-open magazine cover card**: a `wine-deep` cover face reading "issue no. 01 / Birthday & Friendship Magazines / click to open →", which on click does a 3D `rotateY` flip (Framer Motion, `transformStyle: preserve-3d`, `backfaceVisibility: hidden` on both faces) to reveal the inside spread: "Conceptualized and designed personalized digital magazines — creative themes, layouts, captions, photo curation, and storytelling, made for the people I love." Add a small italic note: "[Add real spreads/photos from your birthday & friendship magazines here — the memory wall is a great place to drop scans or exports of these too.]"
- **Books tab** — horizontal bookshelf: 5 colored book "spines" of varying height sitting on a thick shelf border, vertical (writing-mode) titles, click to reveal a handwritten note below. Currently placeholders [BOOK ONE]–[BOOK FIVE]. Place the **Reading** mini-Kriya pose beside the shelf.
- **Movies tab** — horizontally scrollable ticket-stub cards (dashed border, circular notch cutouts) with placeholders: [ROM-COM PICK], [BOLLYWOOD PICK], [DIRECTOR / ACTOR], [COMFORT MOVIE].
- **Food tab** — a tilted "receipt" card titled "AHMEDABAD FIELD NOTES" with playful checked-off lines (What I ordered vs what I got ✓ / Hidden food gems you NEED to try ✓ / POV: came for 1 dish, stayed for 5 ✓ / Under ₹200 spots ✓ / Total research hours — [MANY]). Place the **Eating** mini-Kriya pose beside it.

---

## 10. SECTION: THE MEMORY WALL (new, functional — build this for real)

Kicker: "chapter five." Title: "The memory wall." This must be a **working feature**, not a static mockup:

- An "Add photos" button (Upload icon + label) that opens a hidden `<input type="file" accept="image/*" multiple>` on click.
- Selected files are read via `FileReader.readAsDataURL`, converted to an array of `{ id, src, rotation (random -4 to 4 deg), caption }` objects.
- Photos persist in `localStorage` (a clearly named key, e.g. `kriya-memory-wall-photos`) so they survive a page refresh on the same device/browser — read them back on mount with a `useEffect`.
- Rendered as a loose, slightly-scattered Polaroid-style grid: white photo "frame" with padding, drop shadow, each photo at its stored random rotation, straightening + lifting slightly on hover (`whileHover={{ rotate: 0, scale: 1.05 }}`), animated in/out with `layout` + `AnimatePresence` when added/removed.
- A small "x" remove button appears on hover per photo (only visible on hover, via a `group`/`group-hover` pattern), deletes that photo from state and localStorage.
- Clicking a photo opens a full-screen lightbox (dark overlay, click outside to close, larger image, its own remove button).
- Empty state: a large dashed-border drop-zone with handwritten copy like "pin your first photo here ✦", clickable to open the file picker.
- A short explanatory line under the title: "A rolling scrapbook — hackathons, campus life, the chaos and the good moments. Photos you add here live in your browser's local storage, so they'll stay after a refresh but only on this device."

---

## 11. SECTION: PING ME (contact — the finale)

Kicker: "cut to:". Title: "The next chapter." Section fully inverts to dark (`wine-deep` background, `paper` text, `rose` accents).

Copy: "Want to build something interesting together?"

Real, working contact links (icon + label, spring-lift on hover):
- **Email** — `mailto:kdmorabia@gmail.com`
- **Phone** — `tel:+918200578340`, displayed as `+91 8200578340`
- **LinkedIn** — `https://linkedin.com/in/kriya-m`, opens in new tab, custom inline SVG mark
- **GitHub** — `https://github.com/Kriyadm`, opens in new tab, custom inline SVG mark
- **Download Resume** — styled as a filled button (not just a text link) linking to `https://drive.google.com/drive/folders/1j98GqJHwW2YrWkGWvFZbm4KEqNKAM8eQ?usp=sharing`, opens in a new tab (it's currently a Drive folder, not a single PDF, so don't force a native download — swap to a direct file link later if one becomes available)

Place the **Farewell** mini-Kriya pose next to the links, not overlapping them.

Footer directly below (same dark background, no border between): handwritten "THE END... FOR NOW.", then "Kriya Morabia — AI/ML · Software Engineering · Design · Storytelling", then a closing line in her own voice, e.g. "Designed with too many tabs open and one very persistent tiny character. No templates were harmed."

---

## 12. RESPONSIVE + ACCESSIBILITY

- Fully responsive: desktop, tablet, mobile. Mobile nav collapses to a dropdown. Horizontal-scroll rows (bookshelf, movie tickets) stay scrollable with content visibly peeking at the edge.
- Semantic HTML, proper heading hierarchy, visible keyboard focus states on every interactive element (nav buttons, tabs, file-rows, book spines, memory-wall photos, contact links).
- Alt text / aria-labels on the character SVGs and icon-only buttons (upload, remove-photo, lightbox close).
- Sufficient contrast against both paper and wine-deep backgrounds.
- Full `prefers-reduced-motion` support: disables the curtain intro entirely, removes/shortens all other transitions, disables smooth scroll.
- On mobile, the dedicated character poses (Working, Talking, Reading, Eating) may shrink or hide (`hidden md:block`) if space is tight — but the floating Roaming character should still appear, and the Farewell pose should still render on the contact section.

---

## 13. FINAL QUALITY CHECK

- No default Tailwind blue/purple/gray — every color traces back to the section-2 palette.
- No section titled "About / Skills / Projects / Contact."
- Things I Love is ONE section with a tab switcher, not four separate sections.
- The Memory Wall actually uploads, persists (localStorage), displays, and lets you remove photos — this is a real feature, not a static image grid.
- Every mini-Kriya pose has glasses, no exceptions, and the right pose is in the right section (Working→Hero, Talking→Story, Reading→Books tab, Eating→Food tab, Roaming→everywhere else, Farewell→Ping Me).
- The curtain intro and film-grain overlay are present but subtle — should feel atmospheric, not gimmicky.
- Contact section has four real working links (email, phone, LinkedIn, GitHub) plus a resume button — none of them placeholder text.
- Ask: would this look the same with someone else's name on it? If yes, revisit that part.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3f50b888-34f8-4aed-b620-7871745e050a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
