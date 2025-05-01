import { ReactNode, RefObject, useEffect, useState } from 'react'
import './InfoPopover.scss'

import { usePopper } from 'react-popper'

interface InfoPopoverProps {
  anchorRef: RefObject<HTMLDivElement>
  isVisible: boolean
  name?: string
  position?: string
  text?: string
  children?: ReactNode
}

export const InfoPopover = ({
  anchorRef,
  isVisible,
  name,
  position,
  text,
  children,
}: InfoPopoverProps) => {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)

  const { styles, attributes } = usePopper(anchorRef.current, popperElement, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8], // сдвиг по X и Y: 8px ниже анкора
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
      className="info-popover"
      style={styles.popper}
      {...attributes.popper}
    >
      <div className="info-popover__card">
        {children ? (
          children
        ) : (
          <>
            {name && (
              <div className="body_xl_sb info-popover__name">{name}</div>
            )}
            {position && (
              <div className="body_m_m info-popover__position">{position}</div>
            )}
            {text && <div className="body_m_m info-popover__text">{text}</div>}
          </>
        )}
      </div>
    </div>
  )
}
