export interface WordleAttempt {
  letters: {
    name: string
    status: WordleAttemptLetterStatus
  }[]
}

export type WordleAttemptLetterStatus = 'correct' | 'present' | 'absent' | ''
