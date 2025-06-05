import { FeedbackQuestion } from './feedbackQuestion'

export interface FeedbackForm {
  id: number
  title: string
  entityId: number
  description: string
  questions: FeedbackQuestion[]
  entityName: FeedbackFormEntities
}

export type FeedbackFormEntities = 'events' | 'quests'
