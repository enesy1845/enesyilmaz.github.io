import { contentLabels } from "@/data/content-labels";
import type { Locale } from "@/i18n/config";
import type { Project } from "@/types/project";

type ProjectFiltersProps = {
  projects: readonly Project[];
  locale: Locale;
  name: string;
};

export function ProjectFilters({
  projects,
  locale,
  name,
}: ProjectFiltersProps) {
  const labels = contentLabels[locale];
  const categories = [...new Set(projects.map((project) => project.category))];
  const filters = [
    { value: "all", label: labels.allProjects, count: projects.length },
    ...categories.map((category) => ({
      value: category,
      label: labels.category[category],
      count: projects.filter((project) => project.category === category).length,
    })),
  ];
  return (
    <fieldset className="project-filter">
      <legend className="sr-only">{labels.filterProjects}</legend>
      {filters.map((filter) => (
        <label className="project-filter__option" key={filter.value}>
          <input
            className="sr-only"
            defaultChecked={filter.value === "all"}
            name={name}
            type="radio"
            value={filter.value}
          />
          <span>{filter.label}</span>
          <span className="project-filter__count">{filter.count}</span>
        </label>
      ))}
    </fieldset>
  );
}
