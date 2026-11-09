# Awwwards araştırması ve portfolyo için tasarım yönü

21 Ekim 2026 · Mevcut portfolyonun görsel iyileştirme çalışması.

## Sonuç

En büyük kazanım, Code / Thought / Craft fikrini yerleşimin kendisine taşımak.
Work bir sistem kataloğu, Notes bir okuma alanı, Atelier bir çalışma masası gibi
hissedebilir. Ortak tipografi, çizgi dili, renkler ve navigasyon bu üç dünyayı
bir arada tutmalı. Yazılımcı kimliği ve profesyonel işler her zaman önce gelmeli.

Mevcut tasarım temizlendi; fakat hâlâ çok sayıda bölüm aynı genişlik, benzer
boşluklar, çizgiler ve numaralı satırlarla kuruluyor. Sadece yeni minimalist
bileşenler eklemek bu tekdüzeliği çözmez. Bölümler arasında ölçek, yoğunluk ve
yerleşim değişmesi gerekiyor.

Bu belge araştırmayı ve uygulama önerilerini kaydeder. Sonraki uygulama turunda
hayata geçirilen değişiklikler en alttaki uygulama notunda belirtilmiştir.

## Araştırmanın kapsamı ve sınırları

- Awwwards'ın güncel [Portfolio](https://www.awwwards.com/websites/portfolio/)
  ve [Minimal](https://www.awwwards.com/websites/minimal/) seçkileri tarandı.
- Aşağıdaki 12 sitenin Awwwards kayıtları açılarak açıklamaları, bağlantıları ve
  ödül/adaylık durumları kontrol edildi. Aday olan siteler ödüllü sayılmadı.
- Bunların 11'inin canlı sitesi masaüstü Chromium'da açıldı. Dokuzunda okunabilir
  tasarım incelendi. Huy Phan ilk yükleme sonrasında ayrıca yeniden görüntülendi.
- Giordano Betti ve STUDIO seitaro oturumlarında yükleme/boş görsel alanları
  incelemeyi sınırladı. Bu ikisinin tamamını etkileşimli incelemiş saymıyorum.
  Tommy Biglow yalnızca Awwwards kaydı üzerinden karşılaştırıldı.
- Sam Goddard, AAT ve Shorodo ayrıca 390px mobil görünümde incelendi.
- Kendi sitemizde seçilmiş işler, Code / Thought / Craft ve yazı/atelier geçişi
  tekrar görüntülendi; ilgili bileşenler ve tasarım token'ları okundu.
- Referansların canlı sürümleri, ödül aldıkları tarihteki sürümden farklı olabilir.
  Özellikle Osmo için güncel canlı sayfa ile 2025 kaydı ayrı kanıtlar olarak ele alındı.
- Bu çalışma karşılaştırmalı Lighthouse veya Core Web Vitals ölçümü değildir.
  Ekran görüntülerindeki yükleme durumlarından performans sıralaması çıkarılmadı.

## Referanslar: ne alınabilir, bize nasıl çevrilir?

| Referans ve doğrulanan durum                                                                                                                     | Gözlem / kaynakta belirtilen yaklaşım                                                                                                                            | Bizim portfolyoya uyarlama                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Signal-A](https://www.awwwards.com/sites/signal-a-studio) · SOTD, 18 Ekim 2026 · [canlı](https://signal-a.studio/)                              | Siyah-beyaz düzen, serif ve kalın sans karşıtlığı, sabit kolon hizaları. Kayıtta arşiv, akordeon ve hover ayrıntıları öne çıkıyor.                               | Sayfa geneline efekt eklemek yerine bir tipografik odak; proje satırlarında anlamlı bilgi hiyerarşisi. Harf karıştırma efektini almamak.                  |
| [Sam Goddard](https://www.awwwards.com/sites/sam-goddard-2) · aday, 12 Ekim 2026 · [canlı](https://samgoddard.co.uk/)                            | Büyük serif kimlik ile küçük teknik etiketler; kişisel ilgi alanları profesyonel tanımdan sonra geliyor. Mobilde de bu hiyerarşi korunuyor.                      | Enes'in profesyonel rolünü ilk bakışta net tutmak; Notes'a daha belirgin editoryal karakter vermek. Canlı ziyaretçi/müzik göstergelerini eklememek.       |
| [Huy Phan Vol.2](https://www.awwwards.com/sites/huy-phan-vol-2) · SOTD, 14 Ekim 2026 · [canlı](https://huyml.co/)                                | Proje adı, rol, tarih ve görselin aynı odakta buluştuğu seçki; büyük katalog numaraları.                                                                         | Masaüstünde sabit önizleme alanı + proje listesi. Dönen görsel yığınları ve WebGL yerine sakin bir görüntü değişimi.                                      |
| [AAT Architecten](https://www.awwwards.com/sites/aat-architecten) · aday, 18 Ekim 2026 · [canlı](https://www.aat-architecten.be/)                | Asimetrik giriş: geniş boşluk, bir tarafa yerleşmiş tek görsel ve karşısında açıklama. Projeler aynı boy kartlara zorlanmıyor.                                   | About veya Atelier girişinde tek amaçlı görsel; 7/5 veya 8/4 kolon oranları. Fotoğraf yoksa rastgele stok görsel eklememek.                               |
| [Shorodo](https://www.awwwards.com/sites/shorodo) · aday, 19 Ekim 2026 · [canlı](https://shorodo.nagoya/)                                        | Isı fikri, sayfa boyunca bölüm anlatısını bağlıyor; el işi ve malzeme görünür. Awwwards kaydı 320°C'den avuç sıcaklığına ilerleyişi açıklıyor.                   | Craft'ta gerçek üretim aşamalarını ilişkilendiren tek görsel fikir. Sıcaklık sayacını, dikey Japonca düzeni veya videoyu kopyalamamak.                    |
| [UNDPLUS](https://www.awwwards.com/sites/undplus) · aday, 15 Ekim 2026 · [canlı](https://www.undplus.com/)                                       | Hizmet, süreç ve bitmiş işi ortak editoryal akışta topluyor. Kayıtta proje filtresi ve giriş etkileşimi ayrı bileşenler.                                         | Uzmanlık bölümünde yalnızca beceri listesi yerine mevcut gerçek sorumlulukları süreçle bağlamak. Büyük video, çok renk ve sürekli kayan yazıları almamak. |
| [Dennis Snellenberg](https://www.awwwards.com/sites/dennis-snellenberg) · SOTD, 4 Nisan 2022 · [canlı](https://dennissnellenberg.com/)           | Rolü açık kimlik, kısa iş listesi, belirgin kapanış eylemi. Awwwards kaydı navigasyon ve iletişim akışını vurguluyor.                                            | Daha az rakip iletişim eylemi, büyük ama sade kapanış bağlantısı. İmleci takip eden arayüz veya scroll katmanı eklememek.                                 |
| [Miranda — Paper Portfolio](https://www.awwwards.com/sites/miranda-paper-portfolio) · SOTD, 18 Kasım 2021 · [canlı](https://niccolomiranda.com/) | Gazete benzeri kolonlar, çok büyük başlıklar ve fiziksel malzeme çağrışımı; bütünlüklü bir tasarım fikri.                                                        | Notes'ta sayı/tarih/başlık ilişkisi; Craft'ta ölçülü malzeme hissi. Gazete görünümünü veya lisanslı fontlarını kopyalamamak.                              |
| [Osmo](https://www.awwwards.com/sites/osmo) · SOTD, 8 Şubat 2025 · [canlı](https://www.osmo.supply/)                                             | Güncel sayfada kompakt nav, kontrollü vurgu renkleri ve çok sayıda etkileşim örneği var.                                                                         | Adacıkta tutarlı boşluk, odak ve aktif durum; CTA okunda tek bir hareket dili. Ücretli kaynak kodu alınmadı; kütüphane ekleme gereği yok.                 |
| [STUDIO seitaro](https://www.awwwards.com/sites/studio-seitaro) · aday, 21 Ekim 2026 · [canlı](https://seitaroyamazaki.com/)                     | Awwwards kaydındaki arşiv fikri sanat, tasarım, medya ve yazıyı aynı kişide birleştiriyor. Canlı görsel inceleme sınırlı kaldı.                                  | Code / Thought / Craft için içerik mimarisi karşılaştırması. Canlı galerinin ayrıntılarını doğrulamış gibi öneri üretmemek.                               |
| [Giordano Betti](https://www.awwwards.com/sites/giordano-betti) · aday, 19 Ekim 2026 · [canlı](https://giordanobetti.com/)                       | Kayıtta sinematografi seçkisi ve görsel akış; açılan DOM'da iş kategorisi, yıl, süre ve rol birlikte bulunuyor. Görsel inceleme yükleme ekranında sınırlı kaldı. | Projelerde görselin yanında kısa ve yararlı künye. Video merkezli akışı yazılım portfolyosuna taşımamak.                                                  |
| [Tommy Biglow](https://www.awwwards.com/sites/tommy-biglow) · aday, 19 Ekim 2026                                                                 | Awwwards kaydı masaüstü işletim sistemi metaforunu, sürüklenen pencereleri ve oyunları anlatıyor.                                                                | Tek bir fikrin siteyi nasıl ayırt ettiğine karşılaştırma. Bu metafor profesyonel işlere erişimi dolaylılaştıracağı için bizim yönümüz değil.              |

Bu uyarlamalar kaynakların iddiası değil, portfolyoya ilişkin tasarım değerlendirmemdir.

## Mevcut tasarımda hâlâ geliştirebileceğimiz yerler

1. **Marka fikri üç karta sıkışıyor.** Code / Thought / Craft'ın eşit çerçeveleri,
   üç farklı dünyanın aynı kalıptan çıkmasına yol açıyor. Üstelik Code işaretinin
   proje kapaklarında da tekrarlanması, grafiklerin anlamını zayıflatıyor.
2. **İlk proje görseli yaptığı işi açıklamıyor.** Kalite sistemi kapağındaki
   bağlantı çizgileri dekoratif. Kamu yazılımının hangi sorunu çözdüğü ancak
   altındaki metni okuyunca anlaşılıyor. Diğer kapaksız projelerde aynı işaret var.
3. **Sayfa ritmi fazla düzenli.** Eşit kolonlar, aynı kenar çizgileri, benzer
   bölüm aralıkları tekrar ediyor. Her bölümü küçültmek veya büyütmek bunu çözmez.
4. **Atelier ana sayfada hâlâ etiket listesi gibi.** Boncuk, ahşap ve saat gibi
   fiziksel konuların kapsül etiketlerle sunulması malzeme hissini vermiyor.
5. **İç sayfalarda kimlik aynı kalıba yaklaşıyor.** Ortak PageIntro iyi bir temel,
   fakat Work, Notes ve Atelier'nin tamamında aynı başlık/açıklama ilişkisini
   kullanmak sayfaların karakterini sınırlıyor.
6. **Tipografi ayrımı derinleşebilir.** Onest arayüz ve profesyonel içerikte
   işlevsel. Serif şu anda daha çok yazı başlığına eklenen vurgu; Notes'un tüm
   okuma düzeni ve içerik hiyerarşisi bu ayrımı daha kararlı taşıyabilir.
7. **Kapanışta eylemler yarışıyor.** Ana sayfada e-posta, kopyalama, iletişim
   sayfası, sosyal bağlantılar ve büyük footer peş peşe geliyor. Tek ana eylem
   etrafında gruplanmaları daha güçlü bir bitiş yaratır.

## Önerdiğim ana tasarım fikri

**Bağlantı ve işçilik:** aynı ince çizginin üç farklı yorumu.

- Code: düzenli bağlantılar ve açık iş akışı.
- Thought: metin kenarında not, alt çizgi ve paragraf ritmi.
- Craft: ölçü çizgisi, ahşap damarı ve dairesel saat geometrisi.

Bu üç dilin aynı anda hareket etmesi gerekmiyor. Ortak çizgi kalınlığı ve
aralıklar yeterli bağ kurabilir. Grafik dekoratifse erişilebilir metni tekrar
etmez; iş akışını açıklıyorsa başlık, açıklama ve semantik karşılık kazanır.

Profesyonel işler ilk yarıda baskın kalır. Thought ve Craft daha sonra açılır.
Bu fikir final ekosistem grafiği veya yeni bir WebGL sahnesi gerektirmez.

## Öncelikli değişiklikler

| Öncelik | Değişiklik                                   | Somut karşılığı                                                                                                                               | Uygulama / sınır                                                                                                                                                    |
| ------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1       | Code / Thought / Craft'ı kartlardan çıkarmak | Geniş bir kompozisyonda büyük Code, biraz içeriden başlayan serif Thought, daha aşağıda Craft; aralarında sakin çizgisel bağ.                 | Semantik üç bağlantı, CSS Grid ve mevcut SVG. Mobilde normal sıralı liste. Yeni istemci JS gerekmez.                                                                |
| 1       | Proje görsellerini farklılaştırmak           | Gizli işte doğrulanmış, anonim süreç şeması; kamuya açık web işinde gerçek kapak; henüz kapağı olmayan işte iyi tasarlanmış tipografik künye. | Aynı soyut ikonu her projeye basmamak. Şema, yalnızca mevcut içeriğin desteklediği akışı gösterir; gerçek iç sistem ekranı gibi sunulmaz.                           |
| 1       | Work'te sabit önizleme + liste               | Masaüstünde solda tek önizleme, sağda işler. Hover veya klavye odağı ilgili önizlemeyi değiştirir; sayfadan çıkmadan kısa bağlam verir.       | İmleci takip etmez. İlk proje başlangıçta görünür. Mobilde mevcut doğrudan bağlantılar; JavaScript olmadan tüm projeler erişilebilir. Küçük istemci sınırı gerekir. |
| 1       | Notes ve Atelier'yi ayırmak                  | Notes: serif, tarih, sessiz kenar notu. Atelier: asimetrik ölçüler, malzeme başlıkları ve tek bir öne çıkan çalışma alanı.                    | Yeni font zorunlu değil; mevcut serif yığını kullanılabilir. Gerçek eser fotoğrafları ayrıca gerekli.                                                               |
| 1       | Bölüm yoğunluğunu değiştirmek                | Kısa manifesto → yoğun profesyonel kanıt → geniş marka kompozisyonu → sakin yazı alanı. Her bölüm aynı yüksekliğe sahip olmaz.                | Önce yalnızca yerleşim ve boşluk. Sabit ekran yüksekliğinde bölüm zorlaması veya scroll-jacking yok.                                                                |
| 2       | Navbar aktif durumunu rafine etmek           | Şeffaf üst header ve kaydırmada logosuz glass adacık aynen kalır; aktif rota göstergesi ve link/odak hareketleri tek dilde toplanır.          | Bir aktif gösterge yeterli. Yeni tam genişlik arka plan, sürekli parıltı veya blur animasyonu yok.                                                                  |
| 2       | Vaka çalışmalarında görsel özet              | Başta rol / bağlam / sorumluluk künyesi; gerçek kararları anlatan küçük akış diyagramı; altında mevcut uzun anlatı ve içerik dizini.          | Yeni başarı oranı, müşteri sayısı veya ölçülmemiş sonuç yazılmaz. Teknik çizim içerik olarak incelenir.                                                             |
| 2       | Uzmanlıkta açık-kapalı hiyerarşi             | Seçili sorumluluğun yanında ilgili gerçek iş bağlantısı; başlık, açıklama ve kanıt aynı noktada.                                              | Mevcut native details korunur. İçeriği okumak için hover gerekmez. Sırf animasyon için tekrar istemci bileşeni yapılmaz.                                            |
| 2       | Tek kapanış eylemi                           | Büyük bir iletişim başlığı ve birincil e-posta; kopyalama yanında küçük yardımcı; sosyal bağlantılar daha aşağıda.                            | Yeni form veya hizmet yok. Footer ile aynı cümle iki kez tekrarlanmaz.                                                                                              |
| 2       | Daha anlamlı mikroetkileşim                  | Proje önizlemesinde kısa çapraz geçiş, bağlantıda tek yönlü ok hareketi, odakta belirgin çizgi.                                               | Tasarım hedefi yaklaşık 160–220ms; transform/opacity. Reduced motion'da anlık durum. Her kelimeyi ayrı hareket ettirmemek.                                          |
| 3       | Uzun yazıda konum göstergesi                 | Aktif alt başlık içerik dizininde görünür; dar ekranda küçük bölüm adı.                                                                       | Yalnızca yeterince uzun içerik ve gerçek alt başlık varsa. Kısa tek yazı için genel okuma çubuğu eklememek.                                                         |
| 3       | Gerçek Atelier süreci                        | Bir işin ham madde, araç, işlem ve bitmiş ayrıntısını gösteren az sayıda kare.                                                                | İzinli gerçek kaynaklar gerekir. Stok veya üretilmiş görsel, kişisel üretim kanıtı gibi kullanılamaz.                                                               |

## Sayfa bazında yerleşim önerisi

### Ana sayfa

Hero ve isim geçişini koru. Manifestoyu tek güçlü cümle olarak bırak. İşleri
görsel önizleme ve sıkı listeyle göster. Ardından kısa profesyonel kanıt ve
çerçevesiz Code / Thought / Craft kompozisyonu gelsin. Notes geniş ve sakin,
Atelier daha küçük ve maddesel bir karşılık oluştursun. Tek iletişim odağıyla kapat.

### Work

Başlık bütün ekranı tüketmesin. Girişin altında seçilmiş işlerin aynı görünümde
başlaması önemli. Masaüstünde önizleme ile iş listesi birlikte okunabilsin;
ikinci kısımda mevcut kompakt arşiv kalsın. Yeni carousel veya görünüm seçici
eklemek yerine tek iyi katalog düzeni yeterli.

### Notes

Diğer sayfalardan daha dar bir okuma ekseni, daha büyük serif başlık ve daha
sessiz metadata. Gerçek tek yazı varken sahte dergi sayıları veya boş arşiv
satırları yaratma. Açılışta tek yazıyı iyi sun; sonraki gerçek yazılar aynı
editoryal sisteme katılır. Orijinal dil bildirimi görünür kalır.

### Atelier

Dört eşit görsel kutu yerine farklı ölçekte çalışmalar. Bir alan büyük başlık
ve çizimle öne çıkar; diğerleri ölçülü ve daha küçük karşılıklar verir. Bugün
yalnızca konu çizimleri var; bunların bitmiş kişisel eser olmadığını tasarım
da ima etmeli. Gerçek fotoğraf gelmeden bir eser galerisi gibi sunulmamalı.

### About

Bir büyük giriş paragrafı, varsa mevcut izinli kişisel görsel, ardından
numaralı bölümler. Ana sayfadaki manifesto ve CV içeriğini yeniden uzun uzun
tekrarlamak yerine yaklaşımın gerçek örneklerini bağlamak daha değerli.

### Contact

E-posta belirgin ve doğrudan. Diğer bağlantılar ikincil dizinde. Takvim,
uygunluk durumu veya canlı saat ziyaretçinin kararını desteklemiyorsa eklenmez.
İş arama/çalışma uygunluğu hakkında doğrulanmamış rozet kullanılmaz.

## Performans ve erişilebilirlik için uygulama kararı

Öncelikli kompozisyon, ritim ve tipografi değişiklikleri sunucu HTML'i ile CSS
üzerinden yapılabilir. Yalnızca etkileşimli proje önizlemesi küçük bir istemci
bileşeni ister. Bunun da ilk hali statik, okunabilir ve doğrudan bağlantılı olmalı.

Yeni animasyon veya ikon paketi gerekmiyor. Font değişirse lisans, Türkçe ve
Norveççe karakterler ve yerel sunum önce doğrulanmalı; referans fontları indirilip
kopyalanmamalı. Mevcut Onest'in build sırasında alınıp yerel sunulduğu biliniyor;
bu turda font altyapısı değiştirilmedi.

Önizlemeler ölçüleri ayrılmış yerel SVG veya optimize edilmiş görseller olur.
Görsel hover başladığında uzaktan indirilmez. Kullanılmayan tüm büyük medyayı
önceden yüklemek de doğru değil. Bundle ve ağ maliyeti uygulamadan sonra ölçülür;
"performansa etkisi sıfır" gibi bir garanti verilemez.

Her önizleme klavye odağıyla da değişir; ziyaretçi görsel değişimini takip etmek
zorunda kalmaz. Gizli panellerin bağlantıları odağa girmez. Mobil kullanıcı aynı
bilgiye normal akışta ulaşır. Header'ın şeffaflığı, logosuz adacığı ve açık/koyu
bölüm kontrastı mevcut davranış testleriyle korunur.

## Uygulama sırası ve ilgili dosyalar

1. Marka kompozisyonu ve bölüm ritmi:
   `src/app/[locale]/page.tsx`, `src/components/home/discipline-mark.tsx`,
   `src/styles/home.css`, `src/styles/tokens.css`.
2. Anlamlı proje görselleri, sonra önizleme etkileşimi:
   `src/components/projects/project-index.tsx`, mevcut proje içerik modeli ve
   doğrulanmış yerel varlıklar. Mevcut filtrelerin JS'siz davranışı korunur.
3. Notes / Atelier ayrımı:
   ilgili route sayfaları, `src/components/ui/page-intro.tsx`,
   `src/components/media/material-study.tsx`, `src/styles/folio.css`.
   Ortak bileşene çok sayıda görünüm bayrağı eklemek yerine gerektiğinde sayfa
   düzeyinde yerleşim oluşturulur.
4. Vaka özeti, kapanış ve küçük etkileşimler.

Her adım masaüstü ve 320/390px mobilde, üç arayüz dilinde, reduced motion ve
klavyeyle kontrol edilir. Yeni önizleme için odak/hover eşdeğerliği ve JS'siz
fallback sınanır. İşlev değişmeyen tipografi için uygulamayı tekrarlayan test
yazılmaz. Üretim performansı geliştirme sunucusundan değil production build'den
ölçülmelidir.

İlk uygulanacak üç kararım: **çerçevesiz marka kompozisyonu, açıklayıcı proje
görselleri ve Notes / Atelier ayrımı**. Bunlar yeni efekt eklemeden sitenin
karakterini en fazla değiştirecek adımlar.

## Araştırma turunda yapılan değişiklikler

Bu araştırma belgesi oluşturuldu ve README'ye bağlantısı eklendi. Referans ekran
görüntüleri ve geçici araştırma çıktıları repository dışında tutuldu; üçüncü
taraf görselleri site varlığı olarak eklenmedi. Uygulama kodu, bağımlılıklar ve
navigasyon davranışı bu turda değiştirilmedi. Belge biçimi ve diff kontrolü
yapıldı; uygulama testleri bu belge değişikliği için yeniden çalıştırılmadı.

## Uygulanan değişiklikler

Kullanıcının uygulama isteğiyle mevcut görsel iyileştirme dalında:

- Code / Thought / Craft üç eşit karttan çıkarıldı. Çerçevesiz, kademeli bir
  kompozisyon; Thought için serif vurgu; mobil için sade bağlantı listesi eklendi.
- Work ve ana sayfadaki seçilmiş işler aynı sabit önizleme/listesi bileşenini
  kullanıyor. CSS `:has` ve native odak/hover durumları önizlemeyi değiştiriyor.
  Filtrelenmiş kategorinin ilk projesi varsayılan önizleme oluyor. Klavye odağı
  fareye göre öncelikli; imleci izleyen görsel veya yeni istemci JavaScript'i yok.
- `ProjectVisual` kamuya açık kapakları ve kategoriye göre özgün SVG çalışmalarını
  birleştiriyor. Bunlar gerçek iç sistem ekranı veya doğrulanmış mimari şema
  olarak sunulmayan dekoratif çizimler. Gerçek rol, durum ve özet typed içerikten
  önizlemenin altında gösteriliyor. Tam vaka sayfaları doğrudan erişilebilir.
- Notes girişleri ve makale başlıkları aynı serif dilini kullanıyor. Notes konu
  listesi kapsüllerden sade satırlara dönüştürüldü.
- Atelier farklı genişlik, oran ve düşey hizalarda düzenlendi. Ana sayfadaki
  malzeme etiketleri bir çizim ve numaralı küçük dizine dönüştürüldü.
- Kapanışta iletişim sayfası düğmesi ikincil metin bağlantısına dönüştürüldü;
  e-posta ve kopyalama korunuyor.
- Header'ın şeffaflığı, logosuz glass adacığı ve locale bağımsız başlık ölçeği
  korundu. Yeni bağımlılık, uzak görsel, font veya animasyon runtime'ı eklenmedi.

Doğrulama bu değişikliklerle sınırlı tutuldu: TypeScript, değişen TSX/test
dosyalarında lint, biçim/diff kontrolü; önizleme/filtre/klavye davranışı, mobil
bağlantılar, üç dilde başlıklar, iç sayfa erişilebilirliği ve adacık için 10
hedefli tarayıcı senaryosu. Ana sayfa axe kontrolünde de ihlal bulunmadı. Masaüstü,
tablet ve mobil görünümler incelendi. Tam test paketi ve üretim derlemesi bu turda
yeniden çalıştırılmadı. Üretim performansı ölçümü yapılmadı; deployment yok.

Gerçek Atelier fotoğrafları, içeriğe özel onaylı iş akışı şemaları ve uzun
makalelerde aktif içerik dizini bu turda eklenmedi.

### CV referans kartları

Ekran görüntüsünde belirtilen referans bölümü ayrıca yenilendi. Signal-A'nın
kolon hizaları ve ince ayırıcılarla kurduğu editoryal düzen uyarlandı: dolgulu,
yuvarlatılmış üç sütunlu kutular yerine iki sütunlu açık kartlar, sıra numarası,
serif kurum adı, sessiz rol künyesi ve hafif hover/odak çizgisi kullanılıyor.
Mobilde tek sütun var. Toplam sayı gerçek veri uzunluğundan geliyor; referans
metinleri ve yalnızca onaylı belgelerin bağlanması kuralı korundu.

`ReferenceIndex` bir Server Component; JavaScript veya bağımlılık eklemiyor.
Bu küçük değişiklikte TypeScript, değişen TSX dosyalarında lint, biçim/diff
kontrolü ve bölümün axe taraması geçti. 10 kaydın tamamı, üç dilde 320px mobil
taşma kontrolü ve yerelleştirilmiş referans isteme bağlantısı doğrulandı.
Masaüstü ve mobil ekran görüntüleri incelendi; tam test paketi çalıştırılmadı.

### Timeline, About ve kapanış

CV timeline, sağ-sol dönüşümlü çizgiden tek eksenli kronolojik düzene taşındı.
Tarih, kayıt türü, kurum/rol ve açıklama açık kolonlarda okunuyor; 12 kayıt,
çakışan dönemler ve ilgili proje bağlantıları aynı sırada korunuyor. Mobilde
kolonlar doğal okuma sırasına geçiyor. Önceki scroll-reveal animasyonu kaldırıldı.

About sayfasının girişi, dört bölümü ve kapanışı yenilendi. Geniş ekranda sabit
bölüm dizini, üç dilde aynı anchor'lar ve CV/Work/Notes/Atelier bağlantıları var.
İlk paragrafın mevcut ilk cümlesi ayrı bir giriş alanına taşındı; yeni kişisel
iddia veya çeviri eklenmedi. Bu ayrım typed içerikte açıkça tanımlanıyor.

`ClosingInvite` About ve CV için ortak Server Component. Koyu zemin, büyük serif
başlık, geniş iletişim bağlantısı ve ikincil metin bağlantısı kullanıyor.
CV'nin son güncelleme tarihi korunuyor. Koyu bölüm shared header kontrast
gözlemcisine dahil; logosuz glass adacık doğru renkte kalıyor.

TypeScript ve değişen dosyalarda lint/biçim kontrolü geçti. İki sayfanın axe
taraması, 320/768px görünümleri, üç dilde anchor ve bağlantı hedefleri, JS'siz
okuma ve navigasyon kontrol edildi. Başlıkların locale eşitliği ve CV dil
geçişi için üç mevcut tarayıcı testi geçti. Tam paket/build çalıştırılmadı.
Yeni bağımlılık, istemci JavaScript'i veya medya eklenmedi; deployment yok.
