export const locales = ["en", "no", "tr"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  no: "Norsk",
  tr: "Türkçe",
};

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
