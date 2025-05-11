export type FeedbackType = 'event' | 'quest'

export interface FeedbackFormConfig {
  type: FeedbackType
  title: string
  subtitle: string
  standardQuestions: FeedbackQuestion[]
  customQuestions: FeedbackQuestion[] // добавляются преподавателями
}

export type QuestionType = 'rating' | 'radio' | 'scale' | 'text'

export interface FeedbackQuestion {
  id: string
  type: QuestionType
  label: string
  options?: string[] // для radio
  question?: string // для text
  scaleMin?: number // для scale
  scaleMax?: number // для scale
  scaleLabels?: [string, string] // для scale
}

export const STANDARD_QUESTIONS_EVENT: FeedbackQuestion[] = [
  { id: 'rating', type: 'rating', label: 'Оцените мероприятие' },
  {
    id: 'usefulness',
    type: 'radio',
    label: 'Полезность мероприятия',
    options: [
      'Очень полезно',
      'Полезно',
      'Скорее полезно',
      'Не очень',
      'Совсем не полезно',
    ],
  },
  {
    id: 'impression',
    type: 'radio',
    label: 'Впечатление от мероприятия',
    options: ['Отлично', 'Хорошо', 'Удовлетворительно', 'Плохо', 'Очень плохо'],
  },
  {
    id: 'theme',
    type: 'radio',
    label: 'Соответствие заявленной теме',
    options: [
      'Полностью соответствует',
      'Скорее соответствует, чем нет',
      'Соответствует частично',
      'Не соответствует',
    ],
  },
  {
    id: 'organizers',
    type: 'radio',
    label: 'Оценка работы организаторов',
    options: ['Хорошо', 'Удовлетворительно', 'Плохо'],
  },
]

export const STANDARD_QUESTIONS_QUEST: FeedbackQuestion[] = [
  { id: 'rating', type: 'rating', label: 'Оцените квест' },
  {
    id: 'usefulness',
    type: 'radio',
    label: 'Полезность квеста',
    options: [
      'Очень полезно',
      'Полезно',
      'Скорее полезно',
      'Не очень',
      'Совсем не полезно',
    ],
  },
  {
    id: 'difficulty',
    type: 'radio',
    label: 'Сложность квеста',
    options: ['Слишком просто', 'Легко', 'Нормально', 'Сложно', 'Очень сложно'],
  },
]
