import Link from "next/link";

import "@/app/globals.css";

import { defaultLocale } from "@/i18n/config";
import en from "@/messages/en.json";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
          <h1 className="text-4xl font-semibold">{en.notFound.heading}</h1>
          <p className="mt-4 text-lg text-[var(--color-foreground-muted)]">
            {en.notFound.description}
          </p>
          <Link
            className="mt-8 inline-flex w-fit underline"
            href={`/${defaultLocale}`}
          >
            {en.notFound.homeLink}
          </Link>
        </main>
      </body>
    </html>
  );
}
