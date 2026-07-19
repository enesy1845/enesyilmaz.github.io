import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { MainNavigation } from "@/components/navigation/main-navigation";
import en from "@/messages/en.json";
import no from "@/messages/no.json";

describe("navigation shell", () => {
  it("renders translated navigation labels", () => {
    render(<MainNavigation dictionary={no} locale="no" />);

    expect(screen.getByRole("link", { name: "Hjem" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Arbeid" })).toHaveAttribute(
      "href",
      "/no/work",
    );
  });

  it("renders all language options", () => {
    render(<LanguageSwitcher dictionary={en} locale="en" />);

    expect(screen.getByRole("link", { name: /English/ })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(screen.getByRole("link", { name: "Norsk" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Türkçe" })).toBeInTheDocument();
  });
});
