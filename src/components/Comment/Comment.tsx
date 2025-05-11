import moment from 'moment'
import { Employee } from '../../models/user'
import { OptionAvatar } from '../User/OptionAvatar/OptionAvatar'

export interface CommentProps {
  text: string
  user: Employee
  createdAt?: Date
}

export const Comment = ({ text, user, createdAt }: CommentProps) => {
  return (
    <div>
      <OptionAvatar
        text={user.name}
        description={user.position}
        avatarSrc={user.image?.url}
      />
      {text}
      {createdAt && moment(createdAt).format('DD MMMM YYYY HH:mm')}
    </div>
  )
}
