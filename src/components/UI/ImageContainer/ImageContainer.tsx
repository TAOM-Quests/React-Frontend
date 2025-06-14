import { useState } from 'react'
import { ServerFile } from '../../../models/serverFile'
import { serverFiles } from '../../../services/api/commonModule/serverFiles/serverFiles'
import { Icon } from '../Icon/Icon'
import './ImageContainer.scss'
import classNames from 'classnames'
import { CardImage } from '../../Cards/CardImage/CardImage'

export interface ImageContainerProps {
  className?: string
  disabled?: boolean
  isMultiple?: boolean
  placeholder?: string
  selectedImages?: ServerFile[]
  onSelectImages?: (images: ServerFile[]) => void
}

export const ImageContainer = ({
  className,
  disabled,
  placeholder,
  onSelectImages,
  isMultiple = false,
  selectedImages: selectedImagesProps,
}: ImageContainerProps) => {
  const [selectedImages, setSelectedImages] = useState<ServerFile[]>(
    selectedImagesProps ?? [],
  )

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    for (const file of files ?? []) {
      const uploadedImage = await serverFiles.uploadFile(file)
      const imageStat = await serverFiles.getFile(uploadedImage.name)

      setSelectedImages(prev =>
        isMultiple ? [...prev, imageStat] : [imageStat],
      )

      onSelectImages?.(
        isMultiple ? [...selectedImages, imageStat] : [imageStat],
      )
    }
  }

  const renderPlaceholder = () => {
    return (
      <>
        <Icon size="extraLarge" icon="ADD_IMAGE" />
        {placeholder && <span className="body_m_r">{placeholder}</span>}
      </>
    )
  }

  return (
    <>
      <div
        className={classNames(
          'upload-area',
          disabled && 'upload-area--disabled',
          selectedImages.length && 'upload-area--active',
          className,
        )}
      >
        {selectedImages.map(image => (
          <>
            <img key={image.id} src={image.url} alt={image.originalName} />
            <div className="upload-text">
              {renderPlaceholder()}
              <Icon
                icon="DELETE"
                disabled={disabled}
                className="upload-area__delete-icon"
                onClick={() =>
                  setSelectedImages(prev => prev.filter(i => i.id !== image.id))
                }
              />
            </div>
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
        {selectedImages.length === 0 && (
          <div className="preview" id="preview">
            {renderPlaceholder()}
          </div>
        )}
      </div>
      {selectedImages.length > 1 && (
        <div className="cardsImages">
          {selectedImages.map(image => (
            <CardImage
              key={image.id}
              id={image.id}
              url={image.url}
              size={image.size}
              imageName={image.originalName}
              extension={image.extension}
              onRemove={() =>
                setSelectedImages(prev => prev.filter(i => i.id !== image.id))
              }
            />
          ))}
        </div>
      )}
    </>
  )
}
