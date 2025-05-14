import './Level.scss'

const calculateProgress = (
  experience: number,
  experienceToNextLevel: number,
): number => {
  if (experienceToNextLevel <= 0) return 0
  const progress = (experience / experienceToNextLevel) * 100
  return Math.min(Math.max(progress, 0), 100)
}

const calculateRemainingExp = (
  experience: number,
  experienceToNextLevel: number,
): number => Math.max(experienceToNextLevel - experience, 0)

interface LevelProps {
  name: string
  level: number
  experience: number
  experienceToNextLevel: number
}

export const Level = ({
  name,
  level,
  experience,
  experienceToNextLevel,
}: LevelProps) => {
  const progress = calculateProgress(experience, experienceToNextLevel)
  const nextLevel = calculateRemainingExp(experience, experienceToNextLevel)

  return (
    <div className="userLevel">
      <span className="body_xl_sb userLevel__name">{name}</span>
      <div className="userLevel__container">
        <div className="userLevel__header">
          <span className="body_s_sb userLevel__level">Уровень {level}</span>
          <span className="body_s_sb  userLevel__nextLevel">
            до следующего уровня {nextLevel || 0}
          </span>
        </div>
        <div className="userLevel__progressBar">
          <div
            className="userLevel__progress"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="userLevel__footer">
          <span className="body_s_sb  userLevel__totalExp">
            всего опыта {experience || 0}
          </span>
        </div>
      </div>
    </div>
  )
}
