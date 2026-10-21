import { notes } from "@/content/generated";
import type { Note } from "@/types/note";

export { notes };

export function getNoteBySlug(slug: string): Note | undefined {
  return notes.find((note) => note.slug === slug);
}
