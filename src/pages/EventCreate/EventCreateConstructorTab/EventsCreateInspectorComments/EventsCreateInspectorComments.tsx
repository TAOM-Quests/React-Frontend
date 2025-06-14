import { Dispatch, useEffect, useState } from 'react'
import './EventsCreateInspectorComments.scss'
import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { TextEditor } from '../../../../components/TextEditor/TextEditor'
import { Button } from '../../../../components/UI/Button/Button'
import { useAppSelector } from '../../../../hooks/redux/reduxHooks'
import { EmployeeAuth } from '../../../../models/userAuth'
import { selectAuth } from '../../../../redux/auth/authSlice'
import { Comment as CommentModel } from '../../../../models/comment'
import { Comment } from '../../../../components/Comment/Comment'

export interface EventsCreateInspectorCommentsProps {
  comments: CommentModel[]
  setComments: Dispatch<React.SetStateAction<CommentModel[]>>
}

export const EventsCreateInspectorComments = ({
  comments,
  setComments,
}: EventsCreateInspectorCommentsProps) => {
  const [currentCommentText, setCurrentCommentText] = useState<string>('')
  const user = useAppSelector(selectAuth) as EmployeeAuth

  const addComment = () => {
    setCurrentCommentText('')
    setComments(prev => [
      ...prev,
      {
        text: currentCommentText,
        user,
      },
    ])
  }
  useEffect(() => {}, [currentCommentText])

  return (
    <ContainerBox className="events-create-inspector-comments">
      <div className="comments-box">
        <div className="body_l_sb comments__title">Предыдущие комментарии</div>
        <div className="comments">
          {comments.length !== 0 ? (
            comments.map(comment => <Comment key={comment.id} {...comment} />)
          ) : (
            <div className="no-comments">Нет комментариев</div>
          )}
        </div>
      </div>

      <div className="add-comment">
        <TextEditor
          label="Комментарий"
          value={currentCommentText}
          onChange={editor => setCurrentCommentText(editor.editor.getHTML())}
        />
        <Button text="Добавить комментарий" size="small" onClick={addComment} />
      </div>
    </ContainerBox>
  )
}
