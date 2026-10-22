// Konten LR — Film Discovery Questionnaire (Phase I: Discovery)
// Edit questions here. The component renders one step per screen, in this order.
//
// Step types:
//   statement — a section intro screen (not numbered, no answer)
//   short     — one-line text          long  — multi-line text
//   email     — email address          date  — date picker
//   single    — pick one option        multi — pick several (optional "other" text, optional max)
//   group     — several small fields on one screen (fields: [{ id, label, type, required, placeholder }])
//   people    — repeatable storyholder cards
//
// Every answer id becomes a column in the Google Sheet.

export const WELCOME = {
  eyebrow: "Konten LR · Phase I · Discovery",
  title: "Let's find the story.",
  body:
    "Before we plan a shoot, we want to understand the film you need: the idea at its heart, the people whose stories it tells, who it's for and how it should feel. Answer in your own words. Short answers are fine, and you can skip anything you're unsure about.",
  meta: "Takes about 15 minutes",
  button: "Start",
};

export const THANKS = {
  title: (name) => (name ? `Thank you, ${name}.` : "Thank you."),
  body:
    "Your answers are with the Konten team. We'll read them closely and get back to you to talk through the story and the next steps.",
  contact: "contact@konten.agency · +231 776 049 490",
  tagline: "Tell Your Story.",
};

export const STEPS = [
  { type: "statement", section: "01", title: "Your organization", body: "Who we'll be working with, and the program the film is about." },
  { id: "org_name", type: "short", required: true, title: "What is the name of your organization?" },
  {
    id: "contact",
    type: "group",
    title: "Who should we talk to about this film?",
    fields: [
      { id: "contact_name", label: "Your name", type: "short", required: true },
      { id: "contact_role", label: "Your role", type: "short" },
      { id: "contact_email", label: "Email", type: "email" },
      { id: "contact_phone", label: "Phone or WhatsApp", type: "tel" },
    ],
  },
  { id: "program", type: "short", title: "Which program or project is the film about?" },
  { id: "partners", type: "short", title: "Which funders or partners are involved?", help: "Include anyone whose name or logo may appear in the film." },

  { type: "statement", section: "02", title: "The central idea", body: "Every film we make is built around one idea. Help us find yours." },
  { id: "idea_sentence", type: "long", required: true, title: "In one or two sentences, what is this film about?" },
  { id: "central_question", type: "long", title: "What question should the film answer for the viewer?", help: 'For example: “What happens when a school takes ownership of entrepreneurship education?”' },
  { id: "change", type: "long", title: "What has changed because of your work?", help: "Describe life before and after, for a person or a community." },
  { id: "facts", type: "long", title: "What key facts, dates or numbers should we know?", help: "When the program started, how many people it has reached, results you're proud of." },
  { id: "why_now", type: "long", title: "Why does this film need to be made now?" },

  { type: "statement", section: "03", title: "Storyholders", body: "Storyholders are the people whose stories the film will tell. If you haven't chosen anyone yet, describe the kind of person, such as a student, a teacher or a school leader." },
  { id: "storyholders", type: "people", title: "Who are the storyholders you have in mind?", help: "Add one card per person. Only the name or role is needed to start." },
  { id: "sensitivities", type: "long", title: "Is there anything we should be careful about?", help: "Privacy concerns, children on camera, sensitive topics, people who should not be filmed." },

  { type: "statement", section: "04", title: "Audience and goal", body: "Who will watch this film, what we want them to feel, and what we want them to do next." },
  { id: "audience", type: "multi", other: true, title: "Who is the film for?", help: "Choose all that apply.",
    options: ["Funders and donors", "Partner organizations", "Government and policymakers", "The communities we serve", "The general public", "Our staff and members"] },
  { id: "audience_detail", type: "long", title: "Describe the main audience in your own words.", help: "Who exactly needs to see this? Name a specific funder, event or group if there is one." },
  { id: "feel", type: "multi", other: true, title: "What should they feel while watching?",
    options: ["Inspired", "Hopeful", "Proud", "Moved", "Confident in the work", "A sense of urgency", "Curious to learn more"] },
  { id: "action", type: "multi", other: true, title: "What should they do after watching?",
    options: ["Fund or keep funding the program", "Partner with us", "Share the film", "Join or sign up", "Support a policy change", "Learn more about the issue"] },
  { id: "one_message", type: "long", required: true, title: "If the audience remembers one thing, what should it be?" },
  { id: "priorities", type: "long", title: "Which themes or results does your funder or audience care about most?", help: "For example: job creation, sustainability, girls' education, local ownership." },

  { type: "statement", section: "05", title: "Tone", body: "How the film should feel overall: the mood, the pace and the voice." },
  { id: "tone", type: "multi", other: true, max: 3, title: "Which words describe the tone you want?", help: "Pick up to three.",
    options: ["Aspirational", "Hopeful", "Intimate", "Celebratory", "Reflective", "Urgent", "Joyful", "Raw and honest", "Formal"] },
  { id: "references", type: "long", title: "Are there films or videos you like?", help: "Paste links if you have them, and tell us what you like about each one." },
  { id: "avoid", type: "long", title: "Is there anything the film should avoid?", help: "Words, images, topics or styles that wouldn't suit your organization." },

  { type: "statement", section: "06", title: "Practical details", body: "These help us plan the shoot days, the edit and what we deliver." },
  { id: "length", type: "single", title: "How long should the film be?",
    options: ["Under 2 minutes", "2 to 5 minutes", "5 to 10 minutes", "Longer than 10 minutes", "Not sure yet"] },
  { id: "where", type: "multi", other: true, title: "Where will it be shown?",
    options: ["Social media", "Website", "Event or screening", "Donor report or presentation", "Television"] },
  {
    id: "timing",
    type: "group",
    title: "When do you need the final film?",
    fields: [
      { id: "deadline", label: "Date", type: "date" },
      { id: "deadline_for", label: "What is that date for?", type: "short", placeholder: "A launch, an event, a report" },
    ],
  },
  { id: "locations", type: "long", title: "Where will filming happen?", help: "Towns, counties, sites. List every place the story might take us." },
  { id: "branding", type: "long", title: "Which logos, credits or brand guidelines must we follow?", help: 'Partner logos, “in partnership with” wording, colors, end-card requirements.' },
  { id: "extras", type: "multi", title: "What else will you need with the film?",
    options: ["Captions or subtitles", "An unbranded version", "Short cut-downs for social media", "A written script", "Versions in other languages", "Photos from the shoot"] },
  { id: "approvals", type: "long", title: "Who reviews and approves the film?", help: "Names and roles, including anyone at a funder or partner who must sign off." },
  { id: "anything_else", type: "long", title: "Anything else we should know?" },
];

export const PERSON_FIELDS = [
  { id: "name", label: "Name", placeholder: 'Or “not chosen yet”' },
  { id: "role", label: "Role in the story", placeholder: "Student, teacher, farmer…" },
  { id: "why", label: "Why their story matters", multiline: true },
  { id: "place", label: "Where they're based" },
  { id: "language", label: "Language they speak most comfortably" },
  { id: "availability", label: "When they're available" },
  { id: "consent", label: "Agreed to be filmed?", options: ["Yes, they have agreed", "Not asked yet", "Not sure"] },
];

// Turns the answers into one flat row for the Google Sheet. Key order = column order.
export function toSheetRow(a) {
  const list = (id) => [...(a[id] || []), a[id + "_other"]].filter(Boolean).join(", ");
  const people = (a.storyholders || []).filter((p) => Object.values(p).some(Boolean));
  return {
    submitted_at: new Date().toISOString(),
    org_name: a.org_name || "",
    contact_name: a.contact_name || "",
    contact_role: a.contact_role || "",
    contact_email: a.contact_email || "",
    contact_phone: a.contact_phone || "",
    program: a.program || "",
    partners: a.partners || "",
    idea_sentence: a.idea_sentence || "",
    central_question: a.central_question || "",
    change: a.change || "",
    facts: a.facts || "",
    why_now: a.why_now || "",
    storyholder_count: people.length,
    storyholders: people
      .map((p, i) =>
        [
          `${i + 1}. ${p.name || "Unnamed"}${p.role ? ` (${p.role})` : ""}`,
          p.why && `Why: ${p.why}`,
          p.place && `Based in: ${p.place}`,
          p.language && `Language: ${p.language}`,
          p.availability && `Available: ${p.availability}`,
          p.consent && `Consent: ${p.consent}`,
        ].filter(Boolean).join(" | ")
      )
      .join("\n"),
    sensitivities: a.sensitivities || "",
    audience: list("audience"),
    audience_detail: a.audience_detail || "",
    feel: list("feel"),
    action: list("action"),
    one_message: a.one_message || "",
    priorities: a.priorities || "",
    tone: list("tone"),
    references: a.references || "",
    avoid: a.avoid || "",
    length: a.length || "",
    where: list("where"),
    deadline: a.deadline || "",
    deadline_for: a.deadline_for || "",
    locations: a.locations || "",
    branding: a.branding || "",
    extras: list("extras"),
    approvals: a.approvals || "",
    anything_else: a.anything_else || "",
  };
}
