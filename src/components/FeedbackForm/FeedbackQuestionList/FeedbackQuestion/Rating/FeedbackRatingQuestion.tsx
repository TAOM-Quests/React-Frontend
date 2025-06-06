import { useState } from 'react'
import { NumberInput } from '../../../../UI/NumberInput/NumberInput'
import { useAppSelector } from '../../../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../../../redux/auth/authSlice'
import { Icon } from '../../../../UI/Icon/Icon'
import './FeedbackQuestionRating.scss'

interface FeedbackQuestionRatingProps {
  localQuestion: {
    answers?: string[]
  }
  ratingAnswer: number
  setRatingAnswer: (val: number) => void
  setLocalQuestion: (q: any) => void
  onChange: (q: any) => void
}

export const FeedbackQuestionRating = ({
  localQuestion,
  ratingAnswer,
  setRatingAnswer,
  setLocalQuestion,
  onChange,
}: FeedbackQuestionRatingProps) => {
  const [hovered, setHovered] = useState<number | null>(null)

  const user = useAppSelector(selectAuth)
  const isEmployee = user?.isEmployee

  const stars = []

  for (
    let i = 1;
    i <= (localQuestion.answers ? Number(localQuestion.answers[0]) : 5);
    i++
  ) {
    const isFilled = hovered !== null ? i <= hovered : i <= ratingAnswer

    stars.push(
      <Icon
        icon={isFilled ? 'STAR_SHADED' : 'STAR'}
        key={i}
        colorIcon="subdued"
        className="star-rating__star"
        onClick={() => setRatingAnswer(i)}
        onMouseEnter={isEmployee ? undefined : () => setHovered(i)}
        onMouseLeave={isEmployee ? undefined : () => setHovered(null)}
        aria-label={`${i} звезда`}
        role="button"
        tabIndex={0}
        disabled={isEmployee}
      />,
    )
  }

  return (
    <div className="question-editor__rating">
      {isEmployee && (
        <NumberInput
          label="Минимальное значение рейтинга"
          value={localQuestion.answers ? +localQuestion.answers[0] : 5}
          onChange={val => {
            if (val === null) return
            if (val >= 1) {
              const updated = {
                ...localQuestion,
                answers: [val.toString()],
              }
              setLocalQuestion(updated)
              onChange(updated)
            }
          }}
        />
      )}

      <div>
        <div className="star-rating">{stars}</div>
      </div>
    </div>
  )
}
