import { Department } from '../../../../models/department'
import { commonModule } from '../commonModule'

export const commonEntities = {
  getDepartments: (): Promise<Department[]> =>
    commonModule<Department[]>('departments'),
}
