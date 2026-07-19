import type { Locale } from "@/i18n/config";

export type HomeContent = {
  heroKicker: string;
  heading: string;
  role: string;
  position: string;
  support: string;
  primaryAction: string;
  secondaryAction: string;
  manifestoTitle: string;
  manifestoLines: readonly string[];
  selectedWorkTitle: string;
  selectedWorkDescription: string;
  evidenceTitle: string;
  evidenceDescription: string;
  ecosystemTitle: string;
  ecosystemDescription: string;
  ecosystemItems: readonly {
    title: string;
    description: string;
  }[];
  notesTitle: string;
  notesDescription: string;
  notesAction: string;
  atelierTitle: string;
  atelierDescription: string;
  atelierAction: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutItems: readonly {
    title: string;
    description: string;
  }[];
  contactTitle: string;
  contactDescription: string;
  contactAction: string;
};

export const homeContent: Record<Locale, HomeContent> = {
  en: {
    heroKicker: "Code / Thought / Craft",
    heading: "Enes Yilmaz",
    role: "Software Developer",
    position:
      "I build thoughtful software systems across Python, data and the web.",
    support: "Connecting technology, people and ideas.",
    primaryAction: "View selected work",
    secondaryAction: "About me",
    manifestoTitle: "Code is rarely the whole problem.",
    manifestoLines: [
      "There are people, decisions, systems and consequences.",
      "I try to understand the connections before building the solution.",
    ],
    selectedWorkTitle: "Selected work",
    selectedWorkDescription:
      "A focused set of professional and public projects, with sensitive public-sector details intentionally anonymized.",
    evidenceTitle: "Professional evidence",
    evidenceDescription:
      "The current portfolio foundation emphasizes systems work, data-oriented problem solving, public web projects, and teaching.",
    ecosystemTitle: "Code / Thought / Craft",
    ecosystemDescription:
      "The future interactive ecosystem graph starts here as a static, readable structure.",
    ecosystemItems: [
      {
        title: "Code",
        description:
          "Software systems, Python, data, AI-adjacent work, React, .NET and web development.",
      },
      {
        title: "Thought",
        description:
          "Education, mathematical thinking, writing, literature and reflective problem framing.",
      },
      {
        title: "Craft",
        description:
          "Wood, watches, visual design, video and the practice of making things carefully.",
      },
    ],
    notesTitle: "Notes preview",
    notesDescription:
      "Technical and reflective writing will be added through a controlled content system. For now, notes remain a planned area for software, data, education, thinking and personal writing.",
    notesAction: "Open notes",
    atelierTitle: "Atelier preview",
    atelierDescription:
      "Creative work belongs here as process, material attention and visual thinking, not as a separate hobbies section.",
    atelierAction: "Open atelier",
    aboutTitle: "About preview",
    aboutDescription:
      "Based in Norway, working as a software developer, and shaped by mathematics, teaching, web work, data interests, writing and craft.",
    aboutItems: [
      {
        title: "Now",
        description: "Software development across systems, web and data.",
      },
      {
        title: "Journey",
        description:
          "A path through mathematics, programming education and practical software work.",
      },
      {
        title: "How I work",
        description:
          "Understand the domain, reduce ambiguity, and build with care.",
      },
      {
        title: "Beyond work",
        description:
          "Writing, teaching and craft keep the technical work connected to people.",
      },
    ],
    contactTitle: "Contact",
    contactDescription:
      "The contact experience stays deliberately simple: verified professional links, no tracking, no form, no unnecessary data collection.",
    contactAction: "Contact me",
  },
  no: {
    heroKicker: "Kode / Tanke / Håndverk",
    heading: "Enes Yilmaz",
    role: "Programvareutvikler",
    position:
      "Jeg bygger gjennomtenkte programvaresystemer på tvers av Python, data og web.",
    support: "Kobler teknologi, mennesker og ideer.",
    primaryAction: "Se utvalgt arbeid",
    secondaryAction: "Om meg",
    manifestoTitle: "Kode er sjelden hele problemet.",
    manifestoLines: [
      "Det finnes mennesker, beslutninger, systemer og konsekvenser.",
      "Jeg prøver å forstå forbindelsene før jeg bygger løsningen.",
    ],
    selectedWorkTitle: "Utvalgt arbeid",
    selectedWorkDescription:
      "Et fokusert utvalg av profesjonelle og offentlige prosjekter, der sensitive offentlige detaljer er anonymisert.",
    evidenceTitle: "Profesjonell dokumentasjon",
    evidenceDescription:
      "Denne innholdsfasen vektlegger systemarbeid, dataorientert problemløsning, offentlige webprosjekter og undervisning.",
    ecosystemTitle: "Kode / Tanke / Håndverk",
    ecosystemDescription:
      "Den fremtidige interaktive økosystemgrafen starter her som en statisk og lesbar struktur.",
    ecosystemItems: [
      {
        title: "Kode",
        description:
          "Programvaresystemer, Python, data, AI-nært arbeid, React, .NET og webutvikling.",
      },
      {
        title: "Tanke",
        description:
          "Undervisning, matematisk tenkning, skriving, litteratur og reflektert problemforståelse.",
      },
      {
        title: "Håndverk",
        description:
          "Tre, klokker, visuell design, video og øvelsen i å lage ting med presisjon.",
      },
    ],
    notesTitle: "Notater",
    notesDescription:
      "Teknisk og reflekterende skriving kommer senere gjennom et kontrollert innholdssystem. Foreløpig er notater et planlagt område for programvare, data, utdanning, tenkning og personlig skriving.",
    notesAction: "Åpne notater",
    atelierTitle: "Atelier",
    atelierDescription:
      "Kreativt arbeid hører hjemme her som prosess, materialforståelse og visuell tenkning, ikke som en separat hobbyseksjon.",
    atelierAction: "Åpne atelier",
    aboutTitle: "Kort om meg",
    aboutDescription:
      "Basert i Norge, arbeider som programvareutvikler, og formet av matematikk, undervisning, webarbeid, data, skriving og håndverk.",
    aboutItems: [
      {
        title: "Nå",
        description: "Programvareutvikling på tvers av systemer, web og data.",
      },
      {
        title: "Reise",
        description:
          "En vei gjennom matematikk, programmeringsundervisning og praktisk programvarearbeid.",
      },
      {
        title: "Arbeidsmåte",
        description: "Forstå domenet, redusere uklarhet og bygge med omtanke.",
      },
      {
        title: "Utenfor arbeid",
        description:
          "Skriving, undervisning og håndverk holder det tekniske arbeidet knyttet til mennesker.",
      },
    ],
    contactTitle: "Kontakt",
    contactDescription:
      "Kontaktopplevelsen holdes bevisst enkel: verifiserte profesjonelle lenker, ingen sporing, intet skjema og ingen unødvendig datainnsamling.",
    contactAction: "Kontakt meg",
  },
  tr: {
    heroKicker: "Kod / Düşünce / Zanaat",
    heading: "Enes Yilmaz",
    role: "Yazılım Geliştirici",
    position:
      "Python, veri ve web üzerinde düşünülmüş yazılım sistemleri geliştiriyorum.",
    support: "Teknolojiyi, insanları ve fikirleri birbirine bağlıyorum.",
    primaryAction: "Seçili işleri gör",
    secondaryAction: "Hakkımda",
    manifestoTitle: "Kod nadiren problemin tamamıdır.",
    manifestoLines: [
      "İnsanlar, kararlar, sistemler ve sonuçlar vardır.",
      "Çözümü kurmadan önce bağlantıları anlamaya çalışırım.",
    ],
    selectedWorkTitle: "Seçili işler",
    selectedWorkDescription:
      "Hassas kamu sektörü detayları bilinçli olarak anonimleştirilmiş, profesyonel ve kamuya açık projelerden odaklı bir seçki.",
    evidenceTitle: "Profesyonel dayanak",
    evidenceDescription:
      "Bu içerik temeli sistem çalışmasını, veri odaklı problem çözmeyi, kamuya açık web projelerini ve eğitimi öne çıkarır.",
    ecosystemTitle: "Kod / Düşünce / Zanaat",
    ecosystemDescription:
      "Gelecekteki interaktif ekosistem grafiği burada statik ve okunabilir bir yapı olarak başlar.",
    ecosystemItems: [
      {
        title: "Kod",
        description:
          "Yazılım sistemleri, Python, veri, AI'ya yakın çalışmalar, React, .NET ve web geliştirme.",
      },
      {
        title: "Düşünce",
        description:
          "Eğitim, matematiksel düşünme, yazı, edebiyat ve problemleri düşünerek çerçeveleme.",
      },
      {
        title: "Zanaat",
        description:
          "Ahşap, saatler, görsel tasarım, video ve bir şeyi özenle üretme pratiği.",
      },
    ],
    notesTitle: "Notlar önizlemesi",
    notesDescription:
      "Teknik ve düşünsel yazılar kontrollü bir içerik sistemiyle eklenecek. Şimdilik notlar; yazılım, veri, eğitim, düşünce ve kişisel yazı için planlanan bir alandır.",
    notesAction: "Notları aç",
    atelierTitle: "Atölye önizlemesi",
    atelierDescription:
      "Yaratıcı işler burada ayrı bir hobi bölümü olarak değil; süreç, malzeme dikkati ve görsel düşünme olarak yer alır.",
    atelierAction: "Atölyeyi aç",
    aboutTitle: "Kısa hakkımda",
    aboutDescription:
      "Norveç merkezli, yazılım geliştirici olarak çalışan; matematik, eğitim, web, veri, yazı ve zanaatla şekillenen bir profil.",
    aboutItems: [
      {
        title: "Şimdi",
        description: "Sistemler, web ve veri üzerinde yazılım geliştirme.",
      },
      {
        title: "Yolculuk",
        description:
          "Matematik, programlama eğitimi ve pratik yazılım çalışmaları arasında ilerleyen bir yol.",
      },
      {
        title: "Çalışma biçimim",
        description:
          "Alanı anlamak, belirsizliği azaltmak ve özenle inşa etmek.",
      },
      {
        title: "İş dışında",
        description:
          "Yazı, eğitim ve zanaat teknik işi insanlarla bağlı tutar.",
      },
    ],
    contactTitle: "İletişim",
    contactDescription:
      "İletişim deneyimi bilinçli olarak sade tutulur: doğrulanmış profesyonel bağlantılar, takip yok, form yok, gereksiz veri toplama yok.",
    contactAction: "İletişime geç",
  },
};
