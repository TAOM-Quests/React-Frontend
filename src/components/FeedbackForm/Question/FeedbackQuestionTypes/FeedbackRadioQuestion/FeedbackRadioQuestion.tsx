import { ChangeEvent, useMemo } from 'react'
import { useAppSelector } from '../../../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../../../redux/auth/authSlice'
import { generateRandomElementId } from '../../../../../utils/generateRandomElementId'
import { Button } from '../../../../UI/Button/Button'
import { Icon } from '../../../../UI/Icon/Icon'
import Input from '../../../../UI/Input/Input'
import './FeedbackRadioQuestion.scss'
import classNames from 'classnames'

interface FeedbackRadioQuestionProps {
  localQuestion: {
    answers?: string[]
  }
  selectedRadioAnswer: string | null
  setSelectedRadioAnswer: (val: string) => void
  handleAnswersChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void
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

  const radioGroupName = useMemo(
    () => generateRandomElementId('radio-question'),
    [],
  )

  return (
    <div className="question-editor__radio">
      {
        <div className="question-editor__radio-editor">
          {isEmployee && (
            <label className="body_s_sb label">Варианты ответов</label>
          )}

          <div
            className={`question-editor__radio-answers
              ${classNames('feedbackRadio', {
                'feedbackRadio--disabled': isEmployee,
              })}
            `}
            role="radiogroup"
            aria-labelledby={`${radioGroupName}-label`}
          >
            {localQuestion?.answers?.map((answer, i) => (
              <div key={i} className="question-editor__radio-answers-item">
                <label
                  className="body_m_r feedbackRadio-label"
                  htmlFor={`${radioGroupName}-${i}`}
                >
                  <input
                    type="radio"
                    id={`${radioGroupName}-${i}`}
                    name={radioGroupName}
                    value={answer}
                    checked={selectedRadioAnswer === answer}
                    onChange={() => setSelectedRadioAnswer(answer)}
                    className="feedbackRadio-input"
                    disabled={isEmployee}
                  />
                  <span className="feedbackRadio-customRadio" />
                  {!isEmployee && (
                    <span className="body_m_r feedbackRadio-labelText">
                      {answer}
                    </span>
                  )}
                </label>

                {isEmployee && (
                  <>
                    <Input
                      type="text"
                      value={answer}
                      onChange={e => handleAnswersChange(e, i)}
                      placeholder="Вариант ответа"
                      disabled={!isEmployee}
                    />

                    <div className="question-editor__radio-answers-item__delete">
                      <Icon
                        icon="CROSS"
                        onClick={() => removeAnswerOption(i)}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          {isEmployee && (
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
          )}
        </div>
      }
    </div>
  )
}
