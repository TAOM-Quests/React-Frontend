import { Dispatch, SetStateAction } from 'react'
import { Button } from '../../../components/UI/Button/Button'
import { Icon } from '../../../components/UI/Icon/Icon'
import Input from '../../../components/UI/Input/Input'
import { ScheduleItem } from '../../../models/event'
import './EventCreateSchedule.scss'
import { TimeInput } from '../../../components/UI/TimeInput/TimeInput'
import moment from 'moment'

export interface EventCreateScheduleProps {
  schedule: ScheduleItem[]
  setSchedule: Dispatch<SetStateAction<ScheduleItem[]>>
}

export const EventCreateSchedule = ({
  schedule,
  setSchedule,
}: EventCreateScheduleProps) => {
  const TIME_FORMAT = 'HH:mm'
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
  const handleTimeSelect = (
    field: keyof ScheduleItem,
    time: string,
    index: number,
  ) => {
    const newDate = moment()
      .hour(moment(time, TIME_FORMAT).hour())
      .minute(moment(time, TIME_FORMAT).minute())
      .second(0)
      .toDate()

    changeScheduleItem(field, newDate, index)
  }
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
      <label className="body_s_sb label">Регламент</label>
      <div className="schedule__container-items">
        {schedule.map((item, index) => (
          <div className="schedule--item" key={`schedule-item-${index}`}>
            <div className="schedule--time">
              <TimeInput
                key={index}
                value={moment(item.timeStart).format(TIME_FORMAT)}
                onTimeSelect={(time: string) =>
                  handleTimeSelect('timeStart', time, index)
                }
              />
              <TimeInput
                key={index}
                value={moment(item.timeEnd).format(TIME_FORMAT)}
                onTimeSelect={(time: string) =>
                  handleTimeSelect('timeEnd', time, index)
                }
              />
            </div>

            <div className="schedule--itemName">
              <Input
                value={item.name}
                placeholder="Введите название события"
                onChange={e =>
                  changeScheduleItem('name', e.target.value, index)
                }
              />
              <Icon icon="DELETE" onClick={() => removeScheduleItem(index)} />
            </div>
          </div>
        ))}
      </div>

      <div>
        <Button
          text="Добавить"
          iconBefore="ADD"
          colorType={'secondary'}
          size="small"
          onClick={addScheduleItem}
        />
      </div>
    </div>
  )
}
