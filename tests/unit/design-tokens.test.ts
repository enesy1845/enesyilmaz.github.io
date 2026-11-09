import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const requiredTokens = [
  "--color-background",
  "--color-background-elevated",
  "--color-surface",
  "--color-surface-muted",
  "--color-foreground",
  "--color-foreground-muted",
  "--color-foreground-subtle",
  "--color-border",
  "--color-border-strong",
  "--color-accent",
  "--color-accent-hover",
  "--color-accent-foreground",
  "--color-focus",
  "--color-selection",
  "--color-success",
  "--color-warning",
  "--color-error",
  "--font-sans",
  "--font-serif",
  "--font-mono",
  "--space-section",
  "--layout-max",
  "--layout-wide",
  "--layout-reading",
  "--duration-fast",
  "--ease-standard",
] as const;

describe("design tokens", () => {
  it("defines the required semantic token foundation", () => {
    const tokenFile = readFileSync(
      join(process.cwd(), "src/styles/tokens.css"),
      "utf8",
    );

    for (const token of requiredTokens) {
      expect(tokenFile).toContain(token);
    }
  });
});
