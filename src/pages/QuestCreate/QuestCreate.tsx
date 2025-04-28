import { useEffect, useState } from 'react'
import { QuestGroup } from '../../models/questGroup'
import { QuestDifficult } from '../../models/questDifficult'
import { QuestTag } from '../../models/questTag'
import { selectAuth } from '../../redux/auth/authSlice'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { ServerFile } from '../../models/serverFile'
import { QuestCreateMainData } from './QuestCreateMainData/QuestCreateMainData'
import { QuestQuestion } from '../../models/questQuestion'
import { QuestCreateQuestions } from './QuestCreateQuestions/QuestCreateQuestions'
import { QuestResult } from '../../models/questResult'
import { QuestCreateResults } from './QuestCreateResults/QuestCreateResults'
import { useNavigate } from 'react-router'

export const QuestCreate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [image, setImage] = useState<ServerFile | null>(null)
  const [name, setName] = useState<string>('')
  const [group, setGroup] = useState<QuestGroup | null>(null)
  const [difficulty, setDifficulty] = useState<QuestDifficult | null>(null)
  const [tags, setTags] = useState<QuestTag[]>([])
  const [time, setTime] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [questions, setQuestions] = useState<QuestQuestion[]>([])
  const [result, setResult] = useState<QuestResult[]>([])

  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)

  useEffect(() => {
    if (!user || !user.isEmployee) {
      navigate('/')
    }
  }, [user])

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
          <QuestCreateQuestions
            questions={questions}
            setQuestions={setQuestions}
          />
          <QuestCreateResults results={result} setResults={setResult} />
        </div>
      ) : (
        'Loading...'
      )}
    </>
  )
}
