import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  container?: "standard" | "wide" | "reading";
  id?: string;
  tone?: "inverse";
};

export function Section({
  children,
  className = "",
  container = "standard",
  id,
  tone,
}: SectionProps) {
  return (
    <section
      className={`py-[var(--space-section)] ${className}`}
      data-header-tone={tone}
      id={id}
    >
      <Container size={container}>{children}</Container>
    </section>
  );
}
