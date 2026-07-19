import type { AnchorHTMLAttributes, ReactNode } from "react";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
};

export function ExternalLink({
  children,
  href,
  rel,
  target,
  ...props
}: ExternalLinkProps) {
  const safeTarget = target ?? "_blank";
  const safeRel =
    rel ?? (safeTarget === "_blank" ? "noreferrer noopener" : undefined);

  return (
    <a href={href} rel={safeRel} target={safeTarget} {...props}>
      {children}
    </a>
  );
}
