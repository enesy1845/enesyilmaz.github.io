import type { CSSProperties } from "react";

type InkRevealProps = {
  text: string;
  className?: string;
};

/**
 * A statement whose words darken from muted to ink, one after another, as
 * it scrolls through the viewport (CSS scroll-driven animation, see
 * home.css). Without support, or with reduced motion, it is plain text.
 */
export function InkReveal({ text, className = "" }: InkRevealProps) {
  const words = text.split(/\s+/).filter(Boolean);
  const last = Math.max(1, words.length - 1);

  return (
    <p className={`ink-reveal ${className}`}>
      {words.map((word, index) => (
        <span
          className="ink-reveal__word"
          key={`${word}-${index}`}
          // Position along the sentence drives each word's scroll range.
          style={{ "--p": (index / last).toFixed(3) } as CSSProperties}
        >
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
