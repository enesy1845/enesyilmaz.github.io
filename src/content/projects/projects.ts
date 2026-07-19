import type { Project } from "@/types/project";

export const projects = [
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
          "An anonymized public-sector system for quality, deviations, and case workflows.",
        description:
          "Contributed to parts of a privacy-sensitive municipal software system with React, TypeScript, .NET, and SharePoint integration.",
        role: "Software developer contributor",
        organization: "Anonymized public-sector context",
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
        decisions: [
          "Present the work as anonymized public-sector software rather than exposing screenshots, URLs, or implementation architecture.",
          "Describe contribution language carefully to avoid implying sole ownership.",
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
          "Et anonymisert offentlig system for kvalitet, avvik og saksflyt.",
        description:
          "Bidro til deler av et personvernsensitivt kommunalt system med React, TypeScript, .NET og SharePoint-integrasjon.",
        role: "Bidragsyter som programvareutvikler",
        organization: "Anonymisert offentlig kontekst",
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
        decisions: [
          "Presentere arbeidet som anonymisert offentlig programvare uten skjermbilder, URL-er eller implementasjonsarkitektur.",
          "Bruke presist bidragsspråk som ikke antyder eneansvar.",
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
          "Kalite, sapma ve vaka iş akışları için anonimleştirilmiş bir kamu sistemi.",
        description:
          "React, TypeScript, .NET ve SharePoint entegrasyonu kullanılan gizlilik hassasiyetli bir belediye sisteminin bazı bölümlerine katkı sağladı.",
        role: "Yazılım geliştirici katkısı",
        organization: "Anonimleştirilmiş kamu bağlamı",
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
        decisions: [
          "Çalışmayı ekran görüntüsü, URL veya uygulama mimarisi paylaşmadan anonim kamu yazılımı olarak sunmak.",
          "Tek sahiplik ima etmeyen dikkatli katkı dili kullanmak.",
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
    featured: true,
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
        decisions: [
          "Keep the public description focused on workflow shape rather than storage implementation details.",
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
        decisions: [
          "Holde den offentlige beskrivelsen på arbeidsflytnivå, ikke lagringsimplementasjon.",
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
        decisions: [
          "Kamusal açıklamayı depolama uygulaması yerine iş akışının biçimine odaklamak.",
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
    featured: true,
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
        decisions: [
          "Avoid screenshots, real field names, and real process labels.",
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
        decisions: [
          "Unngå skjermbilder, ekte feltnavn og ekte prosessetiketter.",
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
        decisions: [
          "Ekran görüntüsü, gerçek alan adı ve gerçek süreç etiketi paylaşmamak.",
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
    technologies: ["Webflow", "Responsive design", "CMS structure"],
    disciplines: ["Web development", "Content structure", "Responsive UI"],
    featured: true,
    externalUrl: "https://ilcentres.com/",
    availableLocales: ["en", "no", "tr"],
    content: {
      en: {
        title: "ILC Language Centre Website",
        shortTitle: "ILC Website",
        summary:
          "A responsive public website for an international language-centre organization.",
        description:
          "Legacy portfolio material identifies this as a Webflow-based responsive website project for ILC Language Centres. The current public site is live and links to multiple UK locations and course paths.",
        role: "Web project contributor",
        organization: "ILC Language Centres",
        responsibilities: [
          "Worked with responsive website implementation and content structure.",
          "Connected project presentation to a live public website rather than screenshots.",
        ],
        challenges: [
          "Keeping a multi-location education website clear for prospective students.",
        ],
        decisions: [
          "Use the live external link as the public reference and avoid migrating legacy screenshots in Phase 3.",
        ],
        outcomes: ["A public web project suitable for the selected work set."],
        lessons: [
          "Education websites need clear navigation before visual decoration.",
        ],
      },
      no: {
        title: "ILC Language Centre-nettsted",
        shortTitle: "ILC-nettsted",
        summary:
          "Et responsivt offentlig nettsted for en internasjonal språkskoleorganisasjon.",
        description:
          "Legacy-porteføljen beskriver dette som et Webflow-basert responsivt nettsted for ILC Language Centres. Det offentlige nettstedet er aktivt og viser flere britiske lokasjoner og kursløp.",
        role: "Bidragsyter på webprosjekt",
        organization: "ILC Language Centres",
        responsibilities: [
          "Arbeidet med responsiv webimplementering og innholdsstruktur.",
          "Knyttet prosjektpresentasjonen til et levende offentlig nettsted i stedet for skjermbilder.",
        ],
        challenges: [
          "Å gjøre et flerlokasjons utdanningsnettsted tydelig for potensielle studenter.",
        ],
        decisions: [
          "Bruke den levende eksterne lenken som offentlig referanse og ikke migrere legacy-skjermbilder i Phase 3.",
        ],
        outcomes: ["Et offentlig webprosjekt egnet for utvalgt arbeid."],
        lessons: [
          "Utdanningsnettsteder trenger tydelig navigasjon før visuell pynt.",
        ],
      },
      tr: {
        title: "ILC Language Centre Web Sitesi",
        shortTitle: "ILC Web Sitesi",
        summary:
          "Uluslararası bir dil merkezi organizasyonu için responsive kamuya açık web sitesi.",
        description:
          "Legacy portfolyo bunu ILC Language Centres için Webflow tabanlı responsive web sitesi projesi olarak tanımlar. Mevcut kamu sitesi canlıdır ve birçok Birleşik Krallık lokasyonu ile kurs yolunu gösterir.",
        role: "Web projesi katkısı",
        organization: "ILC Language Centres",
        responsibilities: [
          "Responsive web uygulaması ve içerik yapısı üzerinde çalıştı.",
          "Proje sunumunu ekran görüntüleri yerine canlı kamu sitesiyle ilişkilendirdi.",
        ],
        challenges: [
          "Çok lokasyonlu bir eğitim sitesini aday öğrenciler için anlaşılır kılmak.",
        ],
        decisions: [
          "Phase 3'te legacy ekran görüntülerini taşımadan canlı dış linki kamu referansı olarak kullanmak.",
        ],
        outcomes: ["Seçili işler seti için uygun kamuya açık bir web projesi."],
        lessons: [
          "Eğitim web siteleri görsel süslemeden önce net navigasyona ihtiyaç duyar.",
        ],
      },
    },
  },
  {
    slug: "quiver-blog-support",
    category: "web",
    technologies: ["WordPress", "UI maintenance", "Content publishing"],
    disciplines: ["Volunteer support", "Web maintenance", "Editorial systems"],
    featured: false,
    externalUrl: "https://quiver.blog/",
    availableLocales: ["en", "no", "tr"],
    content: {
      en: {
        title: "Quiver Blog Support",
        summary:
          "Volunteer web support and UI maintenance for a public blog project in Norway.",
        description:
          "Legacy material identifies Quiver Blog as volunteer UI and maintenance work. It remains secondary to professional software work but helps show communication and care for public-facing content.",
        role: "Volunteer web contributor",
        organization: "Quiver Blog",
        location: "Norway",
      },
      no: {
        title: "Quiver Blog-støtte",
        summary:
          "Frivillig webstøtte og vedlikehold av brukergrensesnitt for et offentlig bloggprosjekt i Norge.",
        description:
          "Legacy-materialet beskriver Quiver Blog som frivillig UI- og vedlikeholdsarbeid. Det er sekundært til profesjonelt programvarearbeid, men viser kommunikasjon og omtanke for offentlig innhold.",
        role: "Frivillig webbidragsyter",
        organization: "Quiver Blog",
        location: "Norge",
      },
      tr: {
        title: "Quiver Blog Desteği",
        summary:
          "Norveç'teki kamuya açık bir blog projesi için gönüllü web desteği ve arayüz bakımı.",
        description:
          "Legacy materyali Quiver Blog'u gönüllü UI ve bakım çalışması olarak tanımlar. Profesyonel yazılım işlerinin yanında ikincil kalır, ancak iletişim ve kamuya açık içerik özenini gösterir.",
        role: "Gönüllü web katkısı",
        organization: "Quiver Blog",
        location: "Norveç",
      },
    },
  },
] as const satisfies readonly Project[];
