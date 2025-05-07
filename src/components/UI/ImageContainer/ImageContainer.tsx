import { useEffect, useState } from 'react'
import { ServerFile } from '../../../models/serverFile'
import { serverFiles } from '../../../services/api/commonModule/serverFiles/serverFiles'
import { Icon } from '../Icon/Icon'
import './ImageContainer.scss'
import classNames from 'classnames'

export interface ImageContainerProps {
  disabled?: boolean
  isMultiple?: boolean
  placeholder?: string
  selectedImages?: ServerFile[]
  onSelectImages?: (images: ServerFile[]) => void
}

export const ImageContainer = ({
  disabled,
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

    onSelectImages(selectedImages ?? [])
  }, [selectedImages, selectedImagesProps])

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    for (const file of files ?? []) {
      const uploadedImage = await serverFiles.uploadFile(file)
      const imageStat = await serverFiles.getFile(uploadedImage.name)

      setSelectedImages(prev =>
        isMultiple ? [...prev, imageStat] : [imageStat],
      )
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
        <>
          <img key={image.id} src={image.url} />
          <Icon
            icon="DELETE"
            disabled={disabled}
            style={{ zIndex: 1 }} //zIndex нужен был только для теста. При нормальном добавлении стилей убрать это
            onClick={() =>
              setSelectedImages(prev => prev.filter(i => i.id !== image.id))
            }
          />
        </>
      ))}
      <input
        type="file"
        disabled={disabled}
        multiple={isMultiple}
        onChange={e => uploadImage(e)}
        accept=".png, .jpg, .jpeg, .svg"
        placeholder="Загрузить картинку"
      />
      <div className="preview" id="preview"></div>
    </div>
  )
}
