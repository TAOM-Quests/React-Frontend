import './AchievementsList.scss'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { Icon } from '../../../components/UI/Icon/Icon'

export const allAchievements = [
  {
    id: 1,
    name: 'Первый шаг',
    description: 'За первый квест',
    experience: 100,
    imageUrl:
      'https://lifehacker.ru/special/fujifilm/dist/static/img/5.2410a2d.jpg',
  },
  {
    id: 2,
    name: 'Серия успехов',
    description: 'За 5 успешных квестов',
    experience: 1500,
    imageUrl:
      'https://lifehacker.ru/special/fujifilm/dist/static/img/5.2410a2d.jpg',
  },
  {
    id: 3,
    name: 'Трудный подвиг',
    description: 'За сложный квест',
    experience: 3000,
    imageUrl:
      'https://lifehacker.ru/special/fujifilm/dist/static/img/5.2410a2d.jpg',
  },
]

interface Achievement {
  id: number
  name: string
  description: string
  experience: number
  imageUrl: string
}

interface AchievementsListProps {
  allAchievements: Achievement[]
  userAchievementIds: number[]
}

export const AchievementsList = ({
  allAchievements,
  userAchievementIds,
}: AchievementsListProps) => {
  return (
    <ContainerBox className="achievements">
      <div className="heading_6 achievements__title">Достижения</div>
      <div className="achievements__list">
        {allAchievements.map((ach, index) => {
          const unlocked = userAchievementIds.includes(ach.id)
          return (
            <div
              key={index}
              className={`achievements__item ${unlocked ? ' achievements__item--unlocked' : ''}`}
            >
              <div className="achievements__image-wrapper">
                <img
                  src={ach.imageUrl}
                  alt={ach.name}
                  className="achievements__image"
                />
              </div>
              <div className="body_l_sb achievements__name">{ach.name}</div>
              <div className="body_m_sb achievements__exp">
                {ach.experience}
                <Icon
                  icon="TAOM"
                  colorIcon={unlocked ? 'subdued' : 'secondary'}
                />
              </div>
            </div>
          )
        })}
      </div>
    </ContainerBox>
  )
}
