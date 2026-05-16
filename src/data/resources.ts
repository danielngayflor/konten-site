export type ResourceType = 'article' | 'cheat-sheet' | 'white-paper';

export type ResourceBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'callout'; text: string };

export interface Resource {
  slug: string;
  title: string;
  type: ResourceType;
  summary: string;
  coverImage?: string;
  publishedAt: string;
  readTime: string;
  body: ResourceBlock[];
}

export const TYPE_LABELS: Record<ResourceType, string> = {
  'article': 'Article',
  'cheat-sheet': 'Cheat Sheet',
  'white-paper': 'White Paper',
};

export const resources: Resource[] = [
  {
    slug: 'content-strategy-for-ngos',
    title: 'Content Strategy for NGOs',
    type: 'article',
    summary: 'How non-profits in West Africa can build a content engine on a tight budget and still reach the audiences that matter.',
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80&auto=format&fit=crop',
    publishedAt: 'May 2026',
    readTime: '6 min read',
    body: [
      { kind: 'paragraph', text: 'Most NGOs in Liberia and across West Africa are sitting on powerful stories — field workers making breakthroughs, communities transforming, donor-funded programs delivering real change. The problem isn\'t the story. It\'s the system to tell it.' },
      { kind: 'heading', text: 'Start with your audience, not your org chart' },
      { kind: 'paragraph', text: 'Too many NGO content plans are structured around internal departments instead of external audiences. Your communications should answer one question: who needs to believe what, and by when? Map your audiences — donors, beneficiaries, government stakeholders, the press — before you write a single caption.' },
      { kind: 'heading', text: 'The three content pillars for impact orgs' },
      { kind: 'list', items: [
        'Proof content — data, testimonials, before/after stories that show your work is working.',
        'Education content — guides, explainers, and tools that make you the subject-matter expert in your sector.',
        'Culture content — behind-the-scenes, team moments, values in action. This builds trust faster than any press release.',
      ]},
      { kind: 'callout', text: 'A 3-pillar mix gives you a rhythm: 2 proof posts, 2 education posts, 1 culture post per week. You never run out of ideas because each pillar feeds the next.' },
      { kind: 'heading', text: 'The one metric that matters most' },
      { kind: 'paragraph', text: 'For most NGOs, the north-star metric is donor retention — not follower count, not reach. Focus your content on deepening relationships with people who already believe in your mission, and acquisition follows naturally.' },
    ],
  },
  {
    slug: 'social-media-brief-template',
    title: 'Social Media Brief Template',
    type: 'cheat-sheet',
    summary: 'A one-page brief that aligns your team before every campaign. Stop briefing in WhatsApp voice notes.',
    coverImage: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1400&q=80&auto=format&fit=crop',
    publishedAt: 'April 2026',
    readTime: '2 min read',
    body: [
      { kind: 'paragraph', text: 'A social media brief removes ambiguity before a shoot or campaign starts. Use this template to align your team, your client, and your creative direction on one page.' },
      { kind: 'heading', text: 'The brief, field by field' },
      { kind: 'list', items: [
        'Campaign name & dates — be specific. "May launch" is not a date.',
        'Objective — one sentence. What does success look like by the end of this campaign?',
        'Primary audience — who are we talking to? Age, platform, what they care about.',
        'Platforms — where will this live? Each platform needs its own format.',
        'Tone & style — 3 adjectives max. "Bold, warm, direct" is a complete answer.',
        'Deliverables — exact formats, dimensions, quantities.',
        'Must-include — logos, disclaimers, hashtags, handles.',
        'Must-avoid — anything that has caused problems in past campaigns.',
        'Sign-off owner — who approves final content before it goes live?',
      ]},
      { kind: 'callout', text: 'A brief that takes 20 minutes to write saves 3 rounds of revisions. Build it as a shared Google Doc so client and team can comment before production starts.' },
      { kind: 'heading', text: 'How Konten uses this' },
      { kind: 'paragraph', text: 'Every project we take on starts with a brief. We send a fillable version to the client on day one. By the time the kickoff call happens, we already agree on what we\'re making — so we can spend the meeting talking about ideas, not logistics.' },
    ],
  },
  {
    slug: 'visual-storytelling-in-emerging-markets',
    title: 'Visual Storytelling in Emerging Markets',
    type: 'white-paper',
    summary: 'Why Western content frameworks often fall short in African markets — and what a locally-grounded visual strategy looks like.',
    coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1400&q=80&auto=format&fit=crop',
    publishedAt: 'March 2026',
    readTime: '12 min read',
    body: [
      { kind: 'paragraph', text: 'The dominant frameworks for brand storytelling were developed in the US and Western Europe. When applied wholesale to markets in sub-Saharan Africa, they frequently miss — not because the audiences are less sophisticated, but because the cultural context, digital infrastructure, and media diet are fundamentally different.' },
      { kind: 'heading', text: 'The copy-paste problem' },
      { kind: 'paragraph', text: 'A global NGO brief that lands perfectly in London can feel out of place in Monrovia. The instinct to "localize" often means adding a flag or translating copy — surface changes that don\'t address the deeper mismatch in values, references, and visual grammar.' },
      { kind: 'heading', text: 'Three principles for grounded visual work' },
      { kind: 'list', items: [
        'Show the dignity of ordinary life — not just crisis, not just triumph. The middle ground of everyday effort is where real connection lives.',
        'Build with local talent from the start — not as a production convenience, but as a creative prerequisite. Local faces, local locations, local music.',
        'Respect the timeline of trust — audiences in many African markets have been over-promised by brands and institutions. Credibility is built through consistency, not campaigns.',
      ]},
      { kind: 'callout', text: 'The most effective content we\'ve made for Liberian audiences didn\'t look like international brand work. It looked like something made by people who live here. That\'s not a constraint — it\'s the advantage.' },
      { kind: 'heading', text: 'The role of video in low-bandwidth contexts' },
      { kind: 'paragraph', text: 'Mobile data costs in West Africa are still high relative to average incomes. Long-form video demands either WiFi access or a willingness to spend data. Short, high-value video that rewards the investment performs best — 60–90 second pieces that deliver one clear takeaway.' },
      { kind: 'heading', text: 'What this means for your next brief' },
      { kind: 'paragraph', text: 'Before you write a creative brief, ask: was this framework built for our audience? If the honest answer is no, start from the audience backward rather than from the template forward.' },
    ],
  },
];
