import { FeedbackAnswer } from '../../models/feedbackAnswer'
import { Quest } from '../../models/quest'
import { UserProfile } from '../../models/userProfile'

export interface QuestAnalyticElementProps {
  quest: Quest
  questAnswers: Quest[]
  participants: UserProfile[]
  feedbackAnswers: FeedbackAnswer[]
}
