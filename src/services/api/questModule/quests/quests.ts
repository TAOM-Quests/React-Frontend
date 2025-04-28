import { QuestDifficult } from '../../../../models/questDifficult'
import { QuestGroup } from '../../../../models/questGroup'
import { questModule } from '../questModule'
import { QuestGroupsGetDto, QuestTagsGetDto } from './questsDto'

export const quests = {
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
