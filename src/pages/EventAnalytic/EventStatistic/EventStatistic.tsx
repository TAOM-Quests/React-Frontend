import { EventAnalyticElementProps } from '../eventAnalyticElementProps'
import { EventStatisticAgePie } from './statisticElements/EventStatisticAgePie'
import { EventStatisticParticipantCount } from './statisticElements/EventStatisticParticipantCount'
import { EventStatisticSexPie } from './statisticElements/EventStatisticSexPie'
import './EventStatistic.scss'
import { EventStatisticFeedbackCount } from './statisticElements/EventStatisticFeedbackCount'
import { EventStatisticFeedbackPercent } from './statisticElements/EventStatisticFeedbackPercent'

export const EventStatistic = (analyticData: EventAnalyticElementProps) => {
  return (
    <div className="container_min_width event-statistic">
      <div className="event-statistic__cards">
        <EventStatisticParticipantCount {...analyticData} />
        <EventStatisticFeedbackCount {...analyticData} />
        <EventStatisticFeedbackPercent {...analyticData} />
      </div>

      <div className="event-statistic__charts ">
        <EventStatisticSexPie {...analyticData} />
        <EventStatisticAgePie {...analyticData} />
      </div>
    </div>
  )
}
