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
    title: 'Content Strategy for NGOs in West Africa',
    type: 'article',
    summary: 'How non-profits in Liberia and across West Africa can build a communications system that holds donor trust, mobilises local support, and survives when one institutional funder pulls out.',
    coverImage: 'https://images.unsplash.com/photo-1631047085941-a29e9730a7e6?w=1400&q=80&auto=format&fit=crop',
    publishedAt: 'May 2026',
    readTime: '12 min read',
    body: [
      { kind: 'paragraph', text: 'Most NGOs in Liberia and across West Africa are sitting on powerful stories — field workers making breakthroughs in places the road forgets, communities that built something from nothing, donor-funded programs that actually moved a number. The problem isn\'t the story. It\'s the system to tell it.' },
      { kind: 'paragraph', text: 'And right now, the system has to work harder than it ever did.' },
      { kind: 'paragraph', text: 'In January 2025, USAID programs were frozen pending review. By May, only 14% of the 6,256 operating programs remained, with funding cut from $120 billion to $69 billion. The US contributed roughly a fifth of all official development assistance to Africa in 2023, so this isn\'t a small adjustment — it\'s a structural shift. The Mo Ibrahim Foundation summed it up bluntly: aid as Africa knew it is not coming back to the status quo.' },
      { kind: 'paragraph', text: 'For NGOs operating in Liberia, Sierra Leone, Côte d\'Ivoire, Ghana, the question is no longer "how do we tell our story better?" It\'s "how do we build a communications system that holds donor trust, mobilises local support, and survives when one institutional funder pulls out?"' },
      { kind: 'callout', text: 'This is a working playbook for that.' },

      { kind: 'heading', text: 'Start with your audience, not your org chart' },
      { kind: 'paragraph', text: 'Too many NGO content plans are structured around internal departments — programs, M&E, fundraising, advocacy — instead of external audiences. The result is content that reads like a status update to your board, not a message to anyone who might actually fund, support, or join your work.' },
      { kind: 'paragraph', text: 'Your communications should answer one question: who needs to believe what, and by when?' },
      { kind: 'paragraph', text: 'For most West African NGOs, the audience map has at least five layers, and each layer wants something different:' },
      { kind: 'list', items: [
        'International donors (foundations, individual givers in the US, EU, UK). They want proof their money worked, told with dignity, ideally with named beneficiaries who chose to be on camera. They\'re the loudest voice in most NGO content plans — but they\'re often only one funder away from being silent.',
        'Domestic donors and diaspora. The Liberian, Ghanaian, Nigerian diaspora sends more money home in remittances than the entire continent receives in aid — $90.8 billion in 2023 versus $73.6 billion in ODA. This audience is wildly under-served by NGO content. They don\'t need to be educated about Liberia. They need to be invited into the work.',
        'Government and ministry stakeholders. They want to see legitimacy — partnerships, alignment with national priorities, public acknowledgment of their role.',
        'Beneficiaries and communities you serve. The people who appear in your content are also an audience. If your storytelling makes them feel like specimens instead of subjects, your work is broken even if the metrics look fine.',
        'Peers and press. Local journalists, sector colleagues, future hires. They\'re watching for the orgs that move beyond press-release English into actual stories.',
      ]},
      { kind: 'paragraph', text: 'Map these audiences before you write a single caption. Decide which one a piece of content is for, and assume the others won\'t care. Content that tries to speak to everyone speaks to no one.' },

      { kind: 'heading', text: 'The three content pillars for impact orgs' },
      { kind: 'paragraph', text: 'A pillar system gives you a rhythm. You never run out of ideas because each pillar feeds the next, and you can audit the mix at the end of each month to see if you\'re balanced.' },
      { kind: 'heading', text: 'Proof content' },
      { kind: 'paragraph', text: 'Data, testimonials, before/after stories that show your work is working. This is the pillar most NGOs over-rely on, and the one most often executed badly. Done well, proof content names a real person, shows a specific change, and includes a number that matters. One person, one quote, one supply chain — not "we reached 14 million people" with no faces. Done badly, it slides into what critics have called "poverty porn" — extractive imagery that uses suffering as a fundraising hook without consent or context. The More Than Me scandal in Liberia is the clearest cautionary tale in our region. A useful filter before publishing any proof content: would the person in this story be proud to send it to their family? If the answer is no, the story isn\'t ready.' },
      { kind: 'heading', text: 'Education content' },
      { kind: 'paragraph', text: 'Guides, explainers, and tools that make you the subject-matter expert in your sector. This is the most under-used pillar in West African NGO content, and the one with the highest leverage. When a Liberian NGO publishes a clear, sourced explainer on community health worker compensation, or how SRHR programs measure outcomes, or what girls\' education funding actually buys at the village level — they become the reference. Journalists cite them. Funders forward their posts. Other NGOs link back. Education content is also the easiest to repurpose: one well-researched explainer becomes a carousel, a thread, a short video, a one-pager, a workshop module, a podcast segment.' },
      { kind: 'heading', text: 'Culture content' },
      { kind: 'paragraph', text: 'Behind-the-scenes, team moments, values in action. This builds trust faster than any press release, and it\'s the pillar most NGOs ignore entirely because they think it\'s "unprofessional." It\'s not. It\'s the only pillar that humanises you. Show the field team in Bomi prepping for a deployment. Show the moment a partnership is signed — not the staged photo, the actual handshake. Name the people in your captions. Use their real voices.' },
      { kind: 'callout', text: 'The weekly mix: 2 proof posts per week (one international-donor-facing, one local audience-facing), 2 education posts (one shareable carousel or thread, one longer piece), 1 culture post. Five pieces of content. With one person and a content calendar, it\'s doable. Consistency beats ambition every time.' },

      { kind: 'heading', text: 'The platform reality nobody plans for' },
      { kind: 'paragraph', text: 'Here is where most NGO content strategies — especially ones imported from US or European playbooks — break down: they\'re built for Instagram and email. In West Africa, those are second and third channels at best. In Liberia in early 2025, Facebook had about 941,000 to 1.1 million users — roughly 18–19% of the population. Instagram had 115,000 users, about 2% of the population. WhatsApp is a different story. A 2025 industry survey found 87% of African NGOs use WhatsApp for donor communication, compared to 8% in Australia and Oceania.' },
      { kind: 'list', items: [
        'Design content for vertical mobile, low data, and re-sharing in groups. A 90-second video that costs 15MB to load will not get watched in rural Bong County. A static carousel with bold readable text will. Compress everything.',
        'Build WhatsApp Broadcast Lists and Communities, not just an email list. Treat it as a primary CRM channel. Get explicit opt-in. Send one well-crafted update per week.',
        'Use voice notes. They work in markets with low literacy, feel intimate, and cost almost nothing to produce. A two-minute voice note from a field worker, sent to your supporter WhatsApp, often outperforms a polished video.',
        'Don\'t write off radio. In Liberia, community radio in Sinkor, Robertsport, Voinjama still drives action. If your work is rural and your content plan is entirely digital, you have a gap.',
      ]},
      { kind: 'paragraph', text: 'The principle behind all of this: build for how people actually consume content where you work, not how a Western donor imagines they do.' },

      { kind: 'heading', text: 'The dignity rule' },
      { kind: 'paragraph', text: 'There is no content strategy worth building if it doesn\'t pass an ethics test, and this is the section most strategy decks skip.' },
      { kind: 'list', items: [
        'Consent is not a release form. It\'s a conversation. The person in your photograph needs to understand where the image will appear, who will see it, and what it will be used to raise.',
        'Don\'t compress a person\'s life into your funding cycle. A child\'s story is not a "before" for your fiscal year "after." If you only show people in their hardest moment, you\'re using them.',
        'Localise the byline. Whenever possible, the story should be told by someone from the place it happens. Liberian journalists, photographers, and creators are not in short supply. Pay them. Credit them.',
      ]},

      { kind: 'heading', text: 'The one metric that matters most' },
      { kind: 'paragraph', text: 'For most NGOs, the north-star metric is donor retention — not follower count, not reach, not even total dollars raised in a quarter. The Fundraising Effectiveness Project\'s most recent data shows the average donor retention rate sat around 43–45%, with new donor retention essentially flat at around 18%. More than half the people who give once will not give again.' },
      { kind: 'list', items: [
        'Donors who interact with an NGO on social media retain at rates ~40% higher than non-social donors.',
        'Donors who receive a personal thank-you within 48 hours of giving are 4x more likely to give a second time.',
        'Donors engaged through storytelling are 80% more likely to give again.',
        'Multi-channel donors (email + social + WhatsApp + occasional physical mail) are 40% more likely to retain.',
      ]},
      { kind: 'callout', text: 'Most retention failures aren\'t a content problem — they\'re a follow-through problem. Acknowledge every donation within 48 hours. Send one substantive update per month. Write one long piece per quarter. Ask once a year.' },

      { kind: 'heading', text: 'A 30-day starter system' },
      { kind: 'list', items: [
        'Week 1 — Map. Write down your top five audiences. For each one, write one sentence: what do they need to believe by end of year? Decide what platforms you\'re actually showing up on.',
        'Week 2 — Build the backlog. Walk through your last 12 months of work and identify ten stories worth telling — five proof, three education, two culture. Don\'t write them yet. Just list them.',
        'Week 3 — Produce the first five. One per pillar from your backlog. Keep them short. Get them out the door. Done is better than perfect.',
        'Week 4 — Set the rhythm. Build a content calendar with one publishing slot per weekday. Recruit one field staff member to send you one voice note or photo per week from their work. That\'s your culture pipeline forever.',
      ]},

      { kind: 'heading', text: 'The closing thought' },
      { kind: 'paragraph', text: 'The funding landscape that built most of the NGO sector in West Africa is changing under our feet. The orgs that come out of this stronger won\'t be the ones with the biggest grants. They\'ll be the ones whose communities, donors, governments, and teams know exactly what they do, why it matters, and what\'s true.' },
      { kind: 'paragraph', text: 'That\'s a content problem. It\'s also a trust problem, an ethics problem, and a discipline problem. But mostly it\'s a content problem. And content problems have solutions.' },
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
