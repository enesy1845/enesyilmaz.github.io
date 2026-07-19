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

  it("renders all route labels", () => {
    render(<MainNavigation dictionary={en} locale="en" />);

    for (const label of [
      "Home",
      "Work",
      "Notes",
      "Atelier",
      "About",
      "Contact",
    ]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("marks the current page semantically", () => {
    render(<MainNavigation dictionary={en} locale="en" />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "aria-current",
      "page",
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
