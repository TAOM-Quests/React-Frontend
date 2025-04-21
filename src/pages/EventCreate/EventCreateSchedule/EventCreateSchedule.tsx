import { Dispatch, SetStateAction } from 'react'
import { Button } from '../../../components/UI/Button/Button'
import { Icon } from '../../../components/UI/Icon/Icon'
import Input from '../../../components/UI/Input/Input'
import { ScheduleItem } from '../../../models/event'

export interface EventCreateScheduleProps {
  schedule: ScheduleItem[]
  setSchedule: Dispatch<SetStateAction<ScheduleItem[]>>
}

export const EventCreateSchedule = ({
  schedule,
  setSchedule,
}: EventCreateScheduleProps) => {
  const changeScheduleItem = (
    field: keyof ScheduleItem,
    data: any,
    index: number,
  ) =>
    setSchedule(prevSchedule =>
      prevSchedule.map((scheduleItem, itemIndex) => {
        if (itemIndex === index) {
          scheduleItem[field] = data
        }

        return scheduleItem
      }),
    )

  const addScheduleItem = () =>
    setSchedule(prevSchedule => [
      ...prevSchedule,
      { name: '', timeStart: new Date(), timeEnd: new Date() },
    ])

  const removeScheduleItem = (index: number) =>
    setSchedule(prevSchedule =>
      prevSchedule.filter((_, itemIndex) => itemIndex !== index),
    )

  return (
    <div className="schedule">
      {schedule.map((item, index) => (
        <div className="schedule-item" key={`schedule-item-${index}`}>
          <Input
            iconAfter="TIME"
            value={new Date(item.timeStart).getTime()}
            onChange={e =>
              changeScheduleItem('timeStart', new Date(e.target.value), index)
            }
          />
          <Input
            iconAfter="TIME"
            value={new Date(item.timeEnd).getTime()}
            onChange={e =>
              changeScheduleItem('timeEnd', new Date(e.target.value), index)
            }
          />
          <Input
            value={item.name}
            onChange={e => changeScheduleItem('name', e.target.value, index)}
          />
          <Icon icon="DELETE" onClick={() => removeScheduleItem(index)} />
        </div>
      ))}
      <Button
        text="Добавить"
        iconBefore="ADD"
        colorType={'secondary'}
        onClick={addScheduleItem}
      />
    </div>
  )
}
