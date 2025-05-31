import { useState } from 'react'
import { FormHeaderEditor } from './FormHeaderEditor'
import { QuestionList } from './QuestionList'
import { FeedbackForm, Question } from './feedback'

const DEFAULT_TITLE = 'Обратная связь'
const DEFAULT_DESCRIPTION =
  'Спасибо за участие! Пожалуйста, оставьте свой отзыв, чтобы мы могли улучшить нашу работу!'

interface FeedbackFormEditorProps {
  entity: string
  entityId: number | null
  baseQuestions: Question[]
  onFormSaved?: (form: FeedbackForm) => void
}

export const FeedbackFormEditor = ({
  entity,
  entityId,
  baseQuestions,
  onFormSaved,
}: FeedbackFormEditorProps) => {
  const [formId, setFormId] = useState<number | undefined>(undefined)
  const [title, setTitle] = useState<string>(DEFAULT_TITLE)
  const [description, setDescription] = useState<string>(DEFAULT_DESCRIPTION)
  const [questions, setQuestions] = useState<Question[]>(baseQuestions)

  const [isLoading, setIsLoading] = useState(false)

  const handleHeaderChange = (changes: {
    title?: string
    description?: string
  }) => {
    if (changes.title !== undefined) setTitle(changes.title)
    if (changes.description !== undefined) setDescription(changes.description)
  }

  return (
    <div>
      <h2>Редактор формы обратной связи</h2>
      <FormHeaderEditor
        title={title}
        description={description}
        onChange={handleHeaderChange}
      />
      <QuestionList questions={questions} onChangeQuestions={setQuestions} />
    </div>
  )
}
