import { useParams } from 'react-router'
import { CardGame } from '../../components/Cards/CardGame/CardGame'
import './Games.scss'

const gamesExample = [
  {
    name: '5 букв',
    path: '/games/wordle',
    imageUrl:
      'https://lifehacker.ru/special/fujifilm/dist/static/img/5.2410a2d.jpg',
  },
  {
    name: 'Кроссворд',
    path: '/games/crossword',
    imageUrl:
      'https://lifehacker.ru/special/fujifilm/dist/static/img/5.2410a2d.jpg',
  },
]

export const Games = () => {
  const { departmentId } = useParams()

  return (
    <div className="games">
      <h6 className="heading_6">Игры</h6>
      <div className="games__list">
        {gamesExample.map((game, index) => (
          <CardGame
            key={index}
            path={game.path + `/${departmentId}`}
            name={game.name}
            imageUrl={game.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}
