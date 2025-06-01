import { useAppSelector } from '../../../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../../../redux/auth/authSlice'
import { Button } from '../../../../UI/Button/Button'
import { Icon } from '../../../../UI/Icon/Icon'
import Input from '../../../../UI/Input/Input'
import { FeedbackRadio } from '../../FeedbackParticipantQuestions/FeedbackRadio/FeedbackRadio'
import './FeedbackRadioQuestion.scss'

interface FeedbackRadioQuestionProps {
  localQuestion: {
    answers?: string[]
  }
  selectedRadioAnswer: string | null
  setSelectedRadioAnswer: (val: string) => void
  handleAnswersChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void
  removeAnswerOption: (index: number) => void
  addAnswerOption: () => void
}

export const FeedbackRadioQuestion = ({
  localQuestion,

  selectedRadioAnswer,
  setSelectedRadioAnswer,
  handleAnswersChange,
  removeAnswerOption,
  addAnswerOption,
}: FeedbackRadioQuestionProps) => {
  const user = useAppSelector(selectAuth)
  const isEmployee = user?.isEmployee

  return (
    <div className="question-editor__radio">
      {isEmployee && (
        <div className="question-editor__radio-editor">
          <label className="body_s_sb label">Варианты ответов</label>
          <div className="question-editor__radio-answers">
            {localQuestion?.answers?.map((ans, i) => (
              <div key={i} className="question-editor__radio-answers-item">
                <Input
                  type="text"
                  value={ans}
                  onChange={e => handleAnswersChange(e, i)}
                  placeholder="Вариант ответа"
                />
                <div className="question-editor__radio-answers-item__delete">
                  <Icon icon="CROSS" onClick={() => removeAnswerOption(i)} />
                </div>
              </div>
            ))}
          </div>
          <div>
            <Button
              text="Добавить вариант"
              type="button"
              colorType="secondary"
              size="small"
              iconBefore="ADD"
              onClick={addAnswerOption}
            />
          </div>
        </div>
      )}

      <FeedbackRadio
        answers={localQuestion.answers || []}
        selectedAnswer={selectedRadioAnswer}
        onChange={setSelectedRadioAnswer}
      />
    </div>
  )
}
