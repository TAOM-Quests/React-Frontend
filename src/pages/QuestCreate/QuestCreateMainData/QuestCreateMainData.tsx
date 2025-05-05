import { useEffect, useState } from 'react'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import {
  Dropdown,
  DropdownItemType,
} from '../../../components/UI/Dropdown/Dropdown'
import Input from '../../../components/UI/Input/Input'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { QuestDifficult } from '../../../models/questDifficult'
import { QuestGroup } from '../../../models/questGroup'
import { QuestTag } from '../../../models/questTag'
import { ServerFile } from '../../../models/serverFile'
import { selectAuth } from '../../../redux/auth/authSlice'
import { quests } from '../../../services/api/questModule/quests/quests'
import { isArray } from 'lodash'
import { TextEditor } from '../../../components/TextEditor/TextEditor'
import { TimeInput } from '../../../components/UI/TimeInput/TimeInput'
import './QuestCreateMainData.scss'

export interface QuestCreateMainDataProps {
  name: string
  time: string
  tags: DropdownItemType[]
  image: ServerFile | null
  group: DropdownItemType | null
  description: string
  setName: (name: string) => void
  setTime: (time: string) => void
  difficulty: QuestDifficult | null
  setTags: (tags: DropdownItemType[]) => void
  setImage: (image: ServerFile | null) => void
  setGroup: (group: DropdownItemType | null) => void
  setDescription: (description: string) => void
  setDifficulty: (difficulty: QuestDifficult | null) => void
}

export const QuestCreateMainData = ({
  name,
  time,
  tags,
  image,
  group,
  setName,
  setTime,
  setTags,
  setImage,
  setGroup,
  difficulty,
  description,
  setDifficulty,
  setDescription,
}: QuestCreateMainDataProps) => {
  const [questTags, setQuestTags] = useState<DropdownItemType[]>([])
  const [questGroups, setQuestGroups] = useState<DropdownItemType[]>([])
  const [questDifficulties, setQuestDifficulties] = useState<QuestDifficult[]>(
    [],
  )

  const user = useAppSelector(selectAuth)

  useEffect(() => {
    const fetchCreateQuestData = async () => {
      try {
        const questTags = await quests.getTags({
          departmentId: user!.departmentId,
        })
        const questGroups = await quests.getGroups({
          departmentId: user!.departmentId,
        })
        const questDifficulties = await quests.getDifficulties()

        setQuestTags(questTags.map(tag => ({ id: tag.id, text: tag.name })))
        setQuestGroups(
          questGroups.map(group => ({ id: group.id, text: group.name })),
        )
        setQuestDifficulties(questDifficulties)
      } catch (e) {
        console.log(e)
      }
    }

    fetchCreateQuestData()
  }, [])

  return (
    <ContainerBox className="questCreateMainData">
      <div className="questCreateMainData--left">
        <Input
          label="Название квеста"
          placeholder="Введите название квеста"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <div className="questCreateMainData--inputsMini">
          <Dropdown
            items={questDifficulties.map(difficult => ({
              id: difficult.id,
              text: difficult.name,
            }))}
            onChangeDropdown={selected =>
              selected &&
              !isArray(selected) &&
              setDifficulty(
                questDifficulties.find(
                  difficult => difficult.id === +selected,
                ) ?? null,
              )
            }
            placeholder="Выберите сложность"
            label="Сложность"
            selectedIds={difficulty ? [difficulty.id] : []}
          />
          <TimeInput
            value={time}
            label="Время прохождения"
            onTimeSelect={time => setTime(time ?? '')}
          />
        </div>

        <Dropdown
          items={questGroups}
          onChangeDropdown={selected =>
            selected && !isArray(selected) && setGroup(selected)
          }
          label="Группа квестов"
          placeholder="Выберите группу"
          selectedIds={group ? [group.id] : []}
          isAllowAddNewItem
        />
        <Dropdown
          items={questTags.concat(tags.filter(tag => tag.isUserAdded))}
          onChangeDropdown={selected => isArray(selected) && setTags(selected)}
          label="Теги"
          placeholder="Выберите теги"
          selectedIds={tags.map(tag => tag.id)}
          isMultiple
          isAllowAddNewItem
        />
      </div>
      <div className="questCreateMainData--right">
        <TextEditor
          value={description}
          placeholder="Введите описание"
          label="Описание"
          onChange={e => setDescription(e.editor.getHTML())}
        />
      </div>
    </ContainerBox>
  )
}
