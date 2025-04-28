export interface QuestQuestion {
  text: string
  type: QuestionType
  id?: number
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
    correctAnswer: {
      [key: string]: string
    }
  }
}

export interface QuestQuestionFree extends QuestQuestion {
  type: 'free'
  answer: {
    correctAnswer: string
  }
}
