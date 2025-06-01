import { UserProfile } from '../../models/userProfile'
import { FeedbackAnswerGetDto } from '../../services/api/commonModule/commonEntities/feedback/feedbackDto'

export interface EventAnalyticElementProps {
  participants: UserProfile[]
  feedbackAnswers: FeedbackAnswerGetDto[]
}
