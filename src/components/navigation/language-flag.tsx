import type { Locale } from "@/i18n/config";

/** Decorative round flag for a locale; the accessible name comes from text. */
export function LanguageFlag({ locale }: { locale: Locale }) {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 overflow-hidden rounded-full ring-1 ring-[var(--color-border-strong)]"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <g>
        {locale === "en" && (
          <>
            <rect fill="#012169" height="24" width="24" />
            <path d="M0 0 24 24M24 0 0 24" stroke="#fff" strokeWidth="5" />
            <path d="M0 0 24 24M24 0 0 24" stroke="#c8102e" strokeWidth="1.6" />
            <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="7" />
            <path d="M12 0v24M0 12h24" stroke="#c8102e" strokeWidth="4" />
          </>
        )}
        {locale === "no" && (
          <>
            <rect fill="#ba0c2f" height="24" width="24" />
            <path d="M9 0v24M0 12h24" stroke="#fff" strokeWidth="6" />
            <path d="M9 0v24M0 12h24" stroke="#00205b" strokeWidth="3" />
          </>
        )}
        {locale === "tr" && (
          <>
            <rect fill="#e30a17" height="24" width="24" />
            <circle cx="10" cy="12" fill="#fff" r="5.5" />
            <circle cx="11.4" cy="12" fill="#e30a17" r="4.4" />
            <path
              d="M14.1 12 15.62 11.51 15.62 9.91 16.56 11.2 18.08 10.71 17.14 12 18.08 13.29 16.56 12.8 15.62 14.09 15.62 12.49Z"
              fill="#fff"
            />
          </>
        )}
      </g>
    </svg>
  );
}
