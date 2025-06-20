import { useParams } from 'react-router'
import { QuestGroup } from '../../models/questGroup'
import { useEffect, useRef, useState } from 'react'
import { QuestMinimize } from '../../models/questMinimize'
import { quests as questsApi } from '../../services/api/questModule/quests/quests'
import { Loading } from '../../components/Loading/Loading'
import { QuestHomeGroup } from './Group/Group'

const GROUPS_COUNT_ON_SCREEN = 5
const QUESTS_COUNT_IN_GROUP = 7

export const QuestsHome = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [groups, setGroups] = useState<QuestGroup[]>([])
  const [quests, setQuests] = useState<QuestMinimize[]>([])

  const [isEndOGroupsList, setIsEndOfGroupsList] = useState(false)
  const [isAllGroupsLoaded, setIsAllGroupsLoaded] = useState(false)

  const { id: departmentId } = useParams()
  const groupsListEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      isEndOGroupsList &&
      !isAllGroupsLoaded &&
      quests.length >= GROUPS_COUNT_ON_SCREEN
    ) {
      tryCallback(fetchQuests)
    }
  }, [isEndOGroupsList])

  useEffect(() => {
    setIsLoading(true)
    tryCallback(setEventsListObserver)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    setQuests([])
    setIsAllGroupsLoaded(false)
    tryCallback(() => fetchQuests(0))
    setIsLoading(false)
  }, [])

  const tryCallback = (callback: () => void) => {
    try {
      callback()
    } catch (e) {
      console.log(`[EventsTab] ${e}`)
    }
  }

  const setEventsListObserver = () => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsEndOfGroupsList(entry.isIntersecting),
      { threshold: 0.1 },
    )

    if (groupsListEndRef.current) {
      observer.observe(groupsListEndRef.current)
    }

    return () => observer.disconnect()
  }

  const fetchQuests = async (offset?: number) => {
    if (!departmentId) throw Error('No department id')

    const newQuests: QuestMinimize[] = []

    const fetchedGroups = await questsApi.getGroups({
      departmentId: +departmentId,
      offset: offset ?? groups.length,
      limit: GROUPS_COUNT_ON_SCREEN,
    })

    for (let group of fetchedGroups) {
      const fetchedQuests = await questsApi.getManyByParams({
        group: [group.id],
        limit: QUESTS_COUNT_IN_GROUP,
      })

      newQuests.push(...fetchedQuests)
    }

    if (fetchedGroups.length < GROUPS_COUNT_ON_SCREEN) {
      setIsAllGroupsLoaded(true)
    }

    setGroups(prevGroups => [...prevGroups, ...fetchedGroups])
    setQuests(prevQuests => [...prevQuests, ...newQuests])
  }

  return (
    <>
      {!isLoading ? (
        <div className="quests-home">
          <section className="quests-home__banner">
            <div className="quests-home__overlay">
              <h2>Название Кафедры</h2>
              <p>Описание кафедры</p>
            </div>
          </section>

          {groups.map(group => (
            <QuestHomeGroup
              key={group.id}
              group={group}
              quests={quests.filter(quest => quest.group?.id === group.id)}
            />
          ))}
          <div ref={groupsListEndRef} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
