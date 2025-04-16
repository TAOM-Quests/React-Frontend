import { Dispatch, SetStateAction } from 'react'
import { serverFiles } from '../../../services/api/commonModule/serverFiles/serverFiles'

export interface EventCreateImageProps {
  imageUrl: string | null
  setImageUrl: Dispatch<SetStateAction<string | null>>
}

export const EventCreateImage = ({
  imageUrl,
  setImageUrl,
}: EventCreateImageProps) => {
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const uploadedImage = await serverFiles.uploadFile(file)
      const image = await serverFiles.getFile(uploadedImage.name)

      setImageUrl(image.url)
    }
  }

  return (
    <div>
      {imageUrl && <img src={imageUrl} />}
      <input
        placeholder="Загрузить картинку"
        type="file"
        onChange={e => uploadImage(e)}
      />
    </div>
  )
}
