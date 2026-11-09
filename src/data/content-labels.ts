import type { Locale } from "@/i18n/config";
import type { ProjectCategory } from "@/types/project";

export type ContentLabels = {
  category: Record<ProjectCategory, string>;
  featured: string;
  confidential: string;
  technologies: string;
  disciplines: string;
  role: string;
  status: string;
  context: string;
  responsibilities: string;
  challenges: string;
  decisions: string;
  outcomes: string;
  lessons: string;
  readCaseStudy: string;
  visitProject: string;
  allProjects: string;
  additionalProjects: string;
  contactLinks: string;
  noFormNotice: string;
  sourceNotice: string;
  filterProjects: string;
  copyEmail: string;
  emailCopied: string;
  emailCopyFailed: string;
  backHome: string;
  onThisPage: string;
  previousProject: string;
  nextProject: string;
  projectNavigation: string;
  readingMinutes: string;
};

export const contentLabels: Record<Locale, ContentLabels> = {
  en: {
    backHome: "Home",
    onThisPage: "On this page",
    previousProject: "Previous project",
    nextProject: "Next project",
    projectNavigation: "Explore more work",
    readingMinutes: "{minutes} min read",
    filterProjects: "Filter projects by category",
    copyEmail: "Copy email",
    emailCopied: "Email copied",
    emailCopyFailed: "Could not copy. Use the email link instead.",
    category: {
      software: "Software",
      data: "Data",
      web: "Web",
      education: "Education",
      ai: "Python / AI",
    },
    featured: "Featured",
    confidential: "Anonymized",
    technologies: "Technology",
    disciplines: "Disciplines",
    role: "Role",
    status: "Status",
    context: "Context",
    responsibilities: "Responsibilities",
    challenges: "Challenges",
    decisions: "Decisions",
    outcomes: "Outcome",
    lessons: "Lessons",
    readCaseStudy: "Read case study",
    visitProject: "Visit project",
    allProjects: "All projects",
    additionalProjects: "More work",
    contactLinks: "Ways to reach me",
    noFormNotice:
      "Email is the most direct way to reach me; my professional profiles are linked as well.",
    sourceNotice:
      "Public-sector work is shown in anonymized form to protect internal details.",
  },
  no: {
    backHome: "Hjem",
    onThisPage: "På denne siden",
    previousProject: "Forrige prosjekt",
    nextProject: "Neste prosjekt",
    projectNavigation: "Utforsk mer arbeid",
    readingMinutes: "{minutes} min lesetid",
    filterProjects: "Filtrer prosjekter etter kategori",
    copyEmail: "Kopier e-post",
    emailCopied: "E-post kopiert",
    emailCopyFailed: "Kunne ikke kopiere. Bruk e-postlenken i stedet.",
    category: {
      software: "Programvare",
      data: "Data",
      web: "Web",
      education: "Utdanning",
      ai: "Python / KI",
    },
    featured: "Utvalgt",
    confidential: "Anonymisert",
    technologies: "Teknologi",
    disciplines: "Fagområder",
    role: "Rolle",
    status: "Status",
    context: "Kontekst",
    responsibilities: "Ansvar",
    challenges: "Utfordringer",
    decisions: "Beslutninger",
    outcomes: "Resultat",
    lessons: "Læring",
    readCaseStudy: "Les case",
    visitProject: "Besøk prosjekt",
    allProjects: "Alle prosjekter",
    additionalProjects: "Mer arbeid",
    contactLinks: "Slik når du meg",
    noFormNotice:
      "E-post er den mest direkte måten å nå meg på, og profesjonelle profiler er også lenket.",
    sourceNotice:
      "Arbeid i offentlig sektor vises anonymisert for å beskytte interne detaljer.",
  },
  tr: {
    backHome: "Ana sayfa",
    onThisPage: "Bu sayfada",
    previousProject: "Önceki proje",
    nextProject: "Sonraki proje",
    projectNavigation: "Diğer çalışmaları keşfet",
    readingMinutes: "{minutes} dk okuma",
    filterProjects: "Projeleri kategoriye göre filtrele",
    copyEmail: "E-postayı kopyala",
    emailCopied: "E-posta kopyalandı",
    emailCopyFailed: "Kopyalanamadı. E-posta bağlantısını kullanabilirsin.",
    category: {
      software: "Yazılım",
      data: "Veri",
      web: "Web",
      education: "Eğitim",
      ai: "Python / YZ",
    },
    featured: "Seçili",
    confidential: "Anonimleştirilmiş",
    technologies: "Teknoloji",
    disciplines: "Disiplinler",
    role: "Rol",
    status: "Durum",
    context: "Bağlam",
    responsibilities: "Sorumluluklar",
    challenges: "Zorluklar",
    decisions: "Kararlar",
    outcomes: "Sonuç",
    lessons: "Öğrenimler",
    readCaseStudy: "Vaka çalışmasını oku",
    visitProject: "Projeyi ziyaret et",
    allProjects: "Tüm projeler",
    additionalProjects: "Diğer çalışmalar",
    contactLinks: "Bana ulaşma yolları",
    noFormNotice:
      "Bana ulaşmanın en doğrudan yolu e-posta; profesyonel profillerim de bağlantılı.",
    sourceNotice:
      "Kamu sektörü çalışmaları, iç ayrıntıları korumak için anonimleştirilmiş olarak gösterilir.",
  },
};
