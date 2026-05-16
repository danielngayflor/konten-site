import type { ServiceSlug, CollageElementType } from '../lib/icons';

export interface Service {
  slug: ServiceSlug;
  name: string;
  iconSlug: ServiceSlug;
  sectionBg: 'cream' | 'black';
  tags: string;
  taglineLines: string[];
  intro: string;
  whatsIncluded: { lead: string; description: string }[];
  whoItsFor: string;
  howWeEngage: string;
  collageElements: { type: CollageElementType; rotation?: number }[];
  metadataStrip: string;
}

export const services: Service[] = [
  {
    slug: 'media-coverage',
    name: 'MEDIA & DOCUMENTARY',
    iconSlug: 'media-coverage',
    sectionBg: 'black',
    tags: 'PROJECT-BASED · TRAVELS REGIONALLY 🎬',
    taglineLines: ['YOU DO THE WORK.', 'WE MAKE SURE THE WORLD SEES IT.'],
    intro:
      "Some of the most important work happening in Liberia and across West Africa never gets seen. Not because it isn't compelling — but because no one was there to capture it properly. We fix that.",
    whatsIncluded: [
      {
        lead: 'Event coverage',
        description: 'summits, launches, conferences, community activations',
      },
      {
        lead: 'Project documentation',
        description: 'following your work in the field over time',
      },
      {
        lead: 'Impact films',
        description: 'short, powerful films that show what your organisation actually does',
      },
      {
        lead: 'Documentary production',
        description: 'longer-form stories for campaigns, reports, and advocacy',
      },
      {
        lead: 'Photography',
        description: 'editorial and documentary stills from every engagement',
      },
    ],
    whoItsFor:
      'NGOs, embassies, development organisations, and government agencies with stories happening in the field. If your work touches communities and you need the world to see it — this is where we start.',
    howWeEngage:
      "Project-based. We quote per event, per project, or per campaign depending on scope, duration, and location. We operate across Liberia's seven counties and travel regionally for the right project.",
    // Film (film-canister) + Audio (boom-mic)
    collageElements: [
      { type: 'film-canister' },
      { type: 'boom-mic' },
    ],
    metadataStrip: 'FIELD COVERAGE · MONROVIA · 2026',
  },
  {
    slug: 'social-and-story',
    name: 'SOCIAL & STORY',
    iconSlug: 'social-and-story',
    sectionBg: 'cream',
    tags: 'RETAINER · 3-MONTH MIN 🎬',
    taglineLines: ['CONSISTENT CONTENT.', 'A CLEAR NARRATIVE.'],
    intro:
      "Showing up online once isn't a strategy. Neither is posting whenever you have something to say. The brands and organisations that win online do it consistently, intentionally, and with a story that connects everything together. That's what we build.",
    whatsIncluded: [
      {
        lead: 'Social media strategy',
        description: 'platforms, pillars, tone, calendar, KPIs',
      },
      {
        lead: 'Content creation',
        description: 'photography, short video, graphics, reels, carousels',
      },
      {
        lead: 'Community management',
        description: 'responses, engagement, audience building',
      },
      {
        lead: 'Storytelling integration',
        description: 'a narrative framework that ties every post together',
      },
      {
        lead: 'Monthly performance reporting',
        description: "what's working, what isn't, and what's next",
      },
    ],
    whoItsFor:
      'Local businesses, startups, growing brands, and organisations that need to show up online consistently and well.',
    howWeEngage:
      'Retainer-based. We work with you month to month, embedded in your communications cycle. Minimum three-month engagement.',
    // Capture (polaroid) + Audio (studio-mic)
    collageElements: [
      { type: 'polaroid' },
      { type: 'studio-mic' },
    ],
    metadataStrip: 'CONTENT STREAM · MONROVIA · 2026',
  },
  {
    slug: 'brand-and-comms',
    name: 'BRAND & COMMS',
    iconSlug: 'brand-and-comms',
    sectionBg: 'black',
    tags: 'PROJECT-BASED · PHASED 🎬',
    taglineLines: ['LOOK AND SOUND', 'LIKE WHAT YOU ACTUALLY ARE.'],
    intro:
      "A brand isn't a logo. It's everything — the way you look, the way you speak, the story you tell about yourself, and the strategy behind how you tell it. We help organisations build all of it from the ground up, or rebuild it when what they have no longer fits who they've become.",
    whatsIncluded: [
      {
        lead: 'Brand strategy',
        description: 'positioning, audience, tone of voice, messaging framework',
      },
      {
        lead: 'Visual identity',
        description: 'logo design, colour, typography, brand guidelines',
      },
      {
        lead: 'Brand film',
        description: 'a short film that captures who you are and why it matters',
      },
      {
        lead: 'Communications strategy',
        description: 'a plan for how, where, and when you communicate',
      },
      {
        lead: 'Rebranding',
        description: 'full identity overhaul for organisations in transition',
      },
      {
        lead: 'Media training',
        description: 'preparing your team to represent the brand confidently',
      },
    ],
    whoItsFor:
      "NGOs finding their communications voice, companies entering a new market, startups building their identity from scratch, and established organisations whose brand no longer reflects where they are.",
    howWeEngage: 'Project-based. Scoped by deliverable and phased where needed.',
    // Production (clapperboard) + Audio (cassette-tape)
    collageElements: [
      { type: 'clapperboard' },
      { type: 'cassette-tape' },
    ],
    metadataStrip: 'IDENTITY BUILD · MONROVIA · 2026',
  },
  {
    slug: 'web-and-digital',
    name: 'WEB & DIGITAL',
    iconSlug: 'web-and-digital',
    sectionBg: 'cream',
    tags: 'PROJECT-BASED · OPTIONAL RETAINER 🎬',
    taglineLines: ['A WEBSITE THAT TELLS YOUR STORY', 'BEFORE YOU SAY A WORD.'],
    intro:
      'Your website is usually the first thing a serious client, partner, or funder looks at before they decide whether to reach out. It needs to work hard. It needs to be fast, clear, and built around your story — not just your services. We design and build websites that do exactly that.',
    whatsIncluded: [
      {
        lead: 'Website strategy',
        description: 'structure, user journey, content architecture',
      },
      {
        lead: 'Design',
        description: 'clean, story-led, brand-consistent visual design',
      },
      {
        lead: 'Development',
        description: 'fast, mobile-first, functional build',
      },
      {
        lead: 'Copywriting',
        description: 'website copy written in your voice',
      },
      {
        lead: 'Launch support',
        description: 'testing, deployment, and handover',
      },
      {
        lead: 'Ongoing maintenance',
        description: 'optional retainer for updates and support',
      },
    ],
    whoItsFor:
      'Any brand, organisation, or individual who needs a professional home online.',
    howWeEngage: 'Project-based. Scoped by size, complexity, and content requirements.',
    // Capture (cinema-camera) + Audio (headphones)
    collageElements: [
      { type: 'cinema-camera' },
      { type: 'headphones' },
    ],
    metadataStrip: 'DIGITAL BUILD · MONROVIA · 2026',
  },
  {
    slug: 'training-and-capacity',
    name: 'TRAINING & CAPACITY',
    iconSlug: 'training-and-capacity',
    sectionBg: 'black',
    tags: 'WORKSHOP · RETAINER 🎬',
    taglineLines: ['THE BEST PERSON TO TELL YOUR STORY MIGHT ALREADY BE ON YOUR', 'PAYROLL.'],
    intro:
      "Not every organisation needs to outsource their communications forever. Some teams just need the skills, the frameworks, and the confidence to do it themselves. We teach that. From media training for spokespeople to hands-on content creation workshops for comms teams — we build capability that stays long after we've left the room.",
    whatsIncluded: [
      {
        lead: 'Media training',
        description:
          'preparing staff and leadership for interviews, press, and public appearances',
      },
      {
        lead: 'Content creation workshops',
        description:
          'practical, hands-on sessions on video, photography, and social content',
      },
      {
        lead: 'Social media strategy sessions',
        description: 'platform training, content planning, analytics',
      },
      {
        lead: 'Storytelling for organisations',
        description: 'how to find, frame, and communicate your impact stories',
      },
      {
        lead: 'Communications planning',
        description: 'building a comms calendar and strategy your team can actually use',
      },
      {
        lead: 'Customised programmes',
        description:
          "multi-day or multi-session training designed around your organisation's specific needs",
      },
    ],
    whoItsFor:
      'NGO communications teams, organisational staff, corporate communications departments, and any team that produces content internally and wants to do it better.',
    howWeEngage:
      'Project-based for one-off workshops. Retainer-based for ongoing capacity building.',
    // Production (script-page) + Audio (vinyl-record)
    collageElements: [{ type: 'script-page' }, { type: 'vinyl-record' }],
    metadataStrip: 'TRAINING SESSION · MONROVIA · 2026',
  },
  {
    slug: 'creator-studio',
    name: 'CREATOR STUDIO',
    iconSlug: 'creator-studio',
    sectionBg: 'cream',
    tags: 'RETAINER · LIMITED SPOTS 🎬',
    taglineLines: ["YOU'VE GOT SOMETHING TO SAY.", 'WE HELP YOU SAY IT RIGHT.'],
    intro:
      "Building a personal brand online is harder than it looks. The hook has to land in the first two seconds. The script has to sound natural but be structured. The lighting, the framing, the edit — all of it matters. We work with founders, investors, professionals, and public figures who are serious about their content and need a team that treats it with the same craft as any brand project.",
    whatsIncluded: [
      {
        lead: 'Content strategy',
        description:
          'platform selection, content pillars, posting cadence, audience growth plan',
      },
      {
        lead: 'Scripting & hook writing',
        description: 'structuring your ideas so they land, every time',
      },
      {
        lead: 'Talking head production',
        description: 'studio or on-location shooting, professionally lit and directed',
      },
      {
        lead: 'Short-form video editing',
        description: 'reels, TikToks, YouTube Shorts, optimised for each platform',
      },
      {
        lead: 'Personal brand development',
        description: 'tone of voice, visual identity, narrative positioning',
      },
      {
        lead: 'Monthly content packages',
        description: 'a set number of filmed, edited, and ready-to-post pieces per month',
      },
    ],
    whoItsFor:
      'Founders, investors, executives, professionals, and public figures who have a point of view worth sharing and an audience worth building.',
    howWeEngage:
      'Retainer-based. We work with a small number of creators at a time so every client gets real attention.',
    // Production (directors-chair) + Film (film-strip)
    collageElements: [
      { type: 'directors-chair' },
      { type: 'film-strip' },
    ],
    metadataStrip: 'CREATOR SESSION · MONROVIA · 2026',
  },
];
