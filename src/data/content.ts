export const navItems = [
  { label: "The Story", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "The Work", id: "work" },
  { label: "The Lab", id: "lab" },
  { label: "Things I Love", id: "loves" },
  { label: "Memory Wall", id: "memory-wall" },
  { label: "Let's Talk", id: "contact" },
];

export const heroTags = [
  "AI / ML",
  "Software Engineering",
  "Design",
  "Content Creation",
  "Storytelling",
];

export const activities = [
  "debugging something that worked five minutes ago",
  "rereading the same paragraph of a book",
  "rewatching a comfort movie instead of sleeping",
  "arguing internally about a font pairing",
  "considering food",
];

export const traits = [
  {
    title: "Software engineer",
    body: "I build systems end-to-end — a role-based IT asset platform covering 894 highway assets with ~100 REST endpoints, and API integrations across ~300 endpoints in a 15-person team.",
  },
  {
    title: "AI / ML practitioner",
    body: "Real-time detection and tracking (YOLO + DeepSORT over a 27GB video dataset), classical ML pipelines, and NLP summarization — evaluated properly, not just trained.",
  },
  {
    title: "Full-stack developer",
    body: "Angular, Spring Boot, FastAPI, REST APIs and relational data modelling — with role-based auth and clean separation between layers.",
  },
  {
    title: "Design & systems thinker",
    body: "I care how an interface reads, not only whether it works: hierarchy, typography, motion and state — this site is the working example.",
  },
  {
    title: "Content & storytelling",
    body: "Led graphics and social content for college bodies and campaigns — turning a technical or creative idea into something an audience actually stops for.",
  },
  {
    title: "Off the clock",
    body: "Books, rom-coms, Bollywood soundtracks and a well-researched map of Ahmedabad's food — the inputs behind most of the taste I bring to work.",
  },
];

export type ToolkitGroup = { label: string; items: string[] };

export const toolkitGroups: ToolkitGroup[] = [
  {
    label: "Languages",
    items: ["Python", "Java", "TypeScript", "JavaScript", "SQL"],
  },
  {
    label: "Frameworks",
    items: ["Angular", "Spring Boot", "FastAPI", "React", "REST APIs"],
  },
  {
    label: "AI / ML",
    items: ["YOLO", "DeepSORT", "scikit-learn", "NLP", "TF-IDF & embeddings"],
  },
  {
    label: "Data & tools",
    items: ["PostgreSQL / MySQL", "Git", "Postman", "Google Sheets"],
  },
  {
    label: "Design & content",
    items: ["Figma", "Canva", "CapCut", "Graphic design", "Caption writing"],
  },
];


export type Project = {
  title: string;
  meta: string;
  blurb: string;
  problem?: string;
  built?: string;
  tech?: string;
  result?: string;
  links?: string[];
  stamp?: string;
};

export const projects: Project[] = [
  {
    title: "IT Asset Management System",
    meta: "SDE Intern · Elsamex (EMSL) · 2026",
    blurb: "Replaced a manual, error-prone Excel process with a real tracking-and-reporting system.",
    problem: "894 highway-infrastructure assets tracked manually.",
    built: "Role-based access system, ~100 API endpoints.",
    tech: "Full-stack, REST APIs, role-based auth.",
    result: "~99% data accuracy.",
    stamp: "this one taught me what 'production' actually means.",
  },
  {
    title: "Enterprise API Integration",
    meta: "SDE Intern · Amnex Infotechnologies · 2025",
    blurb:
      "Integrated RESTful APIs across ~300 endpoints with a 15-person cross-functional team.",
    built: "Angular + Spring Boot.",
    result: "27% system performance improvement.",
  },
  {
    title: "Paper to X",
    meta: "Smart India Hackathon · 2025",
    blurb: "Turned academic papers into podcasts, reels, and visual summaries — in 48 hours.",
    built: "NLP pipeline for text extraction + summarization feeding audio/video generation.",
    links: ["[ADD GITHUB LINK]"],
    stamp: "built on 0 sleep, mildly proud of it.",
  },
  {
    title: "Movie Genre Prediction & Recommendation",
    meta: "Personal project · 2025",
    blurb:
      "A FastAPI + Angular app that predicts genres and recommends what to watch next — obviously I built this one.",
    built: "TF-IDF + word-embedding classifier/recommender.",
    links: ["[ADD GITHUB LINK]", "[ADD DEMO LINK]"],
  },
  {
    title: "Task & Student Management System",
    meta: "Personal project · 2025",
    blurb: "A full-stack platform for task tracking and student records — CRUD done properly.",
    tech: "Angular, REST APIs, CRUD.",
    links: ["[ADD GITHUB LINK]"],
  },
];

export const alsoPartOf = [
  {
    title: "CSI Nirma",
    role: "Social Media & Graphics Core Team",
    body: "Managed social content and creatives, supported event promotions, and created audience-focused visual content.",
  },
  {
    title: "Storytellers Club, Nirma",
    role: "Graphics Head",
    body: "Led visual direction and created aesthetic, audience-focused graphics and storytelling content.",
  },
  {
    title: "Hostel Instagram Account",
    role: "Content Manager",
    body: "Created and curated relatable posts, Stories, short-form videos, and community content.",
  },
  {
    title: "Personal + Friends' Instagram",
    role: "Reels · Photography · Trends",
    body: "Short-form content, captions, trend-based posts, and visual stories around everyday moments.",
  },
  {
    title: "Campus Ambassador",
    role: "Global Colliance · Internshala · Mood Indigo, IIT Bombay",
    body: "Promoted events, campaigns, and opportunities through student-focused content, digital outreach, and audience engagement.",
  },
  {
    title: "Hungrito Food Fest 2025 + Hungrito High Street",
    role: "Event & Brand Experience",
    body: "Supported event execution, audience engagement, brand interaction, and on-ground content opportunities in food and lifestyle environments.",
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  track: "Engineering" | "Design & Content";
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Development Engineer — Intern",
    org: "Elsamex (EMSL)",
    period: "2026",
    track: "Engineering",
    points: [
      "Built an IT asset management system replacing a manual Excel process for 894 highway-infrastructure assets.",
      "Designed role-based access and ~100 REST endpoints across the full stack.",
      "Raised data accuracy to ~99% and added structured tracking and reporting.",
    ],
  },
  {
    role: "Software Development Engineer — Intern",
    org: "Amnex Infotechnologies",
    period: "2025",
    track: "Engineering",
    points: [
      "Integrated RESTful APIs across ~300 endpoints with a 15-person cross-functional team.",
      "Worked across Angular and Spring Boot services in an enterprise codebase.",
      "Contributed to a 27% improvement in system performance.",
    ],
  },
  {
    role: "Machine Learning Intern",
    org: "Bharat Intern · Codesoft",
    period: "2024 – 2025",
    track: "Engineering",
    points: [
      "Delivered ML projects covering preprocessing, feature engineering and model evaluation.",
      "Compared Logistic Regression, Random Forest and SVM on accuracy, precision-recall and ROC-AUC.",
      "Consistently reached ~94% model accuracy.",
    ],
  },
  {
    role: "Graphics Head",
    org: "Storytellers Club, Nirma University",
    period: "2024 – 2025",
    track: "Design & Content",
    points: [
      "Led visual direction for the club's campaigns and events.",
      "Produced audience-focused graphics and storytelling content.",
    ],
  },
  {
    role: "Social Media & Graphics — Core Team",
    org: "CSI Nirma",
    period: "2024 – 2025",
    track: "Design & Content",
    points: [
      "Managed social content and creatives for a technical student body.",
      "Supported event promotion end-to-end, from concept to publishing.",
    ],
  },
  {
    role: "Campus Ambassador",
    org: "Global Colliance · Internshala · Mood Indigo, IIT Bombay",
    period: "2023 – 2025",
    track: "Design & Content",
    points: [
      "Promoted events, campaigns and opportunities to a student audience.",
      "Ran digital outreach and engagement across channels.",
    ],
  },
  {
    role: "Content Manager",
    org: "Hostel Instagram Account",
    period: "2023 – 2025",
    track: "Design & Content",
    points: [
      "Created and curated posts, Stories and short-form video for a community audience.",
      "Grew engagement through relatable, trend-aware content.",
    ],
  },
  {
    role: "Event & Brand Experience",
    org: "Hungrito Food Fest 2025 + Hungrito High Street",
    period: "2025",
    track: "Design & Content",
    points: [
      "Supported on-ground event execution and audience engagement.",
      "Handled brand interaction and content opportunities across food and lifestyle activations.",
    ],
  },
];

export const techLoves = [
  {
    title: "Clean API design",
    body: "Predictable resources, honest status codes, and errors that tell you what to do next.",
  },
  {
    title: "Computer vision",
    body: "Detection plus tracking — the moment identities stay consistent across frames never stops being satisfying.",
  },
  {
    title: "Interface engineering",
    body: "Design systems, tokens and motion that make a product feel considered rather than decorated.",
  },
  {
    title: "Making models explainable",
    body: "Precision-recall over raw accuracy, and charts a non-technical reader can actually act on.",
  },
];


export const labNotes = [
  {
    title: "Drone detection & tracking",
    body: "Implemented YOLO for real-time detection and DeepSORT for multi-object tracking across a ~27GB video dataset, keeping identification consistent frame-to-frame.",
  },
  {
    title: "Heart disease prediction",
    body: "Logistic Regression, Random Forest and SVM compared after preprocessing and feature scaling; evaluated on accuracy, precision-recall and ROC-AUC. ~94% accuracy.",
  },
  {
    title: "Earlier ML work",
    body: "Applied data preprocessing, feature engineering and model evaluation across several internship projects (Bharat Intern, Codesoft), consistently landing ~94% model accuracy.",
  },
];

export const designSwatches = [
  { title: "UI experiment", link: "case study coming soon" },
  { title: "Website concept", link: "case study coming soon" },
  { title: "Interaction study", link: "case study coming soon" },
  { title: "Visual exploration", link: "case study coming soon" },
];

export const books = [
  { title: "Atomic Habits", note: "the one that actually changed how I plan my days." },
  { title: "Verity", note: "read it in one sitting, still not okay." },
  { title: "A Thousand Splendid Suns", note: "the one I keep recommending to everyone." },
  { title: "Twisted series", note: "comfort reread, no notes." },
  { title: "Harry Potter series", note: "the world I will always happily return to." },
  { title: "Set It Up", note: "office chaos, sharp banter, perfect comfort reading." },
  { title: "The Hello series", note: "romance with exactly the kind of warmth I love." },
  { title: "Windy City series", note: "found family, sport and a very good slow burn." },
];

export const magazines = [
  {
    title: "The College Group Issue",
    detail: "A keepsake for my college group.",
    url: "https://canva.link/4tt8zmz15fnfayb",
  },
  {
    title: "The Classmate Issue",
    detail: "Made for a classmate and colleague.",
    url: "https://canva.link/oi0sy624mjflztc",
  },
  {
    title: "The Farewell Issue",
    detail: "A farewell story for a friend.",
    url: "https://canva.link/754wb0tvgzafo3h",
  },
  {
    title: "The Birthday Issue",
    detail: "A birthday edition made personally.",
    url: "https://canva.link/k8net1sumh4w19d",
  },
];

export const movieTickets = [
  { title: "Yeh Jawaani Hai Deewani", note: "admit one · no arguments" },
  { title: "Zindagi Na Milegi Dobara", note: "admit one · full volume" },
  { title: "To All the Boys I've Loved Before", note: "admit one · rom-com supremacy" },
  { title: "Wake Up Sid", note: "admit one · for the growing-up scenes" },
  { title: "Chal Jivi Laiye", note: "admit one · Gujarati, and it gets me every time" },
  { title: "Love Ni Bhavai", note: "admit one · for the 40th time" },
];


export const receiptLines = [
  "What I ordered vs what I got",
  "Hidden food gems you NEED to try",
  "POV: came for 1 dish, stayed for 5",
  "Under ₹200 spots",
];

export const contact = {
  email: "kdmorabia@gmail.com",
  phoneHref: "tel:+918200578340",
  phoneLabel: "+91 8200578340",
  linkedin: "https://linkedin.com/in/kriya-m",
  github: "https://github.com/Kriyadm",
  resume:
    "https://drive.google.com/drive/folders/1j98GqJHwW2YrWkGWvFZbm4KEqNKAM8eQ?usp=sharing",
};
