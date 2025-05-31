export type QuestionType = 'rating' | 'radio' | 'scale' | 'text'

export interface Question {
  type: QuestionType
  question: string
  answers?: string[]
}

export interface FeedbackForm {
  id?: number
  entity: string
  entity_id: number | null
  title?: string
  description?: string
  questions: Question[]
}

export interface FeedbackAnswer {
  id: number
  answers: string[]
  user_id: number
  form_id: number
}
