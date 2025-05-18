export interface CrosswordPlaceWord {
  x: number
  y: number
  length: number
  direction: CrosswordDirection
  word?: string
  isCorrect?: boolean
}

export type CrosswordDirection = 'horizontal' | 'vertical'
