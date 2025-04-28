import { clone } from 'lodash'
import {
  QuestQuestion,
  QuestQuestionConnection,
} from '../../../../models/questQuestion'
import { Button } from '../../../../components/UI/Button/Button'
import { Icon } from '../../../../components/UI/Icon/Icon'
import Input from '../../../../components/UI/Input/Input'

export interface QuestCreateQuestionConnectionProps {
  questions: QuestQuestion[]
  connectionQuestionIndex: number
  connectionQuestion: QuestQuestionConnection
  setQuestions: (questions: QuestQuestion[]) => void
}

export const QuestCreateQuestionConnection = ({
  questions,
  setQuestions,
  connectionQuestion,
  connectionQuestionIndex,
}: QuestCreateQuestionConnectionProps) => {
  const updateQuestion = (updatedQuestion: QuestQuestionConnection) =>
    setQuestions(
      questions.map((question, questionIndex) =>
        questionIndex === connectionQuestionIndex ? updatedQuestion : question,
      ),
    )

  const updateOption = (newOption: string, optionIndex: number) => {
    const questionAnswer = clone(connectionQuestion.answer)
    questionAnswer.options[optionIndex] = newOption

    updateQuestion({
      ...connectionQuestion,
      answer: questionAnswer,
    })
  }

  const addOptionPair = () => {
    const questionAnswer = clone(connectionQuestion.answer)
    questionAnswer.options = [...questionAnswer.options, '', '']

    updateQuestion({
      ...connectionQuestion,
      answer: questionAnswer,
    })
  }

  const removeOptionPair = (index: number) =>
    setQuestions(
      questions.filter(
        (_, questionIndex) =>
          questionIndex !== index || questionIndex !== index + 1,
      ),
    )

  return (
    <>
      Правильные ответы
      {connectionQuestion.answer.options.map((option, optionIndex) => {
        if (optionIndex % 2 === 0) {
          return (
            <div key={optionIndex}>
              <Input
                value={option}
                onChange={e => updateOption(e.target.value, optionIndex)}
              />
              -
              <Input
                value={connectionQuestion.answer.options[optionIndex + 1]}
                onChange={e => updateOption(e.target.value, optionIndex + 1)}
              />
              <Icon
                icon="CROSS"
                onClick={() => removeOptionPair(optionIndex)}
              />
            </div>
          )
        }
      })}
      <Button
        size="small"
        text="Добавить"
        iconBefore="ADD"
        onClick={addOptionPair}
        colorType={'secondary'}
      />
    </>
  )
}
