import { Quest } from '../../../../models/quest'
import { QuestDifficult } from '../../../../models/questDifficult'
import { QuestGroup } from '../../../../models/questGroup'
import { questModule } from '../questModule'
import { QuestGroupsGetDto, QuestTagsGetDto, SaveQuestDto } from './questsDto'

export const quests = {
  getById: (id: number): Promise<Quest> =>
    questModule<Quest, null>(`quests/${id}`),

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
