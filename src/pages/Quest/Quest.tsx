import { useNavigate, useParams } from 'react-router'
import { Quest as QuestInterface } from '../../models/quest'
import { useEffect, useState } from 'react'
import { quests } from '../../services/api/questModule/quests/quests'
import { QuestStartView } from './QuestStartView/QuestStartView'
import { ContainerBox } from '../../components/ContainerBox/ContainerBox'
import { Badge } from '../../components/UI/Badge/Badge'
import { QuestQuestion } from './QuestQuestion/QuestQuestion'

export const Quest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [quest, setQuest] = useState<QuestInterface | null>(null)
  const [isStartView, setIsStartView] = useState<boolean>(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null)
  const [isResultView, setIsResultView] = useState<boolean>(false)

  const questId = useParams().id
  const navigate = useNavigate()

  useEffect(() => {
    const fetchQuestData = async () => {
      try {
        const fetchedQuest = await quests.getById(+questId!)
        setQuest(fetchedQuest)
      } catch (e) {
        console.error(e)
      }
    }

    if (questId) {
      fetchQuestData()
    } else {
      console.error('[QuestPage] Quest have no id')
      navigate('/')
    }
  }, [])

  const setNextQuestion = () => {
    if (currentQuestionIndex !== quest!.questions!.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex! + 1)
    } else {
      setCurrentQuestionIndex(null)
      setIsResultView(true)
    }
  }

  return (
    <>
      {!isLoading && quest ? (
        <div>
          <img src={quest.image?.url} />
          {isStartView && (
            <QuestStartView
              name={quest.name ?? ''}
              time={quest.time}
              tags={quest.tags?.map(tag => tag.name) ?? []}
              difficulty={quest.difficult?.name}
              description={quest.description ?? ''}
              questionCount={quest.questions?.length ?? 0}
              onClickStartButton={() => {
                setIsStartView(false)
                setCurrentQuestionIndex(0)
              }}
            />
          )}
          {currentQuestionIndex && (
            <ContainerBox>
              {quest.time && <Badge text={quest.time} />}
              <Badge
                text={`${currentQuestionIndex} из ${quest.questions?.length}`}
              />
              <QuestQuestion
                question={quest.questions![currentQuestionIndex]}
                setNextQuestion={setNextQuestion}
              />
            </ContainerBox>
          )}
        </div>
      ) : (
        'Loading...'
      )}
    </>
  )
}
