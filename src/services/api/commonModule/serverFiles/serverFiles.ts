import { ServerFile } from '../../../../models/serverFile'
import { BASE_API_URL, DEV_SERVER_URL } from '../../api'
import { COMMON_MODULE_API_URL } from '../commonModule'

export const serverFiles = {
  getFileUrl: (fileName: string): string =>
    `${DEV_SERVER_URL}${BASE_API_URL}${COMMON_MODULE_API_URL}file?fileName=${fileName}`,

  uploadFile: async (file: File): Promise<ServerFile> => {
    const formData = new FormData()

    formData.append('file', file)

    const response = await fetch(
      `${DEV_SERVER_URL}${BASE_API_URL}${COMMON_MODULE_API_URL}file`,
      {
        method: 'POST',
        body: formData,
      },
    )

    return response.json()
  },
}
