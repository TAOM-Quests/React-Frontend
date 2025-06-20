import { FeedbackQuestion } from '../../../../../models/feedbackQuestion'

export interface FeedbackFromGetDto {
  entityId: number
  entityName: string
}

export interface FeedbackFromCreateDto {
  name: string
  entityId: number
  entityName: string
  description: string
  questions: FeedbackQuestion[]
}

export interface FeedbackFromUpdateDto {
  id: number
  questions: FeedbackQuestion[]
  name?: string
  description?: string
}

export interface FeedbackAnswerGetDto {
  userId?: number
  entityId?: number
  entityName?: string
}

export interface FeedbackAnswerCreateDto {
  formId: number
  userId: number
  answers: string[]
}
