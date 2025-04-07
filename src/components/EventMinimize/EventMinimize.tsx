export interface EventMinimizeProps {
  // date: Date
  name: string
  type: string
  status: string
  address: string
  onlineMeeting: string
}

export default function EventMinimize({
  // date,
  name,
  type,
  status,
  address,
  onlineMeeting,
}: EventMinimizeProps) {
  return (
    <div>
      {name}
      {/* {date && date.toDateString()} */}
      {status}
      {address}
      {onlineMeeting}
      {type}
    </div>
  )
}
