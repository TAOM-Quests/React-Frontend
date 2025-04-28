import Input from '../../../../components/UI/Input/Input'
import {
  QuestQuestion,
  QuestQuestionFree,
} from '../../../../models/questQuestion'

export interface QuestCreateQuestionFreeProps {
  freeQuestionIndex: number
  questions: QuestQuestion[]
  freeQuestion: QuestQuestionFree
  setQuestions: (questions: QuestQuestion[]) => void
}

export const QuestCreateQuestionFree = ({
  questions,
  setQuestions,
  freeQuestion,
  freeQuestionIndex,
}: QuestCreateQuestionFreeProps) => {
  const updateQuestion = (updatedQuestion: QuestQuestionFree) =>
    setQuestions(
      questions.map((question, questionIndex) =>
        questionIndex === freeQuestionIndex ? updatedQuestion : question,
      ),
    )

  const updateAnswer = (newAnswer: string) => {
    updateQuestion({ ...freeQuestion, answer: { correctAnswer: newAnswer } })
  }

  return (
    <>
      <Input
        value={freeQuestion.answer.correctAnswer}
        onChange={e => updateAnswer(e.target.value)}
      />
    </>
  )
}
