import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  container?: "standard" | "wide" | "reading";
};

export function Section({
  children,
  className = "",
  container = "standard",
}: SectionProps) {
  return (
    <section className={`py-[var(--space-section)] ${className}`}>
      <Container size={container}>{children}</Container>
    </section>
  );
}
