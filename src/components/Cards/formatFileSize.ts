export const formatFileSize = (size: number): string => {
  if (size < 1024) return `${size} Б`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} КБ`
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(1)} МБ`
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} ГБ`
}
