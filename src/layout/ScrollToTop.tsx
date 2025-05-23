import { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router'

export const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [pathname])

  return <>{children}</>
}
