import { EventType } from '../../../models/eventType'
import { Employee } from '../../../models/user'
import { Input } from '../../../components/UI/Input/Input'
import { Dropdown } from '../../../components/UI/Dropdown/Dropdown'
import { DateInput } from '../../../components/UI/DateInput/DateInput'
import { TimeInput } from '../../../components/UI/TimeInput/TimeInput'
import { NumberInput } from '../../../components/UI/NumberInput/NumberInput'

interface EventCreateManagementDataProps {
  name: string
  setName: (value: string) => void

  eventTypes: EventType[]
  type: EventType | null
  setType: (value: EventType | null) => void

  date: Date | null
  setDate: (value: Date | null) => void
  dateValidator: { error?: string }

  time: string
  setTime: (value: string) => void
  timeValidator: { error?: string }

  seatsNumber: number | null
  setSeatsNumber: (value: number | null) => void

  eventExecutors: Employee[]
  executors: Employee[]
  setExecutors: (value: Employee[]) => void
}

export const EventCreateManagementData = ({
  name,
  setName,
  eventTypes,
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
  const selectedIds = executors.map(e => e.id)
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
        selectedIds={selectedIds}
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
    </div>
  )
}
