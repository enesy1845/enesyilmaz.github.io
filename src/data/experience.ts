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

export const evidenceItems = [
  {
    key: "systems",
    content: {
      en: {
        title: "Software systems",
        description:
          "Public-sector work with React, TypeScript, .NET, SharePoint-connected workflows, and privacy-sensitive case handling.",
      },
      no: {
        title: "Programvaresystemer",
        description:
          "Offentlig systemarbeid med React, TypeScript, .NET, SharePoint-tilknyttede flyter og personvernsensitiv saksbehandling.",
      },
      tr: {
        title: "Yazılım sistemleri",
        description:
          "React, TypeScript, .NET, SharePoint bağlantılı akışlar ve gizlilik hassasiyetli vaka yönetimiyle kamu sistemi çalışmaları.",
      },
    },
  },
  {
    key: "data",
    content: {
      en: {
        title: "Data and automation",
        description:
          "Python, structured data, document generation, background processing, and data-oriented problem solving.",
      },
      no: {
        title: "Data og automatisering",
        description:
          "Python, strukturerte data, dokumentgenerering, bakgrunnsprosessering og dataorientert problemløsning.",
      },
      tr: {
        title: "Veri ve otomasyon",
        description:
          "Python, yapılandırılmış veri, belge üretimi, arka plan işleme ve veri odaklı problem çözme.",
      },
    },
  },
  {
    key: "web",
    content: {
      en: {
        title: "Web development",
        description:
          "Responsive public websites, content structure, maintenance, and clear navigation for real users.",
      },
      no: {
        title: "Webutvikling",
        description:
          "Responsive offentlige nettsteder, innholdsstruktur, vedlikehold og tydelig navigasjon for reelle brukere.",
      },
      tr: {
        title: "Web geliştirme",
        description:
          "Responsive kamuya açık web siteleri, içerik yapısı, bakım ve gerçek kullanıcılar için net navigasyon.",
      },
    },
  },
  {
    key: "teaching",
    content: {
      en: {
        title: "Teaching and communication",
        description:
          "Programming education across C#, HTML/CSS, JavaScript, Python, and introductory machine learning contexts.",
      },
      no: {
        title: "Undervisning og kommunikasjon",
        description:
          "Programmeringsundervisning innen C#, HTML/CSS, JavaScript, Python og introduksjon til maskinlæring.",
      },
      tr: {
        title: "Eğitim ve iletişim",
        description:
          "C#, HTML/CSS, JavaScript, Python ve giriş seviyesinde makine öğrenmesi bağlamlarında programlama eğitimi.",
      },
    },
  },
] as const satisfies readonly EvidenceItem[];
