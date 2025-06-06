import { FeedbackForm } from '../../../../../models/feedbackForm'
import { commonModule } from '../../commonModule'
import {
  FeedbackAnswerCreateDto,
  FeedbackAnswerGetDto,
  FeedbackFromCreateDto,
  FeedbackFromGetDto,
  FeedbackFromUpdateDto,
} from './feedbackDto'
import { FeedbackAnswer } from '../../../../../models/feedbackAnswer'

const FEEDBACK_PREFIX = 'feedback/'

export const feedback = {
  getForm: ({
    entityId,
    entityName,
  }: FeedbackFromGetDto): Promise<FeedbackForm> =>
    commonModule<FeedbackForm, null>(
      `${FEEDBACK_PREFIX}forms/${entityName}/${entityId}`,
    ),

  createFrom: (feedbackForm: FeedbackFromCreateDto): Promise<FeedbackForm> =>
    commonModule<FeedbackForm, FeedbackFromCreateDto>(
      `${FEEDBACK_PREFIX}forms/${feedbackForm.entityName}/${feedbackForm.entityId}`,
      feedbackForm,
    ),

  updateForm: (feedbackForm: FeedbackFromUpdateDto): Promise<FeedbackForm> =>
    commonModule<FeedbackForm, FeedbackFromUpdateDto>(
      `${FEEDBACK_PREFIX}forms/${feedbackForm.id}`,
      feedbackForm,
    ),

  getAnswers: (getAnswers: FeedbackAnswerGetDto): Promise<FeedbackAnswer[]> => {
    const query = Object.entries(getAnswers)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    return commonModule<FeedbackAnswer[], null>(
      `${FEEDBACK_PREFIX}answers?${query}`,
    )
  },

  createAnswer: (answer: FeedbackAnswerCreateDto): Promise<FeedbackAnswer> =>
    commonModule<FeedbackAnswer, FeedbackAnswerCreateDto>(
      `${FEEDBACK_PREFIX}answers`,
      answer,
    ),
}
