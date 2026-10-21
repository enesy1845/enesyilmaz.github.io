export const locales = ["en", "no", "tr"] as const;
export const defaultLocale = "en";

/**
 * Locales offered in the language switcher. Turkish stays routable and
 * translated but is hidden from the switcher for now.
 */
export const switcherLocales: readonly Locale[] = ["en", "no"];

export type Locale = (typeof locales)[number];

export const htmlLang: Record<Locale, string> = {
  en: "en",
  no: "no",
  tr: "tr",
};

export const openGraphLocales: Record<Locale, string> = {
  en: "en_US",
  no: "nb_NO",
  tr: "tr_TR",
};

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
