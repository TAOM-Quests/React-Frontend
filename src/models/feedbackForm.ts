import { FeedbackQuestion } from './feedbackQuestion'

export interface FeedbackForm {
  id: number
  name: string
  entityId: number
  description: string
  entityName: FeedbackEntity
  questions: FeedbackQuestion[]
}

export type FeedbackEntity = 'events' | 'quests'
