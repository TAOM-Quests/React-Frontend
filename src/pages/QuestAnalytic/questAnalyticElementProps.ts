import { FeedbackAnswer } from '../../models/feedbackAnswer'
import { Quest, QuestComplete } from '../../models/quest'
import { UserProfile } from '../../models/userProfile'

export interface QuestAnalyticElementProps {
  quest: Quest
  participants: UserProfile[]
  questAnswers: QuestComplete[]
  feedbackAnswers: FeedbackAnswer[]
}
