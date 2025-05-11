import React from 'react'
import {
  FeedbackType,
  STANDARD_QUESTIONS_EVENT,
  STANDARD_QUESTIONS_QUEST,
  FeedbackQuestion,
} from '../../../components/FeedbackForm/feedbackFormConfig'
import { RatingQuestion } from '../Question/RatingQuestion/RatingQuestion'
import { RadioQuestion } from '../Question/RadioQuestion/RadioQuestion'
import { ScaleQuestion } from '../Question/ScaleQuestion/ScaleQuestion'

interface FeedbackPreviewProps {
  type: FeedbackType
  title: string
  subtitle: string
}

export const FeedbackPreview: React.FC<FeedbackPreviewProps> = ({
  type,
  title,
  subtitle,
}) => {
  // Получаем стандартные вопросы в зависимости от типа
  const standardQuestions: FeedbackQuestion[] =
    type === 'event' ? STANDARD_QUESTIONS_EVENT : STANDARD_QUESTIONS_QUEST

  // Разделяем вопросы по типам
  const ratingQuestion = standardQuestions.find(q => q.type === 'rating')
  const radioQuestions = standardQuestions.filter(q => q.type === 'radio')
  const scaleQuestions = standardQuestions.filter(q => q.type === 'scale')

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)',
        padding: 24,
        maxWidth: 540,
        margin: '0 auto',
        fontFamily: 'inherit',
      }}
    >
      <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>
        {title}
      </h2>
      <p style={{ color: '#444', marginBottom: 18 }}>{subtitle}</p>

      {/* Рейтинг */}
      {ratingQuestion && (
        <RatingQuestion label={ratingQuestion.label} value={0} max={5} />
      )}

      {/* Радио вопросы */}
      <div
        style={{
          display: 'flex',
          gap: 32,
          flexWrap: 'wrap',
          marginBottom: 20,
        }}
      >
        {radioQuestions.map(q => (
          <div key={q.id} style={{ flex: '1 1 220px' }}>
            <RadioQuestion label={q.label} options={q.options || []} />
          </div>
        ))}
      </div>

      {/* Шкальные вопросы */}
      {scaleQuestions.map(q => (
        <ScaleQuestion
          key={q.id}
          label={q.label}
          minLabel={q.scaleLabels?.[0] || ''}
          maxLabel={q.scaleLabels?.[1] || ''}
          value={0}
          max={5}
        />
      ))}
    </div>
  )
}
