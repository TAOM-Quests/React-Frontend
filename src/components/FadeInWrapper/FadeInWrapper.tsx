import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import './FadeInWrapper.scss'

interface FadeInWrapperProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
  threshold?: number
  rootMargin?: string
}

export const FadeInWrapper = ({
  style,
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '0px',
}: FadeInWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [threshold, rootMargin])

  return (
    <div
      ref={ref}
      className={`${className} fade-in-block ${visible ? 'visible' : ''}`}
      style={style}
    >
      {children}
    </div>
  )
}
