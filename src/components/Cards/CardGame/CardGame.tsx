import { ContainerBox } from '../../ContainerBox/ContainerBox'
import './CardGame.scss'

interface CardGameProps {
  name: string
  imageUrl: string
}

export const CardGame = ({ name, imageUrl }: CardGameProps) => {
  return (
    <ContainerBox className="card-game">
      <div className="card-game__image">
        <img src={imageUrl} alt={name} />
      </div>

      <p className="body_l_sb card-game__name">{name}</p>
    </ContainerBox>
  )
}
