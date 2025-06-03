import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { FormHeaderEditor } from './FormHeaderEditor/FormHeaderEditor'
import {
  FeedbackQuestionList,
  FeedbackQuestionListRef,
} from './FeedbackQuestionList/FeedbackQuestionList'
import { FeedbackEntity, FeedbackForm } from '../../models/feedbackForm'
import { FeedbackQuestion } from '../../models/feedbackQuestion'
import { Loading } from '../Loading/Loading'
import { feedback } from '../../services/api/commonModule/commonEntities/feedback/feedback'
import './FeedbackForm.scss'
import { selectAuth } from '../../redux/auth/authSlice'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { ContainerBox } from '../ContainerBox/ContainerBox'
import { FeedbackAnswer } from '../../models/feedbackAnswer'

const DEFAULT_TITLE = 'Обратная связь'
const DEFAULT_DESCRIPTION =
  'Спасибо за участие! Пожалуйста, оставьте свой отзыв, чтобы мы могли улучшить нашу работу!'

export interface FeedbackFormRef {
  saveForm: () => void
  saveAnswer: () => void
}

interface FeedbackFormEditorProps {
  entityId: number | null
  entityName: FeedbackEntity
  baseQuestions?: FeedbackQuestion[]
  onFormSaved?: (form: FeedbackForm) => void
  onAnswerSaved?: (answer: FeedbackAnswer) => void
}

export const FeedbackFormEditor = forwardRef(
  (
    {
      entityId,
      entityName,
      baseQuestions,
      onFormSaved,
      onAnswerSaved,
    }: FeedbackFormEditorProps,
    ref,
  ) => {
    const [title, setTitle] = useState<string>(DEFAULT_TITLE)
    const [description, setDescription] = useState<string>(DEFAULT_DESCRIPTION)
    const [questions, setQuestions] = useState<FeedbackQuestion[]>(
      baseQuestions ?? [],
    )
    const [isLoading, setIsLoading] = useState(false)

    const user = useAppSelector(selectAuth)
    const isEmployee = user?.isEmployee
    const questionListRef = useRef<FeedbackQuestionListRef>(null)

    let formId: number | null = null

    useImperativeHandle(
      ref,
      (): FeedbackFormRef => ({
        saveForm,
        saveAnswer,
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
            name: title,
            questions,
            id: formId,
            description,
          })
        : await feedback.createFrom({
            name: title,
            entityId,
            questions,
            entityName,
            description,
          })
      onFormSaved?.(savedForm)
      await fetchForm()
      setIsLoading(false)
    }

    const saveAnswer = async () => {
      if (!user) throw Error('User not found')
      if (!formId) throw Error('Form id not found')
      if (!questionListRef.current) throw Error('Questions answers not found')

      setIsLoading(true)
      const savedAnswer = await feedback.createAnswer({
        formId,
        userId: user.id,
        answers: questionListRef.current?.getAnswers(),
      })
      onAnswerSaved?.(savedAnswer)
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
            {!isEmployee && (
              <ContainerBox>
                <h5 className="heading_5 feedback-form__title">{title}</h5>
                <p className="body_m_r">{description}</p>
              </ContainerBox>
            )}

            <FeedbackQuestionList
              ref={questionListRef}
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
