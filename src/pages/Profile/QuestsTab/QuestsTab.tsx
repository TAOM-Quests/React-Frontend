import { useEffect, useRef, useState } from 'react'
import { UserAuth } from '../../../models/userAuth'
import './QuestsTab.scss'
import { QuestMinimize } from '../../../models/questMinimize'
import { useNavigate } from 'react-router'
import Input from '../../../components/UI/Input/Input'
import { Button } from '../../../components/UI/Button/Button'
import QuestMinimizeComponent, {
  QuestMinimizeProps,
} from '../../../components/QuestMinimize/QuestMinimize'
import { quests } from '../../../services/api/questModule/quests/quests'
import { QuestDifficult } from '../../../models/questDifficult'
import { Department } from '../../../models/department'
import { QuestGroup } from '../../../models/questGroup'
import { QuestTag } from '../../../models/questTag'
import { commonEntities } from '../../../services/api/commonModule/commonEntities/commonEntities'
import { Loading } from '../../../components/Loading/Loading'
import { Dropdown } from '../../../components/UI/Dropdown/Dropdown'
import { isArray } from 'lodash'

interface QuestsFilter {
  name?: string
  groupId?: number
  tagsIds?: number[]
  completeBy?: number
  difficultId?: number
  isCompleted?: boolean
  departmentId?: number
  executorsIds?: number[]
}

export interface QuestsTabProps {
  user: UserAuth
}

const QUESTS_COUNT_ON_SCREEN = 12

export default function QuestsTab({ user }: QuestsTabProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userQuests, setQuests] = useState<QuestMinimize[]>([])

  const [tags, setTags] = useState<QuestTag[]>([])
  const [groups, setGroups] = useState<QuestGroup[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [difficulties, setDifficulties] = useState<QuestDifficult[]>([])
  const [filter, setFilter] = useState<QuestsFilter>(
    user?.isEmployee
      ? { executorsIds: [user.id] }
      : { isCompleted: true, completeBy: user.id },
  )

  const [isEndOfEventsList, setIsEndOfEventsList] = useState(false)
  const [isAllQuestsLoaded, setIsAllQuestsLoaded] = useState(false)

  const navigate = useNavigate()
  const questsListEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoading(true)
    tryCallback(fetchFilterData)
    tryCallback(setQuestsListObserver)
    setIsLoading(false)
  }, [filter])

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

  const fetchFilterData = async () => {
    const [tags, groups, difficulties, departments] = await Promise.all([
      quests.getTags(),
      quests.getGroups(),
      quests.getDifficulties(),
      commonEntities.getDepartments(),
    ])

    setTags(tags)
    setGroups(groups)
    setDepartments(departments)
    setDifficulties(difficulties)
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
      {isLoading ? (
        <div className="profile_quests">
          <div className="profile_quests--filters">
            <Input
              value={filter.name}
              iconBefore="SEARCH"
              placeholder="Поиск по названию"
              onChange={e =>
                setFilter(state => ({ ...state, name: e.target.value }))
              }
            />
            <Dropdown
              placeholder="Группа"
              items={groups.map(group => ({
                id: group.id,
                text: group.name,
              }))}
              onChangeDropdown={selected =>
                setFilter(state =>
                  !isArray(selected)
                    ? { ...state, groupId: selected?.id }
                    : state,
                )
              }
            />
            <Dropdown
              isMultiple
              placeholder="Теги"
              items={tags.map(tag => ({
                id: tag.id,
                text: tag.name,
              }))}
              onChangeDropdown={selected =>
                setFilter(state =>
                  isArray(selected)
                    ? { ...state, tagsIds: selected.map(tag => tag.id) }
                    : state,
                )
              }
            />
            <Dropdown
              placeholder="Кафедра"
              items={departments.map(department => ({
                id: department.id,
                text: department.name,
              }))}
              onChangeDropdown={selected =>
                setFilter(state =>
                  !isArray(selected)
                    ? { ...state, departmentId: selected?.id }
                    : state,
                )
              }
            />
            <Dropdown
              placeholder="Сложность"
              items={difficulties.map(difficult => ({
                id: difficult.id,
                text: difficult.name,
              }))}
              onChangeDropdown={selected =>
                setFilter(state =>
                  !isArray(selected)
                    ? { ...state, difficultyId: selected?.id }
                    : state,
                )
              }
            />

            {user.isEmployee && (
              <>
                <Button
                  onClick={() => navigate('/quest/create')}
                  text="Создать квест"
                  colorType="primary"
                />
              </>
            )}
          </div>
          <div className="profile_quests--quests">
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
