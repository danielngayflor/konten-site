export type ResourceType = 'article' | 'cheat-sheet' | 'white-paper';

export type ResourceBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'callout'; text: string }
  | { kind: 'image'; src: string; alt: string };

export interface Resource {
  slug: string;
  title: string;
  type: ResourceType;
  summary: string;
  coverImage?: string;
  publishedAt: string;
  readTime: string;
  body: ResourceBlock[];
  downloadFile?: {
    path: string;
    fileName: string;
    label: string;
  };
}

export const TYPE_LABELS: Record<ResourceType, string> = {
  'article': 'Article',
  'cheat-sheet': 'Cheat Sheet',
  'white-paper': 'White Paper',
};

export const resources: Resource[] = [
  {
    slug: 'social-media-is-not-a-storefront',
    title: 'Your Social Media Is a Storefront. That\'s the Problem.',
    type: 'article',
    summary: 'What Liberian small businesses are getting wrong about social media — and what to do instead.',
    coverImage: '/images/articles/social-media-storefront.jpg',
    publishedAt: 'June 2026',
    readTime: '8 min read',
    body: [
      { kind: 'paragraph', text: 'I\'ve sat across from enough small business owners in Monrovia to notice a pattern.' },
      { kind: 'paragraph', text: 'They\'re on Instagram. They\'re on Facebook. Some are even trying TikTok. And almost all of them are frustrated. The followers aren\'t coming fast enough. The sales aren\'t happening. The posts feel like they\'re disappearing into a void.' },
      { kind: 'paragraph', text: 'So they post more flyers. More price lists. More "we have this, come buy." And the void gets louder.' },
      { kind: 'callout', text: 'Here\'s the truth nobody\'s telling them: the strategy is the problem. Not the algorithm. Not the platform. Not the audience. The way they think about social media — what it is, what it\'s for, how it works — is fundamentally broken.' },

      { kind: 'heading', text: 'Mistake #1: Treating Social Media Like a Storefront' },
      { kind: 'paragraph', text: 'Walk down Randall Street in Monrovia. Every shop has its goods displayed at the front. Shoes lined up. Phones in the window. Prices on a board. That\'s a storefront. It works because people are already walking past. They\'re already in buying mode.' },
      { kind: 'paragraph', text: 'Social media is not Randall Street.' },
      { kind: 'paragraph', text: 'Nobody opens Instagram looking to be sold to. They open it to be entertained, educated, or inspired. They\'re not in buying mode — they\'re in browsing mode. And the moment your content feels like an ad, they scroll past.' },
      { kind: 'paragraph', text: 'Yet this is exactly how most Liberian small businesses use it. Every post is a catalogue entry. Product photo, price, phone number. Buy now. Call us. We deliver. Repeat.' },
      { kind: 'paragraph', text: 'This is what marketers call interruption marketing — the old model where you push your message at people and hope enough of them stop to listen. It worked for television. It worked for billboards. It does not work for social media, because on social media, the audience has complete control. One thumb and you\'re gone.' },
      { kind: 'paragraph', text: 'The businesses winning on social media have moved to a completely different model: permission marketing, a concept developed by Seth Godin. The idea is simple. Instead of interrupting strangers, you earn the attention of people who actually want to hear from you. You give them something valuable. They give you their attention. Over time, that attention converts to trust — and trust converts to sales.' },
      { kind: 'callout', text: 'The storefront gets foot traffic. Permission marketing builds a following.' },

      { kind: 'heading', text: 'Mistake #2: Selling Instead of Serving' },
      { kind: 'paragraph', text: 'Let me give you a concrete example.' },
      { kind: 'paragraph', text: 'There\'s a cosmetics brand — let\'s call them Brand A. They\'re on Instagram every day. Flyers for product bundles. Graphics with prices. Promotional posts for new arrivals. Their feed looks like a price list with a logo.' },
      { kind: 'paragraph', text: 'Now imagine Brand A takes a different approach. Instead of posting flyers, they start a series. Skincare for Men — a weekly post teaching Liberian men how to build a simple skincare routine, what ingredients to look for, how to deal with common skin issues in our climate. Or Natural Hair Diaries — a series for women with natural African hair, covering moisture retention, protective styles, what chemicals to avoid.' },
      { kind: 'paragraph', text: 'No hard sell. Just genuinely useful content for a specific audience within their broader market.' },
      { kind: 'paragraph', text: 'What happens? A few things — all of them powerful.' },
      { kind: 'list', items: [
        'They attract the right people. Not everyone. The people who actually care about skincare and natural hair. A post titled "3 things men with oily skin should stop doing" will get shared by men with oily skin. A flyer for a product bundle gets shared by nobody.',
        'They build authority. Before anyone buys from you, they need to know you exist, like what you stand for, and trust that you deliver. Flyers can handle "know." They do nothing for "like" or "trust." Educational content does all three — simultaneously.',
        'When Brand A eventually introduces their moisturiser into the Skincare for Men series, it doesn\'t feel like an ad. It feels like a recommendation from someone who\'s been helping you for months.',
      ]},
      { kind: 'callout', text: 'The product becomes the natural conclusion of the relationship. Not the beginning of it.' },

      { kind: 'heading', text: 'Mistake #3: Playing a Long Game with a Short-Term Mindset' },
      { kind: 'paragraph', text: 'A business owner posts for two weeks. Gets fifty followers. No sales calls. No DMs. And concludes: social media doesn\'t work for my business.' },
      { kind: 'paragraph', text: 'What they\'ve actually concluded is that planting a seed on Monday and expecting a harvest on Friday doesn\'t work. Which is true. But the problem isn\'t farming — it\'s the timeline.' },
      { kind: 'paragraph', text: 'Social media is not Google Ads. Google Ads is pull marketing — you show up when someone is already searching for what you sell. The intent is there. The conversion window is short. You can genuinely post on Monday and get a sale on Tuesday.' },
      { kind: 'paragraph', text: 'Social media is push marketing — you are putting content in front of people who weren\'t necessarily looking for you. You are building awareness before need exists. That means when the need eventually arrives, your brand is already there. Already trusted. Already chosen.' },
      { kind: 'paragraph', text: 'There\'s a rule in advertising called the Rule of Seven — a prospect needs to encounter your brand at least seven times before they take action. On social media, with algorithms limiting organic reach, it might be more. Which means every post that gets ignored isn\'t a failure. It\'s a touch point. It\'s one more encounter moving someone closer to seven.' },
      { kind: 'callout', text: 'Quitting after two weeks doesn\'t mean social media failed. It means the compound interest never had time to accumulate.' },

      { kind: 'heading', text: 'The Shift: From Broadcasting to Building' },
      { kind: 'paragraph', text: 'The businesses that win on social media have one thing in common. They\'ve stopped thinking about posts and started thinking about relationships.' },
      { kind: 'paragraph', text: 'This maps to the Content Marketing Funnel:' },
      { kind: 'list', items: [
        'Top of funnel — awareness content. Educate. Entertain. Attract the right people.',
        'Middle of funnel — consideration content. Go deeper. Share your process, your values, your expertise. Build trust.',
        'Bottom of funnel — conversion content. Now you sell. To people who already know you, like you, and trust you.',
      ]},
      { kind: 'paragraph', text: 'Most Liberian small businesses are bottom-of-funnel only. Every post is a conversion attempt. But if you skip the top and middle, you\'re selling to strangers. And strangers don\'t buy — not without significant trust, and not without significant time.' },
      { kind: 'callout', text: 'Fill the funnel. Feed the top. The bottom takes care of itself.' },

      { kind: 'heading', text: 'What This Looks Like in Practice' },
      { kind: 'paragraph', text: 'You don\'t need a big team or a big budget. You need a clear strategy and the discipline to execute it consistently.' },
      { kind: 'paragraph', text: 'Start with one question: What does my audience need to know, believe, or feel before they\'re ready to buy from me?' },
      { kind: 'paragraph', text: 'That question unlocks your content strategy. A cosmetics brand answers it with education about skin and hair. A restaurant answers it with content about food culture, sourcing, and the people behind the kitchen. A law firm answers it with plain-language content that demystifies legal processes for everyday people.' },
      { kind: 'list', items: [
        'Lead with value. Every single time.',
        'Think in series, not posts. A single post is forgettable. A series builds anticipation, gives people a reason to come back, and signals consistency — the foundation of trust.',
        'Measure the right things. Not just sales. Track reach, saves, shares, and profile visits. These are early indicators the long game is working, long before the conversions show up.',
      ]},
      { kind: 'paragraph', text: 'Social media is not a storefront. It\'s not a flyer wall. It\'s not a short-term sales tool. It\'s the longest, most public conversation your brand will ever have.' },
      { kind: 'paragraph', text: 'The businesses that understand this — that show up consistently, that lead with value, that play the long game — are the ones that build something that lasts.' },
      { kind: 'callout', text: 'Tell your story. The right way.' },
    ],
  },
  {
    slug: 'content-strategy-for-ngos',
    title: 'Content Strategy for NGOs',
    type: 'article',
    summary: 'How non-profits in Liberia and across West Africa can build a communications system that holds donor trust, mobilises local support, and survives when one institutional funder pulls out.',
    coverImage: '/images/articles/ngo-meeting.jpg',
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
      { kind: 'image', src: '/images/articles/community-gathering.jpg', alt: 'West African community gathered together, woman in headscarf smiling' },

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
      { kind: 'image', src: '/images/articles/women-sifting-grain.jpg', alt: 'African women sorting grain at a market in West Africa' },
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
    title: 'Steal Our Social Media Brief Template',
    type: 'cheat-sheet',
    summary: 'Five years of scope-creep lessons folded into one doc. A walkthrough of every field that matters — and the exact template we send clients on day one.',
    coverImage: '/images/articles/social-media-brief-cover.png',
    publishedAt: 'April 2026',
    readTime: '9 min read',
    downloadFile: {
      path: '/downloads/konten-social-media-brief-template.docx',
      fileName: 'konten-social-media-brief-template.docx',
      label: 'Konten Social Media Brief Template',
    },
    body: [
      { kind: 'paragraph', text: 'There\'s a specific kind of pain in this job that I want to talk about.' },
      { kind: 'paragraph', text: 'You wrap a shoot. You feel good. You sit down to edit and the client sends a note that says: "Actually we wanted this to feel more upbeat. And can the logo be bigger? And we forgot to mention — this needs to work for LinkedIn too." Three weeks later, you\'re on round five, the campaign is two weeks late, nobody is happy, and you can trace every single problem back to one missing conversation that should have happened on day one.' },
      { kind: 'paragraph', text: 'That conversation is the brief.' },
      { kind: 'paragraph', text: 'I\'ve been making content for other people for five years now. Documentary work, brand campaigns, recap videos, the whole spread. And the single biggest unlock I\'ve found — bigger than any camera, any editing trick, any pricing strategy — is having a brief signed off before I touch anything.' },
      { kind: 'paragraph', text: 'This is a walkthrough of how I do it, why each field matters, and what good answers look like. Follow along and grab the actual template we send to clients on day one at the bottom of this page.' },

      { kind: 'heading', text: 'What a brief actually is' },
      { kind: 'paragraph', text: 'A social media brief is one document that everyone signs off on before production starts. It locks four things in writing: what we\'re making, who it\'s for, what success looks like, and what happens when things change.' },
      { kind: 'paragraph', text: 'It is not a creative deck. It is not a strategy doc. It is not a contract — though it lives close to one. Think of it as the boring older sibling of the creative concept. The creative is what makes the work sing. The brief is what makes sure the work doesn\'t get re-cut six times because nobody agreed on what "warm" meant.' },
      { kind: 'paragraph', text: 'A few things a good brief does that nothing else does:' },
      { kind: 'list', items: [
        'It surfaces disagreement early, when fixing it is cheap. The number of times I\'ve had a client say "oh, we don\'t actually need it in 9:16" on a 30-minute brief call — that\'s a shoot I didn\'t waste two days on. The number of times we\'ve caught "actually our CEO has to approve everything" before I started editing — that\'s a week of revisions I didn\'t have to absorb.',
        'It gives both sides a single source of truth. When someone says "but we said we wanted X," there\'s a document. The document is right or it isn\'t. Nobody has to remember what got said on a WhatsApp call three weeks ago.',
        'It protects the relationship. Scope creep doesn\'t break partnerships because clients are bad people. It breaks partnerships because nobody drew the line, so nobody knows when they\'ve crossed it. You\'re not saying no to extra work — you\'re saying yes to clear boundaries upfront.',
      ]},
      { kind: 'callout', text: 'The cost of skipping this: vague briefs are the leading cause of scope creep, rushed work, blown budgets, and team burnout. The cost of doing it: 20 minutes to fill in, maybe an hour of back-and-forth to align. That\'s the trade.' },

      { kind: 'heading', text: 'Walking through the fields' },
      { kind: 'paragraph', text: 'The template has nine sections. I\'ll walk through each one — what it\'s really asking, what a strong answer looks like, and what to watch out for.' },

      { kind: 'heading', text: '01 — The basics' },
      { kind: 'paragraph', text: 'Campaign name, client, start date, go-live date, budget, brief owner.' },
      { kind: 'paragraph', text: '"May launch" is not a date. "Q2" is not a date. May 14, 2026 is a date. Every other timeline in the brief works backwards from go-live. If go-live is fuzzy, everything is fuzzy.' },
      { kind: 'paragraph', text: 'The brief owner field is the one people skip. Don\'t. This is the person responsible for keeping the brief alive — making sure it gets filled in, that the right people sign off, that updates get reflected if something changes. Without an owner, the document goes stale within a week and you\'re back to email chains.' },

      { kind: 'heading', text: '02 — The objective' },
      { kind: 'paragraph', text: 'One sentence. What does success look like by the end of this campaign?' },
      { kind: 'paragraph', text: 'If you can\'t say it in one sentence, the campaign isn\'t focused enough to start yet. Every fuzzy objective produces fuzzy work, and fuzzy work produces rounds and rounds of revisions chasing a target nobody clearly defined.' },
      { kind: 'paragraph', text: 'Good one-sentence objectives:' },
      { kind: 'list', items: [
        '"Drive 200 sign-ups to the AGS 2027 early-interest list before applications open."',
        '"Get The Last Wave\'s surf school onto the radar of three to five international travel publications."',
        '"Convert 8% of our Instagram followers into WhatsApp Broadcast subscribers."',
      ]},
      { kind: 'paragraph', text: 'Bad one-sentence objectives:' },
      { kind: 'list', items: [
        '"Raise awareness of our brand." (Awareness of what, with whom, to do what?)',
        '"Make really good content." (Good according to whom?)',
        '"Get more engagement." (More than what? Engagement that does what?)',
      ]},
      { kind: 'paragraph', text: 'Then two more questions underneath: why does this campaign exist (the business reason), and how will we measure it (two to three KPIs, max). If the objective is sign-ups, the KPI is sign-ups — not impressions.' },

      { kind: 'heading', text: '03 — The audience' },
      { kind: 'paragraph', text: 'Most briefs fall apart here. People list three audiences and weight them equally. That\'s not an audience — that\'s a hedge.' },
      { kind: 'paragraph', text: 'Pick one. If a piece of the campaign lands with a secondary group, that\'s a bonus, but you don\'t design for everyone or you design for no one.' },
      { kind: 'paragraph', text: 'Then the field that changes everything: what does this audience already believe or feel about the topic? If you don\'t know what\'s in their head before they see your content, you can\'t tell whether your content shifted anything. And if it didn\'t shift anything, you didn\'t really do the work — you just decorated the room.' },
      { kind: 'paragraph', text: 'The "where they are" field matters more than people realize, especially in our market. If your audience is in Liberia, Ghana, or Sierra Leone, you can\'t build a campaign around Instagram and call it a strategy — Instagram penetration in Liberia is around 2% of the population. WhatsApp is where the conversation happens. The brief should force you to confront that on day one, not after you\'ve shot.' },

      { kind: 'heading', text: '04 — Platforms and deliverables' },
      { kind: 'paragraph', text: 'This is the field where money gets saved or burned.' },
      { kind: 'paragraph', text: 'The template gives you a checklist of platforms with their current native specs — Instagram Reels at 9:16, feed carousels at 4:5, TikTok at 9:16, YouTube Shorts at 9:16, LinkedIn at 4:5 or 9:16, and so on. Tick what\'s actually in scope. Cross-platform reuse is great, but the moment you say "this also needs to work as a LinkedIn video," you\'ve changed the shoot.' },
      { kind: 'paragraph', text: 'Then the field that separates pros from amateurs: exact deliverables. Not "social content." Not "video assets." This:' },
      { kind: 'list', items: [
        '3× 30-second Reels in 9:16, 1080×1920',
        '5× static carousel slides at 1080×1350 each',
        '1× behind-the-scenes Story set (5–7 frames)',
        '1× horizontal trailer cut at 1920×1080 for the website',
      ]},
      { kind: 'paragraph', text: 'You should be able to count the deliverables on your fingers. If your client can\'t, neither of you knows what\'s actually being made. This single field has saved me more arguments than any other in the brief.' },

      { kind: 'heading', text: '05 — Tone, style, and non-negotiables' },
      { kind: 'paragraph', text: 'Three adjectives. Maximum. "Bold, warm, direct" is a complete answer. "Authoritative, friendly, professional, playful, sophisticated, accessible" is a sign nobody has decided what this brand actually sounds like.' },
      { kind: 'paragraph', text: 'Reference examples are where this section earns its keep. Two or three links to content the client would be proud to sit next to, with a sentence on what they like about each. References tell you more about taste than any list of adjectives, and they reveal disagreements early.' },
      { kind: 'paragraph', text: 'Then must-include and must-avoid. Must-include is the boring but essential stuff: logos, handles, hashtags, disclaimers, partner credits. Must-avoid is the field that pays for itself. Topics, words, colors, image styles, things that have caused problems in past campaigns. Over-list here. It\'s easier to remove a constraint later than to add one mid-edit.' },

      { kind: 'heading', text: '06 — Timeline and milestones' },
      { kind: 'paragraph', text: 'The template has a table with the standard milestones for a video/social shoot: brief signed off, script locked, shoot days, first draft, round 1 feedback, round 2 feedback, final delivery, go-live. Real dates next to each one. An owner next to each one.' },
      { kind: 'paragraph', text: 'Work backwards from go-live. Most timelines explode because nobody did this math at the start — they just agreed to a launch date and hoped.' },
      { kind: 'callout', text: 'One detail worth pre-agreeing: what counts as a feedback round? My rule: one consolidated set of notes within 48 hours of receiving a draft equals one round. Spell this out in the brief and you won\'t have to spell it out later under pressure.' },

      { kind: 'heading', text: '07 — Approvals and revision rounds' },
      { kind: 'paragraph', text: 'The sign-off owner is one name. The person whose "yes" means it goes live. Not "the team." Not "marketing." A name.' },
      { kind: 'paragraph', text: 'This is where partnerships break most often. The CEO weighs in at the last minute. The board chair has thoughts. Marketing approves, then comms unapproves. Every one of these problems is a sign-off owner problem, and every one can be prevented by getting a name in this box on day one.' },
      { kind: 'paragraph', text: 'Then revision rounds. Two is a healthy default for creator-led work. Three for client campaigns. Beyond that, you\'re in change-order territory. The brief states this so neither side has to bring it up awkwardly when it happens.' },
      { kind: 'paragraph', text: 'And the field most templates skip: what happens if scope grows mid-project. The honest answer is usually "additional deliverables or revision rounds are quoted separately and signed before work continues." Saying this on day one, when nobody is upset yet, is much easier than saying it in week four when feelings are involved.' },

      { kind: 'heading', text: '08 — Risks and contingency' },
      { kind: 'paragraph', text: 'Name the top three risks and a plan for each.' },
      { kind: 'paragraph', text: 'For a Liberia shoot, mine usually look something like: weather for outdoor scenes (backup indoor location locked in), key talent unavailable (one alternate identified per role), internet outage on launch day (delivery files pre-uploaded to the client\'s drive 24 hours before). Three risks, three answers, on one page.' },
      { kind: 'paragraph', text: 'The point isn\'t to predict everything. The point is to surface the obvious risks now so they don\'t ambush you later. If a partner pulling out would kill the campaign, you should know that on day one, not when it happens.' },

      { kind: 'heading', text: '09 — Sign-off' },
      { kind: 'paragraph', text: 'Two signatures. Client and creator. Names, roles, dates.' },
      { kind: 'paragraph', text: 'The act of signing matters. A brief that nobody signed is a wish list. A brief that both parties signed is a working agreement. The work that follows is built on top of it.' },

      { kind: 'heading', text: 'Three things that kill briefs' },
      { kind: 'paragraph', text: 'Even good briefs go bad. The three I see most:' },
      { kind: 'list', items: [
        'Filling it in as a formality. The brief works because you actually thought about each field. If you copy-paste "engaged millennials" into the audience box because that\'s what was in the last campaign, the brief becomes a prop. Take the 20 minutes seriously.',
        'Writing it after the work has started. People skip the brief on a "quick" project, get halfway in, then write it retroactively. The brief has no power if it\'s not blocking the start of work. Write it first. Sign it. Then begin.',
        'Not updating it when things change. If the client adds a deliverable, update the brief. If you don\'t, the version of the project in everyone\'s heads slowly drifts apart — you end up with two parallel campaigns. Both of them lose.',
      ]},

      { kind: 'heading', text: 'How Konten uses it' },
      { kind: 'paragraph', text: 'Every project starts here. I send the fillable template to the client on day one. By the time we get on the kickoff call, half the fields are already drafted. We spend the meeting talking about ideas, not logistics — because the logistics have a home, on a page, with someone\'s name next to each one.' },
      { kind: 'paragraph', text: 'About 70% of the value of the brief is the conversation it forces you to have. The other 30% is having something to point at when memory fails, scope drifts, or new stakeholders walk in halfway through. Both are worth the 20 minutes.' },
      { kind: 'callout', text: 'The template below is the one we actually use. Drop it into Google Drive and fill it in with your client in real time. Brand it however you want. Change anything you don\'t need. Just don\'t skip filling it in. If it saves you three rounds of revisions on your next project, we\'re even.' },
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
