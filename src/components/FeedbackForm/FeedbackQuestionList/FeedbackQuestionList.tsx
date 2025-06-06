import { forwardRef, useImperativeHandle, useState } from 'react'
import {
  FeedbackQuestion as Question,
  FeedbackQuestionType,
} from '../../../models/feedbackQuestion'
import { OptionProps } from '../../UI/Option/Option'
import './FeedbackQuestionList.scss'
import { selectAuth } from '../../../redux/auth/authSlice'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { ContainerBox } from '../../ContainerBox/ContainerBox'
import { ContextMenu } from '../../ContextMenu/ContextMenu'
import { FeedbackQuestion } from './FeedbackQuestion/FeedbackQuestion'
import { Button } from '../../UI/Button/Button'

export interface FeedbackQuestionListRef {
  getAnswers: () => string[]
}

interface FeedbackQuestionListProps {
  questions: Question[]
  onChangeQuestions: (questions: Question[]) => void
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

export const FeedbackQuestionList = forwardRef(
  ({ questions, onChangeQuestions }: FeedbackQuestionListProps, ref) => {
    const [menuVisible, setMenuVisible] = useState(false)
    const [userAnswers, setUserAnswers] = useState<string[]>([])

    const user = useAppSelector(selectAuth)
    const isEmployee = user?.isEmployee

    useImperativeHandle(
      ref,
      (): FeedbackQuestionListRef => ({
        getAnswers: () => userAnswers,
      }),
      [questions],
    )

    const handleQuestionChange = (index: number, updatedQuestion: Question) => {
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
        let newQuestion: Question = {
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
          <FeedbackQuestion
            key={i}
            question={q}
            onDelete={() => handleDeleteQuestion(i)}
            onChangeQuestion={updatedQ => handleQuestionChange(i, updatedQ)}
            onChangeAnswer={userAnswer =>
              setUserAnswers(answers => {
                answers[i] = userAnswer
                return answers
              })
            }
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
  },
)
