import { describe, expect, it } from "vitest";

import { dictionaries } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/config";
import { createLocalePath, switchLocalePath } from "@/i18n/routing";

function flattenKeys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, nested]) =>
    flattenKeys(nested, prefix ? `${prefix}.${key}` : key),
  );
}

describe("locale configuration", () => {
  it("contains the supported public locales", () => {
    expect(locales).toEqual(["en", "no", "tr"]);
  });

  it("rejects unsupported locales", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("de")).toBe(false);
  });

  it("keeps translation key structures aligned", () => {
    const expectedKeys = flattenKeys(dictionaries.en).sort();

    expect(flattenKeys(dictionaries.no).sort()).toEqual(expectedKeys);
    expect(flattenKeys(dictionaries.tr).sort()).toEqual(expectedKeys);
  });

  it("generates locale-aware paths", () => {
    expect(createLocalePath("en")).toBe("/en");
    expect(createLocalePath("no", "about")).toBe("/no/about");
    expect(switchLocalePath("/en/contact", "tr")).toBe("/tr/contact");
  });
});
