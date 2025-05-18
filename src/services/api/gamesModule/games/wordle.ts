import { WordleAttempt } from '../../../../models/wordleAttempt'
import { WordleWord } from '../../../../models/wordleWord'
import { gamesModule } from '../gamesModule'
import { WordleAddAttemptDto, WordleCreateWordDto } from './wordleDto'

const WORDLE_API_URL = 'wordle/'

export const wordle = {
  getAttempts: (userId: number, day: string, departmentId: number) =>
    gamesModule<WordleAttempt[], void>(
      `${WORDLE_API_URL}attempts/${userId}?date=${day}&departmentId=${departmentId}`,
    ),
  addAttempt: (attempt: string, userId: number, departmentId: number) =>
    gamesModule<WordleAttempt, WordleAddAttemptDto>(
      `${WORDLE_API_URL}attempts/${userId}?departmentId=${departmentId}`,
      { attempt },
    ),

  getWords: (departmentId: number) =>
    gamesModule<WordleWord[], void>(`${WORDLE_API_URL}words/${departmentId}`),

  createWord: (word: string, departmentId: number) =>
    gamesModule<WordleWord, WordleCreateWordDto>(
      `${WORDLE_API_URL}words/${departmentId}`,
      { word },
    ),
}
