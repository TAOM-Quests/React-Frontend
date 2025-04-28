import { clone } from 'lodash'
import {
  QuestQuestion,
  QuestQuestionBoxSorting,
} from '../../../../models/questQuestion'
import { Button } from '../../../../components/UI/Button/Button'
import { Icon } from '../../../../components/UI/Icon/Icon'
import Input from '../../../../components/UI/Input/Input'
import { Toggle } from '../../../../components/UI/Toggle/Toggle'

export interface QuestCreateQuestionBoxSortingProps {
  questions: QuestQuestion[]
  boxSortingQuestionIndex: number
  boxSortingQuestion: QuestQuestionBoxSorting
  setQuestions: (questions: QuestQuestion[]) => void
}

export const QuestCreateQuestionBoxSorting = ({
  questions,
  setQuestions,
  boxSortingQuestion,
  boxSortingQuestionIndex,
}: QuestCreateQuestionBoxSortingProps) => {
  const updateQuestion = (updatedQuestion: QuestQuestionBoxSorting) =>
    setQuestions(
      questions.map((question, questionIndex) =>
        questionIndex === boxSortingQuestionIndex ? updatedQuestion : question,
      ),
    )

  const addBox = () => {
    const questionAnswer = clone(boxSortingQuestion.answer)
    questionAnswer.options.push('')
    questionAnswer.correctAnswer.push({
      name: '',
      options: [questionAnswer.options.length - 1],
    })

    updateQuestion({
      ...boxSortingQuestion,
      answer: questionAnswer,
    })
  }

  const removeBox = (boxIndex: number) => {
    const questionAnswer = clone(boxSortingQuestion.answer)
    questionAnswer.correctAnswer = questionAnswer.correctAnswer.filter(
      (_, index) => index !== boxIndex,
    )

    updateQuestion({
      ...boxSortingQuestion,
      answer: questionAnswer,
    })
  }

  const updateBox = (boxName: string, boxIndex: number) => {
    const questionAnswer = clone(boxSortingQuestion.answer)
    questionAnswer.correctAnswer[boxIndex].name = boxName

    updateQuestion({
      ...boxSortingQuestion,
      answer: questionAnswer,
    })
  }

  const addOption = (boxIndex: number) => {
    const questionAnswer = clone(boxSortingQuestion.answer)
    const box = questionAnswer.correctAnswer[boxIndex]
    questionAnswer.options.push('')
    box.options.push(questionAnswer.options.length - 1)

    updateQuestion({
      ...boxSortingQuestion,
      answer: questionAnswer,
    })
  }

  const removeOption = (boxIndex: number, optionIndex: number) => {
    const questionAnswer = clone(boxSortingQuestion.answer)
    const box = questionAnswer.correctAnswer[boxIndex]
    questionAnswer.options = questionAnswer.options.filter(
      (_, index) => index !== optionIndex,
    )
    questionAnswer.correctAnswer[boxIndex].options = box.options.filter(
      (_, index) => index !== optionIndex,
    )

    updateQuestion({
      ...boxSortingQuestion,
      answer: questionAnswer,
    })
  }

  const updateOption = (optionName: string, optionIndex: number) => {
    const questionAnswer = clone(boxSortingQuestion.answer)
    questionAnswer.options[optionIndex] = optionName

    updateQuestion({
      ...boxSortingQuestion,
      answer: questionAnswer,
    })
  }

  return (
    <>
      {boxSortingQuestion.answer.correctAnswer.map((box, boxIndex) => (
        <div key={boxIndex}>
          <Input
            value={box.name}
            label="Название контейнера"
            onChange={e => updateBox(e.target.value, boxIndex)}
          />
          <Icon icon="CROSS" onClick={() => removeBox(boxIndex)} />
          Правильные ответы
          {boxSortingQuestion.answer.correctAnswer[boxIndex].options.map(
            optionIndex => (
              <>
                <Input
                  value={boxSortingQuestion.answer.options[optionIndex]}
                  onChange={e => updateOption(e.target.value, optionIndex)}
                />
                <Icon
                  icon="CROSS"
                  onClick={() => removeOption(boxIndex, optionIndex)}
                />
              </>
            ),
          )}
          <Button
            size="small"
            text="Добавить"
            iconBefore="ADD"
            onClick={() => addOption(boxIndex)}
            colorType={'secondary'}
          />
        </div>
      ))}
      <Button
        size="small"
        text="Добавить"
        iconBefore="ADD"
        onClick={addBox}
        colorType={'secondary'}
        disabled={Object.keys(boxSortingQuestion.answer.correctAnswer).includes(
          '',
        )}
      />
    </>
  )
}
