import { useMemo } from 'react'
import './FeedbackRadio.scss'
import { generateRandomElementId } from '../../../../../utils/generateRandomElementId'

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
  const radioGroupName = useMemo(() => generateRandomElementId('question'), [])

  return (
    <div
      className="feedbackRadio"
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
          />
          <span className="feedbackRadio-customRadio" />
          <span className="feedbackRadio-labelText">{answer}</span>
        </label>
      ))}
    </div>
  )
}
