import type { Locale } from "@/i18n/config";

export type NotesPageContent = {
  introMeta: string;
  featuredTitle: string;
  readAction: string;
  /** Shown when a note exists only in its original language. */
  languageLabel: Record<Locale, string>;
  mediumTitle: string;
  mediumDescription: string;
  mediumAction: string;
  topicsTitle: string;
  topics: readonly string[];
};

export const notesPageContent: Record<Locale, NotesPageContent> = {
  en: {
    introMeta: "Essays and reflections",
    featuredTitle: "Latest note",
    readAction: "Read the note",
    languageLabel: { en: "English", no: "Norwegian", tr: "Turkish" },
    mediumTitle: "Also on Medium",
    mediumDescription: "Longer and earlier writing is published on Medium.",
    mediumAction: "Read on Medium",
    topicsTitle: "What I write about",
    topics: [
      "Mathematical thinking",
      "AI and human judgment",
      "Software problem-solving",
      "Education and learning",
      "Essays and literature",
    ],
  },
  no: {
    introMeta: "Tekster og refleksjoner",
    featuredTitle: "Siste notat",
    readAction: "Les notatet",
    languageLabel: { en: "Engelsk", no: "Norsk", tr: "Tyrkisk" },
    mediumTitle: "Også på Medium",
    mediumDescription: "Lengre og tidligere tekster er publisert på Medium.",
    mediumAction: "Les på Medium",
    topicsTitle: "Det jeg skriver om",
    topics: [
      "Matematisk tenkning",
      "KI og menneskelig dømmekraft",
      "Problemløsning i programvare",
      "Utdanning og læring",
      "Essays og litteratur",
    ],
  },
  tr: {
    introMeta: "Denemeler ve düşünceler",
    featuredTitle: "Son not",
    readAction: "Notu oku",
    languageLabel: { en: "İngilizce", no: "Norveççe", tr: "Türkçe" },
    mediumTitle: "Medium'da da",
    mediumDescription:
      "Daha uzun ve daha eski yazılarım Medium'da yayımlanıyor.",
    mediumAction: "Medium'da oku",
    topicsTitle: "Neler yazıyorum",
    topics: [
      "Matematiksel düşünme",
      "Yapay zekâ ve insan muhakemesi",
      "Yazılımda problem çözme",
      "Eğitim ve öğrenme",
      "Denemeler ve edebiyat",
    ],
  },
};

export type AtelierImage = {
  /** Path under /public; only real photographs. */
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

export type AtelierArea = {
  key: "tesbih" | "wood" | "watches" | "visual";
  title: Record<Locale, string>;
  body: Record<Locale, string>;
  /** Empty until real photographs are supplied; nothing renders without them. */
  images: readonly AtelierImage[];
};

export const atelierAreas: readonly AtelierArea[] = [
  {
    key: "tesbih",
    title: {
      en: "Tesbih — Beads & Form",
      no: "Tesbih — perler og form",
      tr: "Tesbih — Boncuk ve Form",
    },
    body: {
      en: "I'm drawn to the relationship between material, balance, texture and repetition in traditional prayer beads. Small objects can reveal remarkable attention to detail and craftsmanship.",
      no: "Jeg fascineres av samspillet mellom materiale, balanse, tekstur og gjentakelse i tradisjonelle bønnekjeder. Små gjenstander kan vise bemerkelsesverdig omsorg for detaljer og håndverk.",
      tr: "Geleneksel tesbihlerde malzeme, denge, doku ve tekrar arasındaki ilişki beni çekiyor. Küçük nesneler bile ayrıntıya ve zanaata gösterilen olağanüstü özeni ortaya koyabilir.",
    },
    images: [],
  },
  {
    key: "wood",
    title: {
      en: "Wood — Material & Patience",
      no: "Tre — materiale og tålmodighet",
      tr: "Ahşap — Malzeme ve Sabır",
    },
    body: {
      en: "Woodworking interests me because it brings together structure, patience, precision and an understanding of natural materials.",
      no: "Trearbeid interesserer meg fordi det forener struktur, tålmodighet, presisjon og forståelse av naturlige materialer.",
      tr: "Ahşap işçiliği ilgimi çekiyor; çünkü yapıyı, sabrı, hassasiyeti ve doğal malzemeleri anlamayı bir araya getiriyor.",
    },
    images: [],
  },
  {
    key: "watches",
    title: {
      en: "Mechanical Watches — Engineering in Motion",
      no: "Mekaniske klokker — ingeniørkunst i bevegelse",
      tr: "Mekanik Saatler — Hareket Hâlinde Mühendislik",
    },
    body: {
      en: "Mechanical watches fascinate me as miniature systems of interconnected parts — engineering, mathematics and design working together without software.",
      no: "Mekaniske klokker fascinerer meg som miniatyrsystemer av sammenkoblede deler — ingeniørkunst, matematikk og design som virker sammen uten programvare.",
      tr: "Mekanik saatler, birbirine bağlı parçalardan oluşan minyatür sistemler olarak beni büyülüyor — yazılım olmadan birlikte çalışan mühendislik, matematik ve tasarım.",
    },
    images: [],
  },
  {
    key: "visual",
    title: {
      en: "Visual Storytelling",
      no: "Visuell historiefortelling",
      tr: "Görsel Anlatım",
    },
    body: {
      en: "Photography, graphic design and video offer another way to translate ideas into experiences.",
      no: "Fotografi, grafisk design og video gir en annen måte å omsette ideer til opplevelser på.",
      tr: "Fotoğraf, grafik tasarım ve video, fikirleri deneyimlere dönüştürmenin bir başka yolunu sunuyor.",
    },
    images: [],
  },
];
