// levelUtils.ts

export interface LevelInfo {
  level: number
  name: string
  experienceRequired: number
}

export interface UserLevelState {
  level: number
  experience: number
  nextLevelExp: number
  name: string
}

/**
 * Функция обновляет уровень и опыт пользователя с учётом добавленного опыта.
 * - experience сбрасывается при повышении уровня, остаток переносится.
 * - уровень повышается, если опыт превышает порог следующего уровня.
 * - возвращает актуальное состояние пользователя.
 */
export function updateUserLevelAndExp(
  currentLevel: number,
  currentExp: number,
  expToAdd: number,
  levelsData: LevelInfo[],
): UserLevelState {
  let level = currentLevel
  let experience = currentExp + expToAdd

  const getLevelInfo = (lvl: number) => levelsData.find(l => l.level === lvl)

  while (true) {
    const levelInfo = getLevelInfo(level)
    if (!levelInfo) break

    const nextLevelInfo = getLevelInfo(level + 1)
    if (!nextLevelInfo) {
      if (experience > levelInfo.experienceRequired) {
        experience = levelInfo.experienceRequired
      }
      return {
        level,
        experience,
        nextLevelExp: levelInfo.experienceRequired,
        name: levelInfo.name,
      }
    }

    if (experience >= nextLevelInfo.experienceRequired) {
      experience -= nextLevelInfo.experienceRequired
      level += 1
    } else {
      return {
        level,
        experience,
        nextLevelExp: nextLevelInfo.experienceRequired,
        name: levelInfo.name,
      }
    }
  }

  const finalLevelInfo = getLevelInfo(level)!
  return {
    level,
    experience,
    nextLevelExp: finalLevelInfo.experienceRequired,
    name: finalLevelInfo.name,
  }
}
