import { ServerFile } from '../../../../models/serverFile'
import { BASE_API_URL, DEV_SERVER_URL } from '../../api'
import { COMMON_MODULE_API_URL, commonModule } from '../commonModule'

const BASE_FILE_URL = `${DEV_SERVER_URL}${BASE_API_URL}${COMMON_MODULE_API_URL}file?fileName=`
type FileStatsFromServer = Omit<ServerFile, 'url'>

export const serverFiles = {
  getFile: async (fileName: string): Promise<ServerFile> => {
    const fileUrl = `${BASE_FILE_URL}${fileName}`
    const fileStats = await commonModule<FileStatsFromServer>(
      `file/stats?fileName=${fileName}`,
    )

    return {
      ...fileStats,
      url: fileUrl,
    }
  },

  uploadFile: async (file: File): Promise<ServerFile> => {
    const formData = new FormData()

    formData.append('file', file)

    const fileStats = await commonModule<FileStatsFromServer>(`file`, null, {
      method: 'POST',
      body: formData,
    })

    return {
      ...fileStats,
      url: `${BASE_FILE_URL}${fileStats.name}`,
    }
  },
}
