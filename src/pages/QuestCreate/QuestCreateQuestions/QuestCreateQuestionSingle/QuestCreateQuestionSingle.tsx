import { clone } from 'lodash'
import {
  QuestQuestion,
  QuestQuestionSingle,
} from '../../../../models/questQuestion'
import Input from '../../../../components/UI/Input/Input'
import { Toggle } from '../../../../components/UI/Toggle/Toggle'
import { Button } from '../../../../components/UI/Button/Button'
import { Icon } from '../../../../components/UI/Icon/Icon'

export interface QuestCreateQuestionSingleProps {
  questions: QuestQuestion[]
  singleQuestionIndex: number
  singleQuestion: QuestQuestionSingle
  setQuestions: (questions: QuestQuestion[]) => void
}

export const QuestCreateQuestionSingle = ({
  questions,
  setQuestions,
  singleQuestion,
  singleQuestionIndex,
}: QuestCreateQuestionSingleProps) => {
  const updateQuestion = (updatedQuestion: QuestQuestionSingle) =>
    setQuestions(
      questions.map((question, questionIndex) =>
        questionIndex === singleQuestionIndex ? updatedQuestion : question,
      ),
    )

  const updateOption = (newOption: string, optionIndex: number) => {
    const questionAnswer = clone(singleQuestion.answer)
    questionAnswer.options[optionIndex] = newOption

    updateQuestion({
      ...singleQuestion,
      answer: questionAnswer,
    })
  }

  const updateCorrectAnswer = (newCorrectAnswer: number) => {
    const questionAnswer = clone(singleQuestion.answer)
    questionAnswer.correctAnswer = newCorrectAnswer

    updateQuestion({
      ...singleQuestion,
      answer: questionAnswer,
    })
  }

  const addOption = () => {
    const questionAnswer = clone(singleQuestion.answer)
    questionAnswer.options = [...questionAnswer.options, '']

    updateQuestion({
      ...singleQuestion,
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
      {singleQuestion.answer.options.map((option, optionIndex) => (
        <div key={optionIndex}>
          <Input
            value={option}
            onChange={e => updateOption(e.target.value, optionIndex)}
          />
          <Toggle
            checked={optionIndex === singleQuestion.answer.correctAnswer}
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
