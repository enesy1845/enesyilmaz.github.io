import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button, ButtonLink } from "@/components/ui/button";
import en from "@/messages/en.json";

describe("shared layout", () => {
  it("links the header identity to the active locale homepage", () => {
    render(<SiteHeader dictionary={en} locale="tr" />);

    expect(screen.getByRole("link", { name: /Enes Yilmaz/ })).toHaveAttribute(
      "href",
      "/tr",
    );
  });

  it("renders verified footer social links", () => {
    render(<SiteFooter dictionary={en} locale="en" />);

    expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
      "href",
      "mailto:enes.yilmaz1845@gmail.com",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/enes-yilmaz-026249286",
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/enesy1845",
    );
  });

  it("preserves button and link semantics", () => {
    render(
      <>
        <Button>Action</Button>
        <ButtonLink href="/en/work">Navigate</ButtonLink>
      </>,
    );

    expect(screen.getByRole("button", { name: "Action" })).toHaveAttribute(
      "type",
      "button",
    );
    expect(screen.getByRole("link", { name: "Navigate" })).toHaveAttribute(
      "href",
      "/en/work",
    );
  });

  it("opens and closes the mobile menu through controls", () => {
    render(<SiteHeader dictionary={en} locale="en" />);

    const openButton = screen.getByRole("button", {
      name: en.accessibility.openMenu,
    });
    expect(openButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(openButton);
    expect(openButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(
      screen.getByRole("button", { name: en.accessibility.closeMenu }),
    );
    expect(openButton).toHaveAttribute("aria-expanded", "false");
  });
});
