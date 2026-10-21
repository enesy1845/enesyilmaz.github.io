import type { RenderableTreeNode } from "@markdoc/markdoc";

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
  readingMinutes: number;
  /** Markdoc render tree, compiled at build time from the admin editor. */
  body: RenderableTreeNode;
};
