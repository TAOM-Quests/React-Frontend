import { Dispatch, SetStateAction } from 'react'
import { serverFiles } from '../../../services/api/commonModule/serverFiles/serverFiles'
import { ServerFile } from '../../../models/serverFile'

export interface EventCreateImageProps {
  image: ServerFile | null
  setImage: Dispatch<SetStateAction<ServerFile | null>>
}

export const EventCreateImage = ({
  image,
  setImage,
}: EventCreateImageProps) => {
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const uploadedImage = await serverFiles.uploadFile(file)
      const imageStat = await serverFiles.getFile(uploadedImage.name)

      setImage(imageStat)
    }
  }

  return (
    <div>
      {image && <img src={image.url} />}
      <input
        placeholder="Загрузить картинку"
        type="file"
        onChange={e => uploadImage(e)}
      />
    </div>
  )
}
