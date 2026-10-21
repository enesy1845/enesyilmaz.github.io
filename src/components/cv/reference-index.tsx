import { ExternalLink } from "@/components/ui/external-link";
import type { Reference } from "@/data/cv";
import type { Locale } from "@/i18n/config";

export function ReferenceIndex({
  entries,
  locale,
  documentLabel,
}: {
  entries: readonly Reference[];
  locale: Locale;
  documentLabel: string;
}) {
  return (
    <ul className="cv-reference-grid" role="list">
      {entries.map((reference, index) => (
        <li className="cv-reference" key={reference.key}>
          <span aria-hidden="true" className="cv-reference__number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="cv-reference__body">
            <h3>{reference.organization}</h3>
            <p className="cv-reference__field">{reference.field[locale]}</p>
            <p className="cv-reference__description">
              {reference.description[locale]}
            </p>
            {reference.documentUrl ? (
              <ExternalLink className="text-link" href={reference.documentUrl}>
                {documentLabel}
                <span aria-hidden="true" className="link-arrow">
                  ↗
                </span>
              </ExternalLink>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
