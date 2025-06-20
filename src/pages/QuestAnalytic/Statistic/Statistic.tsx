import { QuestAnalyticElementProps } from '../questAnalyticElementProps'
import { QuestStatisticAverageTime } from './elements/AverageTime'
import { QuestStatisticAverageCorrectAnswerCount } from './elements/AvereageCorrectAnswerCount'
import { QuestStatisticCorrectAnswerPercent } from './elements/CorrectAnswerPercent'
import { QuestStatisticFeedbackCount } from './elements/FeedbackCount'
import { QuestStatisticFeedbackPercent } from './elements/FeedbackPercent'
import { QuestStatisticParticipantCount } from './elements/ParticipantsCount'

export const QuestStatistic = (analyticData: QuestAnalyticElementProps) => {
  return (
    <div className="container_min_width event-statistic">
      <div className="quest-statistic__cards">
        <QuestStatisticParticipantCount {...analyticData} />
        <QuestStatisticFeedbackCount {...analyticData} />
        <QuestStatisticFeedbackPercent {...analyticData} />
        <QuestStatisticAverageCorrectAnswerCount {...analyticData} />
        <QuestStatisticCorrectAnswerPercent {...analyticData} />
        <QuestStatisticAverageTime {...analyticData} />
      </div>

      <div className="quest-statistic__charts "></div>
    </div>
  )
}
