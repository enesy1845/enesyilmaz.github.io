import type { JsonLd } from "@/lib/structured-data/schema";

type StructuredDataProps = {
  data: JsonLd | JsonLd[];
};

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
