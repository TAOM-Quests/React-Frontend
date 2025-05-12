import moment from 'moment'
import { Employee } from '../../models/user'
import { OptionAvatar } from '../User/OptionAvatar/OptionAvatar'
import './Comment.scss'

export interface CommentProps {
  text: string
  user: Employee
  createdAt?: Date
}

export const Comment = ({ text, user, createdAt }: CommentProps) => {
  return (
    <div className="comment">
      <OptionAvatar
        text={user.name}
        size="extraSmall"
        description={user.position}
        avatarSrc={user.image?.url}
      />
      {text && (
        <div className="comment__content">
          <div
            className="body_m_r"
            dangerouslySetInnerHTML={{ __html: text }}
          />
          {createdAt && (
            <p className="body_xs_r comment__date">
              {moment(createdAt).format('DD MMMM YYYY HH:mm')}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
