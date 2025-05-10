import { useState } from 'react'
import { UserAuth } from '../../../models/userAuth'
import './QuestsTab.scss'

interface QuestsFilter {
  name?: string
}

export interface QuestsTabProps {
  user: UserAuth
}

export default function QuestsTab({ user }: QuestsTabProps) {
  const [filter, setFilter] = useState<QuestsFilter>({})
  const [userEvents, setEvents] = useState<EventMinimize[]>([])

  return <div>QuestsTab</div>
}
