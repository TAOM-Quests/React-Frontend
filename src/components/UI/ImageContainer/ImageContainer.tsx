import { useEffect, useState } from 'react'
import { ServerFile } from '../../../models/serverFile'
import { serverFiles } from '../../../services/api/commonModule/serverFiles/serverFiles'
import { Icon } from '../Icon/Icon'
import './ImageContainer.scss'
import classNames from 'classnames'

export interface ImageContainerProps {
  isMultiple?: boolean
  placeholder?: string
  selectedImages?: ServerFile[]
  onSelectImages?: (images: ServerFile[]) => void
}

export const ImageContainer = ({
  placeholder,
  onSelectImages,
  isMultiple = false,
  selectedImages: selectedImagesProps,
}: ImageContainerProps) => {
  const [selectedImages, setSelectedImages] = useState<ServerFile[]>(
    selectedImagesProps ?? [],
  )

  useEffect(() => {
    if (!onSelectImages) return

    onSelectImages(selectedImagesProps ?? [])
  }, [selectedImages])

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    for (const file of files ?? []) {
      const uploadedImage = await serverFiles.uploadFile(file)
      const imageStat = await serverFiles.getFile(uploadedImage.name)

      setSelectedImages(prev => [...prev, imageStat])
    }
  }

  return (
    <div
      className={classNames(
        'upload-area',
        selectedImages.length && 'upload-area--active',
      )}
    >
      <div className="upload-text">
        <Icon size="extraLarge" icon="ADD_IMAGE" />
        <span className="body_m_r">{placeholder}</span>
      </div>
      {selectedImages.map(image => (
        <img src={image.url} />
      ))}
      <input
        placeholder="Загрузить картинку"
        type="file"
        multiple={isMultiple}
        onChange={e => uploadImage(e)}
      />
      <div className="preview" id="preview"></div>
    </div>
  )
}
