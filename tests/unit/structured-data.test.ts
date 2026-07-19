import { describe, expect, it } from "vitest";

import {
  createPersonJsonLd,
  createWebSiteJsonLd,
} from "@/lib/structured-data/schema";

describe("structured data", () => {
  it("creates basic Person and WebSite objects", () => {
    expect(createPersonJsonLd()).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Enes Yilmaz",
    });

    expect(createWebSiteJsonLd()).toMatchObject({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Enes Yilmaz",
    });
  });

  it("keeps mailto links out of schema sameAs", () => {
    const person = createPersonJsonLd();

    expect(person.sameAs).toEqual(
      expect.arrayContaining([
        "https://www.linkedin.com/in/enes-yilmaz-026249286",
        "https://github.com/enesy1845",
      ]),
    );
    expect(person.sameAs).not.toContain("mailto:enes.yilmaz1845@gmail.com");
  });
});
