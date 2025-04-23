import { Dispatch, SetStateAction } from 'react'
import { serverFiles } from '../../../services/api/commonModule/serverFiles/serverFiles'
import { ServerFile } from '../../../models/serverFile'
import './EventCreateImage.scss'
import { Icon } from '../../../components/UI/Icon/Icon'
import classNames from 'classnames'
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
    <div className={classNames('upload-area', image && 'upload-area--active')}>
      <div className="upload-text">
        <Icon size="extraLarge" icon="ADD_IMAGE" />
        <span className="body_m_r">
          Перетащите изображение в эту область для загрузки или нажмите на неё
        </span>
      </div>
      {image && <img src={image.url} />}
      <input
        placeholder="Загрузить картинку"
        type="file"
        onChange={e => uploadImage(e)}
      />
      <div className="preview" id="preview"></div>
    </div>
  )
}
