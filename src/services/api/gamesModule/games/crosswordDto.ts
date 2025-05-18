import { CrosswordPlaceWord } from '../../../../models/crosswordPlaceWord'

export interface CrosswordCheckAnswerDto {
  userId: number
  departmentId: number
  difficultyId: number
  words: CrosswordPlaceWord[]
}
