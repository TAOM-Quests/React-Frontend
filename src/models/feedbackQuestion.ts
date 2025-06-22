export interface FeedbackQuestion {
  question: string
  type: FeedbackQuestionType
  answers?: string[]
}

export type FeedbackQuestionType = 'rating' | 'radio' | 'scale' | 'text'
