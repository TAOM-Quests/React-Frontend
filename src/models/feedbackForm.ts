import { FeedbackQuestion } from './feedbackQuestion'

export interface FeedbackForm {
  id: number
  title: string
  entityId: number
  entityName: string
  description: string
  questions: FeedbackQuestion[]
}
