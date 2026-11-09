import { collection, config, fields } from "@keystatic/core";

/**
 * Admin panel schema (served at /keystatic).
 *
 * Content lives in the repository as JSON (work) and Markdoc (notes):
 * - development: edits are written straight to ./content on disk;
 * - production: edits become commits on GitHub, which trigger a rebuild.
 *
 * scripts/build-content.ts compiles these files into a typed module at build
 * time, so the Cloudflare Worker never needs filesystem access.
 */

const list = (label: string, description?: string) =>
  fields.array(fields.text({ label, multiline: true }), {
    label,
    description,
    itemLabel: (props) => props.value || "Yeni madde",
  });

const localizedProject = (label: string, description: string) =>
  fields.object(
    {
      title: fields.text({ label: "Başlık" }),
      shortTitle: fields.text({
        label: "Kısa başlık",
        description: "Listelerde görünür. Boşsa başlık kullanılır.",
      }),
      summary: fields.text({
        label: "Özet",
        description: "Bir cümle. Kartlarda ve arama sonuçlarında görünür.",
        multiline: true,
        validation: { length: { max: 240 } },
      }),
      description: fields.text({
        label: "Açıklama",
        description: "Proje sayfasının giriş paragrafı.",
        multiline: true,
      }),
      role: fields.text({ label: "Rol" }),
      organization: fields.text({ label: "Kurum / müşteri" }),
      period: fields.text({ label: "Dönem", description: "Örn. 2024 – 2025" }),
      location: fields.text({ label: "Konum" }),
      status: fields.text({
        label: "Durum",
        description: "Örn. “Devam ediyor”. Tamamlanan işlerde boş bırak.",
      }),
      imageAlt: fields.text({
        label: "Kapak görseli alternatif metni",
        description: "Kapak görseli varsa zorunlu (erişilebilirlik).",
      }),
      responsibilities: list("Sorumluluklar"),
      challenges: list("Zorluklar"),
      decisions: list("Kararlar"),
      outcomes: list("Sonuçlar", "Yalnızca kanıtlanabilir sonuçlar."),
      lessons: list("Öğrendiklerim"),
    },
    { label, description },
  );

const translationNote =
  "Başlık, özet ve rol doldurulduğunda proje bu dilde yayınlanır. Boş bırakılan dil sitede gösterilmez; makine çevirisi kullanma.";

export default config({
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : {
          kind: "github",
          repo: { owner: "enesy1845", name: "enesyilmaz.github.io" },
        },
  ui: {
    brand: { name: "Enes Yılmaz" },
    navigation: { İçerik: ["notes", "projects"] },
  },
  collections: {
    notes: collection({
      label: "Blog",
      slugField: "title",
      path: "content/notes/*",
      format: { contentField: "body" },
      entryLayout: "content",
      columns: ["title", "publishedAt", "language"],
      schema: {
        title: fields.slug({
          name: { label: "Başlık" },
          slug: {
            label: "URL",
            description:
              "Yayınlandıktan sonra değiştirme; eski bağlantılar kırılır.",
          },
        }),
        description: fields.text({
          label: "Kısa açıklama",
          description: "Listelerde ve arama sonuçlarında görünür.",
          multiline: true,
          validation: { length: { min: 1, max: 220 } },
        }),
        language: fields.select({
          label: "Dil",
          description: "Yazı yalnızca bu dilin adresinde yayınlanır.",
          options: [
            { label: "English", value: "en" },
            { label: "Norsk", value: "no" },
            { label: "Türkçe", value: "tr" },
          ],
          defaultValue: "en",
        }),
        category: fields.text({
          label: "Kategori",
          description: "Örn. Thinking / Education",
        }),
        publishedAt: fields.date({
          label: "Yayın tarihi",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        draft: fields.checkbox({
          label: "Taslak",
          description: "İşaretliyken yazı sitede görünmez.",
          defaultValue: true,
        }),
        externalUrl: fields.url({
          label: "Orijinal bağlantı",
          description: "Yazı Medium gibi bir yerde de yayınlandıysa.",
        }),
        body: fields.markdoc({
          label: "Yazı",
          options: {
            image: {
              directory: "public/images/notes",
              publicPath: "/images/notes/",
            },
          },
        }),
      },
    }),
    projects: collection({
      label: "Work",
      slugField: "name",
      path: "content/projects/*",
      format: { data: "json" },
      columns: ["name", "order", "featured"],
      schema: {
        name: fields.slug({
          name: { label: "Proje adı", description: "Panelde görünen ad." },
          slug: {
            label: "URL",
            description:
              "Yayınlandıktan sonra değiştirme; eski bağlantılar kırılır.",
          },
        }),
        draft: fields.checkbox({
          label: "Taslak",
          description: "İşaretliyken proje sitede görünmez.",
          defaultValue: false,
        }),
        featured: fields.checkbox({
          label: "Ana sayfada öne çıkar",
          description: "Aynı anda 3–5 proje öne çıkarılmalı.",
          defaultValue: false,
        }),
        order: fields.integer({
          label: "Sıra",
          description: "Küçük sayı önce gelir.",
          defaultValue: 100,
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: "Kategori",
          options: [
            { label: "Yazılım", value: "software" },
            { label: "Veri", value: "data" },
            { label: "Web", value: "web" },
            { label: "Eğitim", value: "education" },
            { label: "Yapay zekâ", value: "ai" },
          ],
          defaultValue: "software",
        }),
        confidential: fields.checkbox({
          label: "Gizli / anonimleştirilmiş",
          description:
            "İşveren veya kurum bilgisi hassassa işaretle; içerikte iç ayrıntı verme.",
          defaultValue: false,
        }),
        technologies: fields.array(fields.text({ label: "Teknoloji" }), {
          label: "Teknolojiler",
          description:
            "Yalnızca özel isimler (React, WordPress, PostgreSQL…). Etiketler çevrilmez; “Responsive design” gibi açıklamaları dil alanlarına yaz.",
          itemLabel: (props) => props.value || "Yeni teknoloji",
        }),
        disciplines: fields.array(fields.text({ label: "Disiplin" }), {
          label: "Disiplinler",
          itemLabel: (props) => props.value || "Yeni disiplin",
        }),
        externalUrl: fields.url({ label: "Canlı site" }),
        repositoryUrl: fields.url({ label: "Kod deposu" }),
        coverImage: fields.image({
          label: "Kapak görseli",
          description: "Tercihen 1280×640 WebP.",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
        }),
        en: localizedProject("English", translationNote),
        no: localizedProject("Norsk", translationNote),
        tr: localizedProject("Türkçe", translationNote),
      },
    }),
  },
});
