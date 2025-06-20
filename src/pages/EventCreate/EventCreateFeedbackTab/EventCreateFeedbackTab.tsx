import { forwardRef, useImperativeHandle, useRef } from 'react'
import {
  FeedbackFormEditor,
  FeedbackFormRef,
} from '../../../components/FeedbackForm/FeedbackForm'
import { FeedbackQuestion } from '../../../models/feedbackQuestion'

const baseEventQuestions: FeedbackQuestion[] = [
  {
    type: 'rating',
    question: 'Оцените мероприятие по шкале от 1 до 5',
    answers: ['5'],
  },
  {
    type: 'radio',
    question: 'Вы довольны организацией?',
    answers: ['Да', 'Нет', 'Возможно'],
  },
  {
    type: 'scale',
    question: 'Насколько вероятно, что вы порекомендуете мероприятие?',
    answers: ['1', 'Не возможно', '10', 'Возможно'],
  },
  {
    type: 'text',
    question: 'Ваши комментарии',
  },
]

export interface EventFeedbackFormRef {
  saveFeedbackForm: () => void
}

interface EventCreateFeedbackTabProps {
  eventId: number | null
}

export const EventCreateFeedbackTab = forwardRef(
  ({ eventId }: EventCreateFeedbackTabProps, ref) => {
    const feedbackForm = useRef<FeedbackFormRef>(null)

    useImperativeHandle(
      ref,
      (): EventFeedbackFormRef => ({
        saveFeedbackForm: () => feedbackForm.current?.saveForm(),
      }),
    )

    return (
      <>
        <FeedbackFormEditor
          ref={feedbackForm}
          entityName="events"
          entityId={eventId}
          baseQuestions={baseEventQuestions}
        />
      </>
    )
  },
)
