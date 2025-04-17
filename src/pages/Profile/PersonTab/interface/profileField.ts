export interface ProfileField {
  name: string
  value: string
  type?: string
  pattern?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
