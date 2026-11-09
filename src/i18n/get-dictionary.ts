import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/messages/en.json").then((module) => module.default),
  no: () => import("@/messages/no.json").then((module) => module.default),
  tr: () => import("@/messages/tr.json").then((module) => module.default),
};

export async function getDictionary(locale: string): Promise<Dictionary> {
  if (!isLocale(locale)) {
    notFound();
  }

  return dictionaries[locale]();
}
