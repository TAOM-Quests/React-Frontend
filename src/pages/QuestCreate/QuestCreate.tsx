import { useState } from 'react'
import { QuestGroup } from '../../models/questGroup'
import { QuestDifficult } from '../../models/questDifficult'
import { QuestTag } from '../../models/questTag'
import { quests } from '../../services/api/questModule/quests/quests'
import { selectAuth } from '../../redux/auth/authSlice'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { ServerFile } from '../../models/serverFile'
import { QuestCreateMainData } from './QuestCreateMainData/QuestCreateMainData'

export const QuestCreate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [image, setImage] = useState<ServerFile | null>(null)
  const [name, setName] = useState<string>('')
  const [group, setGroup] = useState<QuestGroup | null>(null)
  const [difficulty, setDifficulty] = useState<QuestDifficult | null>(null)
  const [tags, setTags] = useState<QuestTag[]>([])
  const [time, setTime] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const user = useAppSelector(selectAuth)

  return (
    <>
      {!isLoading ? (
        <div>
          <QuestCreateMainData
            name={name}
            time={time}
            tags={tags}
            image={image}
            group={group}
            setName={setName}
            setTime={setTime}
            setTags={setTags}
            setImage={setImage}
            setGroup={setGroup}
            difficulty={difficulty}
            description={description}
            setIsLoading={setIsLoading}
            setDifficulty={setDifficulty}
            setDescription={setDescription}
          />
        </div>
      ) : (
        'Loading...'
      )}
    </>
  )
}
