import { useRef } from 'react'

export interface ScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  onEndScroll?: () => void
}

export const ScrollController = ({
  children,
  onEndScroll,
  ...props
}: ScrollProps) => {
  const container = useRef(null)

  const handleScroll = () => {
    if (!container.current) return

    const { scrollTop, scrollHeight, clientHeight } = container.current

    
    if (Math.abs(scrollHeight - scrollTop - clientHeight) <= 1) {
      onEndScroll && onEndScroll()
    }
  }

  return (
    <div ref={container} onScroll={handleScroll} {...props}>
      {children}
    </div>
  )
}
