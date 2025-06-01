import { UserProfile } from '../../../models/userProfile'
import { FeedbackAnswerGetDto } from '../../../services/api/commonModule/commonEntities/feedback/feedbackDto'

export interface EventStatisticElementProps {
  participants: UserProfile[]
  feedbackAnswers: FeedbackAnswerGetDto[]
}
