import { useNavigate } from 'react-router'

export interface EventMinimizeProps {
  id: number
  // date: Date
  name: string
  type: string
  status: string
  address: string
  onlineMeeting: string
  isEmployeeView?: boolean
}

export default function EventMinimize({
  id,
  // date,
  name,
  type,
  status,
  address,
  onlineMeeting,
  isEmployeeView,
}: EventMinimizeProps) {
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/events/${id}`)}>
      {name}
      {/* {date && date.toDateString()} */}
      {isEmployeeView && status}
      {address}
      {onlineMeeting}
      {type}
    </div>
  )
}
