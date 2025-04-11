interface User {
  id: number
  name: string
}

export type Participant = User

export interface Employee extends User {
  position: string
}
