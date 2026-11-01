import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import sitemap from "@/app/sitemap";
import { notes } from "@/lib/content/notes";
import {
  certifications,
  cvDocument,
  education,
  references,
  timeline,
} from "@/data/cv";
import { locales } from "@/i18n/config";
import {
  getProjectBySlug,
  getProjects,
  validateProjects,
} from "@/lib/content/projects";

describe("cv and content data", () => {
  it("keeps every project valid, with real links only", () => {
    expect(validateProjects()).toEqual([]);
    for (const project of getProjects()) {
      expect(project.externalUrl ?? "https://ok").not.toContain("#");
    }
  });

  it("links timeline entries only to existing projects", () => {
    for (const entry of timeline) {
      for (const slug of entry.projects ?? []) {
        expect(getProjectBySlug(slug), slug).toBeDefined();
      }
    }
  });

  it("never claims an unearned degree or an active expired credential", () => {
    const text = JSON.stringify([timeline, education, certifications]);
    expect(text).not.toMatch(/B\.?Sc/i);
    expect(text).not.toMatch(/degree|bachelor|lisans|grad/i);
    expect(text).not.toMatch(/\bactive\b/i);
  });

  it("provides a real English PDF and descriptive filename", () => {
    expect(cvDocument.fileName).toBe("Enes-Yilmaz-CV-EN.pdf");
    const file = readFileSync(resolve(`public${cvDocument.href}`));
    expect(file.subarray(0, 5).toString()).toBe("%PDF-");
    expect(file.length).toBeGreaterThan(5000);
  });

  it("keeps reference documents hidden until approved files exist", () => {
    for (const reference of references) {
      expect(reference.documentUrl).toBeUndefined();
    }
  });

  it("lists the CV, every project and every note in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const locale of locales) {
      expect(urls).toContain(`http://localhost:3000/${locale}/cv`);
    }
    expect(urls).toContain("http://localhost:3000/en/work/snap360-photography");
    for (const note of notes) {
      expect(urls).toContain(
        `http://localhost:3000/${note.language}/notes/${note.slug}`,
      );
    }
  });
});
