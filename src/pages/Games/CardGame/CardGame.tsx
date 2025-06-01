import { useNavigate } from 'react-router'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import './CardGame.scss'

interface CardGameProps {
  name: string
  path: string
  imageUrl: string
}

export const CardGame = ({ path, name, imageUrl }: CardGameProps) => {
  const navigate = useNavigate()

  const handleClick = () => navigate(path)

  return (
    <ContainerBox className="card-game" onClick={handleClick}>
      <div className="card-game__image">
        <img src={imageUrl} alt={name} />
      </div>

      <p className="body_l_sb card-game__name">{name}</p>
    </ContainerBox>
  )
}
