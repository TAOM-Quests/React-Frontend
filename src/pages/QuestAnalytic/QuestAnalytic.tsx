import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { FeedbackAnswer } from '../../models/feedbackAnswer'
import { FeedbackForm } from '../../models/feedbackForm'
import { Quest } from '../../models/quest'
import { UserProfile } from '../../models/userProfile'
import { selectAuth } from '../../redux/auth/authSlice'
import { quests } from '../../services/api/questModule/quests/quests'
import { feedback } from '../../services/api/commonModule/commonEntities/feedback/feedback'
import { Loading } from '../../components/Loading/Loading'
import { QuestAnalyticElementProps } from './questAnalyticElementProps'
import { Switcher } from '../../components/UI/Switcher/Switcher'
import { QuestParticipants } from './QuestParticipants/QuestParticipants'
import { QuestFeedbackAnswers } from './QuestFeedbackAnswers/QuestFeedbackAnswers'

const TABS = ['Квест', 'Ответы', 'Участники', 'Обратная связь']

export const QuestAnalytic = () => {
  const [activeTab, setActiveTab] = useState('Квест')
  const [isLoading, setIsLoading] = useState(false)

  const [quest, setQuest] = useState<Quest | null>(null)
  const [questAnswers, setQuestAnswers] = useState<Quest[]>([])
  const [participants, setParticipants] = useState<UserProfile[]>([])
  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm | null>(null)
  const [feedbackAnswers, setFeedbackAnswers] = useState<FeedbackAnswer[]>([])

  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)
  const { id: questId } = useParams<{ id: string }>()

  const getAnalyticElementParams = (): QuestAnalyticElementProps => ({
    participants,
    questAnswers,
    feedbackAnswers,
  })

  useEffect(() => {
    if (!user || !user.isEmployee) navigate('/login')

    setIsLoading(true)
    try {
      fetchQuestData()
    } catch (e) {
      console.log(`[QuestAnalytic] ${e}`)
    }
    setIsLoading(false)
  }, [])

  const fetchQuestData = async () => {
    if (!questId) throw new Error('Quest id not found')

    setQuest(await quests.getById(+questId))
    setQuestAnswers(await quests.getManyCompleteByParams({ ids: [+questId] }))
    setFeedbackForm(
      await feedback.getForm({ entityName: 'quests', entityId: +questId }),
    )
    setFeedbackAnswers(
      await feedback.getAnswers({ entityName: 'quests', entityId: +questId }),
    )
    setParticipants(await quests.getParticipants(+questId))
  }

  return (
    <>
      {!isLoading ? (
        <div className="eventAnalytic">
          <div className="eventAnalytic__header">
            <h6 className="heading_6">{quest?.name}</h6>
            <Switcher
              options={TABS}
              activeOption={activeTab}
              onChange={setActiveTab}
            />
          </div>

          {activeTab === 'Квест' && (
            <EventStatistic {...getAnalyticElementParams()} />
          )}
          {activeTab === 'Участники' && (
            <QuestParticipants {...getAnalyticElementParams()} />
          )}
          {activeTab === 'Обратная связь' && (
            <QuestFeedbackAnswers
              feedbackForm={feedbackForm ?? undefined}
              analyticData={getAnalyticElementParams()}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
