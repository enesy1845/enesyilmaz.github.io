import type { Project } from "@/types/project";

export const clientProjects = [
  {
    slug: "snap360-photography",
    category: "web",
    technologies: ["Next.js", "React", "TypeScript", "Cloudflare"],
    disciplines: ["Full-stack web development", "Information architecture"],
    featured: true,
    externalUrl: "https://snap360photography.com",
    coverImage: "/images/projects/snap360-photography.webp",
    availableLocales: ["en", "no", "tr"],
    content: {
      en: {
        title: "Snap360 Photography",
        summary:
          "Developing a modern digital experience for a photography business, connecting visual storytelling with structured services and a scalable web architecture.",
        description:
          "I first built the company's WordPress website and am now redeveloping it on Next.js and Cloudflare.",
        role: "Web Developer",
        organization: "Snap360 Photography",
        status: "Ongoing redevelopment",
        responsibilities: [
          "Website modernization",
          "Service presentation",
          "Photography and media organization",
          "Product and quotation experience planning",
          "Cloudflare-based architecture",
        ],
        imageAlt: "Homepage of the Snap360 Photography website",
      },
      no: {
        title: "Snap360 Photography",
        summary:
          "Jeg utvikler en moderne digital opplevelse for en fotobedrift, der visuell historiefortelling møter strukturerte tjenester og en skalerbar webarkitektur.",
        description:
          "Jeg bygde først bedriftens WordPress-nettsted og utvikler det nå på nytt med Next.js og Cloudflare.",
        role: "Webutvikler",
        organization: "Snap360 Photography",
        status: "Nyutvikling pågår",
        responsibilities: [
          "Modernisering av nettstedet",
          "Presentasjon av tjenester",
          "Organisering av foto og medier",
          "Planlegging av produkt- og tilbudsopplevelse",
          "Cloudflare-basert arkitektur",
        ],
        imageAlt: "Forsiden til nettstedet Snap360 Photography",
      },
      tr: {
        title: "Snap360 Photography",
        summary:
          "Bir fotoğrafçılık işletmesi için görsel anlatımı yapılandırılmış hizmetler ve ölçeklenebilir bir web mimarisiyle buluşturan modern bir dijital deneyim geliştiriyorum.",
        description:
          "Şirketin WordPress sitesini ilk olarak ben kurdum; şimdi Next.js ve Cloudflare ile yeniden geliştiriyorum.",
        role: "Web Geliştirici",
        organization: "Snap360 Photography",
        status: "Yeniden geliştirme sürüyor",
        responsibilities: [
          "Web sitesinin modernizasyonu",
          "Hizmetlerin sunumu",
          "Fotoğraf ve medya düzeni",
          "Ürün ve teklif deneyiminin planlanması",
          "Cloudflare tabanlı mimari",
        ],
        imageAlt: "Snap360 Photography web sitesinin ana sayfası",
      },
    },
  },
  {
    slug: "ilh-digital-platform",
    category: "web",
    technologies: ["Next.js", "Cloudflare", "Sanity", "R2"],
    disciplines: ["Web engineering", "Content architecture"],
    featured: true,
    // TODO: add externalUrl once a public production domain is confirmed.
    availableLocales: ["en", "no", "tr"],
    content: {
      en: {
        title: "ILH Digital Platform",
        summary:
          "Modernizing a digital platform with an emphasis on content structure, performance, media management and maintainability.",
        role: "Web Developer",
        organization: "ILH",
        status: "In progress",
        responsibilities: [
          "Website redevelopment",
          "Asset migration and organization",
          "Content architecture",
          "Sanity integration work",
          "Cloudflare R2 media infrastructure planning",
        ],
      },
      no: {
        title: "ILH digital plattform",
        summary:
          "Jeg moderniserer en digital plattform med vekt på innholdsstruktur, ytelse, mediehåndtering og vedlikeholdbarhet.",
        role: "Webutvikler",
        organization: "ILH",
        status: "Pågår",
        responsibilities: [
          "Nyutvikling av nettstedet",
          "Migrering og organisering av filer",
          "Innholdsarkitektur",
          "Integrasjonsarbeid med Sanity",
          "Planlegging av medieinfrastruktur i Cloudflare R2",
        ],
      },
      tr: {
        title: "ILH Dijital Platformu",
        summary:
          "İçerik yapısı, performans, medya yönetimi ve sürdürülebilirlik odağında bir dijital platformu modernleştiriyorum.",
        role: "Web Geliştirici",
        organization: "ILH",
        status: "Devam ediyor",
        responsibilities: [
          "Web sitesinin yeniden geliştirilmesi",
          "Dosyaların taşınması ve düzenlenmesi",
          "İçerik mimarisi",
          "Sanity entegrasyon çalışmaları",
          "Cloudflare R2 medya altyapısının planlanması",
        ],
      },
    },
  },
  {
    slug: "five-star-stitches-colchester",
    category: "web",
    technologies: ["Next.js", "TypeScript", "Cloudflare"],
    disciplines: ["Web engineering", "Local SEO", "Accessibility"],
    featured: true,
    externalUrl: "https://5starstitchescolchester.co.uk",
    // TODO: add a cover screenshot of the live site.
    availableLocales: ["en", "no", "tr"],
    content: {
      en: {
        title: "5 Star Stitches Colchester",
        summary:
          "Building a fast, mobile-first digital presence for a local tailoring business, with clear customer journeys and search visibility in mind.",
        role: "Web Developer",
        organization: "5 Star Stitches",
        location: "Colchester, United Kingdom",
        responsibilities: [
          "Responsive web development",
          "Service-focused information architecture",
          "Local SEO",
          "Contact and conversion paths",
          "Performance and accessibility",
          "Cloudflare deployment configuration",
        ],
      },
      no: {
        title: "5 Star Stitches Colchester",
        summary:
          "Jeg bygger en rask, mobilvennlig digital tilstedeværelse for en lokal skredderbedrift, med tydelige kundereiser og synlighet i søk.",
        role: "Webutvikler",
        organization: "5 Star Stitches",
        location: "Colchester, Storbritannia",
        responsibilities: [
          "Responsiv webutvikling",
          "Tjenestefokusert informasjonsarkitektur",
          "Lokal søkemotoroptimalisering",
          "Kontakt- og konverteringsveier",
          "Ytelse og universell utforming",
          "Oppsett av publisering på Cloudflare",
        ],
      },
      tr: {
        title: "5 Star Stitches Colchester",
        summary:
          "Yerel bir terzi işletmesi için net müşteri yolculukları ve arama görünürlüğü düşünülerek hızlı, mobil öncelikli bir dijital varlık geliştiriyorum.",
        role: "Web Geliştirici",
        organization: "5 Star Stitches",
        location: "Colchester, Birleşik Krallık",
        responsibilities: [
          "Responsive web geliştirme",
          "Hizmet odaklı bilgi mimarisi",
          "Yerel SEO",
          "İletişim ve dönüşüm yolları",
          "Performans ve erişilebilirlik",
          "Cloudflare yayın yapılandırması",
        ],
      },
    },
  },
  {
    slug: "llm-quiz-application",
    category: "ai",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Neo4j",
      "Docker",
      "LLMs",
    ],
    disciplines: ["Full-stack development", "Knowledge graphs"],
    featured: false,
    availableLocales: ["en", "no", "tr"],
    content: {
      en: {
        title: "LLM-Based Quiz Application",
        summary:
          "Working on a full-stack learning application combining structured data, knowledge relationships and large language models.",
        description:
          "A four-person team project with a mentor, exploring how relational data, a graph database and language models can support interactive quizzes.",
        role: "Full-stack Python Developer (team member)",
        period: "2023",
      },
      no: {
        title: "LLM-basert quizapplikasjon",
        summary:
          "Jeg arbeider på en full-stack læringsapplikasjon som kombinerer strukturerte data, kunnskapsrelasjoner og store språkmodeller.",
        description:
          "Et teamprosjekt med fire deltakere og en mentor, som utforsker hvordan relasjonsdata, en grafdatabase og språkmodeller kan støtte interaktive quizer.",
        role: "Full-stack Python-utvikler (teammedlem)",
        period: "2023",
      },
      tr: {
        title: "LLM Tabanlı Quiz Uygulaması",
        summary:
          "Yapılandırılmış veriyi, bilgi ilişkilerini ve büyük dil modellerini birleştiren full-stack bir öğrenme uygulaması üzerinde çalışıyorum.",
        description:
          "Bir mentorla yürütülen dört kişilik bir ekip projesi; ilişkisel veri, graf veritabanı ve dil modellerinin etkileşimli quizleri nasıl destekleyebileceğini araştırıyor.",
        role: "Full-stack Python Geliştirici (ekip üyesi)",
        period: "2023",
      },
    },
  },
  {
    slug: "seller-flash",
    category: "software",
    technologies: ["C#", ".NET", "Vue.js", "Docker", "PostgreSQL"],
    disciplines: ["Full-stack development", "Scrum"],
    featured: false,
    availableLocales: ["en", "no", "tr"],
    content: {
      en: {
        title: "Seller Flash",
        summary:
          "Contributing to frontend and backend development for an e-commerce automation application.",
        description:
          "Work across C#/.NET and Vue.js on dropshipping automation, in a team using Scrum and Jira.",
        role: "Junior Full-stack Developer",
        organization: "Seller Flash",
        period: "2022",
      },
      no: {
        title: "Seller Flash",
        summary:
          "Bidrag til frontend- og backendutvikling for en applikasjon for automatisering av netthandel.",
        description:
          "Arbeid med C#/.NET og Vue.js på automatisering av dropshipping, i et team som brukte Scrum og Jira.",
        role: "Junior full-stack-utvikler",
        organization: "Seller Flash",
        period: "2022",
      },
      tr: {
        title: "Seller Flash",
        summary:
          "Bir e-ticaret otomasyon uygulamasının frontend ve backend geliştirmesine katkı.",
        description:
          "Scrum ve Jira kullanan bir ekipte, dropshipping otomasyonu için C#/.NET ve Vue.js ile çalıştım.",
        role: "Junior Full-stack Geliştirici",
        organization: "Seller Flash",
        period: "2022",
      },
    },
  },
  {
    slug: "architech-cuix-agency",
    category: "web",
    technologies: ["Webflow", "HTML", "CSS", "JavaScript"],
    disciplines: ["Webflow development", "Design implementation"],
    featured: false,
    externalUrl: "https://www.architech.ca/",
    coverImage: "/images/projects/architech.webp",
    availableLocales: ["en", "no", "tr"],
    content: {
      en: {
        title: "Architech / Cuix Agency",
        summary:
          "Translating detailed visual designs into responsive web experiences through close collaboration with an international agency.",
        description:
          "Freelance Webflow work for Cuix Agency in Canada, including maintaining and modernizing the Architech corporate site.",
        role: "Freelance Webflow Developer",
        organization: "Cuix Agency",
        period: "2022–2023",
        imageAlt: "Homepage of the Architech website",
      },
      no: {
        title: "Architech / Cuix Agency",
        summary:
          "Jeg omsatte detaljerte visuelle design til responsive nettopplevelser i tett samarbeid med et internasjonalt byrå.",
        description:
          "Frilans Webflow-arbeid for Cuix Agency i Canada, blant annet vedlikehold og modernisering av Architechs bedriftsnettsted.",
        role: "Frilans Webflow-utvikler",
        organization: "Cuix Agency",
        period: "2022–2023",
        imageAlt: "Forsiden til nettstedet Architech",
      },
      tr: {
        title: "Architech / Cuix Agency",
        summary:
          "Uluslararası bir ajansla yakın iş birliği içinde ayrıntılı görsel tasarımları responsive web deneyimlerine dönüştürdüm.",
        description:
          "Kanada'daki Cuix Agency için serbest Webflow çalışmaları; Architech kurumsal sitesinin bakımı ve modernleştirilmesi dahil.",
        role: "Serbest Webflow Geliştirici",
        organization: "Cuix Agency",
        period: "2022–2023",
        imageAlt: "Architech web sitesinin ana sayfası",
      },
    },
  },
] as const satisfies readonly Project[];
