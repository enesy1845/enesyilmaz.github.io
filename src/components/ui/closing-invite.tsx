import Link from "next/link";
import type { ReactNode } from "react";
import { Section } from "@/components/ui/section";

type InviteLink = { href: string; label: string };

/** A shared editorial closing for the profile and professional journey. */
export function ClosingInvite({
  title,
  description,
  primary,
  secondary,
  meta,
}: {
  title: string;
  description: string;
  primary: InviteLink;
  secondary?: InviteLink;
  meta?: ReactNode;
}) {
  return (
    <Section className="closing-invite" tone="inverse">
      <div className="closing-invite__layout">
        <h2>{title}</h2>
        <div className="closing-invite__body">
          <p>{description}</p>
          <Link className="closing-invite__action" href={primary.href}>
            <span>{primary.label}</span>
            <span aria-hidden="true" className="closing-invite__arrow">
              ↗
            </span>
          </Link>
          {secondary ? (
            <Link className="text-link" href={secondary.href}>
              {secondary.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ) : null}
        </div>
      </div>
      {meta ? <div className="closing-invite__meta">{meta}</div> : null}
    </Section>
  );
}
