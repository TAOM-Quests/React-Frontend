import { Question } from '../../../components/FeedbackForm/feedback'
import { FeedbackFormEditor } from '../../../components/FeedbackForm/FeedbackFormEditor'

const baseEventQuestions: Question[] = [
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

interface EventCreateFeedbackTabProps {
  eventId: number | null
}

export const EventCreateFeedbackTab = ({
  eventId,
}: EventCreateFeedbackTabProps) => {
  return (
    <>
      <FeedbackFormEditor
        entity="event"
        entityId={eventId}
        baseQuestions={baseEventQuestions}
      />
    </>
  )
}
