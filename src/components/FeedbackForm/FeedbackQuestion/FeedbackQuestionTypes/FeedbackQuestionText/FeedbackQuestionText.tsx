import { useAppSelector } from '../../../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../../../redux/auth/authSlice'
import { TextEditor } from '../../../../TextEditor/TextEditor'
import './FeedbackQuestionScale.scss'

interface FeedbackQuestionTextProps {
  textAnswer: string
  setTextAnswer: (value: string) => void
}

export const FeedbackQuestionText = ({
  textAnswer,
  setTextAnswer,
}: FeedbackQuestionTextProps) => {
  const user = useAppSelector(selectAuth)
  const isEmployee = user?.isEmployee

  return (
    <>
      {isEmployee && <p className="body_m_r">Развернутый ответ...</p>}

      {!isEmployee && (
        <TextEditor
          value={textAnswer ?? ''}
          placeholder="Введите ответ"
          onChange={({ editor }) => {
            const html = editor.getHTML()
            setTextAnswer(html)
          }}
        />
      )}
    </>
  )
}
