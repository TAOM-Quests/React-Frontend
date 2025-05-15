import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { Icon } from '../../../components/UI/Icon/Icon'
import { UserAchievement } from '../../../models/userAchievement'
import './AchievementsList.scss'

interface AchievementsListProps {
  achievements: UserAchievement[]
}

export const AchievementsList = ({ achievements }: AchievementsListProps) => {
  return (
    <ContainerBox className="achievements">
      <div className="heading_6 achievements__title">Достижения</div>
      <div className="achievements__list">
        {achievements.map((ach, index) => {
          return (
            <div
              key={index}
              className={`achievements__item ${ach.isReceived ? ' achievements__item--unlocked' : ''}`}
            >
              <div className="achievements__image-wrapper">
                <img
                  src={ach.image.url}
                  alt={ach.name}
                  className="achievements__image"
                />
              </div>
              <div className="body_l_sb achievements__name">{ach.name}</div>
              <div className="body_m_sb achievements__exp">
                {ach.experience}
                <Icon
                  icon="TAOM"
                  colorIcon={ach.isReceived ? 'subdued' : 'secondary'}
                />
              </div>
            </div>
          )
        })}
      </div>
    </ContainerBox>
  )
}
