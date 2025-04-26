import { EventType } from '../../../models/eventType'
import { Department } from '../../../models/department'
import { Button } from '../../../components/UI/Button/Button'
import { Dropdown } from '../../../components/UI/Dropdown/Dropdown'
import { Moment } from 'moment'
import { EventsFilter } from '../EventCalendar'

export interface CalendarFilterProps {
  types: EventType[]
  selectedPeriod: Moment
  departments: Department[]
  setFilter: (filter: EventsFilter) => void
  setSelectedPeriod: (date: Moment) => void
}

export const CalendarFilter = ({
  types,
  setFilter,
  departments,
  selectedPeriod,
  setSelectedPeriod,
}: CalendarFilterProps) => {
  return (
    <div>
      <div>
        <Dropdown
          items={types.map(type => ({
            id: type.id,
            text: type.name,
          }))}
          onSelect={selected => setFilter({ type: +selected })}
        />
        <Dropdown
          items={departments.map(department => ({
            id: department.id,
            text: department.name,
          }))}
          onSelect={selected => setFilter({ department: +selected })}
        />
      </div>
      <div>
        <Button
          isIconOnly
          iconBefore="ANGLE_LEFT"
          onClick={() =>
            setSelectedPeriod(selectedPeriod.clone().subtract(1, 'month'))
          }
        />
        <p>{selectedPeriod.format('MMMM YYYY')}</p>
        <Button
          isIconOnly
          iconBefore="ANGLE_RIGHT"
          onClick={() =>
            setSelectedPeriod(selectedPeriod.clone().add(1, 'month'))
          }
        />
      </div>
    </div>
  )
}
