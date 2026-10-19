export type WordmarkLetter = {
  character: string;
  index: number;
};

/**
 * Splits a display name into uppercase words of indexed letters. The hero and
 * the header both render the wordmark from this so their letters pair up
 * one-to-one for the scroll docking transition. Uppercasing uses a fixed
 * locale so "Yilmaz" never becomes "YİLMAZ" on Turkish pages.
 */
export function getWordmarkWords(name: string): WordmarkLetter[][] {
  let index = 0;

  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) =>
      Array.from(word.toLocaleUpperCase("en-US")).map((character) => ({
        character,
        index: index++,
      })),
    );
}
