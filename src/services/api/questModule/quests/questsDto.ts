import { QuestQuestion } from '../../../../models/questQuestion'
import { QuestResult } from '../../../../models/questResult'

export interface QuestsGetDto {
  name?: string
  limit?: number
  offset?: number
  completeBy?: number
  isCompleted?: boolean
  tags?: number | number[]
  group?: number | number[]
  executor?: number | number[]
  difficult?: number | number[]
  department?: number | number[]
}

export interface SaveQuestDto {
  executorId: number
  departmentId: number
  results: (QuestResult & { questId: number })[]
  questions: (QuestQuestion & { questId: number })[]
  id?: number
  name?: string
  time?: string
  groupId?: number
  imageId?: number
  tagsIds?: number[]
  description?: string
  difficultId?: number
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
    options?: string[]
  }
  imageId?: number
}
