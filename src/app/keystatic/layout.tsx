import type { Metadata } from "next";

import { KeystaticAdmin } from "./keystatic-admin";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

/** The admin panel owns its whole document; site styles are not loaded. */
export default function KeystaticLayout() {
  return (
    <html lang="en">
      <body>
        <KeystaticAdmin />
      </body>
    </html>
  );
}
