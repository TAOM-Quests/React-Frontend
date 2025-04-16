interface User {
  id: number
  name: string
  avatar?: string
}

export type Participant = User

export interface Employee extends User {
  position: string
}
