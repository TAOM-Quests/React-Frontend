import { useNavigate, useParams, useSearchParams } from 'react-router'
import {
  EventCreateConstructorRef,
  EventCreateConstructorTab,
} from './EventCreateTab/EventCreateConstructorTab'
import { createRef } from 'react'
import { Button } from '../../components/UI/Button/Button'
import { Switcher } from '../../components/UI/Switcher/Switcher'
import {
  EventCreateFeedbackTab,
  EventFeedbackFormRef,
} from './EventCreateFeedbackTab/EventCreateFeedbackTab'

const TABS = ['Мероприятие', 'Обратная связь']

export const EventCreate = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const eventId = useParams().id
  const navigate = useNavigate()
  const eventConstructor = createRef<EventCreateConstructorRef>()
  const feedbackForm = createRef<EventFeedbackFormRef>()

  const getTabIndex = () => Number(searchParams.get('tab'))
  const getActiveTab = () => {
    const tabIndex = getTabIndex()

    switch (tabIndex) {
      case 0:
        return <EventCreateConstructorTab ref={eventConstructor} />
      case 1:
        return (
          <EventCreateFeedbackTab
            ref={feedbackForm}
            eventId={eventId ? +eventId : null}
          />
        )
    }
  }

  return (
    <div className="event_create">
      <div className="event_create--header">
        <Button
          text="Назад"
          colorType="secondary"
          iconBefore="ARROW_SMALL_LEFT"
          onClick={() => navigate(-1)}
        />
        <div className="event_create--header__buttons">
          <Switcher
            options={TABS}
            onChange={option =>
              setSearchParams({ tab: `${TABS.indexOf(option)}` })
            }
            activeOption={TABS[getTabIndex()]}
          />
          <Button
            text="Сохранить"
            disabled={
              !eventConstructor.current?.dateValidator.isValid ||
              !eventConstructor.current.timeValidator.isValid ||
              eventConstructor.current.hasScheduleErrors
            }
            onClick={() => {
              if (
                eventConstructor.current?.dateValidator.isValid &&
                eventConstructor.current.timeValidator.isValid &&
                !eventConstructor.current.hasScheduleErrors
              ) {
                eventConstructor.current.saveEvent()
                feedbackForm.current?.saveFeedbackForm()
              }
            }}
          />
        </div>
      </div>

      {getActiveTab()}
    </div>
  )
}
