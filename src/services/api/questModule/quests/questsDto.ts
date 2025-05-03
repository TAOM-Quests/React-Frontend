import { QuestQuestion } from '../../../../models/questQuestion'
import { QuestResult } from '../../../../models/questResult'

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
  results?: QuestResult[]
  questions?: QuestQuestion[]
}

export interface QuestGroupsGetDto {
  departmentId?: number
}

export interface QuestTagsGetDto {
  departmentId?: number
}
