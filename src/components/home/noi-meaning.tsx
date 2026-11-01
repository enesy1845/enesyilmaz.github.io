import { NoiLetter } from "@/components/brand/noi-letter";
import { Section } from "@/components/ui/section";
import { noiInterpretations, noiSectionContent } from "@/data/noi";
import { locales, type Locale } from "@/i18n/config";

type NoiMeaningProps = {
  locale: Locale;
  index: string;
};

/**
 * "What is NOI?" with a language-aware reading of the letters. The language
 * tabs are native radios (no JavaScript); CSS shows the checked language and,
 * where :has() is unsupported, every reading simply stays visible.
 */
export function NoiMeaning({ locale, index }: NoiMeaningProps) {
  const copy = noiSectionContent[locale];

  return (
    <Section className="home-noi" id="what-is-noi">
      <div className="noi-intro">
        <header className="noi-intro__heading">
          <p className="section-index">
            {index} / {copy.eyebrow}
          </p>
          <h2 id="noi-heading">{copy.title}</h2>
        </header>
        <div className="noi-intro__story">
          <p className="noi-intro__tagline">{copy.tagline}</p>
          <div className="noi-intro__copy">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="noi-meaning" role="group" aria-labelledby="noi-heading">
          <fieldset className="noi-meaning__tabs">
            <legend className="sr-only">{copy.languagePicker}</legend>
            {locales.map((option) => (
              <label className="noi-meaning__tab" key={option} lang={option}>
                <input
                  className="sr-only"
                  defaultChecked={option === locale}
                  name="noi-language"
                  type="radio"
                  value={option}
                />
                <span>{noiInterpretations[option].tab}</span>
              </label>
            ))}
          </fieldset>

          {locales.map((option) => {
            const reading = noiInterpretations[option];
            return (
              <div
                className="noi-meaning__panel"
                data-lang={option}
                key={option}
                lang={option}
              >
                <dl className="noi-meaning__letters">
                  {reading.letters.map((item, letterIndex) => (
                    <div className="noi-meaning__row" key={item.letter}>
                      <dt>
                        <span aria-hidden="true" className="noi-meaning__glyph">
                          <NoiLetter
                            character={item.letter.toLowerCase()}
                            dotPosition="top"
                          />
                        </span>
                        <span className="noi-meaning__caption">
                          <span
                            aria-hidden="true"
                            className="noi-meaning__step"
                          >
                            0{letterIndex + 1}
                          </span>
                          <span className="noi-meaning__word">{item.word}</span>
                        </span>
                      </dt>
                      <dd>{item.line}</dd>
                    </div>
                  ))}
                </dl>
                <p className="noi-meaning__motto">{reading.motto}</p>
              </div>
            );
          })}

          <p className="noi-meaning__note">{copy.meaningNote}</p>
        </div>
      </div>
    </Section>
  );
}
