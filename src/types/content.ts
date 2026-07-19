import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;

export type LocalizedStringList = Record<Locale, readonly string[]>;

export type ContentLink = {
  label: string;
  href: string;
  description?: string;
};

export type LocalizedContentLink = Record<Locale, ContentLink>;
