import { QuestQuestionBoxSortingAnswer } from '../../../models/questQuestion'
import { TypeQuestQuestion } from './QuestQuestion'

export const getOptionColorType = (
  optionIndex: number,
  correctAnswer: number | number[],
  userAnswer: number | number[] | null,
  isCheckMode: boolean,
): TypeQuestQuestion => {
  const isCorrect = Array.isArray(correctAnswer)
    ? correctAnswer.includes(optionIndex)
    : optionIndex === correctAnswer

  const isUserAnswer = Array.isArray(userAnswer)
    ? userAnswer.includes(optionIndex)
    : optionIndex === userAnswer

  if (isCheckMode) {
    if (isCorrect) return 'correct'
    if (isUserAnswer) return 'wrong'
    return 'primary'
  } else {
    if (isUserAnswer) return 'activeAnswer'
    return 'primary'
  }
}

export const getOptionColorAnswerBoxSorting = (
  boxIndex: number,
  optionIndex: number,
  userAnswer: QuestQuestionBoxSortingAnswer[],
  correctAnswer: QuestQuestionBoxSortingAnswer[],
  isCheckMode: boolean,
): TypeQuestQuestion => {
  if (!isCheckMode) {
    return 'primary'
  }

  const isInUserBox = userAnswer[boxIndex]?.options.includes(optionIndex)
  const isInCorrectBox = correctAnswer[boxIndex]?.options.includes(optionIndex)

  if (isInUserBox && isInCorrectBox) {
    return 'correct'
  }

  if (isInUserBox && !isInCorrectBox) {
    return 'wrong'
  }

  return 'primary'
}
