import type { Locale } from "@/i18n/config";
import type { LocalizedProjectContent, Project } from "@/types/project";

type SiteEntry = {
  slug: string;
  name: string;
  technology: "WordPress" | "Webflow";
  externalUrl: string;
  summary: Record<Locale, string>;
};

const roles: Record<SiteEntry["technology"], Record<Locale, string>> = {
  WordPress: {
    en: "Freelance WordPress Developer",
    no: "Frilans WordPress-utvikler",
    tr: "Serbest WordPress Geliştirici",
  },
  Webflow: {
    en: "Webflow Developer",
    no: "Webflow-utvikler",
    tr: "Webflow Geliştirici",
  },
};

const imageAlt: Record<Locale, (name: string) => string> = {
  en: (name) => `Homepage of the ${name} website`,
  no: (name) => `Forsiden til nettstedet ${name}`,
  tr: (name) => `${name} web sitesinin ana sayfası`,
};

/** Independent client websites, documented in the earlier portfolio. */
const siteEntries: readonly SiteEntry[] = [
  {
    slug: "ilc-accommodation",
    name: "ILC Accommodation",
    technology: "Webflow",
    externalUrl: "https://www.ilcaccommodation.com/",
    summary: {
      en: "A Webflow site for ILC's accommodation services, consistent with the main ILC brand.",
      no: "Et Webflow-nettsted for ILCs overnattingstjenester, i tråd med ILC-merkevaren.",
      tr: "ILC'nin konaklama hizmetleri için ana ILC markasıyla uyumlu bir Webflow sitesi.",
    },
  },
  {
    slug: "yavuz-alemdar",
    name: "Yavuz Alemdar",
    technology: "WordPress",
    externalUrl: "https://www.yavuzalemdar.com/",
    summary: {
      en: "One of three WordPress sites for a US-based graphic designer, balancing aesthetics and usability.",
      no: "Ett av tre WordPress-nettsteder for en USA-basert grafisk designer, med balanse mellom estetikk og brukervennlighet.",
      tr: "ABD merkezli bir grafik tasarımcı için geliştirdiğim üç WordPress sitesinden biri; estetik ile kullanılabilirliği dengeliyor.",
    },
  },
  {
    slug: "alemdar-creative-studio",
    name: "Alemdar Creative Studio",
    technology: "WordPress",
    externalUrl: "https://www.alemdarcreativestudio.com/",
    summary: {
      en: "A WordPress portfolio site for the same designer's creative studio.",
      no: "Et WordPress-porteføljenettsted for den samme designerens kreative studio.",
      tr: "Aynı tasarımcının kreatif stüdyosu için bir WordPress portfolyo sitesi.",
    },
  },
  {
    slug: "5k-consultancy",
    name: "5K Consultancy",
    technology: "WordPress",
    externalUrl: "https://5kconsultancy.co.uk/",
    summary: {
      en: "A WordPress site for a UK-based consulting firm, focused on professionalism and clarity.",
      no: "Et WordPress-nettsted for et britisk konsulentselskap, med vekt på profesjonalitet og klarhet.",
      tr: "Birleşik Krallık merkezli bir danışmanlık firması için profesyonellik ve netlik odaklı bir WordPress sitesi.",
    },
  },
  {
    slug: "omnitech-academy",
    name: "OmniTech Academy",
    technology: "WordPress",
    externalUrl: "https://omnitechacademy.com/",
    summary: {
      en: "A WordPress site for an online training platform with a varied course catalogue.",
      no: "Et WordPress-nettsted for en nettbasert opplæringsplattform med et variert kurstilbud.",
      tr: "Çeşitli kurslar sunan bir çevrim içi eğitim platformu için WordPress sitesi.",
    },
  },
  {
    slug: "klasik-tesbih",
    name: "Klasik Tesbih",
    technology: "WordPress",
    // The legacy portfolio only listed an http:// address for this site.
    externalUrl: "http://klasiktesbih.com/",
    summary: {
      en: "A shop-style WordPress site for a Turkish brand presenting classic prayer bead designs.",
      no: "Et nettbutikkpreget WordPress-nettsted for et tyrkisk merke med klassiske bønnekjeder.",
      tr: "Klasik tesbih tasarımlarını sergileyen Türk bir marka için e-ticaret tarzında WordPress sitesi.",
    },
  },
];

function toProject(entry: SiteEntry): Project {
  const content = Object.fromEntries(
    (["en", "no", "tr"] as const).map((locale) => [
      locale,
      {
        title: entry.name,
        summary: entry.summary[locale],
        role: roles[entry.technology][locale],
        organization: entry.name,
        imageAlt: imageAlt[locale](entry.name),
      } satisfies LocalizedProjectContent,
    ]),
  ) as Record<Locale, LocalizedProjectContent>;

  return {
    slug: entry.slug,
    category: "web",
    technologies: [entry.technology, "Responsive design"],
    disciplines: ["Web development"],
    featured: false,
    externalUrl: entry.externalUrl,
    coverImage: `/images/projects/${entry.slug}.webp`,
    availableLocales: ["en", "no", "tr"],
    content,
  };
}

export const additionalProjects: readonly Project[] =
  siteEntries.map(toProject);
