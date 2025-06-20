import { clone } from 'lodash'
import {
  QuestQuestion,
  QuestQuestionBoxSorting,
} from '../../../../models/questQuestion'
import { Button } from '../../../../components/UI/Button/Button'
import { Icon } from '../../../../components/UI/Icon/Icon'
import Input from '../../../../components/UI/Input/Input'
import './QuestCreateQuestionBoxSorting.scss'
import { ServerFile } from '../../../../models/serverFile'
import { ImageContainer } from '../../../../components/UI/ImageContainer/ImageContainer'

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
    questionAnswer.options = questionAnswer.options.filter(
      (_, index) =>
        !questionAnswer.correctAnswer[boxIndex].options.includes(index),
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
    const globalOptionIndex = box.options[optionIndex]

    questionAnswer.options.splice(globalOptionIndex, 1)
    box.options.splice(optionIndex, 1)
    questionAnswer.correctAnswer.forEach(box => {
      box.options = box.options.map(index =>
        index > globalOptionIndex ? index - 1 : index,
      )
    })

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

  const setImage = (index: number, image: ServerFile | null) => {
    const questionAnswer = clone(boxSortingQuestion.answer)
    questionAnswer.optionsImages[index] = image

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
                      <ImageContainer
                        key={`question-box-sorting-option-${optionIndex}`}
                        className="boxSorting-questions__item__image"
                        selectedImages={
                          boxSortingQuestion.answer.optionsImages[optionIndex]
                            ? [
                                boxSortingQuestion.answer.optionsImages[
                                  optionIndex
                                ],
                              ]
                            : []
                        }
                        onSelectImages={([image]) =>
                          setImage(optionIndex, image ?? null)
                        }
                      />
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
                        disabled={
                          boxSortingQuestion.answer.correctAnswer[boxIndex]
                            .options.length === 1
                        }
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
            <div>
              <Button
                size="small"
                text="Добавить"
                iconBefore="ADD"
                onClick={() => addOption(boxIndex)}
                colorType={'secondary'}
              />
            </div>
            <div className="lineDash"></div>
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
