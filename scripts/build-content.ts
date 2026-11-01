/**
 * Compiles the Keystatic content in ./content into src/content/generated.ts.
 *
 * The site reads only the generated module, so pages stay fully static and
 * the Cloudflare Worker never touches a filesystem. Invalid content fails the
 * build here, which keeps the last good deployment online.
 *
 *   node --experimental-strip-types scripts/build-content.ts          generate once
 *   node --experimental-strip-types scripts/build-content.ts --dev    generate, watch, run `next dev [args]`
 */
import { spawn, spawnSync } from "node:child_process";
import { watch } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import { createReader } from "@keystatic/core/reader";

import keystaticConfig from "../keystatic.config.ts";

const locales = ["en", "no", "tr"] as const;
type Locale = (typeof locales)[number];

const root = process.cwd();
const outputFile = path.join(root, "src/content/generated.ts");

/** Drops empty strings and lists so optional fields stay truly optional. */
function compact(input: Record<string, unknown>) {
  const output: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (typeof value === "string" && value.trim()) output[key] = value.trim();
    if (Array.isArray(value)) {
      const items = value.map((item) => String(item).trim()).filter(Boolean);
      if (items.length) output[key] = items;
    }
  }
  return output;
}

function countWords(node: RenderableTreeNode | RenderableTreeNode[]): number {
  if (typeof node === "string")
    return node.split(/\s+/u).filter(Boolean).length;
  if (Array.isArray(node)) {
    return node.reduce<number>((sum, child) => sum + countWords(child), 0);
  }
  if (Markdoc.Tag.isTag(node)) return countWords(node.children);
  return 0;
}

const reader = createReader(root, keystaticConfig);

async function readProjects() {
  const errors: string[] = [];
  const entries = (await reader.collections.projects.all())
    .filter(({ entry }) => !entry.draft)
    .sort(
      (a, b) =>
        (a.entry.order ?? 0) - (b.entry.order ?? 0) ||
        a.slug.localeCompare(b.slug),
    );

  const projects = entries.map(({ slug, entry }) => {
    const content = Object.fromEntries(
      locales.map((locale) => [locale, compact(entry[locale])]),
    ) as Record<Locale, Record<string, unknown>>;
    const availableLocales = locales.filter(
      (locale) =>
        content[locale].title &&
        content[locale].summary &&
        content[locale].role,
    );

    if (!availableLocales.includes("en")) {
      errors.push(`${slug}: English title, summary and role are required.`);
    }
    if (entry.coverImage) {
      for (const locale of availableLocales) {
        if (!content[locale].imageAlt)
          errors.push(`${slug}: ${locale} cover image alt text is missing.`);
      }
    }
    // Every locale key must exist for the type; consumers only render
    // locales listed in availableLocales, so this copy is never shown.
    for (const locale of locales) {
      if (!availableLocales.includes(locale)) content[locale] = content.en;
    }

    return {
      slug,
      category: entry.category,
      technologies: entry.technologies
        .map((item) => item.trim())
        .filter(Boolean),
      disciplines: entry.disciplines.map((item) => item.trim()).filter(Boolean),
      featured: entry.featured,
      ...(entry.confidential ? { confidential: true } : {}),
      ...(entry.externalUrl ? { externalUrl: entry.externalUrl } : {}),
      ...(entry.repositoryUrl ? { repositoryUrl: entry.repositoryUrl } : {}),
      ...(entry.coverImage ? { coverImage: entry.coverImage } : {}),
      availableLocales,
      content,
    };
  });

  const featured = projects.filter((project) => project.featured).length;
  if (featured < 3 || featured > 5) {
    errors.push(`Expected 3-5 featured projects, found ${featured}.`);
  }
  return { projects, errors };
}

async function readNotes() {
  const entries = await reader.collections.notes.all({
    resolveLinkedFiles: true,
  });

  return entries
    .filter(({ entry }) => !entry.draft)
    .map(({ slug, entry }) => {
      const body = Markdoc.transform(entry.body.node);
      return {
        slug,
        language: entry.language,
        title: entry.title,
        description: entry.description.trim(),
        category: entry.category.trim(),
        publishedAt: entry.publishedAt ?? "",
        ...(entry.externalUrl ? { externalUrl: entry.externalUrl } : {}),
        readingMinutes: Math.max(1, Math.ceil(countWords(body) / 200)),
        body,
      };
    })
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

async function generate() {
  const [{ projects, errors }, notes] = await Promise.all([
    readProjects(),
    readNotes(),
  ]);

  if (errors.length) {
    throw new Error(`Content validation failed:\n- ${errors.join("\n- ")}`);
  }

  // Round-trip through JSON so Markdoc Tag instances become plain data.
  const source = `// Generated by scripts/build-content.ts from ./content. Do not edit.
import type { Note } from "@/types/note";
import type { Project } from "@/types/project";

export const projects: readonly Project[] = ${JSON.stringify(projects, null, 2)};

export const notes: readonly Note[] = ${JSON.stringify(JSON.parse(JSON.stringify(notes)), null, 2)};
`;
  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, source);
  console.log(`content: ${projects.length} projects, ${notes.length} notes`);

  // Keep the readable copy in docs/content/site-content.md in step.
  spawnSync(
    process.execPath,
    [
      "--experimental-strip-types",
      "--no-warnings=ExperimentalWarning",
      path.join(root, "scripts/build-content-doc.ts"),
    ],
    { stdio: "inherit" },
  );
}

await generate();

if (process.argv.includes("--dev")) {
  let timer: NodeJS.Timeout | undefined;
  watch(path.join(root, "content"), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      generate().catch((error: unknown) => console.error(String(error)));
    }, 150);
  });

  const nextBin = createRequire(import.meta.url).resolve("next/dist/bin/next");
  const nextArgs = process.argv.slice(2).filter((arg) => arg !== "--dev");
  const child = spawn(process.execPath, [nextBin, "dev", ...nextArgs], {
    stdio: "inherit",
  });
  child.on("exit", (code) => process.exit(code ?? 0));
}
