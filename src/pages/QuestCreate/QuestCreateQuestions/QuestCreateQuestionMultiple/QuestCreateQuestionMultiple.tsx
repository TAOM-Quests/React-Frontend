import { clone } from 'lodash'
import {
  QuestQuestion,
  QuestQuestionMultiple,
} from '../../../../models/questQuestion'
import { Toggle } from '../../../../components/UI/Toggle/Toggle'
import Input from '../../../../components/UI/Input/Input'
import { Icon } from '../../../../components/UI/Icon/Icon'
import { Button } from '../../../../components/UI/Button/Button'

export interface QuestCreateQuestionMultipleProps {
  questions: QuestQuestion[]
  multipleQuestionIndex: number
  multipleQuestion: QuestQuestionMultiple
  setQuestions: (questions: QuestQuestion[]) => void
}

export const QuestCreateQuestionMultiple = ({
  questions,
  setQuestions,
  multipleQuestion,
  multipleQuestionIndex,
}: QuestCreateQuestionMultipleProps) => {
  const updateQuestion = (updatedQuestion: QuestQuestionMultiple) =>
    setQuestions(
      questions.map((question, questionIndex) =>
        questionIndex === multipleQuestionIndex ? updatedQuestion : question,
      ),
    )

  const updateOption = (newOption: string, optionIndex: number) => {
    const questionAnswer = clone(multipleQuestion.answer)
    questionAnswer.options[optionIndex] = newOption

    updateQuestion({
      ...multipleQuestion,
      answer: questionAnswer,
    })
  }

  const addCorrectAnswer = (answerIndex: number) => {
    const questionAnswer = clone(multipleQuestion.answer)
    questionAnswer.correctAnswer.push(answerIndex)

    updateQuestion({
      ...multipleQuestion,
      answer: questionAnswer,
    })
  }

  const removeCorrectAnswer = (answerIndex: number) => {
    const questionAnswer = clone(multipleQuestion.answer)
    questionAnswer.correctAnswer = questionAnswer.correctAnswer.filter(
      (_, answerIndex) => answerIndex !== answerIndex,
    )

    updateQuestion({
      ...multipleQuestion,
      answer: questionAnswer,
    })
  }

  const updateCorrectAnswer = (answerIndex: number) =>
    multipleQuestion.answer.correctAnswer.includes(answerIndex)
      ? removeCorrectAnswer(answerIndex)
      : addCorrectAnswer(answerIndex)

  const addOption = () => {
    const questionAnswer = clone(multipleQuestion.answer)
    questionAnswer.options = [...questionAnswer.options, '']

    updateQuestion({
      ...multipleQuestion,
      answer: questionAnswer,
    })
  }

  const removeOption = (index: number) =>
    setQuestions(
      questions.filter((_, questionIndex) => questionIndex !== index),
    )

  return (
    <>
      Правильные ответы
      {multipleQuestion.answer.options.map((option, optionIndex) => (
        <div key={optionIndex}>
          <Input
            value={option}
            onChange={e => updateOption(e.target.value, optionIndex)}
          />
          <Toggle
            checked={multipleQuestion.answer.correctAnswer.includes(
              optionIndex,
            )}
            onChange={() => updateCorrectAnswer(optionIndex)}
          />
          <Icon icon="CROSS" onClick={() => removeOption(optionIndex)} />
        </div>
      ))}
      <Button
        size="small"
        text="Добавить"
        iconBefore="ADD"
        onClick={addOption}
        colorType={'secondary'}
      />
    </>
  )
}
