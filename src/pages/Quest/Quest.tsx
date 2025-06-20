import { useNavigate, useParams } from 'react-router'
import { Quest as QuestInterface } from '../../models/quest'
import { useEffect, useState } from 'react'
import { quests } from '../../services/api/questModule/quests/quests'
import { QuestStartView } from './QuestStartView/QuestStartView'
import { ContainerBox } from '../../components/ContainerBox/ContainerBox'
import { QuestQuestion } from './QuestQuestion/QuestQuestion'
import { QuestResultView } from './QuestResultView/QuestResultView'
import { SaveQuestCompleteDto } from '../../services/api/questModule/quests/questsDto'
import { selectAuth } from '../../redux/auth/authSlice'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import './Quest.scss'
import { Tag } from '../../components/UI/Tag/Tag'
import { Loading } from '../../components/Loading/Loading'
import moment from 'moment'
interface UserAnswer {
  answer: any
  isCorrectAnswer: boolean
}

export const Quest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isStartView, setIsStartView] = useState<boolean>(true)
  const [isResultView, setIsResultView] = useState<boolean>(false)

  const [quest, setQuest] = useState<QuestInterface | null>(null)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [timer, setTimer] = useState<number | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null)

  const questId = useParams().id
  const completedId = useParams().completeId
  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)

  useEffect(() => {
    const fetchQuestData = async () => {
      try {
        if (!questId && !completedId) throw new Error('No quest id')
        setIsLoading(true)

        const fetchedQuest = completedId
          ? await quests.getCompletedById(+completedId!)
          : await quests.getById(+questId!)
        setQuest(fetchedQuest)

        setIsLoading(false)
      } catch (e) {
        console.error(`[Quest] ${e}`)
      }
    }

    fetchQuestData()
  }, [questId, completedId])

  useEffect(() => {
    if (isResultView && !completedId) saveComplete()
  }, [isResultView])

  const setNextQuestion = (userAnswer: any, isCorrectAnswer: boolean) => {
    setUserAnswers([...userAnswers, { answer: userAnswer, isCorrectAnswer }])

    if (currentQuestionIndex !== quest!.questions!.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex! + 1)
    } else {
      setCurrentQuestionIndex(null)
      setIsResultView(true)
    }
  }

  const startQuest = () => {
    if (!quest) throw new Error('Quest not found')

    if (quest.time) {
      const [minutes, seconds] = quest.time.split(':').map(Number)
      setTimer(moment.duration({ minutes, seconds }).asMilliseconds())

      const interval = setInterval(() => {
        setTimer(prevTimer => {
          const newTimer = (prevTimer ?? 0) - 1000
          if (newTimer <= 0) {
            clearInterval(interval)
            setCurrentQuestionIndex(null)
            setIsResultView(true)
            return 0
          }
          return newTimer
        })
      }, 1000)
    }

    setIsStartView(false)
    quest.questions?.length ? setCurrentQuestionIndex(0) : setIsResultView(true)
  }

  const saveComplete = async () => {
    try {
      if (!quest) throw new Error('Nothing to save')

      const currentResult = quest.results?.find(
        result =>
          result.minPoints <=
          userAnswers.filter(answer => answer.isCorrectAnswer).length,
      )

      const saveQuestComplete: SaveQuestCompleteDto = {
        id: quest.id,
        result: {
          name: currentResult?.name ?? '',
          description: currentResult?.description ?? '',
          imageId: currentResult?.imageId,
        },
        questions: quest.questions!.map((question, index) => ({
          ...question,
          answer: {
            ...question.answer,
            userAnswer: userAnswers?.[index]?.answer ?? null,
          },
        })),
      }

      if (quest.name) saveQuestComplete.name = quest.name
      if (quest.time) saveQuestComplete.time = moment(timer).format('mm:ss')
      if (quest.tags) saveQuestComplete.tags = quest.tags.map(tag => tag.name)
      if (quest.image) saveQuestComplete.imageId = quest.image.id
      if (quest.difficult) saveQuestComplete.difficult = quest.difficult.name
      if (quest.description) saveQuestComplete.description = quest.description

      await quests.saveComplete(+questId!, user!.id, saveQuestComplete)
    } catch (e) {
      console.error(`[Quest] ${e}`)
    }
  }

  return (
    <>
      {!isLoading && quest ? (
        <div
          className="quest container_min_width"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${quest.image?.url})`,
          }}
        >
          {isStartView && (
            <QuestStartView
              time={quest.time}
              name={quest.name ?? ''}
              isCompleted={!!completedId}
              difficulty={quest.difficult?.name}
              description={quest.description ?? ''}
              tags={quest.tags?.map(tag => tag.name) ?? []}
              questionCount={quest.questions?.length ?? 0}
              onClickRestartButton={() => navigate(`/quest/${quest.id}`)}
              onClickStartButton={startQuest}
            />
          )}
          {currentQuestionIndex !== null && (
            <ContainerBox className="quest__container-questions">
              <div className="quest__tags">
                {timer && (
                  <Tag
                    text={`${moment(timer).format('mm:ss')}`}
                    type="subdued"
                    size="small"
                  />
                )}
                <Tag
                  size="small"
                  type="subdued"
                  text={`${currentQuestionIndex + 1} из ${quest.questions?.length}`}
                />
              </div>
              <QuestQuestion
                isCompleted={!!completedId}
                setNextQuestion={setNextQuestion}
                question={quest.questions![currentQuestionIndex]}
              />
            </ContainerBox>
          )}
          {isResultView && (
            <QuestResultView
              time={quest.time}
              tags={quest.tags?.map(tag => tag.name) ?? []}
              difficulty={quest.difficult?.name}
              results={quest.results ?? []}
              questionCount={quest.questions?.length ?? 0}
              userCorrectAnswerCount={
                userAnswers.filter(answer => answer.isCorrectAnswer).length
              }
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
