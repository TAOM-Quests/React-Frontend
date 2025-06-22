import { QuestGroup } from '../../../../models/questGroup'
import { QuestQuestion } from '../../../../models/questQuestion'
import { QuestResult } from '../../../../models/questResult'
import { QuestTag } from '../../../../models/questTag'

export interface QuestsGetDto {
  limit?: number
  offset?: number
  tags?: number[]
  executor?: number[]
  department?: number[]
}

export interface QuestsCompleteGetDto {
  id?: number[] // id квестов
  limit?: number
  offset?: number
  tags?: number[]
  completeBy?: number
  executor?: number[]
  department?: number[]
}

export interface SaveQuestDto {
  name: string
  time: string
  executorId: number
  description: string
  departmentId: number
  imageId: number | null
  difficultId: number | null
  tags: (QuestTag | Omit<QuestTag, 'id'>)[]
  results: (QuestResult & { questId: number })[]
  group: QuestGroup | Omit<QuestGroup, 'id'> | null
  questions: (QuestQuestion & { questId: number })[]
  id?: number
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
