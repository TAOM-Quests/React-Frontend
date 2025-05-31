import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { FormHeaderEditor } from './FormHeaderEditor'
import { QuestionList } from './QuestionList'
import { FeedbackForm } from '../../models/feedbackForm'
import { FeedbackQuestion } from '../../models/feedbackQuestion'
import { Loading } from '../Loading/Loading'
import { feedback } from '../../services/api/commonModule/commonEntities/feedback/feedback'

const DEFAULT_TITLE = 'Обратная связь'
const DEFAULT_DESCRIPTION =
  'Спасибо за участие! Пожалуйста, оставьте свой отзыв, чтобы мы могли улучшить нашу работу!'

export interface FeedbackFormRef {
  saveForm: () => void
}

interface FeedbackFormEditorProps {
  entityName: string
  entityId: number | null
  baseQuestions: FeedbackQuestion[]
  onFormSaved?: (form: FeedbackForm) => void
}

export const FeedbackFormEditor = forwardRef(
  (
    {
      entityId,
      entityName,
      baseQuestions,
      onFormSaved,
    }: FeedbackFormEditorProps,
    ref,
  ) => {
    const [title, setTitle] = useState<string>(DEFAULT_TITLE)
    const [description, setDescription] = useState<string>(DEFAULT_DESCRIPTION)
    const [questions, setQuestions] =
      useState<FeedbackQuestion[]>(baseQuestions)

    const [isLoading, setIsLoading] = useState(false)

    let formId: number | null = null

    useImperativeHandle(
      ref,
      () => ({
        saveForm,
      }),
      [],
    )

    useEffect(() => {
      setIsLoading(true)
      try {
        fetchForm()
      } catch (e) {
        console.log(`[FeedbackFormEditor] ${e}`)
      }
      setIsLoading(false)
    }, [])

    const fetchForm = async () => {
      if (!entityId)
        throw Error("Couldn't fetch feedback form: EntityId is required")

      const form = await feedback.getForm({
        entityId,
        entityName,
      })
      formId = form.id
      setTitle(form.title)
      setQuestions(form.questions)
      setDescription(form.description)
    }

    const saveForm = async () => {
      if (!entityId)
        throw Error("Couldn't save feedback form: EntityId is required")

      setIsLoading(true)
      const savedForm = formId
        ? await feedback.updateForm({
            title,
            questions,
            id: formId,
            description,
          })
        : await feedback.createFrom({
            title,
            entityId,
            questions,
            entityName,
            description,
          })
      onFormSaved?.(savedForm)
      setIsLoading(false)
    }

    const handleHeaderChange = (changes: {
      title?: string
      description?: string
    }) => {
      if (changes.title !== undefined) setTitle(changes.title)
      if (changes.description !== undefined) setDescription(changes.description)
    }

    return (
      <>
        {!isLoading ? (
          <div>
            <h2>Редактор формы обратной связи</h2>
            <FormHeaderEditor
              title={title}
              description={description}
              onChange={handleHeaderChange}
            />
            <QuestionList
              questions={questions}
              onChangeQuestions={setQuestions}
            />
          </div>
        ) : (
          <Loading />
        )}
      </>
    )
  },
)
