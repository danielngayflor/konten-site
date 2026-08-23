// src/data/quiz.ts
// All quiz content, types, and scoring logic for the NGO Film Quiz.
// Price appears in result content update PACKAGE_PRICE to change all three at once.

export type FilmType = 'donor' | 'beneficiary' | 'mission';
export type ToneValue = 'diy' | 'hire' | 'balanced';

export const PACKAGE_PRICE = '$1,050';

// ── Question types ────────────────────────────────────────────────────────────

export interface WeightedOption {
  label: string;
  weights: { donor: number; beneficiary: number; mission: number };
}

export interface ScoredQuestion {
  id: string;
  text: string;
  options: WeightedOption[];
}

export interface ToneOption {
  label: string;
  tone: ToneValue;
}

export interface ToneQuestion {
  id: string;
  text: string;
  options: ToneOption[];
}

// ── DIY step (supports optional sub-bullets for step 2 of Beneficiary) ────────

export interface DiyStep {
  main: string;
  subpoints?: string[];
}

// ── Full result content for one film type ─────────────────────────────────────

export interface FilmResult {
  eyebrow: string;
  title: string;
  subtitle: string;
  definition: string;
  whyFit: string;
  diySteps: DiyStep[];
  diyGap: string;
  oneFilmNote: string;
  offer: string;
}

// ── Scored questions (Q1–Q6) ──────────────────────────────────────────────────

export const questions: ScoredQuestion[] = [
  {
    id: 'q1',
    text: "What's the main goal of this video?",
    options: [
      { label: 'Raise money for a specific ask', weights: { donor: 2, beneficiary: 0, mission: 0 } },
      { label: 'Build trust by proving our impact is real', weights: { donor: 0, beneficiary: 2, mission: 0 } },
      {
        label: "Introduce our organization to people who don't know us yet",
        weights: { donor: 0, beneficiary: 0, mission: 2 },
      },
      {
        label: 'Get funders to remember who we are before they decide',
        weights: { donor: 1, beneficiary: 0, mission: 1 },
      },
    ],
  },
  {
    id: 'q2',
    text: 'Who do you want featured?',
    options: [
      {
        label: "One person (or a couple of people) we've helped, telling their own story",
        weights: { donor: 0, beneficiary: 2, mission: 0 },
      },
      {
        label: 'Our founder, our team, or what makes us different',
        weights: { donor: 0, beneficiary: 0, mission: 2 },
      },
      { label: 'A mix the human story and the ask, together', weights: { donor: 2, beneficiary: 0, mission: 0 } },
    ],
  },
  {
    id: 'q3',
    text: 'Where will this actually get watched?',
    options: [
      {
        label: 'Attached to a proposal, or played in a donor meeting',
        weights: { donor: 2, beneficiary: 0, mission: 0 },
      },
      {
        label: 'On our homepage, in grant applications, or in board decks',
        weights: { donor: 0, beneficiary: 0, mission: 2 },
      },
      { label: 'Social media and our newsletter', weights: { donor: 0, beneficiary: 2, mission: 0 } },
    ],
  },
  {
    id: 'q4',
    text: 'What should someone do right after watching?',
    options: [
      { label: 'Give, fund, or commit to something specific', weights: { donor: 2, beneficiary: 0, mission: 0 } },
      { label: 'Trust us enough to keep following our work', weights: { donor: 0, beneficiary: 2, mission: 0 } },
      { label: 'Remember who we are and want to learn more', weights: { donor: 0, beneficiary: 0, mission: 2 } },
    ],
  },
  {
    id: 'q5',
    text: 'How much time do people realistically have?',
    options: [
      { label: '60–90 seconds', weights: { donor: 0, beneficiary: 1, mission: 0 } },
      { label: "2–3 minutes, but they're deciding something", weights: { donor: 1, beneficiary: 0, mission: 0 } },
      { label: '2–3 minutes, just getting to know us', weights: { donor: 0, beneficiary: 0, mission: 1 } },
    ],
  },
  {
    id: 'q6',
    text: "What feeling matters most when it's over?",
    options: [
      { label: 'Trust and connection', weights: { donor: 0, beneficiary: 2, mission: 0 } },
      { label: 'Urgency to act', weights: { donor: 2, beneficiary: 0, mission: 0 } },
      { label: 'Confidence in who we are', weights: { donor: 0, beneficiary: 0, mission: 2 } },
    ],
  },
];

// ── Tone question (Q7 unscored) ─────────────────────────────────────────────

export const toneQuestion: ToneQuestion = {
  id: 'q7',
  text: 'Are you hoping to shoot this yourselves, hire it out, or not sure yet?',
  options: [
    { label: "We'd like to try it ourselves", tone: 'diy' },
    { label: "We'd rather hire someone who does this for a living", tone: 'hire' },
    { label: "Not sure yet show us both", tone: 'balanced' },
  ],
};

export const TOTAL_QUESTIONS = questions.length + 1; // 6 scored + 1 tone = 7

// ── Scoring ───────────────────────────────────────────────────────────────────

export function computeFilmType(answers: (number | null)[]): FilmType {
  const scores = { donor: 0, beneficiary: 0, mission: 0 };
  for (let i = 0; i < questions.length; i++) {
    const ans = answers[i];
    if (ans === null) continue;
    const w = questions[i].options[ans].weights;
    scores.donor += w.donor;
    scores.beneficiary += w.beneficiary;
    scores.mission += w.mission;
  }
  // Tie-break order: Donor > Beneficiary > Mission
  if (scores.donor >= scores.beneficiary && scores.donor >= scores.mission) return 'donor';
  if (scores.beneficiary >= scores.mission) return 'beneficiary';
  return 'mission';
}

export function computeTone(answers: (number | null)[]): ToneValue {
  const toneAns = answers[questions.length]; // index 6
  if (toneAns === null) return 'balanced';
  return toneQuestion.options[toneAns].tone;
}

// ── Result content ────────────────────────────────────────────────────────────

export const results: Record<FilmType, FilmResult> = {
  beneficiary: {
    eyebrow: 'Your recommendation',
    title: 'The Beneficiary Film',
    subtitle: 'Proof one person, one change',
    definition:
      'A short film (1–3 minutes) built around one or two people you\'ve helped, telling their own story in their own words. No narrator, no statistics just a real person describing what their life was like before, and what changed. It\'s the most human of the three films, and the one that does the least "selling." Its entire job is to make people believe your organization is real and does what it says everything else follows from that belief.',
    whyFit:
      "You told us this is about proving your impact is real, in one person's own words, watched on social or in a newsletter, built to earn trust rather than close a gift. That's a Beneficiary Film not designed to raise money directly, designed to make people believe you when you say you did.",
    diySteps: [
      {
        main: "Pick one person, not a cause. Not \"families we've helped\" one name, one face. If you can't narrow it to one person, you're not ready to film yet; go find that person first.",
      },
      {
        main: 'Ask them these questions, in this order, and let them talk:',
        subpoints: [
          'Tell me about yourself your name, and a little about your life.',
          'Tell me what things were like before you were involved with us.',
          'How did you get connected with us?',
          "What's different now? How did that change feel?",
          'What would you say to someone in the situation you used to be in?',
        ],
      },
      {
        main: "Don't script their answers. The moment it sounds rehearsed, it stops being proof. Ask, then get out of the way.",
      },
      {
        main: 'Shoot in a place that means something their home, their shop, the field they work not a blank wall. Location is part of the story.',
      },
      {
        main: 'Cut it in this shape: their situation before → what changed → how they feel now, in under 90 seconds. Resist the urge to explain your organization\'s programs in the middle this is their story, not your pitch.',
      },
    ],
    diyGap:
      "Two things separate a real Beneficiary Film from a phone video: audio and comfort. If the mic picks up wind, traffic, or echo, most people stop watching in the first ten seconds no matter how good the story is. And a person who's never been on camera often freezes up or gives short, guarded answers unless someone experienced is holding the space, asking the follow-up question, and knowing when to just stay quiet and let them keep talking. Those are craft, not equipment a better phone doesn't fix either one.",
    oneFilmNote:
      "A Beneficiary Film earns trust but trust alone doesn't win a grant application, and it doesn't tell a new funder who you are or what to do next. None of the three films works well entirely on its own; each is built for a different moment, and NGOs that rely on just one usually find themselves needing another within the year. The strongest position is having all three ready before you need them, not scrambling to commission one every time a new opportunity comes up.",
    offer: `This is exactly the film we build first in the NGO Film Package. Because it's one field shoot, the same trip also gets you a Donor Film and a Mission Film, plus a stills library and a year of social cuts, for one flat ${PACKAGE_PRICE}. If a Beneficiary Film alone is what you need right now, we can start there too.`,
  },

  donor: {
    eyebrow: 'Your recommendation',
    title: 'The Donor Film',
    subtitle: 'The Ask built for the moment you\'re raising money',
    definition:
      "A documentary-style film (usually 2–3 minutes) built specifically for the moments you're asking for money a campaign, a proposal, a pitch meeting. It combines an urgent problem, a story of hope, and a clear call to action, and it's what your numbers actually mean, shown in faces, voices, and lives. Think of it as the film version of your annual report: the same evidence a 40-page PDF would carry, told as a story a funder actually watches to the end.",
    whyFit:
      "You told us this is about a specific ask, watched in a proposal or a donor meeting, meant to move someone to act with urgency. That's a Donor Film the 40-page report nobody reads, told as a story they can't look away from.",
    diySteps: [
      {
        main: 'Start with the problem, stated plainly. One sentence, one real number if you have one. Don\'t soften it the urgency is what earns the ask later.',
      },
      {
        main: "Show the transformation, not just the activity. A meal served is activity. A family with stability again is transformation. Film what changed, not just what you did.",
      },
      {
        main: "Interview 1–2 people who lived it, using the same honest, unscripted approach as a Beneficiary Film this is often built from that same footage, cut differently.",
      },
      {
        main: 'End on a specific, single ask. Not "support our mission" "help us reach 500 more families this year." Vague asks get vague responses.',
      },
      {
        main: "Cut it in this shape: problem → a person living it → what changed because of your work → the specific ask, in 2–3 minutes. Don't bury the ask at the very end where a busy funder might not get there state it clearly once, early, and once more at the close.",
      },
    ],
    diyGap:
      "The donor film is the one funders judge hardest, because it's the one asking them for something and a shaky, poorly lit, badly paced version reads as a red flag about how you'd handle their money, not just a rough video. The two things that trip up self-shot donor films most: pacing (either rushing past the human story to get to the ask, or lingering so long the ask feels like an afterthought) and structure (not knowing how to build tension before the resolution, so the \"before\" and \"after\" blur together and the transformation doesn't land). That's an editing skill, not a camera setting.",
    oneFilmNote:
      "A Donor Film moves the ask but it can't introduce your organization to someone who's never heard of you, and it can't build the trust a beneficiary's own voice provides. None of the three films works well entirely on its own; each is built for a different moment, and NGOs that rely on just one usually find themselves needing another within the year. The strongest position is having all three ready before you need them, not scrambling to commission one every time a new opportunity comes up.",
    offer: `This is the centerpiece of the NGO Film Package, and it's the one film most worth having built professionally, since it's the one doing the asking. Because it's one field shoot, the same trip also gets you a Beneficiary Film and a Mission Film, plus a stills library and a year of social cuts all for one flat ${PACKAGE_PRICE}. If you need the Donor Film specifically and on its own, we can scope that too.`,
  },

  mission: {
    eyebrow: 'Your recommendation',
    title: 'The Mission Film',
    subtitle: 'Identity your visual elevator pitch',
    definition:
      "A foundational film (usually 2–3 minutes) that introduces your organization to people who've never heard of you who you are, what you stand for, and why your work matters. It's your visual elevator pitch: your team, your track record, your approach, the reasons your work can be trusted with someone's money. It lives on your homepage, in grant applications, and in board decks anywhere a new audience meets you for the first time.",
    whyFit:
      "You told us this is about introducing your organization to people who don't know you yet, living on your homepage or in grant applications and board decks, meant to build credibility before anyone's decided anything. That's a Mission Film.",
    diySteps: [
      {
        main: "Answer one question, clearly: why you and not someone else? Every NGO says they help people. What's specific to how you do it?",
      },
      {
        main: "Show your team actually working, not posed and smiling at the camera in the field, in the office, mid-task. Activity shots read as authentic; staged ones read as stock footage.",
      },
      {
        main: "Get your founder or director on camera, briefly, saying why this work matters to them personally. One honest sentence beats three minutes of mission-statement language.",
      },
      {
        main: "Include a glimpse of the work itself a beneficiary moment, a project site even briefly, so it's not just talking heads.",
      },
      {
        main: "Cut it in this shape: who you are → what you actually do, shown not told → why your team is the one to trust with this → one clear closing line about your mission, in 2–3 minutes.",
      },
    ],
    diyGap:
      "A Mission Film is the hardest of the three to shoot casually, because it's carrying your whole credibility, and small things read loudly: inconsistent lighting between shots, a shaky interview setup, background noise during your director's key line. It's also the easiest film to make boring by accident a string of talking-head clips explaining programs, with nothing to actually look at. The craft here is knowing what to show while someone talks, not just recording them talking.",
    oneFilmNote:
      "A Mission Film builds credibility but credibility alone doesn't close a specific ask, and it doesn't carry the proof a beneficiary's own testimony provides. None of the three films works well entirely on its own; each is built for a different moment, and NGOs that rely on just one usually find themselves needing another within the year. The strongest position is having all three ready before you need them, not scrambling to commission one every time a new opportunity comes up.",
    offer: `This is one of the three films in the NGO Film Package. Because it's one field shoot, the same trip also gets you a Beneficiary Film and a Donor Film, plus a stills library and a year of social cuts all for one flat ${PACKAGE_PRICE}. If a Mission Film alone is what you need right now, we can start there too.`,
  },
};
