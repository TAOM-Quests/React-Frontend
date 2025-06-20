import { useParams } from 'react-router'
import './Games.scss'
import { ServerFile } from '../../models/serverFile'
import { useEffect, useState } from 'react'
import { serverFiles } from '../../services/api/commonModule/serverFiles/serverFiles'
import { CardGame } from '../../components/Cards/CardGame/CardGame'

const WORDLE_IMAGE_ID = 18
const CROSSWORD_IMAGE_ID = 19

const gamesExample = [
  {
    name: '5 букв',
    path: '/games/wordle',
    imageId: WORDLE_IMAGE_ID,
  },
  {
    name: 'Кроссворд',
    path: '/games/crossword',
    imageId: CROSSWORD_IMAGE_ID,
  },
]

export const Games = () => {
  const [images, setImages] = useState<ServerFile[]>([])

  const { id } = useParams<{ id: string }>()
  const departmentId = Number(id)

  useEffect(() => {
    const fetchImages = async () => {
      setImages(
        await Promise.all(
          gamesExample.map(
            async game => await serverFiles.getFile(game.imageId),
          ),
        ),
      )
    }
    fetchImages()
  }, [])

  return (
    <div className="container_min_width games">
      <h6 className="heading_6">Игры</h6>
      <div className="games__list">
        {gamesExample.map((game, index) => (
          <CardGame
            key={index}
            path={game.path + `/${departmentId}`}
            name={game.name}
            imageUrl={images[index].url}
          />
        ))}
      </div>
    </div>
  )
}
