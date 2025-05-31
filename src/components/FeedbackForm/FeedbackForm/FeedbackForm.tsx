import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { FormHeaderEditor } from '../FormHeaderEditor/FormHeaderEditor'
import { QuestionList } from '../QuestionList/QuestionList'
import { FeedbackForm } from '../../../models/feedbackForm'
import { FeedbackQuestion } from '../../../models/feedbackQuestion'
import { Loading } from '../../Loading/Loading'
import { feedback } from '../../../services/api/commonModule/commonEntities/feedback/feedback'
import './FeedbackFormEditor.scss'
import { selectAuth } from '../../../redux/auth/authSlice'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { ContainerBox } from '../../ContainerBox/ContainerBox'

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

    const user = useAppSelector(selectAuth)
    const isEmployee = user?.isEmployee

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
          <div className="feedback-form-editor">
            {isEmployee && (
              <>
                <h5 className="heading_5 feedback-form-editor__title">
                  Редактор формы обратной связи
                </h5>
                <FormHeaderEditor
                  title={title}
                  description={description}
                  onChange={handleHeaderChange}
                />
              </>
            )}
            {isEmployee && (
              <ContainerBox>
                <h5 className="heading_5 feedback-form__title">{title}</h5>
                <p className="body_m_r">{description}</p>
              </ContainerBox>
            )}

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
