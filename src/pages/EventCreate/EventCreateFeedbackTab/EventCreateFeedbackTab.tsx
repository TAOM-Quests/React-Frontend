import { useState } from 'react'
import { FeedbackForm } from '../../../components/FeedbackForm/FeedbackForm'
import { FeedbackQuestion } from '../../../components/FeedbackForm/feedbackFormConfig'

export const EventCreateFeedbackTab = () => {
  const [customQuestions, setCustomQuestions] = useState<FeedbackQuestion[]>([])

  return (
    <>
      <FeedbackForm
        type="event"
        title="Обратная связь по мероприятию «Название»"
        subtitle="Спасибо за участие в мероприятии! Пожалуйста, оставьте свой отзыв, чтобы мы могли улучшить нашу платформу!"
        sections={[]}
      />
    </>
  )
}
