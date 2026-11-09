import Markdoc from "@markdoc/markdoc";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NoteBody } from "@/components/notes/note-body";

function compile(source: string) {
  return JSON.parse(JSON.stringify(Markdoc.transform(Markdoc.parse(source))));
}

describe("NoteBody", () => {
  it("renders admin rich text as a single article", () => {
    const { container } = render(
      <NoteBody body={compile("Intro\n\n## Heading\n\n- one\n- two")} />,
    );

    expect(container.querySelectorAll("article")).toHaveLength(1);
    expect(container.querySelector("h2")?.textContent).toBe("Heading");
    expect(container.querySelectorAll("li")).toHaveLength(2);
  });

  it("does not render raw HTML from content", () => {
    const { container } = render(
      <NoteBody body={compile("<script>alert(1)</script>")} />,
    );

    expect(container.querySelector("script")).toBeNull();
  });
});
