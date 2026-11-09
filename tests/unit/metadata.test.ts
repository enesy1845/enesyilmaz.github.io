import { describe, expect, it } from "vitest";

import { createLocalizedAlternates } from "@/lib/metadata/alternates";
import { routes } from "@/i18n/routing";

describe("metadata alternates", () => {
  it("generates canonical and alternate language URLs", () => {
    const alternates = createLocalizedAlternates("no", routes[4]);

    expect(alternates.canonical).toBe("http://localhost:3000/no/about");
    expect(alternates.languages).toMatchObject({
      en: "http://localhost:3000/en/about",
      no: "http://localhost:3000/no/about",
      tr: "http://localhost:3000/tr/about",
      "x-default": "http://localhost:3000/en/about",
    });
  });
});
