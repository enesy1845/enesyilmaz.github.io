import { describe, expect, it } from "vitest";

import { homeContent } from "@/data/home";
import { locales } from "@/i18n/config";
import {
  getFeaturedProjects,
  getProjects,
  validateProjects,
} from "@/lib/content/projects";

describe("content integrity", () => {
  it("keeps project slugs unique", () => {
    const slugs = getProjects().map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a focused featured project set", () => {
    expect(getFeaturedProjects()).toHaveLength(4);
  });

  it("validates project content without integrity errors", () => {
    expect(validateProjects()).toEqual([]);
  });

  it("keeps home copy translated for all public locales", () => {
    for (const locale of locales) {
      expect(homeContent[locale].heading).toBe("Enes Yilmaz");
      expect(homeContent[locale].selectedWorkTitle).toBeTruthy();
      expect(homeContent[locale].contactTitle).toBeTruthy();
    }
  });

  it("does not expose confidential implementation markers in summaries", () => {
    const publicText = getProjects()
      .flatMap((project) =>
        locales.map((locale) => project.content[locale].summary),
      )
      .join(" ");

    expect(publicText.toLowerCase()).not.toContain("internal url");
    expect(publicText.toLowerCase()).not.toContain("private repository");
  });
});
