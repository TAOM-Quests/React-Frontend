import { clone } from 'lodash'
import {
  QuestQuestion,
  QuestQuestionSingle,
} from '../../../../models/questQuestion'
import Input from '../../../../components/UI/Input/Input'
import { Toggle } from '../../../../components/UI/Toggle/Toggle'
import { Button } from '../../../../components/UI/Button/Button'
import { Icon } from '../../../../components/UI/Icon/Icon'
import './QuestCreateQuestionSingle.scss'

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

  const removeOption = (index: number) => {
    const questionAnswer = clone(singleQuestion.answer)
    questionAnswer.options = questionAnswer.options.filter(
      (_, i) => i !== index,
    )

    updateQuestion({
      ...singleQuestion,
      answer: questionAnswer,
    })
  }

  return (
    <div className="single-questions">
      <div className="single-questions__options">
        <label className="label body_s_sb">Варианты ответов</label>
        <div className="single-questions__options-list">
          {singleQuestion.answer.options.map((option, optionIndex) => (
            <div key={optionIndex} className="single-question-option">
              <Input
                value={option}
                placeholder="Введите вариант ответа"
                onChange={e => updateOption(e.target.value, optionIndex)}
                helperText={
                  optionIndex === singleQuestion.answer.correctAnswer
                    ? 'Это верный ответ'
                    : ''
                }
              />
              <div className="single-question-option__toggle">
                <Toggle
                  checked={optionIndex === singleQuestion.answer.correctAnswer}
                  onChange={() => updateCorrectAnswer(optionIndex)}
                />
              </div>
              <div className="single-question-option__remove">
                <Icon
                  icon="CROSS"
                  onClick={() => removeOption(optionIndex)}
                  disabled={singleQuestion.answer.options.length === 1}
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
