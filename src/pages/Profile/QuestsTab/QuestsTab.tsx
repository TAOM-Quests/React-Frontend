import { useState } from 'react'
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

interface QuestsFilter {
  name?: string
}

export interface QuestsTabProps {
  user: UserAuth
}

export default function QuestsTab({ user }: QuestsTabProps) {
  const [filter, setFilter] = useState<QuestsFilter>({})
  const [userQuests, setQuests] = useState<QuestMinimize[]>([])

  const navigate = useNavigate()

  // useEffect(() => {
  //   fetchQuests()
  // }, [filter])

  //TODO: Добавить метод получения всех квестов пользователя
  // const fetchQuests = async () => {
  //   const fetchedQuests = user.isEmployee
  //     ? await quests.getManyByParams({
  //         executor: user.id,
  //         offset: userQuests?.length,
  //         ...filter,
  //       })
  //     : await quests.getManyByParams({
  //         participant: user.id,
  //         offset: userQuests?.length,
  //         ...filter,
  //       })

  //   setQuests([...(userQuests ?? []), ...fetchedQuests])
  // }

  return (
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
        <QuestMinimizeComponent key={0} id={0} name="Ghbdtn" />
        <QuestMinimizeComponent key={1} id={1} name="Ghbdtn" />
        <QuestMinimizeComponent key={2} id={2} name="Ghbdtn" />
        <QuestMinimizeComponent key={3} id={3} name="Ghbdtn" />
        <QuestMinimizeComponent key={4} id={4} name="Ghbdtn" />

        {/* {userQuests && userQuests.length
          ? userQuests.map(quest => {
              const questData: QuestMinimizeProps = {
                id: quest.id,
                name: quest.name ?? '',
                // imageUrl: quest.image?.url ?? '',
              }

              if (user.isEmployee) {
                questData.isEmployeeView = true
                questData.onDelete = () =>
                  setQuests(userQuests.filter(e => e.id !== quest.id))
              }

              return <QuestMinimizeComponent key={quest.id} {...questData} />
            })
          : 'Квестов нет'} */}
      </div>
    </div>
  )
}
