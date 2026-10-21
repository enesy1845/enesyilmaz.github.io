import { additionalProjects } from "@/content/projects/additional-projects";
import { clientProjects } from "@/content/projects/client-projects";
import type { Project } from "@/types/project";

const coreProjects = [
  {
    slug: "municipal-quality-system",
    category: "software",
    technologies: ["React", "TypeScript", ".NET", "SharePoint"],
    disciplines: [
      "Full-stack development",
      "Workflow design",
      "Accessibility",
      "Privacy-sensitive systems",
    ],
    featured: true,
    confidential: true,
    availableLocales: ["en", "no", "tr"],
    content: {
      en: {
        title: "Municipal Quality System",
        shortTitle: "Quality System",
        summary:
          "Contributing to public-sector software that supports structured workflows, case management and quality processes.",
        description:
          "Contributed to parts of a privacy-sensitive municipal software system with React, TypeScript, .NET, and SharePoint integration.",
        role: "Software Developer",
        organization: "Asker kommune — IKT / Digitalisering",
        location: "Norway",
        responsibilities: [
          "Worked on React and TypeScript interface flows for structured case handling.",
          "Collaborated around .NET-backed business rules and SharePoint-connected document workflows.",
          "Kept accessibility, traceability, and privacy-sensitive handling visible in implementation decisions.",
        ],
        challenges: [
          "Balancing complex municipal workflows with readable user interfaces.",
          "Supporting sensitive case data without exposing implementation details publicly.",
        ],
        outcomes: [
          "A clearer foundation for deviation and quality workflows inside a larger municipal system.",
        ],
        lessons: [
          "Software quality depends on domain understanding, privacy, and collaboration as much as code.",
        ],
      },
      no: {
        title: "Kommunalt kvalitetssystem",
        shortTitle: "Kvalitetssystem",
        summary:
          "Jeg bidrar til programvare i offentlig sektor som støtter strukturerte arbeidsflyter, saksbehandling og kvalitetsprosesser.",
        description:
          "Bidro til deler av et personvernsensitivt kommunalt system med React, TypeScript, .NET og SharePoint-integrasjon.",
        role: "Programvareutvikler",
        organization: "Asker kommune — IKT / Digitalisering",
        location: "Norge",
        responsibilities: [
          "Arbeidet med React- og TypeScript-flyt for strukturert saksbehandling.",
          "Samarbeidet rundt .NET-baserte forretningsregler og SharePoint-tilknyttede dokumentflyter.",
          "Holdt universell utforming, sporbarhet og sensitiv datahåndtering synlig i implementeringsvalg.",
        ],
        challenges: [
          "Å balansere komplekse kommunale arbeidsflyter med lesbare brukergrensesnitt.",
          "Å støtte sensitiv saksdata uten å publisere interne detaljer.",
        ],
        outcomes: [
          "Et tydeligere grunnlag for avviks- og kvalitetsflyter i et større kommunalt system.",
        ],
        lessons: [
          "Programvarekvalitet handler like mye om domene, personvern og samarbeid som om kode.",
        ],
      },
      tr: {
        title: "Belediye Kalite Sistemi",
        shortTitle: "Kalite Sistemi",
        summary:
          "Yapılandırılmış iş akışlarını, vaka yönetimini ve kalite süreçlerini destekleyen kamu sektörü yazılımına katkı sağlıyorum.",
        description:
          "React, TypeScript, .NET ve SharePoint entegrasyonu kullanılan gizlilik hassasiyetli bir belediye sisteminin bazı bölümlerine katkı sağladı.",
        role: "Yazılım Geliştirici",
        organization: "Asker kommune — IKT / Digitalisering",
        location: "Norveç",
        responsibilities: [
          "Yapılandırılmış vaka yönetimi için React ve TypeScript arayüz akışları üzerinde çalıştı.",
          ".NET tabanlı iş kuralları ve SharePoint bağlantılı belge akışları etrafında iş birliği yaptı.",
          "Erişilebilirlik, izlenebilirlik ve hassas veri işleme kararlarını görünür tuttu.",
        ],
        challenges: [
          "Karmaşık belediye iş akışlarını okunabilir arayüzlerle dengelemek.",
          "İç detayları yayımlamadan hassas vaka verisini desteklemek.",
        ],
        outcomes: [
          "Daha büyük bir belediye sistemi içinde kalite ve sapma akışları için daha net bir temel.",
        ],
        lessons: [
          "Yazılım kalitesi kod kadar alan bilgisi, gizlilik ve iş birliğine de bağlıdır.",
        ],
      },
    },
  },
  {
    slug: "process-pdf-export",
    category: "data",
    technologies: ["Python", "PDF generation", "SharePoint", "Background jobs"],
    disciplines: [
      "Document automation",
      "Data transformation",
      "File organization",
    ],
    featured: false,
    confidential: true,
    availableLocales: ["en", "no", "tr"],
    content: {
      en: {
        title: "Process PDF Export System",
        shortTitle: "PDF Export",
        summary:
          "Background processing that turns structured process data into organized PDF documents.",
        description:
          "Implemented parts of a document export flow that generated PDFs, merged documents, and stored output in SharePoint.",
        role: "Software developer contributor",
        organization: "Anonymized public-sector context",
        location: "Norway",
        responsibilities: [
          "Worked with structured process data and generated document output.",
          "Handled PDF creation, merging, naming, and folder organization concerns.",
          "Considered scale and SharePoint folder-limit constraints when shaping the flow.",
        ],
        challenges: [
          "Keeping generated documents predictable for users while respecting platform storage constraints.",
        ],
        outcomes: [
          "A more repeatable path from process data to stored documentation.",
        ],
        lessons: [
          "Document automation needs careful naming, structure, and failure handling before it feels reliable.",
        ],
      },
      no: {
        title: "PDF-eksport for prosesser",
        shortTitle: "PDF-eksport",
        summary:
          "Bakgrunnsprosessering som gjør strukturerte prosessdata om til organiserte PDF-dokumenter.",
        description:
          "Implementerte deler av en dokumenteksport som genererte PDF-er, slo sammen dokumenter og lagret resultat i SharePoint.",
        role: "Bidragsyter som programvareutvikler",
        organization: "Anonymisert offentlig kontekst",
        location: "Norge",
        responsibilities: [
          "Arbeidet med strukturerte prosessdata og generert dokumentutdata.",
          "Håndterte PDF-generering, sammenslåing, navngiving og mappeorganisering.",
          "Vurderte skala og SharePoint-begrensninger i utformingen av flyten.",
        ],
        challenges: [
          "Å gjøre genererte dokumenter forutsigbare for brukere samtidig som lagringsplattformens rammer respekteres.",
        ],
        outcomes: [
          "En mer repeterbar vei fra prosessdata til lagret dokumentasjon.",
        ],
        lessons: [
          "Dokumentautomatisering trenger gjennomtenkt navngiving, struktur og feilhåndtering for å oppleves pålitelig.",
        ],
      },
      tr: {
        title: "Süreç PDF Dışa Aktarım Sistemi",
        shortTitle: "PDF Dışa Aktarım",
        summary:
          "Yapılandırılmış süreç verisini düzenli PDF belgelerine dönüştüren arka plan işleme akışı.",
        description:
          "PDF üretimi, belge birleştirme ve çıktıyı SharePoint içinde saklama akışının bazı bölümlerini uyguladı.",
        role: "Yazılım geliştirici katkısı",
        organization: "Anonimleştirilmiş kamu bağlamı",
        location: "Norveç",
        responsibilities: [
          "Yapılandırılmış süreç verisi ve üretilen belge çıktılarıyla çalıştı.",
          "PDF oluşturma, birleştirme, adlandırma ve klasör organizasyonu konularını ele aldı.",
          "Akışı şekillendirirken ölçek ve SharePoint klasör sınırlarını dikkate aldı.",
        ],
        challenges: [
          "Platform sınırlarını korurken üretilen belgeleri kullanıcılar için öngörülebilir kılmak.",
        ],
        outcomes: [
          "Süreç verisinden saklanan dokümantasyona daha tekrarlanabilir bir yol.",
        ],
        lessons: [
          "Belge otomasyonu güvenilir hissettirmek için adlandırma, yapı ve hata yönetimini baştan düşünmelidir.",
        ],
      },
    },
  },
  {
    slug: "privacy-pii-workflow",
    category: "software",
    technologies: ["React", "TypeScript", ".NET", "Access control"],
    disciplines: ["Privacy review", "Workflow design", "User interface"],
    featured: false,
    confidential: true,
    availableLocales: ["en", "no", "tr"],
    content: {
      en: {
        title: "Privacy And PII Workflow",
        shortTitle: "PII Workflow",
        summary:
          "Workflow support for reviewing sensitive information before submitted cases move forward.",
        description:
          "Worked on parts of a privacy-aware workflow where users needed clearer handling of submitted case information.",
        role: "Software developer contributor",
        organization: "Anonymized public-sector context",
        location: "Norway",
        responsibilities: [
          "Supported interface and workflow behavior for sensitive-information review.",
          "Worked within access-control and privacy constraints.",
          "Kept the public case study intentionally high level to avoid exposing sensitive workflows.",
        ],
        challenges: [
          "Designing a practical user path around information that should not be casually exposed.",
        ],
        outcomes: [
          "A safer and clearer workflow foundation for handling privacy-sensitive submissions.",
        ],
        lessons: [
          "Privacy work benefits from small interface decisions that reduce ambiguity for users.",
        ],
      },
      no: {
        title: "Personvern- og PII-flyt",
        shortTitle: "PII-flyt",
        summary:
          "Arbeidsflytstøtte for gjennomgang av sensitiv informasjon før innsendte saker går videre.",
        description:
          "Arbeidet med deler av en personvernbevisst flyt der brukere trengte tydeligere håndtering av innsendt saksinformasjon.",
        role: "Bidragsyter som programvareutvikler",
        organization: "Anonymisert offentlig kontekst",
        location: "Norge",
        responsibilities: [
          "Støttet grensesnitt- og arbeidsflytatferd for gjennomgang av sensitiv informasjon.",
          "Arbeidet innenfor tilgangskontroll og personvernrammer.",
          "Holdt den offentlige casen på et bevisst overordnet nivå.",
        ],
        challenges: [
          "Å lage en praktisk brukerflyt rundt informasjon som ikke bør eksponeres tilfeldig.",
        ],
        outcomes: [
          "Et tryggere og tydeligere grunnlag for håndtering av personvernsensitive innsendinger.",
        ],
        lessons: [
          "Personvernarbeid styrkes av små grensesnittvalg som reduserer tvetydighet for brukere.",
        ],
      },
      tr: {
        title: "Gizlilik ve PII İş Akışı",
        shortTitle: "PII İş Akışı",
        summary:
          "Gönderilen vakalar ilerlemeden önce hassas bilgilerin incelenmesini destekleyen iş akışı.",
        description:
          "Kullanıcıların gönderilen vaka bilgisini daha net ele almasını gerektiren gizlilik odaklı bir akışın bazı bölümlerinde çalıştı.",
        role: "Yazılım geliştirici katkısı",
        organization: "Anonimleştirilmiş kamu bağlamı",
        location: "Norveç",
        responsibilities: [
          "Hassas bilgi incelemesi için arayüz ve iş akışı davranışını destekledi.",
          "Erişim kontrolü ve gizlilik sınırları içinde çalıştı.",
          "Kamusal vaka anlatımını bilinçli olarak üst düzeyde tuttu.",
        ],
        challenges: [
          "Rastgele açığa çıkmaması gereken bilgi etrafında pratik bir kullanıcı yolu tasarlamak.",
        ],
        outcomes: [
          "Gizlilik hassasiyetli başvurular için daha güvenli ve net bir iş akışı temeli.",
        ],
        lessons: [
          "Gizlilik çalışması, kullanıcı belirsizliğini azaltan küçük arayüz kararlarıyla güçlenir.",
        ],
      },
    },
  },
  {
    slug: "ilc-language-centre",
    category: "web",
    technologies: ["Webflow", "Responsive design", "CMS"],
    disciplines: ["Webflow development", "Content structure", "Responsive UI"],
    featured: true,
    externalUrl: "https://ilcentres.com/",
    coverImage: "/images/projects/ilc-language-centres.webp",
    availableLocales: ["en", "no", "tr"],
    content: {
      en: {
        title: "ILC Language Centres",
        summary:
          "Creating and maintaining accessible, responsive web experiences for an international education organization.",
        description:
          "Webflow development for a UK-based language centre with several locations and course paths. Related work includes the separate ILC Accommodation website.",
        role: "Webflow Developer",
        organization: "ILC Language Centres",
        responsibilities: [
          "Built and maintained responsive Webflow pages.",
          "Structured CMS content for locations and courses.",
          "Kept navigation clear for prospective students.",
        ],
        lessons: [
          "Education websites need clear navigation before visual decoration.",
        ],
        imageAlt: "Homepage of the ILC Language Centres website",
      },
      no: {
        title: "ILC Language Centres",
        summary:
          "Jeg utvikler og vedlikeholder tilgjengelige, responsive nettsider for en internasjonal utdanningsorganisasjon.",
        description:
          "Webflow-utvikling for en britisk språkskole med flere lokasjoner og kursløp. Relatert arbeid omfatter det separate nettstedet ILC Accommodation.",
        role: "Webflow-utvikler",
        organization: "ILC Language Centres",
        responsibilities: [
          "Bygde og vedlikeholdt responsive Webflow-sider.",
          "Strukturerte CMS-innhold for lokasjoner og kurs.",
          "Holdt navigasjonen tydelig for potensielle studenter.",
        ],
        lessons: [
          "Utdanningsnettsteder trenger tydelig navigasjon før visuell pynt.",
        ],
        imageAlt: "Forsiden til nettstedet ILC Language Centres",
      },
      tr: {
        title: "ILC Language Centres",
        summary:
          "Uluslararası bir eğitim kurumu için erişilebilir, responsive web deneyimleri oluşturuyor ve sürdürüyorum.",
        description:
          "Birden fazla lokasyonu ve kurs seçeneği olan, Birleşik Krallık merkezli bir dil okulu için Webflow geliştirme. İlgili çalışmalar arasında ayrı ILC Accommodation sitesi de var.",
        role: "Webflow Geliştirici",
        organization: "ILC Language Centres",
        responsibilities: [
          "Responsive Webflow sayfaları geliştirdim ve sürdürdüm.",
          "Lokasyonlar ve kurslar için CMS içeriğini yapılandırdım.",
          "Aday öğrenciler için gezinmeyi net tuttum.",
        ],
        lessons: [
          "Eğitim siteleri görsel süslemeden önce net gezinmeye ihtiyaç duyar.",
        ],
        imageAlt: "ILC Language Centres web sitesinin ana sayfası",
      },
    },
  },
  {
    slug: "quiver-blog-support",
    category: "web",
    technologies: ["WordPress", "UI maintenance", "Content publishing"],
    disciplines: ["Volunteer support", "Web maintenance"],
    featured: false,
    externalUrl: "https://quiver.blog/",
    coverImage: "/images/projects/quiver-blog.webp",
    availableLocales: ["en", "no", "tr"],
    content: {
      en: {
        title: "Quiver Blog",
        summary:
          "Volunteer UI improvements and maintenance for a Norwegian blogger's website.",
        role: "Volunteer web contributor",
        organization: "Quiver Blog",
        location: "Norway",
        imageAlt: "Homepage of the Quiver Blog website",
      },
      no: {
        title: "Quiver Blog",
        summary:
          "Frivillige forbedringer av brukergrensesnitt og vedlikehold for en norsk bloggers nettsted.",
        role: "Frivillig webbidragsyter",
        organization: "Quiver Blog",
        location: "Norge",
        imageAlt: "Forsiden til nettstedet Quiver Blog",
      },
      tr: {
        title: "Quiver Blog",
        summary:
          "Norveçli bir blog yazarının sitesi için gönüllü arayüz iyileştirmeleri ve bakım.",
        role: "Gönüllü web katkısı",
        organization: "Quiver Blog",
        location: "Norveç",
        imageAlt: "Quiver Blog web sitesinin ana sayfası",
      },
    },
  },
] as const satisfies readonly Project[];

/** Curated order: the five featured projects lead, deeper work follows. */
const projectOrder = [
  "municipal-quality-system",
  "snap360-photography",
  "ilh-digital-platform",
  "five-star-stitches-colchester",
  "ilc-language-centre",
  "llm-quiz-application",
  "seller-flash",
  "architech-cuix-agency",
  "process-pdf-export",
  "privacy-pii-workflow",
];

function rank(project: Project): number {
  const index = projectOrder.indexOf(project.slug);
  return index === -1 ? projectOrder.length : index;
}

export const projects: readonly Project[] = [
  ...coreProjects,
  ...clientProjects,
  ...additionalProjects,
].sort((a, b) => rank(a) - rank(b));
