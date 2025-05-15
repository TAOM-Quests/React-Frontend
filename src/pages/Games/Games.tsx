import { CardGame } from '../../components/Cards/CardGame/CardGame'
import './Games.scss'

const gamesExample = [
  {
    name: '5 букв',
    imageUrl:
      'https://lifehacker.ru/special/fujifilm/dist/static/img/5.2410a2d.jpg',
  },
  {
    name: 'Кроссворд',
    imageUrl:
      'https://lifehacker.ru/special/fujifilm/dist/static/img/5.2410a2d.jpg',
  },
]

export const Games = () => {
  return (
    <div className="games">
      <h6 className="heading_6">Игры</h6>
      <div className="games__list">
        {gamesExample.map((game, index) => (
          <CardGame key={index} name={game.name} imageUrl={game.imageUrl} />
        ))}
      </div>
    </div>
  )
}
