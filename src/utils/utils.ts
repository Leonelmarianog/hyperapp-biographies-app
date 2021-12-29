// eslint-disable-next-line import/prefer-default-export
export const fromSpaceSeparatedToHyphenSeparated = (string: string) =>
  string.trim().replace(/\s+/g, '-').toLowerCase();
