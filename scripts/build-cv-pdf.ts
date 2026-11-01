import { mkdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { chromium } from "@playwright/test";

import {
  additionalLearning,
  certifications,
  cvDocument,
  cvPageCopy,
  education,
  skillGroups,
  timeline,
} from "../src/data/cv.ts";
import { socialLinks } from "../src/config/social.ts";
import type { Dictionary } from "../src/i18n/types.ts";

// No network, application server or runtime PDF library. The same reviewed
// content powers the page and this static, tagged, selectable-text document.
const escape = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character] ?? character;
  });

async function documentHtml() {
  const locale = "en";
  const dictionary = JSON.parse(
    await readFile(resolve(`src/messages/${locale}.json`), "utf8"),
  ) as Dictionary;
  const copy = cvPageCopy[locale];
  const credentials = (items: typeof certifications) =>
    items
      .map(
        (item) =>
          `<article><h3>${escape(item.name)}</h3><p>${escape(item.issuer)}${item.note ? ` · ${escape(item.note[locale])}` : ""}</p></article>`,
      )
      .join("");

  return `<!doctype html><html lang="${locale}"><head><meta charset="utf-8">
    <title>${escape(dictionary.site.name)} — CV (${locale.toUpperCase()})</title>
    <style>
      @page { size: A4; margin: 14mm 17mm 17mm; }
      * { box-sizing: border-box; }
      body { margin: 0; color: #161e1d; font: 9.5pt/1.35 Arial, sans-serif; }
      header { padding-bottom: 5mm; border-bottom: 1pt solid #161e1d; }
      h1 { font-size: 27pt; letter-spacing: -0.7pt; margin: 0; }
      .role { font-size: 13pt; margin-top: 1mm; }
      .links { margin-top: 3mm; font-size: 8.5pt; }
      a { color: inherit; text-decoration: none; }
      .links a { display: inline-block; margin-right: 4mm; }
      h2 { margin: 4mm 0 2mm; padding-top: 2mm; border-top: 0.5pt solid #b4bdb7; font-size: 13pt; break-after: avoid; }
      h3 { font-size: 10pt; margin: 0; }
      p { margin: 1mm 0 0; orphans: 3; widows: 3; }
      article { margin-bottom: 2mm; break-inside: avoid; }
      section:not(:first-of-type) { break-inside: avoid; }
      .meta { color: #444; font-size: 9pt; }
      .summary { margin-top: 4mm; }
      .skill { margin-bottom: 2mm; }
    </style></head><body>
    <header><h1>${escape(dictionary.site.name)}</h1>
      <p class="role">${escape(dictionary.site.role)}</p>
      <p>${escape(dictionary.footer.location)}</p>
      <p class="links">${socialLinks
        .filter((link) => ["email", "linkedin", "github"].includes(link.key))
        .map(
          (link) =>
            `<a href="${escape(link.href)}">${escape(link.description)}</a>`,
        )
        .join(" ")}</p>
    </header>
    <p class="summary">${escape(dictionary.site.description)}</p>
    <section><h2>${escape(copy.timelineTitle)}</h2>
    ${timeline
      .map(
        (entry) => `<article>
      <p class="meta">${escape(entry.period)} · ${escape(copy.kinds[entry.kind])}</p>
      <h3>${escape(entry.role[locale])}</h3>
      <p>${escape(entry.organization[locale])}${entry.detail ? ` · ${escape(entry.detail[locale])}` : ""}</p>
      ${entry.description ? `<p>${escape(entry.description[locale])}</p>` : ""}
    </article>`,
      )
      .join("")}</section>
    <section><h2>${escape(copy.skillsTitle)}</h2>
    ${skillGroups.map((group) => `<p class="skill"><strong>${escape(group.title[locale])}:</strong> ${escape(group.skills.join(", "))}</p>`).join("")}</section>
    <section><h2>${escape(copy.educationTitle)}</h2>
    ${education.map((entry) => `<article><h3>${escape(entry.title[locale])}</h3><p>${escape(entry.detail[locale])}</p></article>`).join("")}</section>
    <section><h2>${escape(copy.certificationsTitle)}</h2>${credentials(certifications)}</section>
    <section><h2>${escape(copy.additionalLearning)}</h2>
    ${additionalLearning.map((item) => `<p class="meta"><strong>${escape(item.name)}</strong> · ${escape(item.issuer)}</p>`).join("")}</section>
    </body></html>`;
}

await mkdir(resolve("public/documents"), { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.setContent(await documentHtml());
  await page.pdf({
    path: resolve(`public${cvDocument.href}`),
    preferCSSPageSize: true,
    tagged: true,
    outline: true,
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: `<div style="width:100%;text-align:center;font:8px Arial;color:#555">Enes Yılmaz · CV · EN · <span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
  });
  await page.close();
  console.log(`Generated ${cvDocument.fileName}`);
} finally {
  await browser.close();
}
