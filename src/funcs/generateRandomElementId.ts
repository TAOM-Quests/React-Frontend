export const generateRandomElementId = (idPrefix: string) =>
  `${idPrefix}-${Math.random().toString(36).substr(2, 9)}`
