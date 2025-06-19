import { clone } from 'lodash'
import {
  QuestQuestion,
  QuestQuestionConnection,
} from '../../../../models/questQuestion'
import { Button } from '../../../../components/UI/Button/Button'
import { Icon } from '../../../../components/UI/Icon/Icon'
import Input from '../../../../components/UI/Input/Input'
import './QuestCreateQuestionConnection.scss'
import { ServerFile } from '../../../../models/serverFile'
import { ImageContainer } from '../../../../components/UI/ImageContainer/ImageContainer'

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

  const setImage = (index: number, image: ServerFile | null) => {
    const questionAnswer = clone(connectionQuestion.answer)
    questionAnswer.optionsImages[index] = image

    updateQuestion({
      ...connectionQuestion,
      answer: questionAnswer,
    })
  }

  return (
    <div className="connection-questions">
      <div className="connection-questions__options">
        <label className="label body_s_sb">Пары верных ответов</label>
        <div className="connection-questions__options-list">
          {connectionQuestion.answer.options.map((option, optionIndex) => {
            if (optionIndex % 2 === 0) {
              return (
                <div key={optionIndex} className="connection-question-option">
                  <ImageContainer
                    key={`question-connection-option-${optionIndex}`}
                    selectedImages={
                      connectionQuestion.answer.optionsImages[optionIndex]
                        ? [connectionQuestion.answer.optionsImages[optionIndex]]
                        : []
                    }
                    onSelectImages={([image]) =>
                      setImage(optionIndex, image ?? null)
                    }
                  />
                  <Input
                    value={option}
                    onChange={e => updateOption(e.target.value, optionIndex)}
                    placeholder="Элемент 1"
                  />
                  –
                  <ImageContainer
                    key={`question-connection-option-${optionIndex}`}
                    selectedImages={
                      connectionQuestion.answer.optionsImages[optionIndex + 1]
                        ? [
                            connectionQuestion.answer.optionsImages[
                              optionIndex + 1
                            ]!,
                          ]
                        : []
                    }
                    onSelectImages={([image]) =>
                      setImage(optionIndex, image ?? null)
                    }
                  />
                  <Input
                    value={connectionQuestion.answer.options[optionIndex + 1]}
                    onChange={e =>
                      updateOption(e.target.value, optionIndex + 1)
                    }
                    placeholder="Элемент 2"
                  />
                  <Icon
                    icon="CROSS"
                    onClick={() => removeOptionPair(optionIndex)}
                  />
                </div>
              )
            }
          })}
        </div>
      </div>
      <div>
        <Button
          size="small"
          text="Добавить"
          iconBefore="ADD"
          onClick={addOptionPair}
          colorType={'secondary'}
        />
      </div>
    </div>
  )
}
