import { ProjectCard } from "@/components/projects/project-card";
import type { Locale } from "@/i18n/config";
import type { Project } from "@/types/project";

type ProjectListProps = {
  projects: readonly Project[];
  locale: Locale;
  compact?: boolean;
};

export function ProjectList({ projects, locale, compact }: ProjectListProps) {
  return (
    <div>
      {projects.map((project, index) => (
        <ProjectCard
          compact={compact}
          index={index}
          key={project.slug}
          locale={locale}
          project={project}
        />
      ))}
    </div>
  );
}
