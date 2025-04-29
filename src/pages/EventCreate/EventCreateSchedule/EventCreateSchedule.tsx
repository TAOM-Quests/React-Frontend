import { Dispatch, SetStateAction, useState } from 'react'
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
  onErrorsChange?: (errors: ValidationError[]) => void
}

export interface ValidationError {
  timeStart?: string
  timeEnd?: string
}

export const EventCreateSchedule = ({
  schedule,
  setSchedule,
  onErrorsChange,
}: EventCreateScheduleProps) => {
  const TIME_FORMAT = 'HH:mm'
  const [errors, setErrors] = useState<ValidationError[]>(
    schedule.map(() => ({})),
  )
  const changeScheduleItem = (
    field: keyof ScheduleItem,
    data: any,
    index: number,
  ) => {
    setSchedule(prevSchedule =>
      prevSchedule.map((scheduleItem, itemIndex) => {
        if (itemIndex === index) {
          scheduleItem[field] = data
        }

        return scheduleItem
      }),
    )
    validateScheduleItem(field, data, index)
  }
  const handleTimeSelect = (
    field: keyof ScheduleItem,
    time: string,
    index: number,
  ) => {
    if (field === 'timeEnd' && !time.trim()) {
      // Если timeEnd пустой, сохраняем null
      changeScheduleItem(field, null, index)
      return
    }

    if (!time.trim()) {
      // Для timeStart пустое значение не допустимо, но на всякий случай
      changeScheduleItem(field, null, index)
      return
    }

    const newDate = moment()
      .hour(moment(time, TIME_FORMAT).hour())
      .minute(moment(time, TIME_FORMAT).minute())
      .second(0)
      .toDate()

    changeScheduleItem(field, newDate, index)
  }

  const validateScheduleItem = (
    field: keyof ScheduleItem,
    value: any,
    index: number,
  ) => {
    setErrors(prevErrors => {
      const newErrors = [...prevErrors]
      const item = schedule[index]

      // Получаем актуальные значения с учетом текущего изменения
      const timeStart = field === 'timeStart' ? value : item.timeStart
      const timeEnd = field === 'timeEnd' ? value : item.timeEnd

      const error: ValidationError = {}

      // timeStart обязательное
      if (!timeStart) {
        error.timeStart = 'Начальное время обязательно'
      }

      // Если timeEnd есть, проверяем, что timeStart <= timeEnd
      if (timeStart && timeEnd) {
        if (moment(timeStart).isAfter(moment(timeEnd))) {
          error.timeStart = 'Начальное время не может быть позже конечного'
          error.timeEnd = 'Конечное время не может быть раньше начального'
        }
      }

      newErrors[index] = error

      if (onErrorsChange) {
        onErrorsChange(newErrors)
      }

      return newErrors
    })
  }

  const addScheduleItem = () => {
    setSchedule(prevSchedule => [
      ...prevSchedule,
      { name: '', timeStart: new Date(), timeEnd: new Date() },
    ])
    setErrors(prevErrors => {
      const newErrors = [...prevErrors, {}]
      if (onErrorsChange) onErrorsChange(newErrors)
      return newErrors
    })
  }

  const removeScheduleItem = (index: number) => {
    setSchedule(prevSchedule =>
      prevSchedule.filter((_, itemIndex) => itemIndex !== index),
    )
    setErrors(prevErrors => {
      const newErrors = prevErrors.filter((_, itemIndex) => itemIndex !== index)
      if (onErrorsChange) onErrorsChange(newErrors)
      return newErrors
    })
  }

  return (
    <div className="schedule">
      <label className="body_s_sb label">Регламент</label>
      <div className="schedule__container-items">
        {schedule.map((item, index) => (
          <div className="schedule--item" key={`schedule-item-${index}`}>
            <div className="schedule--time">
              <TimeInput
                errorText={errors[index]?.timeStart && errors[index].timeStart}
                key={index}
                value={moment(item.timeStart).format(TIME_FORMAT)}
                onTimeSelect={(time: string) =>
                  handleTimeSelect('timeStart', time, index)
                }
              />
              <TimeInput
                key={index}
                errorText={errors[index]?.timeEnd && errors[index].timeEnd}
                value={item.timeEnd && moment(item.timeEnd).format(TIME_FORMAT)}
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
