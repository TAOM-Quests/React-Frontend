import { ReactNode } from 'react'
import { Moment } from 'moment'
import { EventMinimize } from '../../../models/eventMinimize'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { MiniMonthViewDays } from './MiniMonthViewDays'

interface YearViewProps {
  year: Moment
  events: EventMinimize[]
}

export const YearView = ({ year, events }: YearViewProps): ReactNode => {
  const months = []
  const yearStart = year.clone().startOf('year')

  for (let month = 0; month < 12; month++) {
    const monthMoment = yearStart.clone().month(month)
    months.push(
      <ContainerBox key={month} className="calendarPage__month">
        <div className="body_l_sb calendarPage__month-title">
          {monthMoment.format('MMMM')}
        </div>
        <div className="calendarPage__calendarMonthDay">
          <div className="body_s_sb calendarPage__weekdays--mini">
            <div>ПН</div>
            <div>ВТ</div>
            <div>СР</div>
            <div>ЧТ</div>
            <div>ПТ</div>
            <div>СБ</div>
            <div>ВС</div>
          </div>
          <div className="body_m_r calendarPage__days-grid calendarPage__days-grid--mini">
            <MiniMonthViewDays month={monthMoment} events={events} />
          </div>
        </div>
      </ContainerBox>,
    )
  }

  return <div className="calendarPage__year-grid">{months}</div>
}
