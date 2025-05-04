import { clone } from 'lodash'
import {
  QuestQuestion,
  QuestQuestionBoxSorting,
} from '../../../../models/questQuestion'
import { Button } from '../../../../components/UI/Button/Button'
import { Icon } from '../../../../components/UI/Icon/Icon'
import Input from '../../../../components/UI/Input/Input'
import './QuestCreateQuestionBoxSorting.scss'

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
    <div className="boxSorting-questions">
      <div className="boxSorting-questions__boxes">
        {boxSortingQuestion.answer.correctAnswer.map((box, boxIndex) => (
          <div key={boxIndex} className="boxSorting-questions-container">
            <div className="boxSorting-questions__box">
              <Input
                value={box.name}
                label="Название контейнера"
                placeholder="Введите название контейнера"
                onChange={e => updateBox(e.target.value, boxIndex)}
              />
              <div className="boxSorting-questions__box-delete">
                <Icon icon="DELETE" onClick={() => removeBox(boxIndex)} />
              </div>
            </div>
            <div className="boxSorting-questions__options">
              <label className="label body_s_sb">Варианты ответов</label>
              <div className="boxSorting-questions__options-list">
                {boxSortingQuestion.answer.correctAnswer[boxIndex].options.map(
                  optionIndex => (
                    <div className="boxSorting-questions__item">
                      <Input
                        value={boxSortingQuestion.answer.options[optionIndex]}
                        placeholder="Введите вариант ответа"
                        onChange={e =>
                          updateOption(e.target.value, optionIndex)
                        }
                      />
                      <Icon
                        icon="CROSS"
                        onClick={() => removeOption(boxIndex, optionIndex)}
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
            <div>
              <Button
                size="small"
                text="Добавить ответ"
                iconBefore="ADD"
                onClick={() => addOption(boxIndex)}
                colorType={'secondary'}
              />
            </div>
            <div className="quest-create-results__result--line"></div>
          </div>
        ))}
      </div>

      <div>
        <Button
          size="small"
          text="Добавить контейнер"
          iconBefore="ADD"
          onClick={addBox}
          colorType={'secondary'}
          disabled={Object.keys(
            boxSortingQuestion.answer.correctAnswer,
          ).includes('')}
        />
      </div>
    </div>
  )
}
