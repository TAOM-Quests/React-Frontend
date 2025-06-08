import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../redux/auth/authSlice'
import { feedback } from '../../../services/api/commonModule/commonEntities/feedback/feedback'
import {
  FeedbackFormEditor,
  FeedbackFormRef,
} from '../../../components/FeedbackForm/FeedbackForm'
import { Loading } from '../../../components/Loading/Loading'
import { Button } from '../../../components/UI/Button/Button'

export interface EventFeedbackProps {
  eventId: number
}

export const EventFeedback = ({ eventId }: EventFeedbackProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isAnswered, setIsAnswered] = useState(false)

  const user = useAppSelector(selectAuth)
  const feedbackForm = useRef<FeedbackFormRef>(null)

  useEffect(() => {
    setIsLoading(true)
    try {
      fetchAnswer()
    } catch (e) {
      console.log(`[EventFeedback] ${e}`)
    }
    setIsLoading(false)
  }, [])

  const fetchAnswer = async () => {
    if (!user) throw Error('User not found')

    setIsAnswered(
      !!(
        await feedback.getAnswers({
          entityId: eventId,
          entityName: 'events',
          userId: user!.id,
        })
      ).length,
    )
  }

  const saveAnswer = async () => {
    feedbackForm.current?.saveAnswer()
    setIsAnswered(true)
  }

  return (
    <>
      {!isLoading ? (
        <>
          {!isAnswered && (
            <div className="eventFeedback">
              <FeedbackFormEditor
                ref={feedbackForm}
                entityId={eventId}
                entityName="events"
              />

              <Button text="Отправить" onClick={saveAnswer} />
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}
