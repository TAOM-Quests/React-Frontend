import { EventType } from '../../../models/eventType'
import { Department } from '../../../models/department'
import { Button } from '../../../components/UI/Button/Button'
import { Dropdown } from '../../../components/UI/Dropdown/Dropdown'
import { Moment } from 'moment'
import { EventsFilter } from '../EventCalendar'
import { isArray } from 'lodash'
import moment from 'moment'
import './CalendarFilter.scss'
import { useEffect, useState } from 'react'
import { events } from '../../../services/api/eventModule/events/events'
import { commonEntities } from '../../../services/api/commonModule/commonEntities/commonEntities'

export interface CalendarFilterProps {
  selectedPeriod: Moment
  setFilter: (filter: EventsFilter) => void
  setSelectedPeriod: (date: Moment) => void
  viewMode: 'month' | 'year'
  setViewMode: (mode: 'month' | 'year') => void
  selectedType?: number
  selectedDepartment?: number
}

export const CalendarFilter = ({
  setFilter,
  viewMode,
  setViewMode,
  selectedType,
  selectedPeriod,
  setSelectedPeriod,
  selectedDepartment,
}: CalendarFilterProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [types, setTypes] = useState<EventType[]>([])
  const [departments, setDepartments] = useState<Department[]>([])

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setIsLoading(true)

        const eventTypes = await events.getTypes()
        const eventDepartments = await commonEntities.getDepartments()

        setTypes(eventTypes)
        setDepartments(eventDepartments)
        setIsLoading(false)
      } catch (e) {
        console.log(`[CalendarFilter] ${e}`)
      }
    }

    fetchFilterData()
  }, [])

  return (
    <div className="calendarPage-filter">
      <div className="calendarPage-filter__dropdowns">
        {!isLoading && (
          <Dropdown
            items={types.map(type => ({
              id: type.id,
              text: type.name,
            }))}
            placeholder="Тип мероприятия"
            selectedItems={selectedType ? [{ id: selectedType, text: '' }] : []}
            onChangeDropdown={selected =>
              setFilter({
                type: selected && !isArray(selected) ? +selected.id : undefined,
              })
            }
          />
        )}
        {!isLoading && (
          <Dropdown
            items={departments.map(department => ({
              id: department.id,
              text: department.name,
            }))}
            placeholder="Кафедра"
            selectedItems={
              selectedDepartment ? [{ id: selectedDepartment, text: '' }] : []
            }
            onChangeDropdown={selected =>
              setFilter({
                department:
                  selected && !isArray(selected) ? +selected.id : undefined,
              })
            }
          />
        )}
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
