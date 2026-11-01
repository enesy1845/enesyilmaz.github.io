# İçerik Haritası

Sitedeki her metnin hangi dosyadan geldiğini gösterir. Bir yazıyı değiştirmek istediğinde önce buraya bak.

- **Panel**: `npm run dev` → `http://localhost:3000/keystatic` (canlıda `/keystatic`, GitHub girişiyle).
- **Kod**: dosyayı düzenle → `npm run dev` ile kontrol et → commit.
- Kod dosyalarında her metin `en` / `no` / `tr` olmak üzere üç dilde bulunur. Bir dili değiştirirsen diğer ikisini de güncelle. Makine çevirisi kullanma.
- İçerik değiştiğinde [src/config/site.ts](../../src/config/site.ts) içindeki `contentUpdatedAt` tarihini de güncelle. Bu tarih sitemap'te ve CV'de "son güncelleme" olarak görünür.

## Genel (tüm sayfalar)

| Ne                                                           | Dosya                                                          | Alan              |
| ------------------------------------------------------------ | -------------------------------------------------------------- | ----------------- |
| İsim, unvan, konum, varsayılan SEO başlığı ve açıklaması     | [src/config/site.ts](../../src/config/site.ts)                 | `siteConfig`      |
| E-posta, LinkedIn, GitHub, Medium linkleri                   | [src/config/social.ts](../../src/config/social.ts)             | `socialLinks`     |
| Menü adları                                                  | `src/messages/{en,no,tr}.json`                                 | `navigation.*`    |
| Footer metinleri                                             | `src/messages/{en,no,tr}.json`                                 | `footer.*`        |
| Her sayfanın SEO başlığı, açıklaması ve sayfa başlığı        | `src/messages/{en,no,tr}.json`                                 | `pages.<sayfa>.*` |
| 404 sayfası                                                  | `src/messages/{en,no,tr}.json`                                 | `notFound.*`      |
| Erişilebilirlik metinleri (atla linki, menü butonları)       | `src/messages/{en,no,tr}.json`                                 | `accessibility.*` |
| Ortak etiketler (kategori, durum, okuma süresi, bildirimler) | [src/data/content-labels.ts](../../src/data/content-labels.ts) | `contentLabels`   |

## Ana sayfa (`/`)

Metinlerin hepsi [src/data/home.ts](../../src/data/home.ts) dosyasındaki `homeContent` içinde. İstisnalar tabloda belirtildi.

| Bölüm                  | Alanlar                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| Hero                   | `eyebrow`, `heading` (isim), `role`, `position`, `support`, `primaryAction`, `secondaryAction`              |
| Manifesto              | `manifestoTitle`, `manifestoText`                                                                           |
| Seçili işler           | `selectedWorkTitle`, `allWorkAction`. Projeler panelden gelir (**Ana sayfada öne çıkar** işaretli olanlar). |
| Uzmanlık               | `expertiseTitle`; gruplar [src/data/experience.ts](../../src/data/experience.ts) (`evidenceItems`)          |
| Code / Thought / Craft | `disciplinesTitle`, `disciplines[]`                                                                         |
| Notlar                 | `notesTitle`, `notesAction`, `mediumAction`. Gösterilen yazı paneldeki en yeni yayınlanmış yazıdır.         |
| Atölye                 | `atelierTitle`, `atelierItems[]`, `atelierAction`                                                           |
| Hakkımda               | `aboutTitle`, `aboutLead`, `aboutDescription`, `aboutAction`                                                |
| İletişim               | `contactTitle`, `contactAction`, `cvAction`. E-posta `social.ts` dosyasından gelir.                         |

Hero'daki 3B Helix heykeli kodla üretilir ([src/components/home/hero/](../../src/components/home/hero/)); metin içermez.

## Work (`/work`, `/work/<slug>`)

**Panel → Work.** Dosyalar `content/projects/<slug>.json`.

| Ne                              | Paneldeki alan                                                 |
| ------------------------------- | -------------------------------------------------------------- |
| Liste sırası                    | Sıra (küçük sayı önce gelir)                                   |
| Ana sayfada görünme             | Ana sayfada öne çıkar (aynı anda 3–5 proje)                    |
| Gizleme                         | Taslak                                                         |
| Kart ve proje sayfası metinleri | English / Norsk / Türkçe → Başlık, Özet, Açıklama, Rol, Kurum… |
| Proje sayfasındaki bölümler     | Sorumluluklar, Zorluklar, Kararlar, Sonuçlar, Öğrendiklerim    |
| Kapak görseli                   | Kapak görseli (+ her dilde alternatif metin)                   |
| Canlı site / kod linki          | Canlı site, Kod deposu                                         |

Bir dilde Başlık, Özet ve Rol alanları boşsa proje o dilde yayınlanmaz. Sayfa başlığı ve açıklaması `messages` → `pages.work` alanından gelir.

## Notlar / Blog (`/notes`, `/<dil>/notes/<slug>`)

**Panel → Blog.** Dosyalar `content/notes/<slug>.mdoc`. Yazı yalnızca seçilen dilin adresinde yayınlanır.

| Ne                                                   | Dosya / alan                                                                                |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Yazının kendisi, başlık, açıklama, tarih             | Panel                                                                                       |
| Liste sayfası metinleri, konu listesi, Medium kutusu | [src/data/supporting-content.ts](../../src/data/supporting-content.ts) → `notesPageContent` |

## Atölye (`/atelier`)

[src/data/supporting-content.ts](../../src/data/supporting-content.ts) → `atelierAreas`: tesbih, ahşap, saatler, görsel tasarım. Her alanın bir başlığı ve bir metni var.

Fotoğraflar her alanın `images` dizisine eklenir. Bu dizi şu an boş; fotoğraf eklenene kadar sayfada görsel gösterilmez. Fotoğraflar `public/images/atelier/` klasörüne konmalı ve her biri için üç dilde alternatif metin yazılmalı.

## Hakkımda (`/about`)

[src/data/pages.ts](../../src/data/pages.ts) → `aboutPageContent`: `introMeta`, `sections[]` (başlık, giriş, metin), `closingTitle`, `closingBody`, `cvAction`.

## CV (`/cv`)

Tamamı [src/data/cv.ts](../../src/data/cv.ts) dosyasında.

| Bölüm              | Alan                                                           |
| ------------------ | -------------------------------------------------------------- |
| Zaman çizelgesi    | `timeline` (dönem, tür, kurum, rol, ilgili projeler)           |
| Yetenekler         | `skillGroups`                                                  |
| Eğitim             | `education`                                                    |
| Sertifikalar       | `certifications`, `additionalLearning`                         |
| Referanslar        | `references` (yalnızca isim, unvan ve kurum; mektup linki yok) |
| PDF indirme butonu | `cvDocument.href`. Boş olduğu sürece buton görünmez.           |
| Sayfa metinleri    | `cvPageCopy`                                                   |

## İletişim (`/contact`)

[src/data/pages.ts](../../src/data/pages.ts) → `contactPageContent`. Linkler [src/config/social.ts](../../src/config/social.ts) dosyasından, form bildirimi `content-labels.ts` dosyasından gelir.

## Bilinçli olarak eksik bırakılanlar

Bunlar onaylanmış gerçek bilgi gelene kadar boş kalacak. Uydurma ya da yer tutucu içerik eklenmemeli.

- CV PDF dosyası (`cvDocument.href`)
- Referans mektupları (`references[].documentUrl`); mektup içerikleri izin olmadan yayınlanmayacak
- DP-203 doğrulaması; Neo4j doğrulama linki
- ILH alan adı; 5 Star Stitches ve ILH ekran görüntüleri
- Atölye fotoğrafları
- Seller Flash için tam tarih (şu an yalnızca yıl var); LLM Quiz projesinin durumu
- Canlı alan adı (`NEXT_PUBLIC_SITE_URL`)

## Yayınlamadan önce

- Gizli işveren veya belediye bilgisi, iç adresler, kişisel telefon numarası ya da özel e-posta yazılmamalı.
- Kanıtlanamayan sonuçlar ve derece iddiaları yazılmamalı. METU için yalnızca "Matematik öğrenimi, 2014–2017" yazılıyor.
- DP-700 "aktif" olarak gösterilmemeli; geçerlilik tarihi yazılmalı.
