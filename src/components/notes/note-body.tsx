import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import React from "react";

type NoteBodyProps = {
  body: RenderableTreeNode;
};

/**
 * Renders the Markdoc tree compiled at build time. Markdoc emits React
 * elements, never raw HTML, so editor content cannot inject markup.
 */
export function NoteBody({ body }: NoteBodyProps) {
  // Markdoc wraps documents in <article>; this component is the article.
  const content =
    Markdoc.Tag.isTag(body) && body.name === "article" ? body.children : body;

  return (
    <article className="note-body">
      {Markdoc.renderers.react(content, React)}
    </article>
  );
}
