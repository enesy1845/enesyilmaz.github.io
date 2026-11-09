import en from "@/messages/en.json";
import no from "@/messages/no.json";
import tr from "@/messages/tr.json";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  no,
  tr,
};
