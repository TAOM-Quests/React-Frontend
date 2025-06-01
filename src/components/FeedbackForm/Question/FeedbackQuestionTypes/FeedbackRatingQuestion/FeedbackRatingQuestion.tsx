import { NumberInput } from '../../../../UI/NumberInput/NumberInput'
import { FeedbackStarRating } from '../../FeedbackParticipantQuestions/FeedbackStarRating/FeedbackStarRating'
import { useAppSelector } from '../../../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../../../redux/auth/authSlice'
import './FeedbackRatingQuestion.scss'

interface FeedbackRatingQuestionProps {
  localQuestion: {
    answers?: string[]
  }

  ratingAnswer: number
  setRatingAnswer: (val: number) => void
  setLocalQuestion: (q: any) => void
  onChange: (q: any) => void
}

export const FeedbackRatingQuestion = ({
  localQuestion,
  ratingAnswer,
  setRatingAnswer,
  setLocalQuestion,
  onChange,
}: FeedbackRatingQuestionProps) => {
  const user = useAppSelector(selectAuth)
  const isEmployee = user?.isEmployee

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
        <FeedbackStarRating
          maxRating={
            localQuestion.answers ? Number(localQuestion.answers[0]) : 5
          }
          value={ratingAnswer}
          onChange={setRatingAnswer}
        />
      </div>
    </div>
  )
}
