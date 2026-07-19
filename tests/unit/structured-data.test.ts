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
});
