import type { Locale } from "@/i18n/config";

export type PageSection = {
  title: string;
  lead?: string;
  body: string;
};

export type AboutPageContent = {
  introMeta: string;
  sections: readonly PageSection[];
  closingTitle: string;
  closingBody: string;
  cvAction: string;
};

export type ContactPageContent = {
  introMeta: string;
  description: string;
  cvAction: string;
};

export const aboutPageContent: Record<Locale, AboutPageContent> = {
  en: {
    introMeta: "Asker, Norway",
    sections: [
      {
        title: "My path",
        lead: "My background is not limited to a single discipline.",
        body: "Mathematics shaped the way I approach problems; teaching helped me communicate complex ideas; and software development gave me a practical way to turn those ideas into working systems.",
      },
      {
        title: "What I do",
        body: "I build web applications, APIs and data-oriented workflows using technologies such as Python, React, .NET and modern cloud platforms. My experience spans public-sector software, educational projects and independent client work.",
      },
      {
        title: "How I think",
        body: "I value analytical thinking, intellectual curiosity and the ability to question assumptions. Before choosing a technology, I try to understand the underlying problem, its context and its consequences.",
      },
      {
        title: "Beyond engineering",
        body: "Literature, education, craftsmanship and mathematical thinking influence how I see the world. I believe technical ability becomes more meaningful when combined with empathy, responsibility and a willingness to keep learning.",
      },
      {
        title: "The idea behind NOI",
        lead: "NOI started as a name for the way I like to work.",
        body: "I have never fitted neatly into one discipline. Mathematics, teaching, software and an interest in craft kept pointing to the same habit: notice what is really going on, give it structure, then build something that helps. NOI is the name I gave that habit. It is not a company, but an independent creative practice that keeps my projects, writing and experiments together.",
      },
    ],
    closingTitle: "Looking forward",
    closingBody:
      "I'm interested in software engineering roles and collaborations where I can contribute, learn deeply and take ownership of meaningful problems.",
    cvAction: "Explore my professional journey",
  },
  no: {
    introMeta: "Asker, Norge",
    sections: [
      {
        title: "Min vei",
        lead: "Bakgrunnen min er ikke begrenset til ett fagfelt.",
        body: "Matematikken formet måten jeg angriper problemer på, undervisning lærte meg å formidle komplekse ideer, og programvareutvikling ga meg en praktisk måte å gjøre ideene om til fungerende systemer.",
      },
      {
        title: "Det jeg gjør",
        body: "Jeg bygger webapplikasjoner, API-er og dataorienterte arbeidsflyter med teknologier som Python, React, .NET og moderne skyplattformer. Erfaringen min spenner over programvare i offentlig sektor, utdanningsprosjekter og selvstendig kundearbeid.",
      },
      {
        title: "Hvordan jeg tenker",
        body: "Jeg verdsetter analytisk tenkning, intellektuell nysgjerrighet og evnen til å utfordre antakelser. Før jeg velger teknologi, prøver jeg å forstå det underliggende problemet, konteksten og konsekvensene.",
      },
      {
        title: "Utenfor teknologien",
        body: "Litteratur, utdanning, håndverk og matematisk tenkning påvirker hvordan jeg ser verden. Jeg tror teknisk dyktighet blir mer meningsfull når den kombineres med empati, ansvar og vilje til å fortsette å lære.",
      },
      {
        title: "Ideen bak NOI",
        lead: "NOI begynte som et navn på hvordan jeg liker å jobbe.",
        body: "Jeg har aldri passet pent inn i ett fagfelt. Matematikk, undervisning, programvare og interessen for håndverk pekte hele tiden mot den samme vanen: å legge merke til hva som egentlig skjer, gi det struktur og så bygge noe som hjelper. NOI er navnet jeg ga den vanen. Det er ikke et selskap, men en uavhengig, skapende praksis som holder prosjektene, tekstene og eksperimentene mine samlet.",
      },
    ],
    closingTitle: "Veien videre",
    closingBody:
      "Jeg er interessert i stillinger og samarbeid innen programvareutvikling der jeg kan bidra, lære mye og ta eierskap til meningsfulle problemer.",
    cvAction: "Se min profesjonelle reise",
  },
  tr: {
    introMeta: "Asker, Norveç",
    sections: [
      {
        title: "Yolum",
        lead: "Geçmişim tek bir disiplinle sınırlı değil.",
        body: "Matematik problemlere yaklaşımımı şekillendirdi; öğretmenlik karmaşık fikirleri anlatmayı öğretti; yazılım geliştirme ise bu fikirleri çalışan sistemlere dönüştürmenin pratik bir yolunu verdi.",
      },
      {
        title: "Ne yapıyorum",
        body: "Python, React, .NET ve modern bulut platformları gibi teknolojilerle web uygulamaları, API'ler ve veri odaklı iş akışları geliştiriyorum. Deneyimim kamu sektörü yazılımlarını, eğitim projelerini ve bağımsız müşteri işlerini kapsıyor.",
      },
      {
        title: "Nasıl düşünüyorum",
        body: "Analitik düşünmeye, entelektüel meraka ve varsayımları sorgulayabilmeye değer veriyorum. Bir teknolojiyi seçmeden önce altta yatan problemi, bağlamını ve sonuçlarını anlamaya çalışırım.",
      },
      {
        title: "Mühendisliğin ötesinde",
        body: "Edebiyat, eğitim, zanaat ve matematiksel düşünme dünyaya bakışımı etkiliyor. Teknik yeteneğin empati, sorumluluk ve öğrenmeye devam etme isteğiyle birleştiğinde daha anlamlı hâle geldiğine inanıyorum.",
      },
      {
        title: "NOI fikri",
        lead: "NOI, çalışma biçimime verdiğim bir isim olarak başladı.",
        body: "Kendimi hiçbir zaman tek bir disipline sığdıramadım. Matematik, öğretmenlik, yazılım ve zanaata duyduğum ilgi hep aynı alışkanlığa çıkıyordu: gerçekte neler olup bittiğini fark etmek, ona bir yapı vermek ve sonra işe yarayan bir şey inşa etmek. NOI bu alışkanlığın adı. Bir şirket değil; projelerimi, yazılarımı ve denemelerimi bir arada tutan bağımsız bir üretim pratiği.",
      },
    ],
    closingTitle: "İleriye bakış",
    closingBody:
      "Katkı sağlayabileceğim, derinlemesine öğrenebileceğim ve anlamlı problemlerin sorumluluğunu üstlenebileceğim yazılım mühendisliği rollerine ve iş birliklerine ilgi duyuyorum.",
    cvAction: "Profesyonel yolculuğumu keşfet",
  },
};

export const contactPageContent: Record<Locale, ContactPageContent> = {
  en: {
    introMeta: "Asker, Norway",
    description:
      "The quickest way to reach me is by email. You can also find me on LinkedIn and GitHub.",
    cvAction: "Explore my CV",
  },
  no: {
    introMeta: "Asker, Norge",
    description:
      "Raskest når du meg på e-post. Du finner meg også på LinkedIn og GitHub.",
    cvAction: "Se CV-en min",
  },
  tr: {
    introMeta: "Asker, Norveç",
    description:
      "Bana en hızlı e-postayla ulaşabilirsin. LinkedIn ve GitHub'da da beni bulabilirsin.",
    cvAction: "Özgeçmişimi incele",
  },
};
