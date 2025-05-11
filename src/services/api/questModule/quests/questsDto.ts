import { QuestQuestion } from '../../../../models/questQuestion'
import { QuestResult } from '../../../../models/questResult'

export interface QuestsGetDto {
  id: number
  name?: string
  limit?: number
  offset?: number
  executor?: number
  department?: number
  participant?: number
  // Нужны ещё tags
}

export interface SaveQuestDto {
  executorId: number
  departmentId: number
  id?: number
  name?: string
  time?: string
  groupId?: number
  imageId?: number
  tagsIds?: number[]
  description?: string
  difficultId?: number
  results?: (QuestResult & { questId: number })[]
  questions?: (QuestQuestion & { questId: number })[]
}

export interface SaveQuestCompleteDto {
  id: number
  result: SaveResultComplete
  questions: SaveQuestionComplete[]
  // executorName: string
  name?: string
  time?: string
  tags?: string[]
  imageId?: number
  difficult?: string
  description?: string
}

export interface QuestGroupsGetDto {
  departmentId?: number
}

export interface QuestTagsGetDto {
  departmentId?: number
}

interface SaveResultComplete {
  name: string
  description: string
  imageId?: number
}

interface SaveQuestionComplete {
  text: string
  type: string
  answer: {
    userAnswer: any
    isCorrect: boolean
    options?: string[]
  }
  imageId?: number
}
