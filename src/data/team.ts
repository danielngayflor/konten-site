export interface TeamMember {
  role: string;
  name: string;
  bio: string;
  metadataStrip: string;
}

export const team: TeamMember[] = [
  {
    role: 'Creative Director',
    name: 'Daniel',
    bio: 'The vision behind everything you see. Has spent the better part of a decade building Konten LR from a single camera and a clear belief — that African stories deserve to be told with the same craft and intention as any story in the world.',
    metadataStrip: 'FRAME 01 · CREATIVE DIRECTOR · MONROVIA',
  },
  {
    role: 'Content Strategist',
    name: 'Agnes',
    bio: 'The person who figures out why before anyone touches a camera. With a background in digital marketing and development sector communications, bridges the gap between creative ambition and real-world impact.',
    metadataStrip: 'FRAME 02 · CONTENT STRATEGIST · MONROVIA',
  },
  {
    role: 'Social Media Specialist',
    name: 'Grace',
    bio: 'Knows what works online before it works online. Has grown brand audiences across Instagram, Facebook, TikTok, and LinkedIn for clients ranging from local Liberian businesses to international development organisations.',
    metadataStrip: 'FRAME 03 · SOCIAL SPECIALIST · MONROVIA',
  },
  {
    role: 'Video Producer',
    name: 'Richmond',
    bio: 'From the first scout to the final export. Has produced event coverage, documentary films, animated explainers, and branded content across seven counties in Liberia.',
    metadataStrip: 'FRAME 04 · VIDEO PRODUCER · MONROVIA',
  },
  {
    role: 'Web and Graphic Designer',
    name: 'David',
    bio: 'Makes everything look exactly right. Brand identities, social graphics, motion design, infographics, print materials, web visuals.',
    metadataStrip: 'FRAME 05 · WEB & GRAPHIC DESIGNER · MONROVIA',
  },
  {
    role: 'Business Development Specialist',
    name: 'Princess',
    bio: "The reason new clients become returning ones. Brings both the commercial instinct and the interpersonal warmth that Konten's brand demands.",
    metadataStrip: 'FRAME 06 · BIZ DEV SPECIALIST · MONROVIA',
  },
];
