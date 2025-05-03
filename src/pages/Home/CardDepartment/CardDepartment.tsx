import { CardDepartmentData } from '../HomeData/cardDepartmentData'
import './CardDepartment.scss'
import { Button } from '../../../components/UI/Button/Button'

interface CardDepartmentProps {
  data: CardDepartmentData
}

export const CardDepartment = ({ data }: CardDepartmentProps) => {
  const handleClick = () => {
    window.location.href = data.buttonLink ?? ''
  }

  return (
    <div className="card">
      <div className="card__image-wrapper">
        <img src={data.imageUrl} alt={data.title} className="card__image" />
      </div>
      <div className="card__content">
        <p className="body_l_sb card__title">{data.title}</p>
        <p className="body_m_r  card__description">{data.description}</p>
        {data.buttonText && data.buttonLink && (
          <Button
            text={data.buttonText}
            colorType="accent"
            onClick={handleClick}
            iconAfter="ARROW_SMALL_RIGHT"
          />
        )}
      </div>
    </div>
  )
}
