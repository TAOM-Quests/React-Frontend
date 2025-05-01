import moment from 'moment'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { ScheduleItem } from '../../../models/event'
import './EventSchedule.scss'
import { useEffect, useRef, useState } from 'react'

export interface EventScheduleProps {
  schedule: ScheduleItem[]
}

export const EventSchedule = ({ schedule }: EventScheduleProps) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = Number(entry.target.getAttribute('data-index'))
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set(prev).add(index))
          } else {
            setVisibleItems(prev => {
              const newSet = new Set(prev)
              newSet.delete(index)
              return newSet
            })
          }
        })
      },
      {
        threshold: 0.1, // срабатывает, когда 10% элемента видны
      },
    )

    itemRefs.current.forEach(el => {
      if (el) observer.observe(el)
    })
    return () => {
      itemRefs.current.forEach(el => {
        if (el) observer.unobserve(el)
      })
    }
  }, [schedule])
  return (
    <ContainerBox className="event-schedule__container">
      <h5 className="heading_5 event-schedule__title">Регламент</h5>
      <div className="event-schedule__timeline">
        {schedule.map((item, idx) => (
          <div
            key={idx}
            data-index={idx}
            ref={el => (itemRefs.current[idx] = el)}
            style={{ animationDelay: `${idx * 0.18}s` }}
            className={`event-schedule__item ${
              visibleItems.has(idx) ? 'visible' : ''
            }`}
          >
            <div className="event-schedule__circle" />
            {idx !== schedule.length - 1 && (
              <div className="event-schedule__line" />
            )}
            <div className="event-schedule__content">
              <div className="body_xl_m event-schedule__time">
                {moment(item.timeStart).format('HH:mm')} -{' '}
                {moment(item.timeEnd).format('HH:mm')}
              </div>
              {item.name && (
                <div className="body_m_r event-schedule__desc">{item.name}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </ContainerBox>
  )
}
