import { ReactNode, RefObject, useState } from 'react'
import { usePopper } from 'react-popper'
import './InfoPopper.scss'

interface InfoPopperProps {
  anchorRef: RefObject<HTMLDivElement>
  isVisible: boolean
  name?: string
  text?: string
  children?: ReactNode
  position?: string
}

export const InfoPopper = ({
  name,
  text,
  position,
  children,
  anchorRef,
  isVisible,
}: InfoPopperProps) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)

  const { styles, attributes } = usePopper(anchorRef.current, popperElement, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 8,
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top', 'bottom', 'right', 'left'],
        },
      },
    ],
  })

  if (!isVisible) return null

  return (
    <div
      ref={setPopperElement}
      className="info-popper"
      style={styles.popper}
      {...attributes.popper}
    >
      <div className="info-popper__card">
        {children ? (
          children
        ) : (
          <>
            {name && <div className="body_xl_sb info-popper__name">{name}</div>}
            {position && (
              <div className="body_m_m info-popper__position">{position}</div>
            )}
            {text && <div className="body_m_m info-popper__text">{text}</div>}
          </>
        )}
      </div>
    </div>
  )
}
