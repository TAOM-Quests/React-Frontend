import moment from 'moment'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { ScheduleItem } from '../../../models/event'

export interface EventScheduleProps {
  schedule: ScheduleItem[]
}

export const EventSchedule = ({ schedule }: EventScheduleProps) => {
  return (
    <ContainerBox>
      <h2>Регламент</h2>
      {schedule.map(item => (
        <div>
          <div>
            {moment(item.timeStart).format('HH:mm')} -{' '}
            {moment(item.timeEnd).format('HH:mm')}
          </div>
          <div>{item.name}</div>
        </div>
      ))}
    </ContainerBox>
  )
}
