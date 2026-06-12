export const projects = [
  {
    slug: "arti-wall",
    index: "01",
    title: "Arti Wall",
    theme: "AI-Powered Operating Room Intelligence",
    tagline: "Leadership had a vision. I turned it into a living product experience.",
    accent: "#7c5cff",
    year: "2025",
    role: "Creative Technologist · AI Product Design",
    problem:
      "Executives, engineers, product managers, and clinicians each pictured a different future-state operating room. The vision existed in slides and conversations — impossible to align around, test, or fund without something real to react to.",
    built:
      "A voice-driven, AI-powered operating room intelligence prototype. A surgeon, nurse, scrub tech, or anesthesiologist could speak naturally to the room and watch it respond — surfacing the right information, for the right role, at the right moment in the procedure.",
    how: [
      "Designed role-aware OR workflows for surgeon, nurse, scrub tech, and anesthesia personas",
      "Built natural-language voice interaction backed by LLM integration",
      "Prototyped interactive flows in Figma and brought them to life with Claude Code + Cursor",
      "Packaged it into executive presentations that made the future tangible",
    ],
    changed:
      "Aligned executives, engineers, product managers, and clinicians around a shared future-state OR experience — and turned an abstract vision into a funded roadmap initiative.",
    stack: ["AI Voice", "LLM Integration", "Figma", "Claude Code", "Cursor", "Interactive Prototypes"],
    media: [
      { src: "/videos/or/schedule.mp4", poster: "/videos/or/schedule-poster.jpg", caption: "OR schedule intelligence" },
      { src: "/videos/or/caseCount.mp4", poster: "/videos/or/caseCount-poster.jpg", caption: "Case count workflows" },
      { src: "/videos/or/prefCards.mp4", poster: "/videos/or/prefCards-poster.jpg", caption: "Preference cards" },
      { src: "/videos/or/checkOffCounts.mp4", poster: "/videos/or/checkOffCounts-poster.jpg", caption: "Check-off counts" },
      { src: "/videos/or/consoles.mp4", poster: "/videos/or/consoles-poster.jpg", caption: "Console experiences" },
    ],
    highlights: [
      "AI voice interaction",
      "LLM integration",
      "Operating room workflows",
      "4 clinical personas",
      "Executive presentations",
      "Funded roadmap initiative",
    ],
  },
  {
    slug: "horizon-control",
    index: "02",
    title: "Horizon Control",
    theme: "Hardware + Software Interaction Design",
    tagline: "Phone-based prototypes weren't realistic enough. So I built a physical one.",
    accent: "#43e5b0",
    year: "2025",
    role: "Creative Technologist · Hardware Prototyping",
    problem:
      "Surgeons couldn't evaluate new interaction models from a tapped-through phone screen. The feel of physical input — the timing, the resistance, the spatial relationship to a HUD — was the whole point, and it was missing.",
    built:
      "A physical interaction prototype: real sensor input wired through Arduino, driving a tablet UI and a heads-up display in real time. Surgeons could actually hold it, move it, and feel four different interaction models instead of imagining them.",
    how: [
      "Wired physical sensor input through Arduino with AI-generated C++ firmware",
      "Connected hardware to UI in real time using ProtoPie Connect",
      "Designed paired tablet UI and HUD UI for the same interaction",
      "Ran human-factors testing sessions directly with surgeons",
    ],
    changed:
      "Validated four distinct interaction models with real surgeon testing and influenced the future direction of the Vision product line.",
    stack: ["Arduino", "C++ (AI-assisted)", "ProtoPie Connect", "Human Factors", "HUD UI", "Tablet UI"],
    media: [
      { src: "/videos/horizon/proto1.mp4", poster: "/videos/horizon/proto1-poster.jpg", caption: "Physical prototype in action" },
      { src: "/videos/horizon/3dModel.mp4", poster: "/videos/horizon/3dModel-poster.jpg", caption: "3D model exploration" },
    ],
    highlights: [
      "Arduino + physical sensors",
      "AI-generated C++ firmware",
      "ProtoPie Connect",
      "HUD + tablet UI",
      "Surgeon testing",
      "4 interaction models validated",
    ],
  },
  {
    slug: "vision-design-system",
    index: "03",
    title: "Vision Design System",
    theme: "Design Systems as Product Platforms",
    tagline: "Multiple products were evolving independently. I built the foundation under all of them.",
    accent: "#5b9dff",
    year: "2024",
    role: "Design Systems · Creative Technologist",
    problem:
      "Several Vision products were growing in parallel, each reinventing the same patterns. Without a shared foundation, every team paid the tax of inconsistency — and the cost compounded with every new product.",
    built:
      "A scalable design system built as a product platform, not a sticker sheet. Figma Variables and design tokens flowed straight into a Vuetify implementation, complete with motion and elevation systems and a living documentation site.",
    how: [
      "Modeled the foundation with Figma Variables and design tokens",
      "Implemented the system in Vuetify, built with Claude Code + Cursor",
      "Authored motion and elevation systems for consistent depth and feel",
      "Shipped a documentation site to drive cross-product adoption",
    ],
    changed:
      "Created a unified framework adopted across products — the foundation future Arthrex Vision products now build on.",
    stack: ["Figma Variables", "Design Tokens", "Vuetify", "Claude Code", "Cursor", "Motion Systems"],
    highlights: [
      "Figma Variables + tokens",
      "Vuetify implementation",
      "Motion + elevation systems",
      "Documentation site",
      "Cross-product adoption",
      "Platform thinking",
    ],
  },
  {
    slug: "protocue",
    index: "04",
    title: "ProtoCue",
    theme: "Building the Tool I Needed",
    tagline: "AI-generated coded prototypes created a new feedback problem. So I built the solution.",
    accent: "#ff7a59",
    year: "2025",
    role: "Product Creation · Full-stack Build",
    problem:
      "AI made it fast to generate live, coded prototypes — but feedback tooling never caught up. Stakeholders were leaving comments in scattered docs and chats, disconnected from the actual running experience.",
    built:
      "ProtoCue — a platform for contextual feedback on live interactive experiences. Reviewers comment directly on the running prototype, in context, instead of describing what they saw somewhere else.",
    how: [
      "Designed and built the product end-to-end with Claude Code + Cursor",
      "Shipped on Vercel with a GitLab-backed workflow",
      "Created contextual, in-experience feedback workflows",
      "Took it from personal need to a real, usable product",
    ],
    changed:
      "Gave teams a single place to give contextual feedback on live interactive experiences — closing the loop that AI-generated prototyping had opened.",
    stack: ["Claude Code", "Cursor", "Vercel", "GitLab", "Product Creation", "Feedback Workflows"],
    highlights: [
      "Built end-to-end",
      "Vercel + GitLab",
      "Contextual feedback",
      "Live prototype commenting",
      "Solved my own problem",
      "Shipped product",
    ],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const experiments = [
  {
    title: "AI Meeting Intelligence Assistant",
    blurb: "Captures, structures, and surfaces what actually matters from meetings.",
  },
  {
    title: "Design System Governance App",
    blurb: "Keeps a growing design system honest as more teams adopt it.",
  },
  {
    title: "AI-assisted Workflow Experiments",
    blurb: "Ongoing probes into where AI compresses real product work.",
  },
  {
    title: "Internal Productivity Tools",
    blurb: "Small, sharp tools built to remove friction from real workflows.",
  },
];

export const tools = [
  { name: "Claude Code", use: "Building real, shippable product code from intent — fast." },
  { name: "Cursor", use: "Pairing with AI inside the editor to move from idea to working software." },
  { name: "ChatGPT", use: "Thinking partner for framing, copy, and rapid exploration." },
  { name: "ElevenLabs", use: "Giving prototypes a real voice for natural interaction." },
  { name: "Lovable", use: "Spinning up interactive web experiences to test concepts quickly." },
  { name: "Figma Make", use: "Turning design intent into interactive starting points." },
  { name: "Vercel", use: "Shipping live prototypes to a real URL stakeholders can use." },
  { name: "ProtoPie", use: "Wiring hardware and software into a single felt interaction." },
  { name: "Arduino", use: "Bringing physical sensor input into product prototypes." },
];
