export interface QuestQuestion {
  text: string
  type: QuestionType
  id?: number
  imageId?: number
  questId?: number
  //Используется только для пройденных квестов
  answer?: any
}

type QuestionType = 'single' | 'multiple' | 'connection' | 'boxSorting' | 'free'

export interface QuestQuestionSingle extends QuestQuestion {
  type: 'single'
  answer: {
    options: string[]
    correctAnswer: number
  }
}

export interface QuestQuestionMultiple extends QuestQuestion {
  type: 'multiple'
  answer: {
    options: string[]
    correctAnswer: number[]
  }
}

export interface QuestQuestionConnection extends QuestQuestion {
  type: 'connection'
  answer: {
    options: string[]
    correctAnswer: string[]
  }
}

export interface QuestQuestionBoxSorting extends QuestQuestion {
  type: 'boxSorting'
  answer: {
    options: string[]
    correctAnswer: QuestQuestionBoxSortingAnswer[]
  }
}

export interface QuestQuestionBoxSortingAnswer {
  name: string
  options: number[]
}

export interface QuestQuestionFree extends QuestQuestion {
  type: 'free'
  answer: {
    correctAnswer: string
  }
}
