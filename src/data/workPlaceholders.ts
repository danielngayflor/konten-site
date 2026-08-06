import type { ServiceSlug } from '../lib/icons';

export interface WorkGalleryImage {
  src?: string;        // static image path
  embedUrl?: string;   // Instagram / YouTube embed URL — renders an iframe instead
  alt?: string;
  metadata: string;
  rotation: number;
}

export interface WorkProject {
  slug: string;
  projectNumber: string;
  /** Short punchy title — all caps, used as the card heading */
  title: string;
  client: string;
  serviceSlug: ServiceSlug;
  serviceName: string;
  /** One-sentence card tagline — shown in the gallery hover overlay */
  description: string;
  /** Full paragraphs for the detail page "THE BRIEF" section */
  descriptionParagraphs: string[];
  /** Goals & Objectives bullet points — rendered in "WHAT WE DID" */
  goals: string[];
  year: string;
  location: string;
  /** Cover image path — shown on the gallery card and detail hero */
  coverImage?: string;
  /** Gallery images for the detail page — falls back to placeholders if absent */
  galleryImages?: WorkGalleryImage[];
  /** YouTube embed URL (optional) — shown as a video section on the detail page */
  heroVideo?: string;
  /** Performance stats — only render "THE NUMBERS" if this is present */
  stats?: { value: string; label: string }[];
  /** Instagram Reel URLs — renders a "Watch the Work" link grid on the detail page */
  reels?: string[];
  /** Live URL for web projects — replaces the gallery with a cover + visit link */
  siteUrl?: string;
  /** When the live site blocks iframes, provide a screenshot URL to display instead */
  siteScreenshotUrl?: string;
  /** Override the icon shown on the gallery card when there is no coverImage */
  iconSlug?: ServiceSlug;
  metadataStrip: string;
  sectionBg: 'cream' | 'black';
}

export const workPlaceholders: WorkProject[] = [
  /* ── Media & Documentary ──────────────────────────────────────────── */
  {
    slug: 'irish-embassy-st-brigids-day',
    projectNumber: '01',
    title: "ST BRIGID'S DAY",
    client: 'Embassy of Ireland in Liberia',
    serviceSlug: 'media-coverage',
    serviceName: 'MEDIA COVERAGE & DOCUMENTARY',
    description:
      "A morning of recognition for the partner organisations behind Ireland's women's-rights work in Liberia.",
    descriptionParagraphs: [
      "For St Brigid's Day, the Irish Embassy brought together the women-led organisations they partner with across Liberia — a morning of speeches, conversation, and recognition for the collective work being done to advance women's rights and participation. The brief was simple to say and harder to do: capture the day in a way that honoured both the embassy's role and the partners who make the work possible. Not \"look at us.\" More \"look at what we've built together.\"",
      'We covered the event end to end — guest arrivals, speeches, the unscripted moments between sessions, the activities — and turned it around as a full image bank plus a recap video that kept the partners at the centre of the story.',
    ],
    goals: [
      'Document the event as a story of partnership, not a single-org showcase',
      'Capture both the formal programme and the in-between human moments',
      'Deliver a complete image bank plus a recap video suitable for embassy and partner channels',
    ],
    year: '2026',
    location: 'Monrovia, Liberia',
    coverImage: '/images/work/irish-embassy/DSC00139.jpg',
    galleryImages: [
      { src: '/images/work/irish-embassy/DSC00146.jpg', alt: 'Two attendees reviewing notes by the pool', metadata: 'EMBASSY OF IRELAND · MONROVIA · 2026', rotation: -3 },
      { src: '/images/work/irish-embassy/DSC00162.jpg', alt: 'Partner organisation representative', metadata: 'EMBASSY OF IRELAND · MONROVIA · 2026', rotation: 2 },
      { src: '/images/work/irish-embassy/DSC00273.jpg', alt: 'Attendee at the St Brigid\'s Day event', metadata: 'EMBASSY OF IRELAND · MONROVIA · 2026', rotation: -1 },
      { src: '/images/work/irish-embassy/DSC00334.jpg', alt: 'Partner organisations in group discussion', metadata: 'EMBASSY OF IRELAND · MONROVIA · 2026', rotation: 3 },
    ],
    heroVideo: 'https://www.youtube.com/embed/TPTvWGt6HlA',
    metadataStrip: 'EMBASSY OF IRELAND · MONROVIA · 2026',
    sectionBg: 'black',
  },
  {
    slug: 'sappimah-impact-documentary',
    projectNumber: '02',
    title: 'SAPPIMAH',
    client: 'Sappimah Cassava Refining Company',
    serviceSlug: 'media-coverage',
    serviceName: 'MEDIA COVERAGE & DOCUMENTARY',
    description:
      'A cinematic documentary that put rural farmers — not the boardroom — at the centre of the investment pitch.',
    descriptionParagraphs: [
      "The CEO of SCRC was heading to the US to make the case for investment, and he didn't want to stand in front of investors talking numbers. He wanted the farmers to do the talking. The ask: a cinematic documentary putting the lens on the rural communities whose livelihoods SCRC is actually changing.",
      'We pre-produced everything before leaving Monrovia — script, storyboard, shot list, interview questions. Two days on the ground in Bong County, then back to the edit suite. The film travelled with the CEO. SCRC and the investors were happy with the result — but the bar we cared more about was whether the farmers felt seen in their own story. They did.',
    ],
    goals: [
      'Produce a cinematic-quality documentary that could carry the SCRC story to US investors',
      'Centre the lived experience of local farmers as the proof of impact',
      'Pre-produce thoroughly so two days of shooting in Bong County would yield a full edit',
    ],
    year: '2025',
    location: 'Bong County, Liberia',
    coverImage: '/images/work/scrc/Still-2026-05-13-150015_1.9.1.jpg',
    galleryImages: [
      { src: '/images/work/scrc/Still-2026-05-13-150015_1.2.1.jpg', alt: 'SCRC documentary still', metadata: 'SCRC · BONG COUNTY · 2025', rotation: -3 },
      { src: '/images/work/scrc/Still-2026-05-13-150015_1.6.1.jpg', alt: 'SCRC documentary still', metadata: 'SCRC · BONG COUNTY · 2025', rotation: 2 },
      { src: '/images/work/scrc/Still-2026-05-13-150015_2.3.1.jpg', alt: 'SCRC documentary still', metadata: 'SCRC · BONG COUNTY · 2025', rotation: -1 },
      { src: '/images/work/scrc/Still-2026-05-13-150015_2.12.1.jpg', alt: 'SCRC documentary still', metadata: 'SCRC · BONG COUNTY · 2025', rotation: 3 },
    ],
    heroVideo: 'https://www.youtube.com/embed/SqcVpfHiVOI',
    metadataStrip: 'SCRC · BONG COUNTY · 2025',
    sectionBg: 'cream',
  },
  {
    slug: 'adolescent-girls-summit-2026',
    projectNumber: '03',
    title: 'GIRLS SUMMIT',
    client: 'Global Fund for Children',
    serviceSlug: 'media-coverage',
    serviceName: 'MEDIA COVERAGE & DOCUMENTARY',
    description:
      "Four days of media coverage and event design for one of Africa's most important adolescent-girls convenings.",
    descriptionParagraphs: [
      "The Adolescent Girls Summit is one of the most important convenings on the continent for adolescent girls' leadership, SRHE, technology, and gender equality. Global Fund for Children was hosting the third edition, and the storytelling brief was unambiguous: every frame had to earn its place in the case being made to funders, partners, and the stakeholders who'd decide if AGS keeps growing.",
      'We brought a moodboard before we brought a camera. Once GFC approved the visual direction, we spent four days on the ground — interviews with adolescents and partner organisations, hours of b-roll, daily recap videos turned around in-country, and a deep image bank from every session. Alongside the coverage, we handled event design: banners, merch, on-screen animations. Magic, on schedule, for four days.',
    ],
    goals: [
      'Deliver storytelling strong enough to justify continued investment in AGS to funders and partners',
      'Pre-align on visual direction via a moodboard before production began',
      'Produce daily recap videos in-country alongside a deep image and b-roll bank',
      "Provide event design support (banners, merch, on-screen animations) in parallel with coverage",
    ],
    year: '2026',
    location: "Yamoussoukro, Côte d'Ivoire",
    coverImage: '/images/work/gfc/DSC00178.jpg',
    galleryImages: [
      { src: '/images/work/gfc/DSC00007.jpg', alt: 'Adolescent girls at the summit', metadata: "GLOBAL FUND FOR CHILDREN · CÔTE D'IVOIRE · 2026", rotation: -3 },
      { src: '/images/work/gfc/DSC00070.jpg', alt: 'Session in progress at the Girls Summit', metadata: "GLOBAL FUND FOR CHILDREN · CÔTE D'IVOIRE · 2026", rotation: 2 },
      { src: '/images/work/gfc/DSC00178.jpg', alt: 'Participants during a workshop', metadata: "GLOBAL FUND FOR CHILDREN · CÔTE D'IVOIRE · 2026", rotation: -1 },
      { src: '/images/work/gfc/DSC00831.jpg', alt: 'Group activity at the Adolescent Girls Summit', metadata: "GLOBAL FUND FOR CHILDREN · CÔTE D'IVOIRE · 2026", rotation: 3 },
    ],
    heroVideo: 'https://mega.nz/embed/Swp0jThZ#D0okbk7whlnLsUJabrrXtbyJLv1D_gAPgkQYm6pg7HI',
    metadataStrip: "GLOBAL FUND FOR CHILDREN · CÔTE D'IVOIRE · 2026",
    sectionBg: 'black',
  },

  {
    slug: 'sos-building-futures',
    projectNumber: '04',
    title: 'BUILDING FUTURES',
    client: "SOS Children's Villages Liberia",
    serviceSlug: 'media-coverage',
    serviceName: 'MEDIA COVERAGE & DOCUMENTARY',
    description:
      "A full organisational documentary spanning all aspects of SOS Children's Village work in Liberia — Family strengthening, youth programmes, and a mobile health unit that has reached 7,000+ families.",
    descriptionParagraphs: [
      "SOS Children's Villages Liberia has been in the country for over 40 years. They needed a film that could hold the full weight of that presence — not a highlight reel, not a donor promo, but a documentary showing the real breadth of their work: caregiver family life inside the SOS Village, education and vocational training for young people, family strengthening programmes supporting vulnerable households in the community, and the Hospital on Wheels initiative — a mobile community health outreach project that has reached over 7,000 families across Liberia with lifesaving health education, maternal care, and community health services.",
      'Titled "Building Futures, Restoring Hope," the production required multi-scene filming across the SOS Village compound and surrounding community settings. We conducted professional on-camera interviews with clinical staff — a Head Nurse and Midwife speaking to health outcomes and community impact — alongside caregiver and youth testimonies and a senior leadership interview with the National Director. Drone aerials of the village and surrounding community provided the visual scale the organisation needed. All footage was captured to broadcast quality and delivered for organisational, fundraising, and advocacy use.',
    ],
    goals: [
      'Document the full breadth of SOS programming — Village life, education, family strengthening, and Hospital on Wheels',
      'Conduct broadcast-quality on-camera interviews with clinical staff, caregivers, youth, and the National Director',
      'Capture drone aerials of the SOS Village compound and surrounding community',
      'Deliver a film suitable for organisational, fundraising, and advocacy use',
    ],
    year: '2025',
    location: 'Monrovia, Liberia',
    coverImage: '/images/work/sos/cover.png',
    heroVideo: 'https://mega.nz/embed/atgxFT4J#nBiDkpPY3wM-C-B5ujuuEw-iJoJgJ4OnCosNPCe-5Yo',
    stats: [
      { value: '7,000+', label: 'Families reached by Hospital on Wheels' },
      { value: '40+', label: 'Years of SOS presence in Liberia' },
    ],
    metadataStrip: "SOS CHILDREN'S VILLAGES · MONROVIA · 2025",
    sectionBg: 'cream',
  },

  /* ── Social & Story ───────────────────────────────────────────────── */
  {
    slug: 'jackies-resort-social-launch',
    projectNumber: '05',
    title: "JACKIE'S RESORT",
    client: "Jackie's Resort",
    serviceSlug: 'social-and-story',
    serviceName: 'SOCIAL & STORY',
    description:
      "First-ever social presence for a resort betting on travellers willing to drive beyond Monrovia.",
    descriptionParagraphs: [
      "Jackie's Resort sits in Ganta City, a stretch of Liberia people in Monrovia talk about but rarely make the drive to see. New management came in, decided the resort needed a real social presence for the first time, and gave us the job of showing people what was waiting for them outside the capital.",
      'We batch-produced content covering every part of the property — rooms, food, grounds, the small details that sell a stay — across high-quality images, reels, and supporting graphics. Some videos pulled thousands of views; one came close to 50k. More importantly, people started planning the trip up.',
    ],
    goals: [
      "Build Jackie's Resort's first social media presence from scratch",
      'Communicate a "luxury experience outside Monrovia" positioning through visual content',
      'Produce content efficiently via batch shooting to sustain a regular posting cadence',
    ],
    year: '2025',
    location: 'Ganta City, Liberia',
    coverImage: '/images/work/jackies/DSC04968.jpg',
    galleryImages: [
      { src: '/images/work/jackies/DSC04977.jpg', alt: "Jackie's Resort", metadata: "JACKIE'S RESORT · GANTA CITY · 2025", rotation: -3 },
      { src: '/images/work/jackies/DSC04980.jpg', alt: "Jackie's Resort", metadata: "JACKIE'S RESORT · GANTA CITY · 2025", rotation: 2 },
      { src: '/images/work/jackies/DSC06752.jpg', alt: "Jackie's Resort content shoot", metadata: "JACKIE'S RESORT · GANTA CITY · 2025", rotation: -1 },
      { src: '/images/work/jackies/DSC06864.jpg', alt: "Jackie's Resort content shoot", metadata: "JACKIE'S RESORT · GANTA CITY · 2025", rotation: 3 },
    ],
    stats: [
      { value: '50K', label: 'Top reel views' },
      { value: '1K+', label: 'Views per post' },
    ],
    metadataStrip: "JACKIE'S RESORT · GANTA CITY · 2025",
    sectionBg: 'cream',
  },
  {
    slug: 'monvies-collection-product-story',
    projectNumber: '06',
    title: "MONVIE'S",
    client: "Monvie's Collection",
    serviceSlug: 'social-and-story',
    serviceName: 'SOCIAL & STORY',
    description:
      "A month of product photography and short-form video to shift Monvie's social from catalogue to story.",
    descriptionParagraphs: [
      "Monvie's Collection wanted the product imagery to match the brand they were building — elegant, considered, not just another catalogue. We came in for a month of dedicated product photography and short-form video for reels.",
      "We planned the shoots in detail, ran them in batches, and delivered on schedule. The work shifted Monvie's social feed from \"product photos\" to product story.",
    ],
    goals: [
      "Elevate Monvie's Collection product visuals to match the elegance of the brand",
      'Produce both still photography and short-form video assets for social',
      'Deliver on schedule via batch-shoot planning across the engagement',
    ],
    year: '2024',
    location: 'Monrovia, Liberia',
    coverImage: '/images/work/monvies/62.jpg',
    galleryImages: [
      { src: '/images/work/monvies/65.jpg', alt: "Monvie's Collection product shot", metadata: "MONVIE'S COLLECTION · MONROVIA · 2024", rotation: -3 },
      { src: '/images/work/monvies/66.jpg', alt: "Monvie's Collection product shot", metadata: "MONVIE'S COLLECTION · MONROVIA · 2024", rotation: 2 },
      { src: '/images/work/monvies/70.jpg', alt: "Monvie's Collection product shot", metadata: "MONVIE'S COLLECTION · MONROVIA · 2024", rotation: -1 },
      { src: '/images/work/monvies/71.jpg', alt: "Monvie's Collection product shot", metadata: "MONVIE'S COLLECTION · MONROVIA · 2024", rotation: 3 },
    ],
    metadataStrip: "MONVIE'S COLLECTION · MONROVIA · 2024",
    sectionBg: 'black',
  },

  /* ── Creator Studio ───────────────────────────────────────────────── */
  {
    slug: 'gen-z-investor-personal-brand',
    projectNumber: '12',
    title: 'GEN Z INVESTOR',
    client: 'Gen Z Investor',
    serviceSlug: 'creator-studio',
    serviceName: 'CREATOR STUDIO',
    description:
      'Full personal-brand build for an investment analyst speaking directly to Gen-Z founders.',
    descriptionParagraphs: [
      "An investment analyst with smart things to say to Gen-Z founders — but the original scripts were reading like research memos, not social content. We came in for the full personal-brand build: rewriting scripts so they'd actually land in feed, setting up the shoot environment, running batch shoots so a single day produced weeks of content, and editing every piece through to delivery.",
      "Personal-brand work is its own discipline. The voice has to sound like the person — just better-organised.",
    ],
    goals: [
      'Translate research-style content into social-ready scripting that lands with a Gen-Z founder audience',
      'Build out a repeatable shoot environment for the client',
      'Run batch shoots so each production day yielded weeks of content',
      'Edit and deliver every piece end-to-end',
    ],
    year: '2025',
    location: 'Monrovia, Liberia',
    coverImage: '/images/work/gen-z-investor/cover.jpg',
    galleryImages: [
      { embedUrl: 'https://www.instagram.com/reel/DIlQUZtolf7/embed/', metadata: 'GEN Z INVESTOR · MONROVIA · 2025', rotation: -2 },
      { embedUrl: 'https://www.instagram.com/reel/DTiUI6lCKgr/embed/', metadata: 'GEN Z INVESTOR · MONROVIA · 2025', rotation: 2 },
      { embedUrl: 'https://www.instagram.com/reel/DHnuulUowri/embed/', metadata: 'GEN Z INVESTOR · MONROVIA · 2025', rotation: -1 },
      { embedUrl: 'https://www.instagram.com/p/DUZJe6ziPv-/embed/', metadata: 'GEN Z INVESTOR · MONROVIA · 2025', rotation: 2 },
    ],
    reels: [
      'https://www.instagram.com/reel/DIlQUZtolf7/',
      'https://www.instagram.com/reel/DTiUI6lCKgr/',
      'https://www.instagram.com/reel/DHnuulUowri/',
      'https://www.instagram.com/p/DUZJe6ziPv-/',
    ],
    metadataStrip: 'GEN Z INVESTOR · MONROVIA · 2025',
    sectionBg: 'black',
  },
];
