import Input from '../../../components/UI/Input/Input'
import {
  QuestQuestion,
  QuestQuestionSingle,
} from '../../../models/questQuestion'
import { QuestCreateQuestionSingle } from './QuestCreateQuestionSingle'
import { Button } from '../../../components/UI/Button/Button'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'

export interface QuestCreateQuestionsProps {
  questions: QuestQuestion[]
  setQuestions: (questions: QuestQuestion[]) => void
}

export const QuestCreateQuestions = ({
  questions,
  setQuestions,
}: QuestCreateQuestionsProps) => {
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
        <ContainerBox>
          {renderQuestion(question, index)}
          {question.type === 'single' && (
            <QuestCreateQuestionSingle
              questions={questions}
              setQuestions={setQuestions}
              singleQuestionIndex={index}
              singleQuestion={question as QuestQuestionSingle}
            />
          )}
        </ContainerBox>
      ))}
      <Button
        isIconOnly
        isButtonCircle
        iconBefore="PLUS"
        onClick={() =>
          setQuestions([
            ...questions,
            {
              text: '',
              type: 'single',
              answer: { options: [''], correctAnswer: 0 },
            } as QuestQuestionSingle,
          ])
        }
      />
    </>
  )
}
