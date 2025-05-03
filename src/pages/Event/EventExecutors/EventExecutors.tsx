import { useRef, useState } from 'react'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { Avatar } from '../../../components/UI/Avatar/Avatar'
import { Employee } from '../../../models/user'
import { InfoPopper } from '../../../components/InfoPopper/InfoPopper'
import './EventExecutors.scss'

export interface EventExecutorsProps {
  executors: Employee[]
}

export const EventExecutors = ({ executors }: EventExecutorsProps) => {
  const [activeId, setActiveId] = useState<number | null>(null)

  const avatarRefs = useRef<(HTMLDivElement | null)[]>([])

  return (
    <ContainerBox className="event-executors">
      <h5 className="heading_5 event-executors__title">Организаторы</h5>
      <div className="event-executors__executors">
        {executors.map((executor, idx) => (
          <div key={executor.id}>
            <div
              className="event-executors__avatar-wrap"
              ref={el => (avatarRefs.current[idx] = el)}
              onMouseEnter={() => setActiveId(executor.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <Avatar
                size="large"
                src={executor.avatar?.url}
                alt={executor.name}
              />
            </div>
            {activeId === executor.id && avatarRefs.current[idx] && (
              <InfoPopper
                anchorRef={{ current: avatarRefs.current[idx] }}
                isVisible={activeId === executor.id}
                name={executor.name}
                position={executor.position}
              />
            )}
          </div>
        ))}
      </div>
    </ContainerBox>
  )
}
