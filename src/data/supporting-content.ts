import type { Locale } from "@/i18n/config";

export type PreviewContent = {
  title: string;
  description: string;
  categories: readonly string[];
};

export const notesPreview: Record<Locale, PreviewContent> = {
  en: {
    title: "Notes",
    description:
      "A future home for technical notes, data and AI observations, education writing, thinking, personal essays and poetry. No article titles are invented in this phase.",
    categories: [
      "Software",
      "Data & AI",
      "Education",
      "Thinking",
      "Personal",
      "Poetry",
    ],
  },
  no: {
    title: "Notater",
    description:
      "Et fremtidig sted for tekniske notater, observasjoner om data og AI, utdanning, tenkning, personlige tekster og poesi. Ingen artikkeltitler oppdiktes i denne fasen.",
    categories: [
      "Programvare",
      "Data og AI",
      "Utdanning",
      "Tanke",
      "Personlig",
      "Poesi",
    ],
  },
  tr: {
    title: "Notlar",
    description:
      "Teknik notlar, veri ve AI gözlemleri, eğitim yazıları, düşünce, kişisel denemeler ve şiir için gelecekteki alan. Bu fazda makale başlığı uydurulmaz.",
    categories: [
      "Yazılım",
      "Veri ve AI",
      "Eğitim",
      "Düşünce",
      "Kişisel",
      "Şiir",
    ],
  },
};

export const atelierPreview: Record<Locale, PreviewContent> = {
  en: {
    title: "Atelier",
    description:
      "A future place for wood, watches, visual design and video as careful making. It remains visually secondary to professional software work.",
    categories: ["Wood", "Watches", "Visual design", "Video"],
  },
  no: {
    title: "Atelier",
    description:
      "Et fremtidig sted for tre, klokker, visuell design og video som presist håndverk. Det forblir visuelt sekundært til profesjonelt programvarearbeid.",
    categories: ["Tre", "Klokker", "Visuell design", "Video"],
  },
  tr: {
    title: "Atölye",
    description:
      "Ahşap, saatler, görsel tasarım ve videoyu özenli üretim olarak ele alan gelecekteki alan. Profesyonel yazılım işlerine göre görsel olarak ikincil kalır.",
    categories: ["Ahşap", "Saatler", "Görsel tasarım", "Video"],
  },
};
