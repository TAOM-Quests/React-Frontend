import { useMemo } from 'react'
import './FeedbackRadio.scss'
import { generateRandomElementId } from '../../../../../utils/generateRandomElementId'
import { selectAuth } from '../../../../../redux/auth/authSlice'
import { useAppSelector } from '../../../../../hooks/redux/reduxHooks'
import classNames from 'classnames'

interface FeedbackRadioProps {
  answers: string[]
  selectedAnswer: string | null
  onChange: (answer: string) => void
}

export const FeedbackRadio = ({
  answers,
  selectedAnswer,
  onChange,
}: FeedbackRadioProps) => {
  const user = useAppSelector(selectAuth)
  const isEmployee = user?.isEmployee

  const radioGroupName = useMemo(
    () => generateRandomElementId('radio-question'),
    [],
  )

  return (
    <div
      className={classNames('feedbackRadio', {
        'feedbackRadio--disabled': isEmployee,
      })}
      role="radiogroup"
      aria-labelledby={`${radioGroupName}-label`}
    >
      {answers.map((answer, i) => (
        <label
          key={i}
          className="body_m_r feedbackRadio-label"
          htmlFor={`${radioGroupName}-${i}`}
        >
          <input
            type="radio"
            id={`${radioGroupName}-${i}`}
            name={radioGroupName}
            value={answer}
            checked={selectedAnswer === answer}
            onChange={() => onChange(answer)}
            className="feedbackRadio-input"
            disabled={isEmployee}
          />
          <span className="feedbackRadio-customRadio" />
          <span className="feedbackRadio-labelText">{answer}</span>
        </label>
      ))}
    </div>
  )
}
