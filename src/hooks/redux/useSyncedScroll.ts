import { useEffect, RefObject } from 'react'

export const useSyncedScroll = (refs: RefObject<HTMLElement>[]) => {
  useEffect(() => {
    let isSyncing = false

    const onScroll = (e: Event) => {
      if (isSyncing) return
      isSyncing = true
      const source = e.target as HTMLElement
      refs.forEach(ref => {
        if (ref.current && ref.current !== source) {
          ref.current.scrollLeft = source.scrollLeft
        }
      })
      isSyncing = false
    }

    refs.forEach(ref => {
      ref.current?.addEventListener('scroll', onScroll)
    })

    return () => {
      refs.forEach(ref => {
        ref.current?.removeEventListener('scroll', onScroll)
      })
    }
  }, [refs])
}
