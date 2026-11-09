import { NOI_DOT_VIEWBOX_WIDTH } from "@/components/brand/noi-motion.utils";

/** Exact vector outlines from the supplied Axis Refined v4 specimen. */
export function NoiLetter({
  character,
  dotPosition = "bottom",
}: {
  character: string;
  dotPosition?: "top" | "bottom";
}) {
  const isI = character === "i";
  // Include the complete orbit, so the circle cannot clip at the right edge.
  const width = isI ? NOI_DOT_VIEWBOX_WIDTH : character === "n" ? 709 : 707;

  return (
    <svg
      aria-hidden="true"
      data-noi-letter={character}
      className="noi-letter"
      viewBox={`0 -230 ${width} 1340`}
      width={`${width / 1000}em`}
      height="1.34em"
      focusable="false"
    >
      {character === "n" && (
        <path
          d="M27 0V671L43 687H205V609C263 677 344 714 430 714C581 714 667 613 667 447V0H490V418C490 496 449 543 370 543C275 543 205 478 205 386V0Z"
          transform="translate(-27 790) scale(1 -1)"
        />
      )}
      {character === "o" && (
        <path
          d="M349 708C470 708 558 686 615 630C676 571 704 487 704 352C704 218 676 135 615 76C558 20 469 -10 349 -10C228 -10 138 20 81 76C20 135 -8 218 -8 352C-8 487 20 571 81 630C139 686 227 708 349 708ZM349 532C243 532 169 477 169 352C169 227 243 166 349 166C454 166 527 227 527 352C527 477 454 532 349 532Z"
          transform="translate(8 790) scale(1 -1)"
        />
      )}
      {isI && (
        <path
          d="M33 0V704C75.48 704 79.02 652 121.5 652C163.98 652 167.52 704 210 704V0C167.52 0 163.98 52 121.5 52C79.02 52 75.48 0 33 0Z"
          transform="translate(0 790) scale(1 -1)"
        />
      )}
      {isI && (
        <circle
          data-noi-dot=""
          cx="121.5"
          cy={dotPosition === "top" ? -56 : 891}
          r="87"
        />
      )}
    </svg>
  );
}
