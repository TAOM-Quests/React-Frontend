import { clone } from 'lodash'
import {
  QuestQuestion,
  QuestQuestionMultiple,
} from '../../../../models/questQuestion'
import { Toggle } from '../../../../components/UI/Toggle/Toggle'
import Input from '../../../../components/UI/Input/Input'
import { Icon } from '../../../../components/UI/Icon/Icon'
import { Button } from '../../../../components/UI/Button/Button'
import './QuestCreateQuestionMultiple.scss'

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
      optionIndex => optionIndex !== answerIndex,
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

  const removeOption = (index: number) => {
    const questionAnswer = clone(multipleQuestion.answer)
    questionAnswer.options = questionAnswer.options.filter(
      (_, i) => i !== index,
    )

    updateQuestion({
      ...multipleQuestion,
      answer: questionAnswer,
    })
  }

  return (
    <div className="multiple-questions">
      <div className="multiple-questions__options">
        <label className="label body_s_sb">Варианты ответов</label>
        <div className="multiple-questions__options-list">
          {multipleQuestion.answer.options.map((option, optionIndex) => (
            <div key={optionIndex} className="multiple-question-option">
              <Input
                value={option}
                placeholder="Введите вариант ответа"
                onChange={e => updateOption(e.target.value, optionIndex)}
                helperText={
                  multipleQuestion.answer.correctAnswer.includes(optionIndex)
                    ? 'Это верный ответ'
                    : ''
                }
              />
              <div className="multiple-question-option__toggle">
                <Toggle
                  checked={multipleQuestion.answer.correctAnswer.includes(
                    optionIndex,
                  )}
                  disabled={
                    multipleQuestion.answer.correctAnswer.length === 1 &&
                    multipleQuestion.answer.correctAnswer.includes(optionIndex)
                  }
                  onChange={() => updateCorrectAnswer(optionIndex)}
                />
              </div>
              <div className="multiple-question-option__remove">
                <Icon
                  icon="CROSS"
                  onClick={() => removeOption(optionIndex)}
                  disabled={multipleQuestion.answer.options.length === 1}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Button
          size="small"
          text="Добавить"
          iconBefore="ADD"
          onClick={addOption}
          colorType={'secondary'}
        />
      </div>
    </div>
  )
}
