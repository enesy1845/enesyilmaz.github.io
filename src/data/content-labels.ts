import type { Locale } from "@/i18n/config";
import type { ProjectCategory } from "@/types/project";

export type ContentLabels = {
  category: Record<ProjectCategory, string>;
  featured: string;
  confidential: string;
  technologies: string;
  disciplines: string;
  role: string;
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
};

export const contentLabels: Record<Locale, ContentLabels> = {
  en: {
    category: {
      software: "Software",
      data: "Data",
      web: "Web",
      education: "Education",
    },
    featured: "Featured",
    confidential: "Anonymized",
    technologies: "Technology",
    disciplines: "Disciplines",
    role: "Role",
    context: "Context",
    responsibilities: "Responsibilities",
    challenges: "Challenges",
    decisions: "Decisions",
    outcomes: "Outcome",
    lessons: "Lessons",
    readCaseStudy: "Read case study",
    visitProject: "Visit project",
    allProjects: "All verified projects",
    additionalProjects: "Additional public work",
    contactLinks: "Verified contact links",
    noFormNotice:
      "No contact form is active in this phase, so the site does not collect submitted personal data.",
    sourceNotice:
      "Public-sector work is intentionally anonymized. Public web projects link only to verified public URLs.",
  },
  no: {
    category: {
      software: "Programvare",
      data: "Data",
      web: "Web",
      education: "Utdanning",
    },
    featured: "Utvalgt",
    confidential: "Anonymisert",
    technologies: "Teknologi",
    disciplines: "Fagområder",
    role: "Rolle",
    context: "Kontekst",
    responsibilities: "Ansvar",
    challenges: "Utfordringer",
    decisions: "Beslutninger",
    outcomes: "Resultat",
    lessons: "Læring",
    readCaseStudy: "Les case",
    visitProject: "Besøk prosjekt",
    allProjects: "Alle verifiserte prosjekter",
    additionalProjects: "Annet offentlig arbeid",
    contactLinks: "Verifiserte kontaktlenker",
    noFormNotice:
      "Det finnes ikke kontaktskjema i denne fasen, så nettstedet samler ikke inn innsendte persondata.",
    sourceNotice:
      "Offentlig sektor-arbeid er bevisst anonymisert. Offentlige webprosjekter lenker kun til verifiserte offentlige URL-er.",
  },
  tr: {
    category: {
      software: "Yazılım",
      data: "Veri",
      web: "Web",
      education: "Eğitim",
    },
    featured: "Seçili",
    confidential: "Anonimleştirilmiş",
    technologies: "Teknoloji",
    disciplines: "Disiplinler",
    role: "Rol",
    context: "Bağlam",
    responsibilities: "Sorumluluklar",
    challenges: "Zorluklar",
    decisions: "Kararlar",
    outcomes: "Sonuç",
    lessons: "Öğrenimler",
    readCaseStudy: "Vaka çalışmasını oku",
    visitProject: "Projeyi ziyaret et",
    allProjects: "Tüm doğrulanmış projeler",
    additionalProjects: "Diğer kamuya açık işler",
    contactLinks: "Doğrulanmış iletişim bağlantıları",
    noFormNotice:
      "Bu fazda iletişim formu aktif değildir; site gönderilen kişisel veri toplamaz.",
    sourceNotice:
      "Kamu sektörü çalışmaları bilinçli olarak anonimleştirilmiştir. Kamuya açık web projeleri yalnızca doğrulanmış URL'lere bağlanır.",
  },
};
