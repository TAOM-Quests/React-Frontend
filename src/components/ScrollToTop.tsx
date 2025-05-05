import { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router'

const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) // или behavior: 'auto' для мгновенной прокрутки
  }, [pathname])

  return <>{children}</>
}

export default ScrollToTop
