import { useEffect, useState } from 'react'
import { LevelInfo } from './updateUserLevelAndExp'
import './UserLevel.scss'

const calculateProgress = (
  experience: number,
  nextLevelExp: number,
): number => {
  if (nextLevelExp <= 0) return 0
  const progress = (experience / nextLevelExp) * 100
  return Math.min(Math.max(progress, 0), 100)
}

const calculateRemainingExp = (
  experience: number,
  nextLevelExp: number,
): number => Math.max(nextLevelExp - experience, 0)

interface UserLevelProps {
  level: number
  experience: number
}

export const UserLevel = ({ level, experience }: UserLevelProps) => {
  const [levelData, setLevelData] = useState<LevelInfo | null>(null)

  const name = levelData?.name
  const progress = calculateProgress(
    experience,
    levelData?.experienceRequired ?? 0,
  )
  const remainingExp = calculateRemainingExp(
    experience,
    levelData?.experienceRequired ?? 0,
  )

  // useEffect(() => {
  //   const fetchLevel = async () => {
  //     try {
  //       setLevelData(await levels.getLevel({ level: levels.level }))
  //     } catch (e) {
  //       console.log(`[level] ${e}`)

  //     }
  //   }

  //   fetchLevel()
  // }, [])

  return (
    <div className="userLevel">
      <span className="body_xl_sb userLevel__name">{name}</span>
      <div className="userLevel__container">
        <div className="userLevel__header">
          <span className="body_s_sb userLevel__level">Уровень {level}</span>
          <span className="body_s_sb  userLevel__nextLevel">
            до следующего уровня {remainingExp}
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
            всего опыта {experience}
          </span>
        </div>
      </div>
    </div>
  )
}
