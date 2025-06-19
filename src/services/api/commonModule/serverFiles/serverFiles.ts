import { ServerFile } from '../../../../models/serverFile'
import { commonModule } from '../commonModule'
import { CreateExcelDto } from './dto/createExcelDto'

export const serverFiles = {
  getFile: async (id: number): Promise<ServerFile> =>
    await commonModule<ServerFile>(`file/${id}/stats`),

  uploadFile: async (file: File): Promise<ServerFile> => {
    const formData = new FormData()

    formData.append('file', file)

    return await commonModule<ServerFile>(`file`, null, {
      method: 'POST',
      body: formData,
    })
  },

  createExcel: async <T>(excel: CreateExcelDto<T>): Promise<ServerFile> =>
    await commonModule<ServerFile, CreateExcelDto<T>>(`file/excel`, excel),
}
