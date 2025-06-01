import { EventAnalyticElementProps } from '../eventAnalyticElementProps'
import { EventStatisticParticipantCount } from './statisticElements/EventStatisticParticipantCount'
import { EventStatisticSexPie } from './statisticElements/EventStatisticSexPie'

export const EventStatistic = (analyticData: EventAnalyticElementProps) => {
  return (
    <div>
      <EventStatisticParticipantCount {...analyticData} />
      <EventStatisticSexPie {...analyticData} />
    </div>
  )
}
