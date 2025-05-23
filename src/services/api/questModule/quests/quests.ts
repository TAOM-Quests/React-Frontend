import { Quest } from '../../../../models/quest'
import { QuestDifficult } from '../../../../models/questDifficult'
import { QuestGroup } from '../../../../models/questGroup'
import { QuestMinimize } from '../../../../models/questMinimize'
import { questModule } from '../questModule'
import {
  QuestGroupsGetDto,
  QuestsGetDto,
  QuestTagsGetDto,
  SaveQuestCompleteDto,
  SaveQuestDto,
} from './questsDto'

export const quests = {
  getManyByParams: (params: QuestsGetDto): Promise<QuestMinimize[]> => {
    let queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    return questModule<QuestMinimize[], null>(
      `quests${queryString ? `?${queryString}` : ''}`,
    )
  },

  getById: (id: number): Promise<Quest> =>
    questModule<Quest, null>(`quests/${id}`),

  getCompletedById: (completeId: number): Promise<Quest> =>
    questModule<Quest, null>(`quests/complete/${completeId}`),

  create: (params: SaveQuestDto): Promise<Quest> =>
    questModule<Quest, SaveQuestDto>('quests', params),

  update: (id: number, params: SaveQuestDto): Promise<Quest> => {
    for (const question of params.questions ?? []) {
      question.questId = id
    }

    for (const result of params.results ?? []) {
      result.questId = id
    }

    return questModule<Quest, SaveQuestDto>(`quests/${id}`, { ...params, id })
  },

  delete: (id: number): Promise<void> =>
    questModule<void, null>(`quests/${id}`, null, { method: 'DELETE' }),

  saveComplete: (
    questId: number,
    userId: number,
    quest: SaveQuestCompleteDto,
  ): Promise<void> =>
    questModule<void, SaveQuestCompleteDto>(
      `quests/${questId}/complete?userId=${userId}`,
      quest,
    ),

  getDifficulties: (): Promise<QuestDifficult[]> =>
    questModule<QuestDifficult[], null>('difficulties'),

  getGroups: (query: QuestGroupsGetDto): Promise<QuestGroup[]> =>
    questModule<QuestGroup[], null>(
      `groups${query.departmentId ? `?departmentId=${query.departmentId}` : ''}`,
    ),

  getTags: (query: QuestTagsGetDto): Promise<QuestGroup[]> =>
    questModule<QuestGroup[], null>(
      `tags${query.departmentId ? `?departmentId=${query.departmentId}` : ''}`,
    ),
}
