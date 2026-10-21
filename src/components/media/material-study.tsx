import type { AtelierArea } from "@/data/supporting-content";

/** Abstract material studies, never photographs or claims of completed craft work. */
export function MaterialStudy({ kind }: { kind: AtelierArea["key"] }) {
  return (
    <svg
      aria-hidden="true"
      className={`material-study material-study--${kind}`}
      fill="none"
      viewBox="0 0 480 320"
    >
      <g stroke="currentColor" strokeWidth="1.2">
        {kind === "tesbih" ? (
          <>
            {Array.from({ length: 16 }, (_, index) => {
              const angle = (index / 16) * Math.PI * 2;
              return (
                <circle
                  cx={Math.round(240 + Math.cos(angle) * 112)}
                  cy={Math.round(150 + Math.sin(angle) * 82)}
                  key={index}
                  r="12"
                />
              );
            })}
            <path d="M240 244v34m-12-18 12 18 12-18" />
          </>
        ) : kind === "wood" ? (
          <>
            {Array.from({ length: 10 }, (_, index) => (
              <path
                d={`M${30 + index * 20} 280C${-20 + index * 22} 160 ${280 + index * 10} 220 ${170 + index * 24} 40`}
                key={index}
              />
            ))}
          </>
        ) : kind === "watches" ? (
          <>
            <circle cx="240" cy="160" r="104" />
            <circle cx="240" cy="160" r="94" />
            {Array.from({ length: 12 }, (_, index) => (
              <path
                d="M240 74v10"
                key={index}
                transform={`rotate(${index * 30} 240 160)`}
              />
            ))}
            <path d="m192 125 48 35 47-67" />
            <circle cx="240" cy="160" r="4" />
          </>
        ) : (
          <>
            <rect height="152" width="242" x="120" y="84" />
            <path d="M120 84h-20v-20m242 172h20v20M240 54v30M90 160h30M240 236v30M362 160h30" />
            <path d="m208 119 77 41-77 41z" />
          </>
        )}
      </g>
    </svg>
  );
}
