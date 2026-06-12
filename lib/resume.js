// Single source of truth for the digital resume (/resume).
// FILL IN: the Arthrex `dates` below — omitted fields are hidden on the page.

export const resume = {
  name: "Melissa Casole",
  title: "Creative Technologist · AI Product Designer",
  hero: "When ideas are difficult to explain, I build them.",
  summary:
    "Creative Technologist and Product Designer leveraging AI, code, design systems, and cognitive psychology to transform emerging concepts into tangible product experiences. I don't wait for the future to arrive — I prototype it.",
  contact: {
    location: "Bradenton, FL",
    email: "melissa.casole@yahoo.com",
    phone: "618-795-4580",
    site: "www.melissacasole.com",
    linkedin: "linkedin.com/in/melissacasole",
  },
  focusAreas: [
    "AI Product Design",
    "Interactive Prototyping",
    "Design Systems as Platforms",
    "Hardware + Software UX",
    "Healthcare & Med-Device",
    "Cognitive Psychology",
  ],
  industries: ["Healthcare AI", "Medical Devices", "Enterprise SaaS", "Retail"],
  tech: [
    { group: "AI", items: ["Claude Code", "Cursor", "ChatGPT", "Gemini", "ElevenLabs"] },
    { group: "Design", items: ["Figma", "ProtoPie", "FigJam"] },
    { group: "Development", items: ["Vercel", "GitLab", "HTML", "CSS", "JavaScript"] },
    { group: "Systems", items: ["Design Tokens", "Storybook", "Component Architecture"] },
  ],
  education: [
    {
      title: "B.S. Computer Science & Design",
      org: "Missouri College, 2007",
      note: "Minor: Cognitive Psychology",
    },
  ],
  certifications: [
    "Human Factors for Medical Devices — AAMI, 2024",
    "UX Design Certification — Google, 2020",
    "Human-Computer Interaction — MIT, 2019",
  ],
  featured: [
    {
      name: "Arti Wall",
      theme: "AI-Powered Operating Room Intelligence",
      story: "Leadership had a vision. I transformed it into a living product experience.",
      outcome: "Funded roadmap initiative targeting MVP release in 2027.",
      slug: "arti-wall",
    },
    {
      name: "Horizon Control",
      theme: "Hardware + Software Interaction Design",
      story: "Traditional prototypes were not realistic enough. I built a physical one.",
      outcome: "Validated four interaction models; influenced future Vision platform direction.",
      slug: "horizon-control",
    },
    {
      name: "Vision Design System",
      theme: "Design Systems as Product Platforms",
      story: "Multiple products were evolving independently. I unified them.",
      outcome: "A scalable foundation for future Vision products.",
      slug: "vision-design-system",
    },
  ],
  keyAchievement: {
    title: "Code-First Product Validation",
    body: "Pulled production design-system components into AI-assisted development workflows — so teams validate production-accurate experiences before engineering investment.",
    pipeline: [
      "Figma",
      "Claude Code",
      "Real Production Components",
      "Vercel",
      "MS Clarity / Hotjar",
      "User Testing",
      "Engineering",
    ],
  },
  experience: [
    {
      role: "Creative Technologist · Product Design Consultant",
      org: "Arthrex",
      dates: "2023 – Present",
      bullets: [
        "Transformed leadership's operating-room vision into Arti Wall, an AI voice + LLM product experience that aligned executives, engineers, PMs, and clinicians — and became a funded roadmap initiative.",
        "Built Horizon Control, a physical Arduino prototype with AI-generated C++ and ProtoPie Connect, validating four interaction models in surgeon testing.",
        "Created the Vision Design System — Figma Variables, design tokens, and a Vuetify implementation — as the platform for future Vision products.",
      ],
    },
    {
      role: "Sr Designer & UX Manager",
      org: "First Advantage",
      dates: "Sept 2020 – Present",
      bullets: [
        "Created and evolved the ELEMENTS design system (v2 → v3): 150+ components aligned across React, Angular, Vue, and Web — 30% less UI debt, 40% less design-to-dev rework.",
        "Pioneered code-first product validation: production components in AI-assisted workflows, validated on Vercel with MS Clarity/Hotjar before engineering investment.",
        "Increased design sprint velocity 25% with AI-assisted prototyping and automated developer handoff.",
        "Raised accessibility audit scores from 78% → 96% across apps; scaled and mentored a UX team of 6 with 100% retention.",
      ],
    },
    {
      role: "Contract Senior UX Designer",
      org: "Motivus (formerly AgileThought)",
      dates: "Mar 2020 – Sept 2020",
      bullets: [
        "Figma/ProtoPie prototypes that cut stakeholder approval cycles by 35%.",
        "Journey mapping that drove a redesign reducing task completion time by 22%.",
      ],
    },
    {
      role: "UX Engineer",
      org: "Mediagistic",
      dates: "Oct 2018 – Mar 2020",
      bullets: [
        "Designed an AI/ML-driven ad delivery platform — +18% campaign CTR, −12% ad spend waste.",
        "Built front-end prototypes (HTML/CSS/JS) that saved 10+ dev hours per sprint.",
      ],
    },
    {
      role: "Senior UX Designer",
      org: "Inspirata",
      dates: "May 2017 – Oct 2018",
      bullets: [
        "Co-designed digital cancer diagnostic software — 30% faster pathologist workflows.",
        "Usability testing with 50+ pathologists informing FDA submission readiness.",
      ],
    },
    {
      role: "Lead UX Designer",
      org: "MarineMax",
      dates: "Jun 2016 – May 2017",
      bullets: [
        "Created the company's first design system; POS software adopted by 100+ locations.",
      ],
    },
  ],
  independent: [
    {
      name: "ProtoCue",
      desc: "Platform for contextual feedback directly on live interactive experiences. Built with Claude Code, Cursor, GitLab, Vercel.",
    },
    {
      name: "AI Meeting Intelligence Assistant",
      desc: "Captures meetings, summarizes conversations, extracts action items.",
    },
  ],
  pdfPath: "/docs/Melissa-Casole-Resume.pdf",
};
