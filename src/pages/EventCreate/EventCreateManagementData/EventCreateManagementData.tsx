import { EventType } from '../../../models/eventType'
import { Employee } from '../../../models/user'
import { Input } from '../../../components/UI/Input/Input'
import { Dropdown } from '../../../components/UI/Dropdown/Dropdown'
import { DateInput } from '../../../components/UI/DateInput/DateInput'
import { TimeInput } from '../../../components/UI/TimeInput/TimeInput'
import { NumberInput } from '../../../components/UI/NumberInput/NumberInput'
import { EventTag } from '../../../models/eventTag'
import { Dispatch, SetStateAction } from 'react'
import { isArray } from 'lodash'

interface EventCreateManagementDataProps {
  name: string
  setName: (value: string) => void

  tags: (EventTag & { isUserAdded?: boolean })[]
  eventTags: EventTag[]
  setTags: Dispatch<SetStateAction<(EventTag & { isUserAdded?: boolean })[]>>

  type: EventType | null
  eventTypes: EventType[]
  setType: (value: EventType | null) => void

  date: Date | null
  dateValidator: { error?: string }
  setDate: (value: Date | null) => void

  time: string
  setTime: (value: string) => void
  timeValidator: { error?: string }

  seatsNumber: number | null
  setSeatsNumber: (value: number | null) => void

  executors: Employee[]
  eventExecutors: Employee[]
  setExecutors: (value: Employee[]) => void
}

export const EventCreateManagementData = ({
  name,
  setName,
  eventTypes,
  tags,
  setTags,
  eventTags,
  type,
  setType,
  date,
  setDate,
  dateValidator,
  time,
  setTime,
  timeValidator,
  seatsNumber,
  setSeatsNumber,
  eventExecutors,
  executors,
  setExecutors,
}: EventCreateManagementDataProps) => {
  return (
    <div className="management-data">
      <div className="management-data__container">
        <Input
          label="Название мероприятия"
          placeholder="Введите название мероприятия"
          onChange={e => setName(e.target.value)}
          value={name}
        />
        <Dropdown
          id="event-type-dropdown"
          label="Тип мероприятия"
          placeholder="Выберите тип мероприятия"
          items={eventTypes.map(type => ({
            id: type.id,
            text: type.name,
          }))}
          onChangeDropdown={selected =>
            setType(
              !Array.isArray(selected) && selected
                ? (eventTypes.find(type => type.id === +selected.id) ?? null)
                : null,
            )
          }
          value={type ? type.name : undefined}
        />
        <DateInput
          label="Дата"
          value={date}
          onDateSelect={setDate}
          placeholder="Введите дату мероприятия"
          errorText={dateValidator.error}
        />
        <div className="management-data__miniInput">
          <TimeInput
            label="Время"
            value={time}
            onTimeSelect={setTime}
            errorText={timeValidator.error}
          />
          <NumberInput
            min={0}
            value={seatsNumber}
            label="Количество мест"
            placeholder="Кол-во мест"
            onChange={setSeatsNumber}
          />
        </div>
      </div>
      <Dropdown
        id="event-executor-dropdown"
        label="Организаторы"
        placeholder="Выберите организаторов мероприятия"
        isMultiple={true}
        items={eventExecutors.map(executor => ({
          id: executor.id,
          text: executor.name,
          avatar: {
            src: executor.image?.url ?? '',
            description: executor.position,
          },
        }))}
        selectedItems={executors.map(executor => ({
          id: executor.id,
          text: executor.name,
          avatar: {
            src: executor.image?.url ?? '',
            description: executor.position,
          },
        }))}
        onChangeDropdown={selected =>
          setExecutors(
            eventExecutors.filter(executor =>
              Array.isArray(selected)
                ? selected.some(sel => sel.id === executor.id)
                : selected?.id === executor.id,
            ),
          )
        }
      />
      <Dropdown
        id="event-tag-dropdown"
        label="Теги"
        placeholder="Выберите теги мероприятия"
        isMultiple
        isAllowAddNewItem
        items={eventTags.map(tag => ({
          id: tag.id,
          text: tag.name,
        }))}
        selectedItems={tags.map(tag => ({
          id: tag.id,
          text: tag.name,
        }))}
        onChangeDropdown={selected =>
          setTags(prevTags =>
            isArray(selected)
              ? selected.map(sel => ({
                  id: sel.id,
                  name: sel.text,
                  isUserAdded: sel.isUserAdded,
                }))
              : prevTags,
          )
        }
      />
    </div>
  )
}
