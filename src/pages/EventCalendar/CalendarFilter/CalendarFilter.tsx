import { EventType } from '../../../models/eventType'
import { Department } from '../../../models/department'
import { Button } from '../../../components/UI/Button/Button'
import { Dropdown } from '../../../components/UI/Dropdown/Dropdown'
import { Moment } from 'moment'
import { EventsFilter } from '../EventCalendar'
import { isArray } from 'lodash'
import moment from 'moment'
import './CalendarFilter.scss'

export interface CalendarFilterProps {
  types: EventType[]
  selectedPeriod: Moment
  departments: Department[]
  setFilter: (filter: EventsFilter) => void
  setSelectedPeriod: (date: Moment) => void
  viewMode: 'month' | 'year'
  setViewMode: (mode: 'month' | 'year') => void
  selectedType?: number
  selectedDepartment?: number
}

export const CalendarFilter = ({
  types,
  setFilter,
  viewMode,
  setViewMode,
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
          colorType="accent"
          iconBefore="ANGLE_LEFT"
          onClick={() =>
            setSelectedPeriod(
              viewMode === 'month'
                ? selectedPeriod.clone().subtract(1, 'month')
                : selectedPeriod.clone().subtract(1, 'year'),
            )
          }
        />
        <p className="body_xl_sb calendarPage-filter__date">
          {viewMode === 'month'
            ? selectedPeriod.format('MMMM YYYY')
            : selectedPeriod.format('YYYY')}
        </p>
        <Button
          isIconOnly
          colorType="accent"
          iconBefore="ANGLE_RIGHT"
          onClick={() =>
            setSelectedPeriod(
              viewMode === 'month'
                ? selectedPeriod.clone().add(1, 'month')
                : selectedPeriod.clone().add(1, 'year'),
            )
          }
        />
      </div>
      <div className="calendarPage-filter__view-modes">
        <Button
          text="Сегодня"
          colorType="subdued"
          onClick={() => setSelectedPeriod(moment().set('date', 1))}
        />
        <Button
          text="Месяц"
          colorType={viewMode === 'month' ? 'primary' : 'secondary'}
          onClick={() => setViewMode('month')}
        />
        <Button
          text="Год"
          colorType={viewMode === 'year' ? 'primary' : 'secondary'}
          onClick={() => setViewMode('year')}
        />
      </div>
    </div>
  )
}
