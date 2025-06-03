import {
  TableColumn,
  TableEdit,
} from '../../../components/Table/TableEdit/TableEdit'
import { Button } from '../../../components/UI/Button/Button'
import { UserAvatarInfo } from '../../../components/User/UserAvatarInfo/UserAvatarInfo'
import { EventAnalyticElementProps } from '../eventAnalyticElementProps'
import { FeedbackForm } from '../../../models/feedbackForm'
import { UserProfile } from '../../../models/userProfile'
import './EventFeedbackAnswers.scss'

interface EventFeedbackAnswersProps {
  analyticData: EventAnalyticElementProps
  feedbackForm?: FeedbackForm
}

export const EventFeedbackAnswers = ({
  feedbackForm,
  analyticData,
}: EventFeedbackAnswersProps) => {
  if (!feedbackForm) {
    return <div>Форма не загружена</div>
  }

  const tableRows = analyticData.feedbackAnswers.map((answer, index) => {
    const user = analyticData.participants.find(p => p.id === answer.userId)
    const { id: answerId, ...rest } = answer
    const answersObj =
      feedbackForm?.questions.reduce(
        (acc, _, idx) => {
          acc[`q_${idx}`] = answer.answers?.[idx] || ''
          return acc
        },
        {} as Record<string, any>,
      ) || {}

    return {
      id: answerId ?? index,
      ...rest,
      ...answersObj,
      user,
    }
  })

  const columns: TableColumn<any>[] = [
    {
      key: 'user',
      title: 'Участник',
      cellRender: (row: { user?: UserProfile }) => {
        const user = row.user
        if (!user) return null
        return (
          <UserAvatarInfo
            text={`${user.lastName} ${user.firstName} ${user.patronymic}`}
            avatarSrc={user.image?.url || ''}
            size="small"
          />
        )
      },
    },
    ...feedbackForm.questions.map((q, idx) => ({
      key: `q_${idx}`,
      title: q.question,
    })),
  ]

  return (
    <div className="container_min_width event-FeedbackAnswers">
      <div className="event-FeedbackAnswers__header">
        <Button text="Скачать Excel" iconBefore="EXCEL" />
      </div>

      <TableEdit columns={columns} initialRows={tableRows} isEditing={false} />
    </div>
  )
}
