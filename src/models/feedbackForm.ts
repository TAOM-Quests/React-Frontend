import { FeedbackQuestion } from './feedbackQuestion'

export interface FeedbackForm {
  id: number
  title: string
  entityId: number
  description: string
  entityName: FeedbackEntity
  questions: FeedbackQuestion[]
}

export type FeedbackEntity = 'events' | 'quests'
