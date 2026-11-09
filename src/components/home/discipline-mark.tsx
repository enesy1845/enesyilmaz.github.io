type DisciplineMarkProps = {
  kind: "work" | "notes" | "atelier";
};

/** Connected systems, intersecting ideas and concentric tool marks.
 * Static decoration; the companion link supplies the semantic label. */
export function DisciplineMark({ kind }: DisciplineMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={`discipline-mark discipline-mark--${kind}`}
      fill="none"
      viewBox="0 0 240 160"
    >
      <g
        className={kind === "work" ? "discipline-mark__paths" : undefined}
        stroke="currentColor"
        strokeWidth="1.2"
      >
        {kind === "work" ? (
          <>
            <path d="M32 44h52l72 72h52M32 80h176M32 116h52l72-72h52" />
            {[44, 80, 116].map((y) => (
              <g key={y}>
                <circle cx="28" cy={y} r="4" />
                <circle cx="212" cy={y} r="4" />
              </g>
            ))}
          </>
        ) : kind === "notes" ? (
          <>
            <circle
              className="discipline-mark__idea-a"
              cx="96"
              cy="80"
              r="46"
            />
            <circle
              className="discipline-mark__idea-b"
              cx="144"
              cy="80"
              r="46"
            />
            <path d="M120 22v116M44 80h152" strokeDasharray="2 6" />
          </>
        ) : (
          <>
            {[18, 28, 38, 48, 58].map((r) => (
              <circle cx="120" cy="80" key={r} r={r} />
            ))}
            <path
              className="discipline-mark__hand"
              d="m120 80 43-43M120 80v28"
            />
          </>
        )}
      </g>
    </svg>
  );
}
