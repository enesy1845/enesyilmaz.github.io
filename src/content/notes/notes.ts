import type { Locale } from "@/i18n/config";

export type Note = {
  slug: string;
  /** The language the note was written in; it is not machine-translated. */
  language: Locale;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  /** Optional canonical copy elsewhere (e.g. Medium); omit until real. */
  externalUrl?: string;
  paragraphs: readonly string[];
};

export const notes: readonly Note[] = [
  {
    slug: "the-ideal-human",
    language: "en",
    title: "The Ideal Human Is a Practice, Not a Label",
    description:
      "Reflections on learning, self-regulation, critical thinking, ethics and what it means to develop as a human being in a technological age.",
    category: "Thinking / Education",
    publishedAt: "2026-10-21",
    paragraphs: [
      "What does it mean to become a better human being?",
      "I don't think the answer lies in accumulating more information or technical skills alone. Knowledge matters, but so do judgment, character and the ability to use what we know responsibly.",
      "I am interested in the relationship between curiosity, mathematical thinking, self-awareness, emotional regulation, empathy and ethical reasoning. These are not simply abstract virtues; they are abilities we can examine, practice and continue developing.",
      "Technology adds another dimension. Artificial intelligence can help us learn and create, but it should not replace our responsibility to think critically, question conclusions and consider consequences.",
      "I also see meaning, moral responsibility and spiritual reflection as important questions in human development. Scientific research, philosophy and spiritual traditions can inform different aspects of that discussion without being mistaken for the same kind of evidence.",
      "For me, the ideal human is not a perfect person or a finished definition. It is a direction: learning continuously, thinking carefully, acting responsibly and contributing something meaningful to others.",
    ],
  },
];

export function getNoteBySlug(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}
