import { ServerFile } from './serverFile'

export interface QuestQuestion {
  text: string
  type: QuestionType
  images: ServerFile[]
  id?: number
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
    optionsImages: ServerFile[]
  }
}

export interface QuestQuestionMultiple extends QuestQuestion {
  type: 'multiple'
  answer: {
    options: string[]
    correctAnswer: number[]
    optionsImages: ServerFile[]
  }
}

export interface QuestQuestionConnection extends QuestQuestion {
  type: 'connection'
  answer: {
    options: string[]
    correctAnswer: string[]
    optionsImages: ServerFile[]
  }
}

export interface QuestQuestionBoxSorting extends QuestQuestion {
  type: 'boxSorting'
  answer: {
    options: string[]
    optionsImages: ServerFile[]
    correctAnswer: QuestQuestionBoxSortingAnswer[]
  }
}

export interface QuestQuestionBoxSortingAnswer {
  name: string
  options: number[]
  optionsImages: ServerFile[]
}

export interface QuestQuestionFree extends QuestQuestion {
  type: 'free'
  answer: {
    correctAnswer: string
  }
}
