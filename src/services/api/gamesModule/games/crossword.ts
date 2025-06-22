import { CrosswordDifficulty } from '../../../../models/crosswordDifficulty'
import { CrosswordPlaceWord } from '../../../../models/crosswordPlaceWord'
import { gamesModule } from '../gamesModule'
import { CrosswordCheckAnswerDto } from './crosswordDto'

const CROSSWORD_API_URL = 'crossword/'

export const crossword = {
  getAllowedDifficulties: (userId: number, departmentId: number) =>
    gamesModule<CrosswordDifficulty[], void>(
      `${CROSSWORD_API_URL}allowed?userId=${userId}&departmentId=${departmentId}`,
    ),
  getCrossword: (day: string, departmentId: number, difficultyId: number) =>
    gamesModule<CrosswordPlaceWord[], void>(
      `${CROSSWORD_API_URL}?day=${day}&departmentId=${departmentId}&difficultyId=${difficultyId}`,
    ),
  checkAnswer: (checkDto: CrosswordCheckAnswerDto) =>
    gamesModule<CrosswordPlaceWord[], CrosswordCheckAnswerDto>(
      `${CROSSWORD_API_URL}`,
      checkDto,
    ),
}
