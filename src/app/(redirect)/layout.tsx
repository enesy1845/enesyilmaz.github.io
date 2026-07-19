import type { ReactNode } from "react";

import "@/app/globals.css";

type RedirectLayoutProps = {
  children: ReactNode;
};

export default function RedirectLayout({ children }: RedirectLayoutProps) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
