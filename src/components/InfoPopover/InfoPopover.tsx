import { ReactNode, RefObject, useEffect, useState } from 'react'
import './InfoPopover.scss'

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
  const [coords, setCoords] = useState({ left: 0, top: 0 })

  useEffect(() => {
    if (anchorRef.current && isVisible) {
      const rect = anchorRef.current.getBoundingClientRect()
      setCoords({
        left: rect.left + rect.width / 2,
        top: rect.top,
      })
    }
  }, [anchorRef, isVisible])

  if (!isVisible) return null

  return (
    <div
      className="info-popover"
      style={{
        position: 'fixed',
        left: coords.left,
        top: coords.top,
        transform: 'translate(-50%, -110%)',
        zIndex: 1000,
      }}
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
