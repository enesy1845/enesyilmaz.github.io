"use client";

import { useEffect, useRef, useState } from "react";

type CopyEmailProps = {
  email: string;
  labels: { copyEmail: string; emailCopied: string; emailCopyFailed: string };
};

/** Clipboard is an explicit enhancement; the adjacent mailto link always works. */
export function CopyEmail({ email, labels }: CopyEmailProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    buttonRef.current?.removeAttribute("hidden");
    return () => clearTimeout(resetRef.current);
  }, []);

  async function copy() {
    clearTimeout(resetRef.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
      resetRef.current = setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("failed");
    }
  }

  return (
    <span className="copy-email">
      <button hidden onClick={copy} ref={buttonRef} type="button">
        <svg
          aria-hidden="true"
          fill="none"
          height="16"
          viewBox="0 0 16 16"
          width="16"
        >
          {status === "copied" ? (
            <path d="m3 8 3 3 7-7" stroke="currentColor" strokeWidth="1.25" />
          ) : (
            <g stroke="currentColor" strokeWidth="1.25">
              <rect height="9" rx="1" width="8" x="5" y="5" />
              <path d="M10 3V2H2v9h1" />
            </g>
          )}
        </svg>
        {labels.copyEmail}
      </button>
      <span className="copy-email__status" role="status">
        {status === "copied"
          ? labels.emailCopied
          : status === "failed"
            ? labels.emailCopyFailed
            : ""}
      </span>
    </span>
  );
}
