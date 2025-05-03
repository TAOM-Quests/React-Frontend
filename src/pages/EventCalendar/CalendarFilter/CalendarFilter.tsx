import { EventType } from '../../../models/eventType'
import { Department } from '../../../models/department'
import { Button } from '../../../components/UI/Button/Button'
import { Dropdown } from '../../../components/UI/Dropdown/Dropdown'
import { Moment } from 'moment'
import { EventsFilter } from '../EventCalendar'
import { isArray } from 'lodash'

export interface CalendarFilterProps {
  types: EventType[]
  selectedPeriod: Moment
  departments: Department[]
  setFilter: (filter: EventsFilter) => void
  setSelectedPeriod: (date: Moment) => void
  selectedType?: number
  selectedDepartment?: number
}

export const CalendarFilter = ({
  types,
  setFilter,
  departments,
  selectedType,
  selectedPeriod,
  setSelectedPeriod,
  selectedDepartment,
}: CalendarFilterProps) => {
  return (
    <div className="calendarPage-filter">
      <div className="calendarPage-filter__dropdowns">
        <Dropdown
          items={types.map(type => ({
            id: type.id,
            text: type.name,
          }))}
          placeholder="Тип мероприятия"
          selectedIds={selectedType ? [selectedType] : []}
          onChangeDropdown={selected =>
            setFilter({
              type: selected && !isArray(selected) ? +selected.id : undefined,
            })
          }
        />
        <Dropdown
          items={departments.map(department => ({
            id: department.id,
            text: department.name,
          }))}
          placeholder="Кафедра"
          selectedIds={selectedDepartment ? [selectedDepartment] : []}
          onChangeDropdown={selected =>
            setFilter({
              department:
                selected && !isArray(selected) ? +selected.id : undefined,
            })
          }
        />
      </div>
      <div className="calendarPage-filter__period">
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
      <div className="calendarPage-filter__view-modes">
        <Button text="Сегодня" onClick={() => {}} />
        <Button text="Месяц" onClick={() => {}} />
        <Button text="Год" onClick={() => {}} />
      </div>
    </div>
  )
}
