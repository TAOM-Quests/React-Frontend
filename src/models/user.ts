import { ServerFile } from './serverFile'

interface User {
  id: number
  name: string
  image?: ServerFile
}

export type Participant = User

export interface Employee extends User {
  position: string
}
