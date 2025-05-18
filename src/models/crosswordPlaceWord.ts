export interface CrosswordPlaceWord {
  x: number
  y: number
  length: number
  question: string
  direction: CrosswordDirection
  isCorrect?: boolean
}

export type CrosswordDirection = 'horizontal' | 'vertical'
