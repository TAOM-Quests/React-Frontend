import Input from '../../../components/UI/Input/Input'
import {
  QuestQuestion,
  QuestQuestionBoxSorting,
  QuestQuestionConnection,
  QuestQuestionMultiple,
  QuestQuestionSingle,
} from '../../../models/questQuestion'
import { QuestCreateQuestionSingle } from './QuestCreateQuestionSingle/QuestCreateQuestionSingle'
import { Button } from '../../../components/UI/Button/Button'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { OptionProps } from '../../../components/UI/Option/Option'
import { ContextMenu } from '../../../components/ContextMenu/ContextMenu'
import { QuestCreateQuestionMultiple } from './QuestCreateQuestionMultiple/QuestCreateQuestionMultiple'
import { QuestCreateQuestionConnection } from './QuestCreateQuestionConnection/QuestCreateQuestionConnection'
import { QuestCreateQuestionBoxSorting } from './QuestCreateQuestionBoxSorting/QuestCreateQuestionBoxSorting'

export interface QuestCreateQuestionsProps {
  questions: QuestQuestion[]
  setQuestions: (questions: QuestQuestion[]) => void
}

export const QuestCreateQuestions = ({
  questions,
  setQuestions,
}: QuestCreateQuestionsProps) => {
  const addQuestionContextMenuOptions: OptionProps[] = [
    {
      text: 'Единичный выбор',
      onSelect: () => {
        setQuestions([
          ...questions,
          {
            text: '',
            type: 'single',
            answer: { options: [''], correctAnswer: 0 },
          } as QuestQuestionSingle,
        ])
      },
    },
    {
      text: 'Множественный выбор',
      onSelect: () => {
        setQuestions([
          ...questions,
          {
            text: '',
            type: 'multiple',
            answer: { options: [''], correctAnswer: [0] },
          } as QuestQuestionMultiple,
        ])
      },
    },
    {
      text: 'Сопоставление',
      onSelect: () => {
        setQuestions([
          ...questions,
          {
            text: '',
            type: 'connection',
            answer: { options: ['', ''], correctAnswer: ['0 - 1'] },
          } as QuestQuestionConnection,
        ])
      },
    },
    {
      text: 'Сортировка',
      onSelect: () => {
        setQuestions([
          ...questions,
          {
            text: '',
            type: 'boxSorting',
            answer: {
              options: [''],
              correctAnswer: [{ name: '', options: [0] }],
            },
          } as QuestQuestionBoxSorting,
        ])
      },
    },
  ]

  const renderQuestion = (question: QuestQuestion, index: number) => (
    <div>
      <Input
        label="Вопрос"
        value={question.text}
        onChange={e =>
          setQuestions(
            questions.map((question, indexQuestion) =>
              indexQuestion === index
                ? { ...question, text: e.target.value }
                : question,
            ),
          )
        }
      />
    </div>
  )

  return (
    <>
      {questions.map((question, index) => (
        <ContainerBox key={index}>
          {renderQuestion(question, index)}
          {question.type === 'single' && (
            <QuestCreateQuestionSingle
              questions={questions}
              setQuestions={setQuestions}
              singleQuestionIndex={index}
              singleQuestion={question as QuestQuestionSingle}
            />
          )}
          {question.type === 'multiple' && (
            <QuestCreateQuestionMultiple
              questions={questions}
              setQuestions={setQuestions}
              multipleQuestionIndex={index}
              multipleQuestion={question as QuestQuestionMultiple}
            />
          )}
          {question.type === 'connection' && (
            <QuestCreateQuestionConnection
              questions={questions}
              setQuestions={setQuestions}
              connectionQuestionIndex={index}
              connectionQuestion={question as QuestQuestionConnection}
            />
          )}
          {question.type === 'boxSorting' && (
            <QuestCreateQuestionBoxSorting
              questions={questions}
              setQuestions={setQuestions}
              boxSortingQuestionIndex={index}
              boxSortingQuestion={question as QuestQuestionBoxSorting}
            />
          )}
        </ContainerBox>
      ))}
      <ContextMenu options={addQuestionContextMenuOptions}>
        <Button
          isIconOnly
          isButtonCircle
          iconBefore="PLUS"
          colorType={'accent'}
        />
      </ContextMenu>
    </>
  )
}
