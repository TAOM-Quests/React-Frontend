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
import { useNavigate, useParams } from 'react-router'
import { SaveQuestDto } from '../../services/api/questModule/quests/questsDto'
import { quests } from '../../services/api/questModule/quests/quests'
import { Button } from '../../components/UI/Button/Button'
import { Loading } from '../../components/Loading/Loading'

export const QuestCreate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [tags, setTags] = useState<QuestTag[]>([])
  const [description, setDescription] = useState<string>('')
  const [group, setGroup] = useState<QuestGroup | null>(null)
  const [image, setImage] = useState<ServerFile | null>(null)
  const [difficulty, setDifficulty] = useState<QuestDifficult | null>(null)
  const [questions, setQuestions] = useState<QuestQuestion[]>([])
  const [results, setResults] = useState<QuestResult[]>([])

  const questId = useParams().id
  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)

  useEffect(() => {
    if (!user || !user.isEmployee) {
      navigate('/')
    }
  }, [user])

  useEffect(() => {
    const fetchQuestData = async () => {
      setIsLoading(true)

      const quest = await quests.getById(+questId!)

      if (quest.name) setName(quest.name)
      if (quest.time) setTime(quest.time)
      if (quest.tags) setTags(quest.tags)
      if (quest.description) setDescription(quest.description)
      if (quest.group) setGroup(quest.group)
      if (quest.image) setImage(quest.image)
      if (quest.difficult) setDifficulty(quest.difficult)
      if (quest.questions) setQuestions(quest.questions)
      if (quest.results) setResults(quest.results)

      setIsLoading(false)
    }

    if (questId) {
      fetchQuestData()
    }
  }, [])

  const saveQuest = async () => {
    setIsLoading(true)

    const saveQuest: SaveQuestDto = {
      executorId: user!.id,
      departmentId: user!.departmentId!,
    }

    if (name) saveQuest.name = name
    if (time) saveQuest.time = time
    if (group) saveQuest.groupId = group.id
    if (image) saveQuest.imageId = image.id
    if (description) saveQuest.description = description
    if (difficulty) saveQuest.difficultId = difficulty.id
    if (tags.length) saveQuest.tagsIds = tags.map(tag => tag.id)
    if (questions.length)
      saveQuest.questions = questions.map(question => ({
        ...question,
        questId: +questId!,
      }))
    if (results.length)
      saveQuest.results = results.map(result => ({
        ...result,
        questId: +questId!,
      }))

    const { id } = questId
      ? await quests.update(+questId, saveQuest)
      : await quests.create(saveQuest)

    if (!questId) navigate(`/quest/${id}/edit`)

    setIsLoading(false)
  }

  return (
    <>
      {!isLoading ? (
        <div>
          <Button text="Сохранить" onClick={saveQuest} />
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
            setDifficulty={setDifficulty}
            setDescription={setDescription}
          />
          <QuestCreateQuestions
            questions={questions}
            setQuestions={setQuestions}
          />
          <QuestCreateResults results={results} setResults={setResults} />
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
