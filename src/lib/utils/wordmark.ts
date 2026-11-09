export type WordmarkLetter = {
  character: string;
  index: number;
};

/**
 * Splits a display name into words of indexed letters, preserving brand case. The hero and
 * the header both render the wordmark from this so their letters pair up
 * one-to-one for the scroll docking transition.
 */
export function getWordmarkWords(name: string): WordmarkLetter[][] {
  let index = 0;

  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) =>
      Array.from(word).map((character) => ({
        character,
        index: index++,
      })),
    );
}
