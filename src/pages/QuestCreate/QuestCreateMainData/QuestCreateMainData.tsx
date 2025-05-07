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
  description: string
  image: ServerFile | null
  difficulty: QuestDifficult | null
  tags: (QuestTag & { isUserAdded?: boolean })[]
  group: (QuestGroup & { isUserAdded?: boolean }) | null
  setName: (name: string) => void
  setTime: (time: string) => void
  setImage: (image: ServerFile | null) => void
  setDescription: (description: string) => void
  setDifficulty: (difficulty: QuestDifficult | null) => void
  setTags: (tags: (QuestTag & { isUserAdded?: boolean })[]) => void
  setGroup: (group: (QuestGroup & { isUserAdded?: boolean }) | null) => void
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
  const [questTags, setQuestTags] = useState<QuestTag[]>([])
  const [questGroups, setQuestGroups] = useState<QuestGroup[]>([])
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

        setQuestTags(questTags)
        setQuestGroups(questGroups)
        setQuestDifficulties(questDifficulties)
      } catch (e) {
        console.log(`[QuestCreateMainData] ${e}`)
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
            selectedItems={
              difficulty ? [{ id: difficulty.id, text: difficulty.name }] : []
            }
          />
          <TimeInput
            value={time}
            label="Время прохождения"
            onTimeSelect={time => setTime(time ?? '')}
          />
        </div>

        <Dropdown
          items={questGroups.map(group => ({
            id: group.id,
            text: group.name,
          }))}
          onChangeDropdown={selected =>
            selected &&
            !isArray(selected) &&
            setGroup({
              id: +selected.id,
              name: selected.text,
              isUserAdded: selected.isUserAdded,
            })
          }
          label="Группа квестов"
          placeholder="Выберите группу"
          selectedItems={group ? [{ id: group.id, text: group.name }] : []}
          isAllowAddNewItem
        />
        <Dropdown
          items={questTags.map(tag => ({ id: tag.id, text: tag.name }))}
          onChangeDropdown={selected =>
            isArray(selected) &&
            setTags(
              selected.map(selectedTag => ({
                id: selectedTag.id,
                name: selectedTag.text,
                isUserAdded: selectedTag.isUserAdded,
              })),
            )
          }
          label="Теги"
          placeholder="Выберите теги"
          selectedItems={tags.map(tag => ({ id: tag.id, text: tag.name }))}
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
