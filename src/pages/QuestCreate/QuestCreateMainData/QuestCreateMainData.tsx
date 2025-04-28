import { useEffect, useState } from 'react'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { Dropdown } from '../../../components/UI/Dropdown/Dropdown'
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

export interface QuestCreateMainDataProps {
  name: string
  time: string
  tags: QuestTag[]
  description: string
  image: ServerFile | null
  group: QuestGroup | null
  setName: (name: string) => void
  setTime: (time: string) => void
  difficulty: QuestDifficult | null
  setTags: (tags: QuestTag[]) => void
  setImage: (image: ServerFile | null) => void
  setGroup: (group: QuestGroup | null) => void
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
        console.log(e)
      }
    }

    fetchCreateQuestData()
  }, [])

  return (
    <ContainerBox>
      <div>
        <Input
          label="Название квеста"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Dropdown
          items={questGroups.map(group => ({ id: group.id, text: group.name }))}
          onChangeDropdown={selected =>
            selected &&
            !isArray(selected) &&
            setGroup(questGroups.find(group => group.id === +selected) ?? null)
          }
          label="Группа квестов"
          selectedIds={group ? [group.id] : []}
        />
        <Dropdown
          items={questDifficulties.map(difficult => ({
            id: difficult.id,
            text: difficult.name,
          }))}
          onChangeDropdown={selected =>
            selected &&
            !isArray(selected) &&
            setDifficulty(
              questDifficulties.find(difficult => difficult.id === +selected) ??
                null,
            )
          }
          label="Сложность"
          selectedIds={difficulty ? [difficulty.id] : []}
        />
        <Dropdown
          items={questTags.map(tag => ({ id: tag.id, text: tag.name }))}
          onChangeDropdown={selected =>
            isArray(selected) &&
            setTags(questTags.filter(tag => tag.id === +selected))
          }
          label="Теги"
          selectedIds={tags.map(tag => tag.id)}
          isMultiple
        />
        <TimeInput value={time} onTimeSelect={time => setTime(time ?? '')} />
      </div>
      <div>
        <TextEditor
          value={description}
          onChange={e => setDescription(e.editor.getHTML())}
        />
      </div>
    </ContainerBox>
  )
}
