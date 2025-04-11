import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { selectAuth } from '../../redux/auth/authSlice'
import { useNavigate } from 'react-router'
import { EventType } from '../../models/eventType'
import { Employee } from '../../models/user'

export default function EventCreate() {
  const [name, setName] = useState<string | null>(null)
  // const [date, setDate] = useState<Date | null>(null)
  const [type, setType] = useState<EventType | null>(null)
  const [executors, setExecutors] = useState<Employee[]>([])
  const [seatsNumber, setSeatsNumber] = useState<number | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [address, setAddress] = useState<string | null>(null)
  const [floor, setFloor] = useState<number | null>(null)
  const [officeNumber, setOfficeNumber] = useState<string | null>(null)
  const [platform, setPlatform] = useState<string | null>(null)
  const [connectionLink, setConnectionLink] = useState<string | null>(null)
  const [recordLink, setRecordLink] = useState<string | null>(null)
  const [identifier, setIdentifier] = useState<string | null>(null)
  const [accessCode, setAccessCode] = useState<string | null>(null)

  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)

  useEffect(() => {
    if (!user?.isEmployee) {
      navigate('/')
    }
  }, [user])

  return <div></div>
}
