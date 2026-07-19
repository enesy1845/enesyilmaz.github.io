import type { Locale } from "@/i18n/config";

export type PageSection = {
  title: string;
  body: string;
};

export type AboutPageContent = {
  introMeta: string;
  sections: readonly PageSection[];
  closingTitle: string;
  closingBody: string;
};

export type ContactPageContent = {
  introMeta: string;
  description: string;
  note: string;
};

export const aboutPageContent: Record<Locale, AboutPageContent> = {
  en: {
    introMeta: "Based in Norway / Software development / Teaching / Craft",
    sections: [
      {
        title: "Current professional identity",
        body: "Enes works as a software developer with a focus on practical systems, web interfaces, data-oriented workflows, and careful handling of sensitive contexts.",
      },
      {
        title: "Career and learning journey",
        body: "His background connects mathematics, programming education, public web projects, Python, data, and full-stack software work. The portfolio presents only high-level verified facts while the detailed content model matures.",
      },
      {
        title: "How I approach problems",
        body: "The starting point is rarely code alone. Domain rules, people, information flow, privacy, and consequences shape the solution before implementation details are chosen.",
      },
      {
        title: "Teaching and communication",
        body: "Teaching programming and explaining technical topics are part of the professional foundation. That experience supports clearer collaboration and more readable software decisions.",
      },
      {
        title: "Interests outside software",
        body: "Writing, mathematics, wood, watches, visual design, and video belong to the broader Code / Thought / Craft identity, but they remain secondary to the professional software narrative.",
      },
    ],
    closingTitle: "Useful for collaboration",
    closingBody:
      "This portfolio is designed to support job applications and professional conversations without overstating seniority, outcomes, or sensitive work.",
  },
  no: {
    introMeta:
      "Basert i Norge / Programvareutvikling / Undervisning / Håndverk",
    sections: [
      {
        title: "Nåværende profesjonell identitet",
        body: "Enes arbeider som programvareutvikler med praktiske systemer, webgrensesnitt, dataorienterte flyter og nøyaktig håndtering av sensitive kontekster.",
      },
      {
        title: "Karriere- og læringsreise",
        body: "Bakgrunnen knytter sammen matematikk, programmeringsundervisning, offentlige webprosjekter, Python, data og full-stack programvarearbeid. Porteføljen viser kun overordnede verifiserte fakta mens innholdsmodellen modnes.",
      },
      {
        title: "Hvordan jeg angriper problemer",
        body: "Utgangspunktet er sjelden bare kode. Domeneregler, mennesker, informasjonsflyt, personvern og konsekvenser former løsningen før implementasjonsdetaljer velges.",
      },
      {
        title: "Undervisning og kommunikasjon",
        body: "Programmeringsundervisning og teknisk forklaring er en del av den profesjonelle grunnmuren. Erfaringen støtter tydeligere samarbeid og mer lesbare tekniske valg.",
      },
      {
        title: "Interesser utenfor programvare",
        body: "Skriving, matematikk, tre, klokker, visuell design og video hører til den bredere Kode / Tanke / Håndverk-identiteten, men er sekundært til den profesjonelle programvarefortellingen.",
      },
    ],
    closingTitle: "Nyttig for samarbeid",
    closingBody:
      "Porteføljen er laget for jobbsøknader og profesjonelle samtaler uten å overdrive senioritet, resultater eller konfidensielt arbeid.",
  },
  tr: {
    introMeta: "Norveç merkezli / Yazılım geliştirme / Eğitim / Zanaat",
    sections: [
      {
        title: "Güncel profesyonel kimlik",
        body: "Enes; pratik sistemler, web arayüzleri, veri odaklı akışlar ve hassas bağlamların dikkatli ele alınması üzerine çalışan bir yazılım geliştiricidir.",
      },
      {
        title: "Kariyer ve öğrenme yolculuğu",
        body: "Arka planı matematik, programlama eğitimi, kamuya açık web projeleri, Python, veri ve full-stack yazılım işlerini birbirine bağlar. İçerik modeli olgunlaşırken portfolyo yalnızca üst düzey doğrulanmış bilgileri sunar.",
      },
      {
        title: "Problemlere yaklaşımım",
        body: "Başlangıç noktası nadiren yalnızca koddur. Alan kuralları, insanlar, bilgi akışı, gizlilik ve sonuçlar; uygulama detayları seçilmeden önce çözümü şekillendirir.",
      },
      {
        title: "Eğitim ve iletişim",
        body: "Programlama öğretmek ve teknik konuları açıklamak profesyonel temelin parçasıdır. Bu deneyim daha net iş birliğini ve daha okunabilir teknik kararları destekler.",
      },
      {
        title: "Yazılım dışındaki ilgiler",
        body: "Yazı, matematik, ahşap, saatler, görsel tasarım ve video daha geniş Kod / Düşünce / Zanaat kimliğine aittir; ancak profesyonel yazılım anlatısının yanında ikincil kalır.",
      },
    ],
    closingTitle: "İş birliği için kullanışlı",
    closingBody:
      "Bu portfolyo, kıdemi, sonuçları veya gizli işleri abartmadan iş başvurularını ve profesyonel görüşmeleri desteklemek için tasarlanmıştır.",
  },
};

export const contactPageContent: Record<Locale, ContactPageContent> = {
  en: {
    introMeta: "Verified public channels",
    description:
      "Use these channels for professional contact. A server-side contact form is intentionally not active yet.",
    note: "Email is listed because it already existed in the legacy public portfolio. No message is processed by this site.",
  },
  no: {
    introMeta: "Verifiserte offentlige kanaler",
    description:
      "Bruk disse kanalene for profesjonell kontakt. Et serverside-kontaktskjema er bevisst ikke aktivt ennå.",
    note: "E-post vises fordi den allerede fantes i den offentlige legacy-porteføljen. Ingen melding behandles av dette nettstedet.",
  },
  tr: {
    introMeta: "Doğrulanmış kamuya açık kanallar",
    description:
      "Profesyonel iletişim için bu kanalları kullanın. Sunucu taraflı iletişim formu bilinçli olarak henüz aktif değildir.",
    note: "E-posta, eski kamuya açık portfolyoda zaten bulunduğu için listelenir. Bu site herhangi bir mesaj işlemez.",
  },
};
