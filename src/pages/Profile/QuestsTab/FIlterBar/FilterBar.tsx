import { isArray } from 'lodash'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Department } from '../../../../models/department'
import { QuestDifficult } from '../../../../models/questDifficult'
import { QuestGroup } from '../../../../models/questGroup'
import { QuestTag } from '../../../../models/questTag'
import { Dropdown } from '../../../../components/UI/Dropdown/Dropdown'
import { quests } from '../../../../services/api/questModule/quests/quests'
import { commonEntities } from '../../../../services/api/commonModule/commonEntities/commonEntities'
import { useNavigate } from 'react-router'
import { selectAuth } from '../../../../redux/auth/authSlice'
import { useAppSelector } from '../../../../hooks/redux/reduxHooks'
import Input from '../../../../components/UI/Input/Input'
import { Button } from '../../../../components/UI/Button/Button'

export interface QuestsTabFilter {
  name?: string
  groupId?: number
  tagsIds?: number[]
  completeBy?: number
  difficultId?: number
  isCompleted?: boolean
  departmentId?: number
  executorsIds?: number[]
}

export interface QuestTabFilterBarRef {
  fetchFilterData: () => Promise<void>
}

export type QuestTabFilterBarProps = {
  filter: QuestsTabFilter
  setFilter: (filter: QuestsTabFilter) => void
}

export const QuestTabFilterBar = forwardRef(
  ({ filter, setFilter }: QuestTabFilterBarProps, ref) => {
    const [tags, setTags] = useState<QuestTag[]>([])
    const [groups, setGroups] = useState<QuestGroup[]>([])
    const [departments, setDepartments] = useState<Department[]>([])
    const [difficulties, setDifficulties] = useState<QuestDifficult[]>([])

    const navigate = useNavigate()
    const user = useAppSelector(selectAuth)

    useImperativeHandle(
      ref,
      (): QuestTabFilterBarRef => ({
        fetchFilterData,
      }),
      [],
    )

    useEffect(() => {
      if (!user) throw Error('User not found')

      setFilter(
        user.isEmployee
          ? { executorsIds: [user.id] }
          : { isCompleted: true, completeBy: user.id },
      )
    }, [])

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

    return (
      <div className="profile_quests--filters">
        <Input
          value={filter.name}
          iconBefore="SEARCH"
          placeholder="Поиск по названию"
          onChange={e => setFilter({ ...filter, name: e.target.value })}
        />
        <Dropdown
          placeholder="Группа"
          items={groups.map(group => ({
            id: group.id,
            text: group.name,
          }))}
          onChangeDropdown={selected =>
            setFilter(
              !isArray(selected)
                ? { ...filter, groupId: selected?.id }
                : filter,
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
            setFilter(
              isArray(selected)
                ? { ...filter, tagsIds: selected.map(tag => tag.id) }
                : filter,
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
            setFilter(
              !isArray(selected)
                ? { ...filter, departmentId: selected?.id }
                : filter,
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
            setFilter(
              !isArray(selected)
                ? { ...filter, difficultId: selected?.id }
                : filter,
            )
          }
        />

        {user?.isEmployee && (
          <>
            <Button
              onClick={() => navigate('/quest/create')}
              text="Создать квест"
              colorType="primary"
            />
          </>
        )}
      </div>
    )
  },
)
