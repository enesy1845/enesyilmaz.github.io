import Image from "next/image";
import { contentLabels } from "@/data/content-labels";
import type { Locale } from "@/i18n/config";
import type { Project } from "@/types/project";

/** Public covers or abstract category studies; never a simulated internal UI. */
export function ProjectVisual({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const cover = !project.confidential ? project.coverImage : undefined;
  return (
    <span
      aria-hidden="true"
      className={`project-visual project-visual--${project.category}`}
    >
      {cover ? (
        <Image
          alt=""
          className="work-index__image"
          height={640}
          loading="lazy"
          sizes="(min-width: 768px) 32rem, 6rem"
          src={cover}
          unoptimized
          width={1280}
        />
      ) : (
        <>
          <span className="project-visual__label">
            {contentLabels[locale].category[project.category]}
          </span>
          <svg fill="none" viewBox="0 0 480 320">
            <g stroke="currentColor" strokeWidth="1.2">
              {project.category === "software" ? (
                <>
                  <rect x="64" y="112" width="96" height="96" rx="12" />
                  <rect x="320" y="112" width="96" height="96" rx="12" />
                  <path d="M160 160h160M240 160V64h80M240 160v96h80" />
                  <circle cx="240" cy="160" r="6" fill="currentColor" />
                  <path d="m96 160 12 12 24-24M348 148h40m-40 12h28m-28 12h36" />
                  <circle cx="332" cy="64" r="12" />
                  <circle cx="332" cy="256" r="12" />
                </>
              ) : project.category === "data" ? (
                <>
                  {[96, 144, 192].map((y) => (
                    <ellipse key={y} cx="240" cy={y} rx="104" ry="32" />
                  ))}
                  <path d="M136 96v144c0 18 47 32 104 32s104-14 104-32V96" />
                </>
              ) : project.category === "education" ? (
                <>
                  <path d="M240 88c-48-32-104-32-144-8v160c48-24 96-16 144 8 48-24 96-32 144-8V80c-40-24-96-24-144 8Zm0 0v160M128 112l72 8m-72 24 72 8m72-32 72-8m-72 40 72-8" />
                </>
              ) : project.category === "ai" ? (
                <>
                  {[64, 96, 128].map((r) => (
                    <circle key={r} cx="240" cy="160" r={r} />
                  ))}
                  <path d="M80 160h320M240 32v256m-96-224 192 192m0-192L144 256" />
                </>
              ) : (
                <>
                  <rect x="72" y="64" width="336" height="208" rx="8" />
                  <path d="M72 96h336M104 128h144v112H104zm176 0h96m-96 24h72m-72 24h96m-72 40h72" />
                  <circle cx="92" cy="80" r="2" />
                  <circle cx="104" cy="80" r="2" />
                </>
              )}
            </g>
          </svg>
          <span className="project-visual__technology">
            {project.technologies.slice(0, 2).join(" / ")}
          </span>
        </>
      )}
    </span>
  );
}
