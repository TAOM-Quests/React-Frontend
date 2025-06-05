import { FeedbackAnswer } from '../../models/feedbackAnswer'
import { UserProfile } from '../../models/userProfile'

export interface EventAnalyticElementProps {
  participants: UserProfile[]
  feedbackAnswers: FeedbackAnswer[]
}
