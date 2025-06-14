import { useEffect, useRef, useState } from 'react'
import { UserAuth } from '../../../models/userAuth'
import './QuestsTab.scss'
import { QuestMinimize } from '../../../models/questMinimize'
import QuestMinimizeComponent, {
  QuestMinimizeProps,
} from '../../../components/QuestMinimize/QuestMinimize'
import { quests } from '../../../services/api/questModule/quests/quests'
import { Loading } from '../../../components/Loading/Loading'
import {
  QuestsTabFilter,
  QuestTabFilterBar,
  QuestTabFilterBarRef,
} from './FIlterBar/FilterBar'

export interface QuestsTabProps {
  user: UserAuth
}

const QUESTS_COUNT_ON_SCREEN = 12

export default function QuestsTab({ user }: QuestsTabProps) {
  const [filter, setFilter] = useState<QuestsTabFilter>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userQuests, setQuests] = useState<QuestMinimize[]>([])

  const [isEndOfEventsList, setIsEndOfEventsList] = useState(false)
  const [isAllQuestsLoaded, setIsAllQuestsLoaded] = useState(false)

  const filterBarRef = useRef<QuestTabFilterBarRef>(null)
  const questsListEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      isEndOfEventsList &&
      !isAllQuestsLoaded &&
      userQuests.length >= QUESTS_COUNT_ON_SCREEN
    ) {
      tryCallback(fetchQuests)
    }
  }, [isEndOfEventsList])

  useEffect(() => {
    if (!filterBarRef.current) return

    setIsLoading(true)
    tryCallback(filterBarRef.current?.fetchFilterData)
    tryCallback(setQuestsListObserver)
    setIsLoading(false)
  }, [filter])

  useEffect(() => {
    setIsLoading(true)
    setQuests([])
    setIsAllQuestsLoaded(false)
    tryCallback(() => fetchQuests(0))
    setIsLoading(false)
  }, [filter])

  const tryCallback = (callback: () => void) => {
    try {
      callback()
    } catch (e) {
      console.log(`[QuestsTab] ${e}`)
    }
  }

  const setQuestsListObserver = () => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsEndOfEventsList(entry.isIntersecting),
      { threshold: 0.1 },
    )

    if (questsListEndRef.current) {
      observer.observe(questsListEndRef.current)
    }

    return () => observer.disconnect()
  }

  const fetchQuests = async (offset?: number) => {
    const fetchedQuests = await quests.getManyByParams({
      offset: offset ?? userQuests.length,
      ...filter,
    })

    if (fetchedQuests.length < QUESTS_COUNT_ON_SCREEN) {
      setIsAllQuestsLoaded(true)
    }

    setQuests(prev => [...prev, ...fetchedQuests])
  }

  return (
    <>
      {!isLoading ? (
        <div className="profile_quests">
          <div className="profile_quests--quests">
            <QuestTabFilterBar
              filter={filter}
              ref={filterBarRef}
              setFilter={setFilter}
            />

            {userQuests?.length
              ? userQuests.map(quest => {
                  const questData: QuestMinimizeProps = {
                    id: quest.id,
                    name: quest.name ?? '',
                    imageUrl: quest.image?.url ?? '',
                    completedCount: quest.completedCount,
                    difficulty: quest.difficult?.name ?? '',
                    tags: quest.tags.map(tag => tag.name) ?? [],
                  }

                  if (user.isEmployee) {
                    questData.isEmployeeView = true
                    questData.onDelete = () =>
                      setQuests(userQuests.filter(e => e.id !== quest.id))
                  } else {
                    questData.completeId = quest.completeId
                  }

                  return (
                    <QuestMinimizeComponent key={quest.id} {...questData} />
                  )
                })
              : 'Квестов нет'}
          </div>
          <div ref={questsListEndRef} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
