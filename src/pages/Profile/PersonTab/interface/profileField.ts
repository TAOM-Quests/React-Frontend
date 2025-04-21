import { ForwardedRef, MutableRefObject } from 'react'

export interface ProfileField {
  name: string
  value: string
  type?: string
  pattern?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
  ref?: MutableRefObject<HTMLInputElement> | ForwardedRef<HTMLInputElement>
}
