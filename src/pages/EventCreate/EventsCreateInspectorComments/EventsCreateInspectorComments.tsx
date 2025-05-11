import { Dispatch, useState } from 'react'
import { Comment as CommentModel } from '../../../models/comment'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { Comment } from '../../../components/Comment/Comment'
import { TextEditor } from '../../../components/TextEditor/TextEditor'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../redux/auth/authSlice'
import { Button } from '../../../components/UI/Button/Button'
import { EmployeeAuth } from '../../../models/userAuth'

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

  return (
    <ContainerBox>
      <div>
        {comments.map(comment => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
      <div>
        <TextEditor
          value={currentCommentText}
          onChange={editor => setCurrentCommentText(editor.editor.getHTML())}
        />
        <Button text="Добавить комментарий" onClick={addComment} />
      </div>
    </ContainerBox>
  )
}
