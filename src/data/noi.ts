import type { Locale } from "@/i18n/config";

/**
 * NOI brand copy. Brand architecture: Enes Yılmaz is the person, NOI the way
 * of thinking and making, Noiverse the wider universe of projects. NOI is not
 * a registered company, so the copy never presents it as a business.
 */

export type NoiLetterMeaning = {
  letter: "N" | "O" | "I";
  word: string;
  line: string;
};

/** A language's own reading of the letters; not a literal translation. */
export type NoiInterpretation = {
  tab: string;
  letters: readonly [NoiLetterMeaning, NoiLetterMeaning, NoiLetterMeaning];
  motto: string;
};

export type NoiSectionContent = {
  eyebrow: string;
  title: string;
  tagline: string;
  paragraphs: readonly string[];
  meaningTitle: string;
  meaningNote: string;
  languagePicker: string;
};

export const noiInterpretations: Record<Locale, NoiInterpretation> = {
  en: {
    tab: "EN",
    letters: [
      { letter: "N", word: "Notice", line: "See beyond the obvious." },
      {
        letter: "O",
        word: "Organize",
        line: "Find the structure within complexity.",
      },
      {
        letter: "I",
        word: "Invent",
        line: "Turn understanding into something useful.",
      },
    ],
    motto: "Notice. Organize. Invent.",
  },
  no: {
    tab: "NO",
    letters: [
      {
        letter: "N",
        word: "Nysgjerrighet",
        line: "Still spørsmålet før du antar svaret.",
      },
      {
        letter: "O",
        word: "Oversikt",
        line: "Finn strukturen i det komplekse.",
      },
      {
        letter: "I",
        word: "Iverksetting",
        line: "Gjør forståelse om til noe nyttig.",
      },
    ],
    motto: "Nysgjerrighet. Oversikt. Iverksetting.",
  },
  tr: {
    tab: "TR",
    letters: [
      {
        letter: "N",
        word: "Niyet",
        line: "Neden yaptığını bilerek başla.",
      },
      {
        letter: "O",
        word: "Odak",
        line: "Karmaşıklığın içindeki yapıyı bul.",
      },
      {
        letter: "I",
        word: "İnşa",
        line: "Anlayışı işe yarar bir şeye dönüştür.",
      },
    ],
    motto: "Niyet. Odak. İnşa.",
  },
};

export const noiSectionContent: Record<Locale, NoiSectionContent> = {
  en: {
    eyebrow: "The meaning of NOI",
    title: "What is NOI?",
    tagline: "A way of thinking. A way of making.",
    paragraphs: [
      "NOI is the name I give to the space between curiosity and creation.",
      "I believe meaningful solutions begin before the first line of code — by asking better questions, understanding people, and discovering connections between systems and ideas.",
      "NOI brings together my work in software engineering, data and digital experiences with my interests in mathematics, education, design and craftsmanship.",
      "Today, it's a personal creative practice by Enes Yılmaz. Over time, it may become a home for new ideas, products and collaborations.",
    ],
    meaningTitle: "noi.",
    meaningNote:
      "Each language reads the letters in its own way. These are interpretations, not translations.",
    languagePicker: "Read NOI in",
  },
  no: {
    eyebrow: "Hva NOI betyr",
    title: "Hva er NOI?",
    tagline: "En måte å tenke på. En måte å skape på.",
    paragraphs: [
      "NOI er navnet jeg gir rommet mellom nysgjerrighet og skaperverk.",
      "Jeg tror meningsfulle løsninger begynner før den første kodelinjen — ved å stille bedre spørsmål, forstå mennesker og oppdage sammenhenger mellom systemer og ideer.",
      "NOI samler arbeidet mitt med programvareutvikling, data og digitale opplevelser med interessene mine for matematikk, utdanning, design og håndverk.",
      "I dag er det en personlig, skapende praksis av Enes Yılmaz. Med tiden kan det bli et hjem for nye ideer, produkter og samarbeid.",
    ],
    meaningTitle: "noi.",
    meaningNote:
      "Hvert språk leser bokstavene på sin egen måte. Dette er tolkninger, ikke oversettelser.",
    languagePicker: "Les NOI på",
  },
  tr: {
    eyebrow: "NOI'nin anlamı",
    title: "NOI nedir?",
    tagline: "Bir düşünme biçimi. Bir üretme biçimi.",
    paragraphs: [
      "NOI, merak ile üretim arasındaki alana verdiğim isim.",
      "Anlamlı çözümlerin ilk satır koddan önce başladığına inanıyorum: daha iyi sorular sormakla, insanları anlamakla, sistemler ve fikirler arasındaki bağlantıları keşfetmekle.",
      "NOI; yazılım mühendisliği, veri ve dijital deneyimler alanındaki işlerimi matematik, eğitim, tasarım ve zanaat ilgilerimle bir araya getiriyor.",
      "Bugün Enes Yılmaz'ın kişisel üretim pratiği. Zamanla yeni fikirlere, ürünlere ve iş birliklerine ev sahipliği yapabilir.",
    ],
    meaningTitle: "noi.",
    meaningNote:
      "Her dil harfleri kendi biçimiyle okur. Bunlar çeviri değil, yorumdur.",
    languagePicker: "NOI'yi şu dilde oku",
  },
};
