import Image from "next/image";

type ProjectCoverProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Screenshots are pre-sized 1280x640 WebP files, so they are served as-is
 * (no runtime optimizer on Cloudflare Workers) inside a fixed 2:1 frame.
 */
export function ProjectCover({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: ProjectCoverProps) {
  return (
    <div
      className={`aspect-[2/1] overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] ${className}`}
    >
      <Image
        alt={alt}
        className="h-full w-full object-cover object-top"
        height={640}
        priority={priority}
        sizes={sizes}
        src={src}
        unoptimized
        width={1280}
      />
    </div>
  );
}
