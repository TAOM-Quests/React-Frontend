export const getTwoShortestTags = (tags: string[]): string[] =>
  tags
    .slice()
    .sort((a, b) => a.length - b.length)
    .slice(0, 2)
