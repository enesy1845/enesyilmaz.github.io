import type { Locale } from "@/i18n/config";

export type EvidenceItem = {
  key: string;
  content: Record<
    Locale,
    {
      title: string;
      description: string;
    }
  >;
};

/** "What I work with" groups on the home page. */
export const evidenceItems = [
  {
    key: "engineering",
    content: {
      en: {
        title: "Software Engineering",
        description:
          "Python, FastAPI, React, TypeScript, C#/.NET and API development.",
      },
      no: {
        title: "Programvareutvikling",
        description:
          "Python, FastAPI, React, TypeScript, C#/.NET og API-utvikling.",
      },
      tr: {
        title: "Yazılım Mühendisliği",
        description:
          "Python, FastAPI, React, TypeScript, C#/.NET ve API geliştirme.",
      },
    },
  },
  {
    key: "data",
    content: {
      en: {
        title: "Data & Automation",
        description:
          "Data pipelines, PostgreSQL, Neo4j, Microsoft Fabric, Azure and workflow automation.",
      },
      no: {
        title: "Data og automatisering",
        description:
          "Datapipelines, PostgreSQL, Neo4j, Microsoft Fabric, Azure og automatisering av arbeidsflyter.",
      },
      tr: {
        title: "Veri ve Otomasyon",
        description:
          "Veri hatları, PostgreSQL, Neo4j, Microsoft Fabric, Azure ve iş akışı otomasyonu.",
      },
    },
  },
  {
    key: "web",
    content: {
      en: {
        title: "Web Experiences",
        description:
          "Next.js, Cloudflare, WordPress and Webflow — combining engineering with thoughtful interfaces.",
      },
      no: {
        title: "Nettopplevelser",
        description:
          "Next.js, Cloudflare, WordPress og Webflow — der teknisk utvikling møter gjennomtenkte grensesnitt.",
      },
      tr: {
        title: "Web Deneyimleri",
        description:
          "Next.js, Cloudflare, WordPress ve Webflow — mühendisliği özenli arayüzlerle birleştirerek.",
      },
    },
  },
  {
    key: "teaching",
    content: {
      en: {
        title: "Teaching & Communication",
        description:
          "Programming education, technical mentoring and making complex ideas understandable.",
      },
      no: {
        title: "Undervisning og kommunikasjon",
        description:
          "Programmeringsundervisning, teknisk veiledning og å gjøre komplekse ideer forståelige.",
      },
      tr: {
        title: "Eğitim ve İletişim",
        description:
          "Programlama eğitimi, teknik mentorluk ve karmaşık fikirleri anlaşılır kılmak.",
      },
    },
  },
] as const satisfies readonly EvidenceItem[];
