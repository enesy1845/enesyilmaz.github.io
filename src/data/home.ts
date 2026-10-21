import type { Locale } from "@/i18n/config";

export type HomeContent = {
  eyebrow: string;
  heading: string;
  role: string;
  position: string;
  support: string;
  primaryAction: string;
  secondaryAction: string;
  manifestoTitle: string;
  manifestoText: string;
  selectedWorkTitle: string;
  selectedWorkDescription: string;
  allWorkAction: string;
  expertiseTitle: string;
  disciplinesTitle: string;
  disciplines: readonly {
    title: string;
    description: string;
    /** Route segment the discipline links to. */
    segment: "work" | "notes" | "atelier";
    action: string;
  }[];
  notesTitle: string;
  notesDescription: string;
  notesAction: string;
  mediumAction: string;
  atelierTitle: string;
  atelierDescription: string;
  atelierItems: readonly string[];
  atelierAction: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutAction: string;
  contactTitle: string;
  contactDescription: string;
  contactAction: string;
  cvAction: string;
};

export const homeContent: Record<Locale, HomeContent> = {
  en: {
    eyebrow: "Software Developer · Based in Norway",
    heading: "Enes Yılmaz",
    role: "Python Developer & Software Engineer",
    position:
      "I turn complex problems into useful software — connecting code, data and people.",
    support: "Building with curiosity, clarity and purpose.",
    primaryAction: "Explore my work",
    secondaryAction: "My journey",
    manifestoTitle: "Code is rarely the whole problem.",
    manifestoText:
      "Behind every technical challenge are people, decisions and connected systems. I believe the best solutions begin with understanding those connections.",
    selectedWorkTitle: "Selected Work",
    selectedWorkDescription:
      "Software systems, digital products and websites built to solve real problems.",
    allWorkAction: "See all work",
    expertiseTitle: "What I work with",
    disciplinesTitle: "Different disciplines. One way of thinking.",
    disciplines: [
      {
        title: "Code",
        description:
          "Designing reliable systems and turning ideas into practical software.",
        segment: "work",
        action: "See my work",
      },
      {
        title: "Thought",
        description:
          "Exploring how we learn, reason, question assumptions and use knowledge responsibly.",
        segment: "notes",
        action: "Read my notes",
      },
      {
        title: "Craft",
        description:
          "Finding meaning in materials, mechanisms, visual design and the details of making.",
        segment: "atelier",
        action: "Visit the atelier",
      },
    ],
    notesTitle: "Thinking out loud",
    notesDescription:
      "Reflections on software, education, mathematical thinking, technology and human development.",
    notesAction: "All notes",
    mediumAction: "More on Medium",
    atelierTitle: "Beyond the screen",
    atelierDescription:
      "An appreciation for craftsmanship, mechanical systems, materials and visual storytelling.",
    atelierItems: [
      "Tesbih / prayer beads",
      "Wood and woodworking",
      "Mechanical watches",
      "Visual design and video",
    ],
    atelierAction: "Visit the atelier",
    aboutTitle: "A little about me",
    aboutDescription:
      "I'm a software developer based in Norway. My journey connects mathematics, programming education, full-stack development and data engineering. I enjoy understanding complex systems, but I'm equally interested in the people and ideas behind them.",
    aboutAction: "More about me",
    contactTitle: "Have something interesting in mind?",
    contactDescription:
      "I'm open to meaningful collaborations, software engineering opportunities and conversations about ideas worth building.",
    contactAction: "Get in touch",
    cvAction: "Explore my CV",
  },
  no: {
    eyebrow: "Programvareutvikler · Basert i Norge",
    heading: "Enes Yılmaz",
    role: "Python-utvikler og programvareutvikler",
    position:
      "Jeg gjør komplekse problemer om til nyttig programvare — og knytter sammen kode, data og mennesker.",
    support: "Jeg bygger med nysgjerrighet, klarhet og formål.",
    primaryAction: "Utforsk arbeidet mitt",
    secondaryAction: "Min reise",
    manifestoTitle: "Kode er sjelden hele problemet.",
    manifestoText:
      "Bak enhver teknisk utfordring står mennesker, beslutninger og sammenkoblede systemer. Jeg tror de beste løsningene begynner med å forstå disse sammenhengene.",
    selectedWorkTitle: "Utvalgt arbeid",
    selectedWorkDescription:
      "Programvaresystemer, digitale produkter og nettsteder laget for å løse reelle problemer.",
    allWorkAction: "Se alt arbeid",
    expertiseTitle: "Det jeg jobber med",
    disciplinesTitle: "Ulike fagfelt. Én måte å tenke på.",
    disciplines: [
      {
        title: "Kode",
        description:
          "Jeg utformer pålitelige systemer og gjør ideer om til praktisk programvare.",
        segment: "work",
        action: "Se arbeidet mitt",
      },
      {
        title: "Tanke",
        description:
          "Jeg utforsker hvordan vi lærer, resonnerer, utfordrer antakelser og bruker kunnskap ansvarlig.",
        segment: "notes",
        action: "Les notatene mine",
      },
      {
        title: "Håndverk",
        description:
          "Jeg finner mening i materialer, mekanismer, visuell design og detaljene i det å lage noe.",
        segment: "atelier",
        action: "Besøk atelieret",
      },
    ],
    notesTitle: "Tenker høyt",
    notesDescription:
      "Refleksjoner om programvare, utdanning, matematisk tenkning, teknologi og menneskelig utvikling.",
    notesAction: "Alle notater",
    mediumAction: "Mer på Medium",
    atelierTitle: "Utenfor skjermen",
    atelierDescription:
      "En forkjærlighet for håndverk, mekaniske systemer, materialer og visuell historiefortelling.",
    atelierItems: [
      "Tesbih / bønnekjeder",
      "Tre og trearbeid",
      "Mekaniske klokker",
      "Visuell design og video",
    ],
    atelierAction: "Besøk atelieret",
    aboutTitle: "Litt om meg",
    aboutDescription:
      "Jeg er programvareutvikler og bor i Norge. Reisen min knytter sammen matematikk, programmeringsundervisning, full-stack-utvikling og datautvikling. Jeg liker å forstå komplekse systemer, men er like interessert i menneskene og ideene bak dem.",
    aboutAction: "Mer om meg",
    contactTitle: "Har du noe spennende på gang?",
    contactDescription:
      "Jeg er åpen for meningsfulle samarbeid, muligheter innen programvareutvikling og samtaler om ideer som er verdt å bygge.",
    contactAction: "Ta kontakt",
    cvAction: "Se CV-en min",
  },
  tr: {
    eyebrow: "Yazılım Geliştirici · Norveç",
    heading: "Enes Yılmaz",
    role: "Python Geliştirici ve Yazılım Mühendisi",
    position:
      "Karmaşık problemleri faydalı yazılımlara dönüştürüyorum — kodu, veriyi ve insanları birbirine bağlayarak.",
    support: "Merakla, netlikle ve amaçla üretiyorum.",
    primaryAction: "İşlerimi keşfet",
    secondaryAction: "Yolculuğum",
    manifestoTitle: "Kod nadiren problemin tamamıdır.",
    manifestoText:
      "Her teknik zorluğun arkasında insanlar, kararlar ve birbirine bağlı sistemler vardır. En iyi çözümlerin bu bağlantıları anlamakla başladığına inanıyorum.",
    selectedWorkTitle: "Seçili İşler",
    selectedWorkDescription:
      "Gerçek problemleri çözmek için geliştirilmiş yazılım sistemleri, dijital ürünler ve web siteleri.",
    allWorkAction: "Tüm işleri gör",
    expertiseTitle: "Neyle çalışıyorum",
    disciplinesTitle: "Farklı disiplinler. Tek bir düşünme biçimi.",
    disciplines: [
      {
        title: "Kod",
        description:
          "Güvenilir sistemler tasarlamak ve fikirleri pratik yazılımlara dönüştürmek.",
        segment: "work",
        action: "İşlerimi gör",
      },
      {
        title: "Düşünce",
        description:
          "Nasıl öğrendiğimizi, nasıl akıl yürüttüğümüzü, varsayımları nasıl sorguladığımızı ve bilgiyi nasıl sorumlulukla kullandığımızı keşfetmek.",
        segment: "notes",
        action: "Notlarımı oku",
      },
      {
        title: "Zanaat",
        description:
          "Malzemelerde, mekanizmalarda, görsel tasarımda ve üretmenin ayrıntılarında anlam bulmak.",
        segment: "atelier",
        action: "Atölyeyi ziyaret et",
      },
    ],
    notesTitle: "Sesli düşünmek",
    notesDescription:
      "Yazılım, eğitim, matematiksel düşünme, teknoloji ve insani gelişim üzerine düşünceler.",
    notesAction: "Tüm notlar",
    mediumAction: "Medium'da daha fazlası",
    atelierTitle: "Ekranın ötesinde",
    atelierDescription:
      "Zanaata, mekanik sistemlere, malzemelere ve görsel anlatıma duyulan bir ilgi.",
    atelierItems: [
      "Tesbih",
      "Ahşap ve ahşap işçiliği",
      "Mekanik saatler",
      "Görsel tasarım ve video",
    ],
    atelierAction: "Atölyeyi ziyaret et",
    aboutTitle: "Kısaca ben",
    aboutDescription:
      "Norveç'te yaşayan bir yazılım geliştiriciyim. Yolculuğum matematiği, programlama eğitimini, full-stack geliştirmeyi ve veri mühendisliğini birbirine bağlıyor. Karmaşık sistemleri anlamayı seviyorum; ama onların arkasındaki insanlar ve fikirler de beni en az o kadar ilgilendiriyor.",
    aboutAction: "Hakkımda daha fazlası",
    contactTitle: "Aklında ilginç bir şey mi var?",
    contactDescription:
      "Anlamlı iş birliklerine, yazılım mühendisliği fırsatlarına ve üretmeye değer fikirler üzerine sohbetlere açığım.",
    contactAction: "İletişime geç",
    cvAction: "Özgeçmişimi incele",
  },
};
