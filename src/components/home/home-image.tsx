import { getImageProps } from "next/image";

/**
 * A cropped, full-width interlude after the hero. The files are
 * pre-optimised WebP, so they
 * are served as-is; the portrait crop keeps the orb visible on phones.
 */
export function HomeImage() {
  const { props } = getImageProps({
    alt: "",
    src: "/images/hero/noi-hero-desktop.webp",
    width: 1808,
    height: 870,
    unoptimized: true,
  });

  return (
    <div
      aria-hidden="true"
      className="home-image relative overflow-hidden bg-[var(--color-surface)]"
      data-home-image=""
    >
      <span
        aria-hidden="true"
        className="header-island-marker"
        data-header-island-trigger=""
      />
      <picture>
        <source
          height={1920}
          media="(max-width: 767px)"
          srcSet="/images/hero/noi-hero-mobile.webp"
          type="image/webp"
          width={1080}
        />
        <img
          {...props}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
    </div>
  );
}
