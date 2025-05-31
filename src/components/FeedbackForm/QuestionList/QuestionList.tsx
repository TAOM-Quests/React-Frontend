import { useState } from 'react'
import {
  FeedbackQuestion,
  FeedbackQuestionType,
} from '../../../models/feedbackQuestion'
import { Question } from '../Question/Question'
import { OptionProps } from '../../UI/Option/Option'
import { Button } from '../../UI/Button/Button'
import { ContextMenu } from '../../ContextMenu/ContextMenu'
import './QuestionList.scss'
import { ContainerBox } from '../../ContainerBox/ContainerBox'
import { selectAuth } from '../../../redux/auth/authSlice'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'

interface QuestionListProps {
  questions: FeedbackQuestion[]
  onChangeQuestions: (questions: FeedbackQuestion[]) => void
}

const QUESTION_TYPES: FeedbackQuestionType[] = [
  'rating',
  'radio',
  'scale',
  'text',
]

const TYPE_TRANSLATIONS: Record<FeedbackQuestionType, string> = {
  rating: 'Рейтинг',
  radio: 'Выбор из вариантов',
  scale: 'Шкала',
  text: 'Текстовый ответ',
}

export const QuestionList = ({
  questions,
  onChangeQuestions,
}: QuestionListProps) => {
  const [menuVisible, setMenuVisible] = useState(false)

  const user = useAppSelector(selectAuth)
  const isEmployee = user?.isEmployee

  const handleQuestionChange = (
    index: number,
    updatedQuestion: FeedbackQuestion,
  ) => {
    const newQuestions = [...questions]
    newQuestions[index] = updatedQuestion
    onChangeQuestions(newQuestions)
  }

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = [...questions]
    newQuestions.splice(index, 1)
    onChangeQuestions(newQuestions)
  }

  const options: OptionProps[] = QUESTION_TYPES.map((type, index) => ({
    id: index,
    text: TYPE_TRANSLATIONS[type] || type,
    onSelect: () => {
      let newQuestion: FeedbackQuestion = {
        type,
        question: '',
        answers: [],
      }
      switch (type) {
        case 'rating':
          newQuestion.answers = ['5']
          break
        case 'radio':
          newQuestion.answers = ['Да', 'Нет']
          break
        case 'scale':
          newQuestion.answers = ['1', 'Не возможно', '10', 'Возможно']
          break
        case 'text':
          newQuestion.answers = []
          break
      }
      onChangeQuestions([...questions, newQuestion])
      setMenuVisible(false)
    },
  }))

  return (
    <ContainerBox className="questionList">
      {isEmployee && (
        <h3 className="heading_6 questionList__title">Вопросы формы</h3>
      )}
      {questions.map((q, i) => (
        <Question
          key={i}
          question={q}
          onChange={updatedQ => handleQuestionChange(i, updatedQ)}
          onDelete={() => handleDeleteQuestion(i)}
        />
      ))}

      {isEmployee && (
        <div className="questionList__add">
          <div>
            <ContextMenu
              options={options}
              isVisible={menuVisible}
              onToggle={() => setMenuVisible(!menuVisible)}
            >
              <Button
                type="button"
                iconBefore="PLUS"
                colorType="accent"
                isIconOnly
                isButtonCircle
                onClick={() => setMenuVisible(!menuVisible)}
              />
            </ContextMenu>
          </div>
        </div>
      )}
    </ContainerBox>
  )
}
