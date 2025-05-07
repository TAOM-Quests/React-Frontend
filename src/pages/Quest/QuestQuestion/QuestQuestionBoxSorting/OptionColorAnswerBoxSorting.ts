import { QuestQuestionBoxSortingAnswer } from '../../../../models/questQuestion'
import { TypeAnswer } from '../QuestQuestion'

export const getOptionColorAnswerBoxSorting = (
  boxIndex: number,
  optionIndex: number,
  userAnswer: QuestQuestionBoxSortingAnswer[],
  correctAnswer: QuestQuestionBoxSortingAnswer[],
  isCheckMode: boolean,
): TypeAnswer => {
  if (!isCheckMode) {
    return 'activeAnswer'
  }

  const isInUserBox = userAnswer[boxIndex]?.options.includes(optionIndex)
  const isInCorrectBox = correctAnswer[boxIndex]?.options.includes(optionIndex)

  if (isInUserBox && isInCorrectBox) {
    return 'correct'
  }

  if (isInUserBox && !isInCorrectBox) {
    return 'wrong'
  }

  return 'activeAnswer'
}
