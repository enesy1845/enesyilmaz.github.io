import Image from "next/image";

import { siteConfig } from "@/config/site";
import { homeContent } from "@/data/home";
import type { Locale } from "@/i18n/config";

/** Shared, server-rendered portrait; its colour treatment needs no JavaScript. */
export function ProfilePortrait({ locale }: { locale: Locale }) {
  return (
    <figure className="profile-portrait">
      <div className="profile-portrait__frame">
        <Image
          src="/images/profile/enes-yilmaz.webp"
          alt={siteConfig.author}
          width={1000}
          height={1333}
          sizes="(min-width: 64rem) 34vw, (min-width: 48rem) 40vw, 92vw"
          className="profile-portrait__image"
        />
      </div>
      <figcaption>
        <span>{siteConfig.author}</span>
        <span>{homeContent[locale].eyebrow}</span>
      </figcaption>
    </figure>
  );
}
