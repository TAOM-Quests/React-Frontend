import { ServerFile } from './serverFile'

interface User {
  id: number
  name: string
  avatar?: ServerFile
}

export type Participant = User

export interface Employee extends User {
  position: string
}
