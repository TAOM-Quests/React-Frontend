import { EventAnalyticElementProps } from '../eventAnalyticElementProps'
import { EventStatisticAgePie } from './statisticElements/EventStatisticAgePie'
import { EventStatisticParticipantCount } from './statisticElements/EventStatisticParticipantCount'
import { EventStatisticSexPie } from './statisticElements/EventStatisticSexPie'

export const EventStatistic = (analyticData: EventAnalyticElementProps) => {
  return (
    <div>
      <EventStatisticParticipantCount {...analyticData} />
      <EventStatisticSexPie {...analyticData} />
      <EventStatisticAgePie {...analyticData} />
    </div>
  )
}
