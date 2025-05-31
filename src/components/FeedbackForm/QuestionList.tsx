import { Question } from './feedback'
import { QuestionEditor } from './QuestionEditor'

interface QuestionListProps {
  questions: Question[]
  onChangeQuestions: (questions: Question[]) => void
}

export const QuestionList = ({
  questions,
  onChangeQuestions,
}: QuestionListProps) => {
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

  const handleAddQuestion = () => {
    onChangeQuestions([
      ...questions,
      { type: 'text', question: '', answers: [] },
    ])
  }

  return (
    <div>
      <h3>Вопросы формы</h3>
      {questions.map((q, i) => (
        <QuestionEditor
          key={i}
          question={q}
          onChange={updatedQ => handleQuestionChange(i, updatedQ)}
          onDelete={() => handleDeleteQuestion(i)}
        />
      ))}

      <button type="button" onClick={handleAddQuestion}>
        Добавить вопрос
      </button>
    </div>
  )
}
