import type { Locale } from "@/i18n/config";

type Text = Record<Locale, string>;

const t = (en: string, no: string, tr: string): Text => ({ en, no, tr });

export type TimelineKind =
  | "employment"
  | "practice"
  | "independent"
  | "teaching"
  | "project"
  | "education";

export type TimelineEntry = {
  key: string;
  /** Language-neutral years only; exact dates appear only when verified. */
  period: string;
  kind: TimelineKind;
  organization: Text;
  role: Text;
  detail?: Text;
  description?: Text;
  /** Project slugs from the work collection, shown as related links. */
  projects?: readonly string[];
};

/**
 * Reverse chronological. Overlaps are real: freelance work and teaching ran
 * alongside other roles, so this is not a single linear employment history.
 */
export const timeline: readonly TimelineEntry[] = [
  {
    key: "asker-2026",
    period: "2026",
    kind: "employment",
    organization: t(
      "Asker kommune — Digitalisering / IKT",
      "Asker kommune — Digitalisering / IKT",
      "Asker kommune — Digitalisering / IKT",
    ),
    role: t(
      "Software Developer / Consultant",
      "Programvareutvikler / konsulent",
      "Yazılım Geliştirici / Danışman",
    ),
    detail: t(
      "April–December 2026 · Fixed-term",
      "April–desember 2026 · Midlertidig",
      "Nisan–Aralık 2026 · Belirli süreli",
    ),
    description: t(
      "Developing and contributing to public-sector software with a focus on structured workflows, React/TypeScript interfaces and complex operational requirements.",
      "Utvikler og bidrar til programvare i offentlig sektor, med vekt på strukturerte arbeidsflyter, React/TypeScript-grensesnitt og komplekse driftskrav.",
      "Yapılandırılmış iş akışları, React/TypeScript arayüzleri ve karmaşık operasyonel gereksinimlere odaklanarak kamu sektörü yazılımları geliştiriyor ve bunlara katkı sağlıyorum.",
    ),
    projects: [
      "municipal-quality-system",
      "process-pdf-export",
      "privacy-pii-workflow",
    ],
  },
  {
    key: "asker-2025",
    period: "2025",
    kind: "practice",
    organization: t(
      "Asker kommune — IKT",
      "Asker kommune — IKT",
      "Asker kommune — IKT",
    ),
    role: t(
      "Language and work practice",
      "Språk- og arbeidspraksis",
      "Dil ve iş pratiği",
    ),
    detail: t(
      "Started September 2025",
      "Startet september 2025",
      "Eylül 2025'te başladı",
    ),
    description: t(
      "A practice placement in the municipality's IT department, separate from the later consultant contract.",
      "Et praksisopphold i kommunens IT-avdeling, atskilt fra den senere konsulentkontrakten.",
      "Belediyenin BT biriminde, sonraki danışmanlık sözleşmesinden ayrı bir pratik yerleştirme.",
    ),
  },
  {
    key: "werhere",
    period: "2024–2025",
    kind: "education",
    organization: t(
      "We'RHERE IT Academy / independent learning",
      "We'RHERE IT Academy / selvstudier",
      "We'RHERE IT Academy / bağımsız öğrenme",
    ),
    role: t(
      "Data Engineering & Technical Education",
      "Datautvikling og teknisk undervisning",
      "Veri Mühendisliği ve Teknik Eğitim",
    ),
    detail: t(
      "Course participant, with voluntary teaching contributions",
      "Kursdeltaker, med frivillige undervisningsbidrag",
      "Kurs katılımcısı; gönüllü eğitim katkılarıyla",
    ),
    description: t(
      "Working with Azure data engineering concepts and contributing to technical learning initiatives, including programming, data literacy and emerging AI topics.",
      "Arbeidet med begreper innen datautvikling i Azure og bidro til tekniske læringsinitiativer innen programmering, dataforståelse og nye KI-temaer.",
      "Azure veri mühendisliği kavramlarıyla çalıştım; programlama, veri okuryazarlığı ve yeni yapay zekâ konularını kapsayan teknik öğrenme girişimlerine katkı verdim.",
    ),
  },
  {
    key: "llm-quiz",
    period: "2023",
    kind: "project",
    organization: t(
      "LLM-Based Quiz Application",
      "LLM-basert quizapplikasjon",
      "LLM Tabanlı Quiz Uygulaması",
    ),
    role: t(
      "Full-stack Python Developer / Collaborator",
      "Full-stack Python-utvikler / samarbeidspartner",
      "Full-stack Python Geliştirici / Ekip üyesi",
    ),
    description: t(
      "Exploring learning applications using FastAPI, relational and graph databases, and large language models.",
      "Utforsket læringsapplikasjoner med FastAPI, relasjons- og grafdatabaser og store språkmodeller.",
      "FastAPI, ilişkisel ve graf veritabanları ile büyük dil modellerini kullanan öğrenme uygulamalarını araştırdım.",
    ),
    projects: ["llm-quiz-application"],
  },
  {
    key: "cuix",
    period: "2022–2023",
    kind: "independent",
    organization: t(
      "Cuix Agency / Architech",
      "Cuix Agency / Architech",
      "Cuix Agency / Architech",
    ),
    role: t(
      "Freelance Webflow Developer",
      "Frilans Webflow-utvikler",
      "Serbest Webflow Geliştirici",
    ),
    description: t(
      "Turning complex visual specifications into responsive, interactive websites for international clients.",
      "Omsatte komplekse visuelle spesifikasjoner til responsive, interaktive nettsteder for internasjonale kunder.",
      "Karmaşık görsel tasarımları uluslararası müşteriler için responsive ve etkileşimli web sitelerine dönüştürdüm.",
    ),
    projects: ["architech-cuix-agency"],
  },
  {
    key: "seller-flash",
    period: "2022",
    kind: "employment",
    organization: t("Seller Flash", "Seller Flash", "Seller Flash"),
    role: t(
      "Junior Full-stack Developer",
      "Junior full-stack-utvikler",
      "Junior Full-stack Geliştirici",
    ),
    description: t(
      "Working across C#/.NET and Vue.js on an automation-oriented web application.",
      "Arbeidet med C#/.NET og Vue.js på en automatiseringsorientert webapplikasjon.",
      "Otomasyon odaklı bir web uygulamasında C#/.NET ve Vue.js ile çalıştım.",
    ),
    projects: ["seller-flash"],
  },
  {
    key: "bilisim-school",
    period: "2021–2022",
    kind: "teaching",
    organization: t("Bilişim School", "Bilişim School", "Bilişim School"),
    role: t(
      "Python & JavaScript Instructor",
      "Instruktør i Python og JavaScript",
      "Python ve JavaScript Eğitmeni",
    ),
    detail: t(
      "Around 500 video lessons and curriculum work",
      "Rundt 500 videoleksjoner og arbeid med læreplaner",
      "Yaklaşık 500 video ders ve müfredat çalışması",
    ),
    description: t(
      "Teaching young learners, developing technical course materials and creating project-based programming content.",
      "Underviste unge elever, utviklet tekniske kursmateriell og laget prosjektbasert programmeringsinnhold.",
      "Genç öğrencilere ders verdim, teknik kurs materyalleri geliştirdim ve proje tabanlı programlama içerikleri hazırladım.",
    ),
  },
  {
    key: "independent-web",
    period: "2021–",
    kind: "independent",
    organization: t(
      "Independent web development",
      "Selvstendig webutvikling",
      "Bağımsız web geliştirme",
    ),
    role: t(
      "Freelance Developer / Designer",
      "Frilans utvikler / designer",
      "Serbest Geliştirici / Tasarımcı",
    ),
    description: t(
      "Creating and improving websites for international clients through WordPress, Webflow and modern web technologies.",
      "Utviklet og forbedret nettsteder for internasjonale kunder med WordPress, Webflow og moderne webteknologi.",
      "WordPress, Webflow ve modern web teknolojileriyle uluslararası müşteriler için web siteleri oluşturdum ve geliştirdim.",
    ),
    projects: [
      "five-star-stitches-colchester",
      "snap360-photography",
      "ilc-language-centre",
      "5k-consultancy",
      "yavuz-alemdar",
    ],
  },
  {
    key: "blue-akademie",
    period: "2020–2022 · 2024",
    kind: "teaching",
    organization: t("Blue Akademie", "Blue Akademie", "Blue Akademie"),
    role: t(
      "Programming & Machine Learning Instructor",
      "Instruktør i programmering og maskinlæring",
      "Programlama ve Makine Öğrenmesi Eğitmeni",
    ),
    description: t(
      "Teaching full-stack programming fundamentals and introductory machine learning to different learner groups.",
      "Underviste i grunnleggende full-stack-programmering og innføring i maskinlæring for ulike grupper.",
      "Farklı öğrenci gruplarına full-stack programlama temelleri ve giriş seviyesinde makine öğrenmesi öğrettim.",
    ),
  },
  {
    key: "automation",
    period: "2019–2020",
    kind: "employment",
    organization: t(
      "Software automation project",
      "Programvareprosjekt for automatisering",
      "Yazılım otomasyon projesi",
    ),
    role: t(
      "Part-time Developer",
      "Deltidsutvikler",
      "Yarı zamanlı Geliştirici",
    ),
    detail: t("C#, MS SQL", "C#, MS SQL", "C#, MS SQL"),
    description: t(
      "Working on business-oriented desktop and database automation.",
      "Arbeidet med forretningsrettet automatisering av skrivebordsapplikasjoner og databaser.",
      "İş odaklı masaüstü ve veritabanı otomasyonu üzerinde çalıştım.",
    ),
  },
  {
    key: "vektorel",
    period: "2018",
    kind: "education",
    organization: t("Vektörel Bilişim", "Vektörel Bilişim", "Vektörel Bilişim"),
    role: t(
      ".NET Framework training",
      "Opplæring i .NET Framework",
      ".NET Framework eğitimi",
    ),
    detail: t("180 hours", "180 timer", "180 saat"),
  },
  {
    key: "metu",
    period: "2014–2017",
    kind: "education",
    organization: t(
      "Middle East Technical University",
      "Middle East Technical University (ODTÜ)",
      "Orta Doğu Teknik Üniversitesi",
    ),
    role: t(
      "Mathematics studies (not completed)",
      "Matematikkstudier (ikke fullført)",
      "Matematik öğrenimi (tamamlanmadı)",
    ),
  },
];

export type SkillGroup = { title: Text; skills: readonly string[] };

export const skillGroups: readonly SkillGroup[] = [
  {
    title: t("Software", "Programvare", "Yazılım"),
    skills: [
      "Python",
      "FastAPI",
      "C#",
      ".NET",
      "JavaScript",
      "TypeScript",
      "React",
      "Vue.js",
    ],
  },
  {
    title: t("Data", "Data", "Veri"),
    skills: [
      "SQL",
      "PostgreSQL",
      "MS SQL",
      "Neo4j",
      "Azure Data Factory",
      "Azure Synapse",
      "Microsoft Fabric",
    ],
  },
  {
    title: t("Platforms", "Plattformer", "Platformlar"),
    skills: ["Docker", "Git", "Cloudflare", "SharePoint", "REST APIs"],
  },
  {
    title: t("Web", "Web", "Web"),
    skills: ["Next.js", "HTML", "CSS", "WordPress", "Webflow"],
  },
];

export const education: readonly { title: Text; detail: Text }[] = [
  {
    title: t(
      "Middle East Technical University",
      "Middle East Technical University (ODTÜ)",
      "Orta Doğu Teknik Üniversitesi",
    ),
    detail: t(
      "Mathematics studies, not completed",
      "Matematikkstudier, ikke fullført",
      "Matematik öğrenimi, tamamlanmadı",
    ),
  },
  {
    title: t("Vektörel Bilişim", "Vektörel Bilişim", "Vektörel Bilişim"),
    detail: t(
      ".NET Framework training, 180 hours",
      "Opplæring i .NET Framework, 180 timer",
      ".NET Framework eğitimi, 180 saat",
    ),
  },
  {
    title: t(
      "Continuing professional learning",
      "Faglig videreutdanning",
      "Sürekli mesleki öğrenme",
    ),
    detail: t(
      "Courses in data engineering, machine learning and AI",
      "Kurs i datautvikling, maskinlæring og KI",
      "Veri mühendisliği, makine öğrenmesi ve yapay zekâ kursları",
    ),
  },
];

export type Credential = {
  name: string;
  issuer: string;
  note?: Text;
  /** Public verification page; omit until a real link is supplied. */
  verifyUrl?: string;
};

// TODO: add verifyUrl values once public verification links are supplied.
export const certifications: readonly Credential[] = [
  {
    name: "Microsoft Certified: Fabric Data Engineer Associate (DP-700)",
    issuer: "Microsoft",
    note: t(
      "Earned June 2025 · valid until June 2026",
      "Oppnådd juni 2025 · gyldig til juni 2026",
      "Haziran 2025'te alındı · Haziran 2026'ya kadar geçerli",
    ),
  },
  { name: "Neo4j Certified Professional", issuer: "Neo4j" },
];

export const additionalLearning: readonly Credential[] = [
  {
    name: "Microsoft Azure Data Engineering (10-course program)",
    issuer: "Microsoft / Coursera",
  },
  {
    name: "Mathematical Thinking in Computer Science",
    issuer: "UC San Diego / Coursera",
  },
  {
    name: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI / Stanford Online · Coursera",
  },
  { name: "Machine Learning with Python", issuer: "IBM" },
  { name: "Introduction to Artificial Intelligence (AI)", issuer: "IBM" },
  { name: "Generative AI: Introduction and Applications", issuer: "IBM" },
];

export type Reference = {
  key: string;
  organization: string;
  field: Text;
  description: Text;
  /** Approved public PDF only; private archive files are never linked. */
  documentUrl?: string;
};

// TODO: add documentUrl per entry only after the signatory approves publishing.
export const references: readonly Reference[] = [
  {
    key: "blue-akademie",
    organization: "Blue Akademie",
    field: t(
      "Programming & Machine Learning Education",
      "Undervisning i programmering og maskinlæring",
      "Programlama ve Makine Öğrenmesi Eğitimi",
    ),
    description: t(
      "Taught C#, web fundamentals, Python and introductory machine learning to adult and young learners.",
      "Underviste voksne og unge i C#, webgrunnlag, Python og innføring i maskinlæring.",
      "Yetişkin ve genç öğrencilere C#, web temelleri, Python ve giriş seviyesinde makine öğrenmesi öğrettim.",
    ),
  },
  {
    key: "bilisim-school",
    organization: "Bilişim School",
    field: t(
      "Python & JavaScript Education",
      "Undervisning i Python og JavaScript",
      "Python ve JavaScript Eğitimi",
    ),
    description: t(
      "Taught Python and JavaScript to learners aged 8–18 and produced course materials and video lessons.",
      "Underviste elever i alderen 8–18 år i Python og JavaScript og laget kursmateriell og videoleksjoner.",
      "8–18 yaş arası öğrencilere Python ve JavaScript öğrettim; kurs materyalleri ve video dersler hazırladım.",
    ),
  },
  {
    key: "seller-flash",
    organization: "Seller Flash",
    field: t(
      "Full-stack Development",
      "Full-stack-utvikling",
      "Full-stack Geliştirme",
    ),
    description: t(
      "Worked across C#/.NET and Vue.js in a Scrum team.",
      "Arbeidet med C#/.NET og Vue.js i et Scrum-team.",
      "Bir Scrum ekibinde C#/.NET ve Vue.js ile çalıştım.",
    ),
  },
  {
    key: "cuix",
    organization: "Cuix Agency",
    field: t("Webflow Development", "Webflow-utvikling", "Webflow Geliştirme"),
    description: t(
      "Built and maintained Webflow sites for the agency's clients, including Architech.",
      "Bygde og vedlikeholdt Webflow-nettsteder for byråets kunder, blant annet Architech.",
      "Ajansın müşterileri için, Architech dahil, Webflow siteleri geliştirdim ve sürdürdüm.",
    ),
  },
  {
    key: "werhere",
    organization: "We'RHERE IT Academy",
    field: t(
      "Technical Teaching / Coordination",
      "Teknisk undervisning / koordinering",
      "Teknik Eğitim / Koordinasyon",
    ),
    description: t(
      "Took part in the data engineering programme and supported technical teaching.",
      "Deltok i programmet for datautvikling og støttet teknisk undervisning.",
      "Veri mühendisliği programına katıldım ve teknik eğitime destek verdim.",
    ),
  },
  {
    key: "quiver",
    organization: "Quiver",
    field: t(
      "Volunteer Web Development",
      "Frivillig webutvikling",
      "Gönüllü Web Geliştirme",
    ),
    description: t(
      "Volunteer UI improvements and maintenance for the blog.",
      "Frivillige forbedringer av brukergrensesnitt og vedlikehold for bloggen.",
      "Blog için gönüllü arayüz iyileştirmeleri ve bakım.",
    ),
  },
  {
    key: "5k-consultancy",
    organization: "5K Consultancy",
    field: t(
      "WordPress Development",
      "WordPress-utvikling",
      "WordPress Geliştirme",
    ),
    description: t(
      "Built the consultancy's WordPress website.",
      "Bygde konsulentselskapets WordPress-nettsted.",
      "Danışmanlık firmasının WordPress sitesini geliştirdim.",
    ),
  },
  {
    key: "yavuz-alemdar",
    organization: "Yavuz Alemdar",
    field: t(
      "Web Development Collaboration",
      "Samarbeid om webutvikling",
      "Web Geliştirme İş Birliği",
    ),
    description: t(
      "Built WordPress sites for a US-based graphic designer.",
      "Bygde WordPress-nettsteder for en USA-basert grafisk designer.",
      "ABD merkezli bir grafik tasarımcı için WordPress siteleri geliştirdim.",
    ),
  },
  {
    key: "llm-quiz",
    organization: "LLM Quiz Project",
    field: t(
      "Python / AI Collaboration",
      "Python / KI-samarbeid",
      "Python / Yapay Zekâ İş Birliği",
    ),
    description: t(
      "Python and FastAPI development in a four-person team with a mentor.",
      "Python- og FastAPI-utvikling i et team på fire med en mentor.",
      "Bir mentorla çalışan dört kişilik bir ekipte Python ve FastAPI geliştirme.",
    ),
  },
  {
    key: "ilc",
    organization: "ILC",
    field: t("Web Development", "Webutvikling", "Web Geliştirme"),
    description: t(
      "Webflow development for ILC Language Centres and ILC Accommodation.",
      "Webflow-utvikling for ILC Language Centres og ILC Accommodation.",
      "ILC Language Centres ve ILC Accommodation için Webflow geliştirme.",
    ),
  },
];

/**
 * Standard ATS-friendly PDF CV. The download stays hidden until a real,
 * up-to-date file exists at this path under /public.
 */
// TODO: add "/documents/enes-yilmaz-cv.pdf" once the approved PDF is ready.
export const cvDocument: { href?: string; fileName: string } = {
  fileName: "enes-yilmaz-cv.pdf",
};

export type CvPageCopy = {
  eyebrow: string;
  downloadAction: string;
  referencesAction: string;
  contactAction: string;
  timelineTitle: string;
  kinds: Record<TimelineKind, string>;
  relatedWork: string;
  skillsTitle: string;
  skillsNote: string;
  educationTitle: string;
  certificationsTitle: string;
  additionalLearning: string;
  verify: string;
  referencesTitle: string;
  referencesDescription: string;
  requestReferences: string;
  viewDocument: string;
  contactTitle: string;
  contactDescription: string;
  lastUpdated: string;
};

export const cvPageCopy: Record<Locale, CvPageCopy> = {
  en: {
    eyebrow: "Professional Journey",
    downloadAction: "Download CV",
    referencesAction: "View References",
    contactAction: "Contact Me",
    timelineTitle: "Experience",
    kinds: {
      employment: "Employment",
      practice: "Work practice",
      independent: "Independent work",
      teaching: "Teaching",
      project: "Project",
      education: "Education",
    },
    relatedWork: "Related work",
    skillsTitle: "Technical capabilities",
    skillsNote: "Technologies I have used in real projects and roles.",
    educationTitle: "Education",
    certificationsTitle: "Certifications",
    additionalLearning: "Additional learning",
    verify: "Verify",
    referencesTitle: "Words from people I've worked with",
    referencesDescription:
      "Independent perspectives on my work, collaboration and teaching.",
    requestReferences: "Request references",
    viewDocument: "View letter (PDF)",
    contactTitle: "Let's talk",
    contactDescription:
      "I'm open to software engineering roles and meaningful collaborations.",
    lastUpdated: "Last updated",
  },
  no: {
    eyebrow: "Profesjonell reise",
    downloadAction: "Last ned CV",
    referencesAction: "Se referanser",
    contactAction: "Kontakt meg",
    timelineTitle: "Erfaring",
    kinds: {
      employment: "Ansettelse",
      practice: "Arbeidspraksis",
      independent: "Selvstendig arbeid",
      teaching: "Undervisning",
      project: "Prosjekt",
      education: "Utdanning",
    },
    relatedWork: "Relatert arbeid",
    skillsTitle: "Tekniske ferdigheter",
    skillsNote: "Teknologier jeg har brukt i reelle prosjekter og roller.",
    educationTitle: "Utdanning",
    certificationsTitle: "Sertifiseringer",
    additionalLearning: "Annen læring",
    verify: "Bekreft",
    referencesTitle: "Fra folk jeg har jobbet med",
    referencesDescription:
      "Uavhengige perspektiver på arbeidet mitt, samarbeid og undervisning.",
    requestReferences: "Be om referanser",
    viewDocument: "Se brev (PDF)",
    contactTitle: "La oss snakke",
    contactDescription:
      "Jeg er åpen for stillinger innen programvareutvikling og meningsfulle samarbeid.",
    lastUpdated: "Sist oppdatert",
  },
  tr: {
    eyebrow: "Profesyonel Yolculuk",
    downloadAction: "Özgeçmişi indir",
    referencesAction: "Referansları gör",
    contactAction: "Bana ulaş",
    timelineTitle: "Deneyim",
    kinds: {
      employment: "İstihdam",
      practice: "İş pratiği",
      independent: "Bağımsız çalışma",
      teaching: "Eğitmenlik",
      project: "Proje",
      education: "Eğitim",
    },
    relatedWork: "İlgili işler",
    skillsTitle: "Teknik yetkinlikler",
    skillsNote: "Gerçek projelerde ve rollerde kullandığım teknolojiler.",
    educationTitle: "Eğitim",
    certificationsTitle: "Sertifikalar",
    additionalLearning: "Ek öğrenme",
    verify: "Doğrula",
    referencesTitle: "Birlikte çalıştığım insanlardan",
    referencesDescription:
      "Çalışmalarım, iş birliğim ve eğitmenliğim üzerine bağımsız bakış açıları.",
    requestReferences: "Referans iste",
    viewDocument: "Mektubu gör (PDF)",
    contactTitle: "Konuşalım",
    contactDescription:
      "Yazılım mühendisliği rollerine ve anlamlı iş birliklerine açığım.",
    lastUpdated: "Son güncelleme",
  },
};
