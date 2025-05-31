import {
  Dispatch,
  forwardRef,
  Ref,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Button } from '../../../../components/UI/Button/Button'
import { Icon } from '../../../../components/UI/Icon/Icon'
import Input from '../../../../components/UI/Input/Input'
import { ScheduleItem } from '../../../../models/event'
import './EventCreateSchedule.scss'
import { TimeInput } from '../../../../components/UI/TimeInput/TimeInput'
import moment from 'moment'
import { validateTime } from '../../../../validation/validateTime'

export interface EventCreateScheduleProps {
  schedule: ScheduleItem[]
  setSchedule: Dispatch<SetStateAction<ScheduleItem[]>>
  onErrorsChange?: (hasErrors: boolean) => void
}

interface EventCreateScheduleValidationError {
  timeStart?: string
  timeEnd?: string
}

export interface EventCreateScheduleRef {
  hasErrors: () => boolean
}

export const EventCreateSchedule = forwardRef<
  EventCreateScheduleRef,
  EventCreateScheduleProps
>(
  (
    { schedule, setSchedule, onErrorsChange },
    ref: Ref<EventCreateScheduleRef>,
  ) => {
    const TIME_FORMAT = 'HH:mm'
    const [errors, setErrors] = useState<EventCreateScheduleValidationError[]>(
      schedule.map(() => ({})),
    )

    useEffect(() => {
      if (onErrorsChange) {
        const hasErrors = errors.some(
          error => error.timeStart !== undefined || error.timeEnd !== undefined,
        )
        onErrorsChange(hasErrors)
      }
    }, [errors, onErrorsChange])

    useImperativeHandle(
      ref,
      () => ({
        hasErrors: () => {
          return errors.some(
            error =>
              error.timeStart !== undefined || error.timeEnd !== undefined,
          )
        },
      }),
      [errors],
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
      const validation = validateTime(time, true)

      setErrors(prevErrors => {
        const newErrors = [...prevErrors]
        if (!validation.isValid) {
          newErrors[index] = {
            ...newErrors[index],
            [field]: validation.error,
          }
        } else {
          newErrors[index] = {
            ...newErrors[index],
            [field]: undefined,
          }
        }

        return newErrors
      })

      if (!validation.isValid) {
        return
      }

      const newDate = moment(time, TIME_FORMAT).toDate()
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

        const timeStart = field === 'timeStart' ? value : item.timeStart
        const timeEnd = field === 'timeEnd' ? value : item.timeEnd

        const error: EventCreateScheduleValidationError = {}

        if (!timeStart) {
          error.timeStart = 'Начальное время обязательно'
        }

        if (!timeEnd) {
          error.timeEnd = 'Конечное время обязательно'
        }

        if (timeStart && timeEnd) {
          if (moment(timeStart).isAfter(moment(timeEnd))) {
            error.timeStart = 'Начальное время не может быть позже конечного'
            error.timeEnd = 'Конечное время не может быть раньше начального'
          }
        }

        newErrors[index] = error

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

        return newErrors
      })
    }

    const removeScheduleItem = (index: number) => {
      setSchedule(prevSchedule =>
        prevSchedule.filter((_, itemIndex) => itemIndex !== index),
      )
      setErrors(prevErrors => {
        const newErrors = prevErrors.filter(
          (_, itemIndex) => itemIndex !== index,
        )

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
                  errorText={
                    errors[index]?.timeStart && errors[index].timeStart
                  }
                  value={moment(item.timeStart).format(TIME_FORMAT)}
                  onTimeSelect={(time: string) =>
                    handleTimeSelect('timeStart', time, index)
                  }
                />
                <TimeInput
                  errorText={errors[index]?.timeEnd && errors[index].timeEnd}
                  value={
                    item.timeEnd && moment(item.timeEnd).format(TIME_FORMAT)
                  }
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
  },
)
