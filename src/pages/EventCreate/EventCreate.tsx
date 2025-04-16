import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { selectAuth } from '../../redux/auth/authSlice'
import { useNavigate } from 'react-router'
import { EventType } from '../../models/eventType'
import { Employee } from '../../models/user'
import { Button } from '../../components/UI/Button/Button'
import { EventStatus } from '../../models/eventStatus'
import { events } from '../../services/api/eventModule/events/events'
import Input from '../../components/UI/Input/Input'
import { Dropdown } from '../../components/UI/Dropdown/Dropdown'
import { users } from '../../services/api/userModule/users/users'
import { ScheduleItem } from '../../models/event'
import { Icon } from '../../components/UI/Icon/Icon'
import { EventCreateSchedule } from './EventCreateSchedule/EventCreateSchedule'
import { TextEditor } from '../../components/TextEditor/TextEditor'

export const EventCreate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [eventTypes, setEventTypes] = useState<EventType[]>([])
  const [eventExecutors, setEventExecutors] = useState<Employee[]>([])
  const [eventStatuses, setEventStatuses] = useState<EventStatus[]>([])
  const [name, setName] = useState<string | null>(null)
  // const [date, setDate] = useState<Date | null>(null)
  const [type, setType] = useState<EventType | null>(null)
  const [executors, setExecutors] = useState<Employee[]>([])
  const [seatsNumber, setSeatsNumber] = useState<number | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [floor, setFloor] = useState<number | null>(null)
  const [officeNumber, setOfficeNumber] = useState<string | null>(null)
  const [platform, setPlatform] = useState<string | null>(null)
  const [connectionLink, setConnectionLink] = useState<string | null>(null)
  const [recordLink, setRecordLink] = useState<string | null>(null)
  const [identifier, setIdentifier] = useState<string | null>(null)
  const [accessCode, setAccessCode] = useState<string | null>(null)
  const [schedule, setSchedule] = useState<ScheduleItem[]>([])

  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setEventTypes(await events.getTypes())
        setEventStatuses(await events.getStatuses())
        setEventExecutors(await users.getEmployees())
        setIsLoading(false)
      } catch (e) {
        console.log(e)
      }
    }

    fetchEventData()
  }, [])

  useEffect(() => {
    if (!user?.isEmployee) {
      navigate('/')
    }
  }, [user])

  const renderStateButtons = () => (
    <div>
      <div className="state-buttons">
        <Button
          text="Назад"
          colorType="secondary"
          iconBefore="ARROW_SMALL_LEFT"
        />
        <Button colorType="primary" text="Создать" />
      </div>
    </div>
  )

  const renderManagementData = () => (
    <div className="management-data">
      <Input
        label="Название мероприятия"
        onChange={e => setName(e.target.value)}
        inputValue={name}
      />
      <Dropdown
        id="event-type-dropdown"
        items={eventTypes.map(type => ({
          id: `${type.id}`,
          text: type.name,
        }))}
        onChange={selected =>
          setType(
            selected
              ? (eventTypes.find(type => type.id === +selected) ?? null)
              : null,
          )
        }
      />
      <Dropdown
        id="event-status-dropdown"
        multiple
        items={eventExecutors.map(executor => ({
          id: `${executor.id}`,
          text: executor.name,
          avatar: {
            src: '../../../assets/images/mem.png',
            description: executor.position,
          },
        }))}
        onChange={selected =>
          setExecutors(prevExecutors =>
            selected
              ? prevExecutors.concat(
                  eventExecutors.filter(executor =>
                    selected.includes(`${executor.id}`),
                  ),
                )
              : prevExecutors,
          )
        }
      />
    </div>
  )

  const renderPlaces = () => (
    <div className="places">
      <Input
        label="Адрес"
        inputValue={address}
        onChange={e => setAddress(e.target.value)}
      />
      <Input
        label="Этаж"
        inputValue={floor}
        onChange={e => setFloor(+e.target.value)}
      />
      <Input
        label="Аудитория"
        inputValue={officeNumber}
        onChange={e => setOfficeNumber(e.target.value)}
      />
      <Input
        label="Площадка"
        inputValue={platform}
        onChange={e => setPlatform(e.target.value)}
      />
      <Input
        label="Ссылка для подключения"
        inputValue={connectionLink}
        onChange={e => setConnectionLink(e.target.value)}
      />
      <Input
        label="Ссылка на запись и презентацию"
        inputValue={recordLink}
        onChange={e => setRecordLink(e.target.value)}
      />
      <Input
        label="Идентификатор"
        inputValue={identifier}
        onChange={e => setIdentifier(e.target.value)}
      />
      <Input
        label="Код доступа"
        inputValue={accessCode}
        onChange={e => setAccessCode(e.target.value)}
      />
    </div>
  )

  return (
    <>
      {!isLoading ? (
        <>
          {renderStateButtons()}
          <TextEditor
            value={description ?? ''}
            onChange={e => setDescription(e.editor.getHTML())}
          />
          {renderManagementData()}
          {renderPlaces()}
          <EventCreateSchedule schedule={schedule} setSchedule={setSchedule} />
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}
