import { useAppSelector } from '../../../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../../../redux/auth/authSlice'
import Input from '../../../../UI/Input/Input'
import { NumberInput } from '../../../../UI/NumberInput/NumberInput'
import { FeedbackScaleSlider } from './FeedbackScaleSlider/FeedbackScaleSlider'
import './FeedbackQuestionScale.scss'

interface FeedbackQuestionScaleProps {
  localQuestion: {
    answers?: string[]
  }
  setLocalQuestion: (q: any) => void
  onChange: (q: any) => void
  scaleAnswer: number
  setScaleAnswer: (val: number) => void
}

export const FeedbackQuestionScale = ({
  localQuestion,
  setLocalQuestion,
  onChange,
  scaleAnswer,
  setScaleAnswer,
}: FeedbackQuestionScaleProps) => {
  const user = useAppSelector(selectAuth)
  const isEmployee = user?.isEmployee

  return (
    <>
      {isEmployee && (
        <div className="question-editor__scale">
          <div className="question-editor__scale--min">
            <NumberInput
              value={localQuestion.answers ? +localQuestion.answers[0] : 0}
              onChange={val => {
                if (val === null) return
                if (!localQuestion.answers) return
                const updatedAnswers = [...localQuestion.answers]
                updatedAnswers[0] = val.toString()
                const updated = {
                  ...localQuestion,
                  answers: updatedAnswers,
                }
                setLocalQuestion(updated)
                onChange(updated)
              }}
              placeholder="Минимальное значение"
            />
          </div>
          <div className="question-editor__scale--min-name">
            <Input
              value={localQuestion.answers ? localQuestion.answers[1] : ''}
              onChange={e => {
                if (!localQuestion.answers) return
                const updatedAnswers = [...localQuestion.answers]
                updatedAnswers[1] = e.target.value
                const updated = {
                  ...localQuestion,
                  answers: updatedAnswers,
                }
                setLocalQuestion(updated)
                onChange(updated)
              }}
              placeholder="Подпись для минимального значения"
            />
          </div>
          <div className="question-editor__scale--max">
            <NumberInput
              value={localQuestion.answers ? +localQuestion.answers[2] : 0}
              onChange={val => {
                if (val === null) return
                if (!localQuestion.answers) return
                const updatedAnswers = [...localQuestion.answers]
                updatedAnswers[2] = val.toString()
                const updated = {
                  ...localQuestion,
                  answers: updatedAnswers,
                }
                setLocalQuestion(updated)
                onChange(updated)
              }}
              placeholder="Максимальное значение"
            />
          </div>
          <div className="question-editor__scale--max-name">
            <Input
              value={localQuestion.answers ? localQuestion.answers[3] : ''}
              onChange={e => {
                if (!localQuestion.answers) return
                const updatedAnswers = [...localQuestion.answers]
                updatedAnswers[3] = e.target.value
                const updated = {
                  ...localQuestion,
                  answers: updatedAnswers,
                }
                setLocalQuestion(updated)
                onChange(updated)
              }}
              placeholder="Подпись для максимального значения"
            />
          </div>
        </div>
      )}

      <FeedbackScaleSlider
        min={localQuestion.answers ? +localQuestion.answers[0] : 0}
        minLabel={localQuestion.answers ? localQuestion.answers[1] : ''}
        max={localQuestion.answers ? +localQuestion.answers[2] : 0}
        maxLabel={localQuestion.answers ? localQuestion.answers[3] : ''}
        value={scaleAnswer}
        onChange={setScaleAnswer}
      />
    </>
  )
}
