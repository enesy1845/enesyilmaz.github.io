import { notFound } from "next/navigation";

// Unknown paths inside a locale (e.g. /tr/missing) render the localized
// [locale]/not-found.tsx instead of the English root fallback.
export default function MissingPage() {
  notFound();
}
