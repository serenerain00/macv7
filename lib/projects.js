// Single source of truth for project content. Sourced from projects/*.md.

export const projects = [
  {
    slug: "arti-wall",
    index: "01",
    title: "Arti Wall",
    theme: "AI-Powered Operating Room Intelligence",
    tagline: "Leadership had a vision. I turned it into a living product experience.",
    accent: "#7c5cff",
    year: "2025",
    role: "Creative Technologist · Product Designer · UX Vision Lead",
    problem:
      "Operating rooms are information-dense environments. Critical information lives in separate systems — preference cards, PACS imaging, MRI scans, X-rays, procedure information, equipment status, workflow progress — and staff constantly switch between systems and physical assets while trying to maintain situational awareness. Leadership wanted to explore whether a large ambient display could centralize these workflows for multiple clinical roles.",
    built:
      "A next-generation operating room intelligence platform — built as an interactive product vision, not static mockups. Designed around four primary personas (Surgeon, Circulating Nurse, Scrub Technician, Anesthesia Provider) across two OR environments: Synergy.net-connected and standalone. LLM-powered voice interaction let users ask questions, navigate content, manipulate interface states, and retrieve information in natural language — turning a presentation into a conversational product experience.",
    how: [
      "Owned UX vision, experience strategy, information architecture, and interaction design end-to-end",
      "Designed role-aware workflows for four clinical personas across connected and standalone OR environments",
      "Integrated LLM-powered voice interaction (Anthropic APIs + ElevenLabs) so users could converse with the room",
      "Built the interactive prototype with Figma, Claude Code, and Cursor; deployed on Vercel",
      "Facilitated workshops and ran executive demonstrations, including the Santa Barbara workshops",
    ],
    changed:
      "Transformed an early leadership concept into a tangible experience that stakeholders, engineers, surgeons, and OR staff could understand, evaluate, and rally around — now a funded roadmap initiative with an MVP targeted for 2027.",
    outcomes: [
      "Presented to executive leadership, product management, engineering, and clinical stakeholders",
      "Demonstrated in Santa Barbara workshops",
      "Contributed to a funded roadmap initiative",
      "MVP targeted for release in 2027",
    ],
    spotlight: {
      label: "AI Integration",
      title: "From presentation to conversation",
      body: "The most significant contribution was integrating LLM-powered voice interaction into the prototype itself. Users could ask questions, navigate content, manipulate interface states, and retrieve information using natural language — the prototype stopped being something you watched and became something you talked to.",
    },
    takeaway:
      "Arti Wall demonstrated how AI-assisted experiences can improve situational awareness, communication, and workflow coordination inside the operating room — while helping stakeholders visualize the future of surgical technology.",
    stack: ["Figma", "Claude Code", "Cursor", "Vercel", "Anthropic APIs", "ElevenLabs"],
    highlights: [
      "LLM voice interaction",
      "4 clinical personas",
      "Connected + standalone OR workflows",
      "Executive demonstrations",
      "Santa Barbara workshops",
      "Funded initiative · MVP 2027",
    ],
    media: [
      { src: "/videos/or/schedule.mp4", poster: "/videos/or/schedule-poster.jpg", caption: "OR schedule intelligence" },
      { src: "/videos/or/caseCount.mp4", poster: "/videos/or/caseCount-poster.jpg", caption: "Case count workflows" },
      { src: "/videos/or/prefCards.mp4", poster: "/videos/or/prefCards-poster.jpg", caption: "Preference cards" },
      { src: "/videos/or/checkOffCounts.mp4", poster: "/videos/or/checkOffCounts-poster.jpg", caption: "Check-off counts" },
      { src: "/videos/or/consoles.mp4", poster: "/videos/or/consoles-poster.jpg", caption: "Console experiences" },
    ],
  },
  {
    slug: "horizon-control",
    index: "02",
    title: "Horizon Control",
    theme: "Hardware + Software Interaction Design",
    tagline: "Screen-based prototypes couldn't simulate surgery. So I built the hardware.",
    accent: "#43e5b0",
    year: "2025",
    role: "Creative Technologist · UX Vision Lead · Interaction Designer",
    problem:
      "Horizon Control is a surgical navigation concept that helps surgeons maintain orientation and anatomical point-of-reference while navigating a camera through complex joint anatomy. But traditional screen-based prototypes couldn't simulate how surgeons physically interact with surgical equipment — testing interaction concepts with a phone or mouse introduced unrealistic ergonomics and reduced confidence in the feedback.",
    built:
      "A hardware-assisted prototype: a 3D-printed surgical camera model combined with an Arduino sensor board, translating real hand movements into live software interactions. Surgeons evaluated concepts using realistic movement patterns — physical motion driving a tablet interface and a HUD interface simultaneously, in real time.",
    how: [
      "Built a 3D-printed surgical camera model wired to an Arduino sensor board",
      "Used AI-assisted development to generate and refine the C++ firmware",
      "Connected hardware to software through ProtoPie Connect for real-time synchronization",
      "Drove tablet UI and HUD UI simultaneously from physical surgeon input",
      "Partnered with a PM, 3 engineers, and 2 human-factors specialists through surgeon evaluations",
    ],
    changed:
      "Four interaction concepts evaluated with realistic surgical movement instead of abstract screen interactions — demonstrated to executives and surgeons, influencing future Vision product direction.",
    outcomes: [
      "Evaluated four interaction concepts with surgeons",
      "Demonstrated to executives and surgeons",
      "Influenced future Vision product direction",
      "Product targeted for future commercial release",
    ],
    spotlight: {
      label: "Technical Innovation",
      title: "Physical movement as the input",
      body: "AI-generated C++ on Arduino, synchronized through ProtoPie Connect, meant multiple experiences — tablet and HUD — responded simultaneously to the surgeon's actual hand movements. The prototype replicated real surgical motion, not a simulation of it.",
    },
    takeaway:
      "Horizon Control demonstrated how connected hardware, AI-assisted development, and interactive prototyping can dramatically improve concept validation for complex medical device experiences.",
    stack: ["Arduino", "C++ (AI-assisted)", "ProtoPie Connect", "Figma", "Hardware Prototyping"],
    highlights: [
      "3D-printed surgical camera",
      "Arduino + physical sensors",
      "AI-generated C++ firmware",
      "Tablet + HUD in sync",
      "Surgeon evaluations",
      "4 interaction concepts validated",
    ],
    media: [
      { src: "/videos/horizon/proto1.mp4", poster: "/videos/horizon/proto1-poster.jpg", caption: "Physical prototype in action" },
      { src: "/videos/horizon/3dModel.mp4", poster: "/videos/horizon/3dModel-poster.jpg", caption: "3D model exploration" },
    ],
  },
  {
    slug: "vision-design-system",
    index: "03",
    title: "Vision Design System",
    theme: "Design Systems as Product Platforms",
    tagline: "CCU, Trident, and GX were evolving independently. I built the foundation under all of them.",
    accent: "#5b9dff",
    year: "2024",
    role: "Design System Lead",
    problem:
      "Several Arthrex surgical technology products — CCU, Trident, GX — existed with independent experiences: separate patterns, themes, visual languages, and workflows. Future products required greater consistency, plus a migration toward a shared dark-theme ecosystem.",
    built:
      "The Vision Design System, built from the ground up: foundations, tokens, components, patterns, behaviors, and interaction standards — designed to support both current and future products. Plus an interactive documentation platform that communicates what static design systems can't: motion, elevation, transitions, and behavior. It serves designers and engineers as the single source of truth for implementation.",
    how: [
      "Owned strategy, component architecture, foundations, tokens, documentation, governance, and adoption",
      "Modeled foundations with Figma Variables and design tokens",
      "Migrated Figma variables into implementation-ready structures with Cursor and Claude Code",
      "Implemented on Vuetify while keeping the architecture technology-agnostic",
      "Shipped an interactive documentation platform covering motion, elevation, and behavior",
    ],
    changed:
      "A unified design language across Vision products, improved designer–engineer collaboration, scalable foundations for future products, and an established governance and adoption strategy.",
    outcomes: [
      "Unified design language across Vision products",
      "Improved designer and engineer collaboration",
      "Scalable foundations for future products",
      "Governance and adoption strategy established",
      "Reduced ambiguity during implementation",
    ],
    spotlight: {
      label: "Beyond Figma",
      title: "A design system you can feel",
      body: "Traditional design systems struggle to communicate motion, elevation, transitions, and interaction patterns. The interactive documentation platform makes them tangible — the source of truth isn't a sticker sheet, it's working behavior.",
    },
    takeaway:
      "The Vision Design System is more than a component library. It is a product platform that accelerates development, improves consistency, and bridges the gap between design and engineering.",
    stack: ["Figma", "Claude Code", "Cursor", "Vercel", "Vuetify", "Design Tokens"],
    highlights: [
      "CCU · Trident · GX unified",
      "Figma Variables + tokens",
      "Vuetify implementation",
      "Interactive documentation platform",
      "Motion + elevation systems",
      "Governance + adoption strategy",
    ],
  },
  {
    slug: "protocue",
    index: "04",
    title: "ProtoCue",
    theme: "Building the Tool I Needed",
    tagline: "The source of truth isn't the mockup anymore. It's the experience.",
    accent: "#ff7a59",
    year: "2025",
    role: "Founder · Product Creator · Full-Stack Product Designer",
    problem:
      "As product design shifts from static mockups to AI-generated, interactive coded prototypes, traditional feedback workflows break down. Stakeholders leave comments in Slack, Teams, email, screenshots, meetings, documents, and texts — feedback gets fragmented and disconnected from the experience being reviewed. Context gets lost, decisions become hard to trace, and teams burn time reconstructing conversations. Review tools assume Figma is the source of truth, and that assumption is increasingly outdated.",
    built:
      "ProtoCue — a platform for contextual feedback directly on live interactive experiences. Point it at a prototype URL and stakeholders can navigate the experience, leave comments attached to specific screens, capture context automatically, and centralize conversations in one place where feedback can be reviewed and prioritized.",
    how: [
      "Owned everything: product strategy, discovery, UX, information architecture, development, deployment",
      "Designed and built end-to-end with Claude Code and Cursor",
      "Shipped on Vercel with a GitLab-backed workflow on React and modern web frameworks",
      "Built from my own daily friction — more coded experiences than Figma screens, no review tool that fit",
    ],
    changed:
      "A working product that closes the loop AI-assisted prototyping opened: feedback attached to the live experience itself, not scattered across channels. Actively evolving as a feedback platform for AI-assisted, code-first product teams.",
    outcomes: [
      "Working prototype, actively evolving",
      "Feedback attached directly to live experiences",
      "Single location to review and prioritize product feedback",
      "Built for AI-assisted, code-first product teams",
    ],
    spotlight: {
      label: "The Insight",
      title: "The source of truth is the experience",
      body: "If stakeholders are reviewing a live coded prototype, feedback should attach directly to the experience itself. Not to screenshots. Not to emails. Not to meeting notes. ProtoCue isn't a UX project — it's a product born from an industry shift: design becomes code, prototypes become software, AI accelerates development, and traditional workflows stop scaling.",
    },
    takeaway:
      "ProtoCue demonstrates how identifying workflow friction, embracing emerging technology, and rapidly building solutions can turn a personal pain point into a product opportunity.",
    stack: ["Claude Code", "Cursor", "Vercel", "GitLab", "React"],
    highlights: [
      "Founder-built, end-to-end",
      "Comments on live experiences",
      "Auto-captured context",
      "Vercel + GitLab workflow",
      "Working prototype",
      "Built for code-first teams",
    ],
    media: [
      {
        src: "/videos/protocue/protocue-demo.mp4",
        poster: "/videos/protocue/protocue-demo-poster.jpg",
        caption: "ProtoCue in action",
      },
    ],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const experimentsIntro =
  "Smaller experiments, prototypes, and internal tools that explore the intersection of AI, product design, and emerging technology.";

export const experiments = [
  {
    title: "AI Meeting Intelligence Assistant",
    blurb: "Captures meetings, summarizes conversations, and extracts the action items that matter.",
  },
  {
    title: "Design System Governance Platform",
    blurb: "Keeps a growing design system honest as more teams adopt it.",
  },
  {
    title: "Voice-Controlled Interfaces",
    blurb: "Exploring natural language as a first-class input for product experiences.",
  },
  {
    title: "AI-Assisted Product Workflows",
    blurb: "Ongoing probes into where AI genuinely compresses real product work.",
  },
  {
    title: "Interactive Product Demonstrations",
    blurb: "Turning roadmap concepts into experiences stakeholders can actually try.",
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
