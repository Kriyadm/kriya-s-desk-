export const navItems = [
  { label: "The Story", id: "about" },
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
    title: "Techie",
    body: "I like building things and understanding how systems work — from a role-based asset tracker used across ~900 devices to a drone detection pipeline chewing through 27GB of video.",
  },
  {
    title: "Bookworm",
    body: "I disappear into fictional worlds on a fairly regular basis. Ask me what I'm currently living inside of.",
  },
  {
    title: "Rom-com enthusiast",
    body: "I will defend unrealistic movie relationships with zero shame and a fully prepared argument.",
  },
  {
    title: "Foodie",
    body: "Good food is a legitimate personality trait. I have opinions about every under-₹200 spot in Ahmedabad.",
  },
  {
    title: "Bollywood girl",
    body: "Music, movies, drama, nostalgia — in that order, usually all at once.",
  },
  {
    title: "Design nerd",
    body: "I care, maybe too much, about how things look, feel, and move — this site is proof.",
  },
];

export const toolkit = [
  "Canva",
  "CapCut",
  "Instagram Insights",
  "Google Sheets",
  "Reels & Stories",
  "Caption Writing",
  "Graphic Design",
  "Campaign Support",
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
  { title: "UI experiment", link: "[ADD FIGMA LINK]" },
  { title: "Website concept", link: "[ADD LINK]" },
  { title: "Interaction study", link: "[ADD LINK]" },
  { title: "Visual exploration", link: "[ADD LINK]" },
];

export const books = [
  { title: "[BOOK ONE]", note: "a note about why this one stayed with me." },
  { title: "[BOOK TWO]", note: "read in one sitting, no regrets." },
  { title: "[BOOK THREE]", note: "the one I keep recommending." },
  { title: "[BOOK FOUR]", note: "comfort reread, always." },
  { title: "[BOOK FIVE]", note: "still thinking about that ending." },
];

export const movieTickets = [
  { title: "[ROM-COM PICK]", note: "admit one · no arguments" },
  { title: "[BOLLYWOOD PICK]", note: "admit one · full volume" },
  { title: "[DIRECTOR / ACTOR]", note: "admit one · entire filmography" },
  { title: "[COMFORT MOVIE]", note: "admit one · for the 40th time" },
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
