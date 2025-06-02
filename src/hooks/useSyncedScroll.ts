import { useEffect, RefObject } from 'react'

export const useSyncedScroll = <T extends HTMLElement = HTMLElement>(
  refs: RefObject<T>[],
) => {
  useEffect(() => {
    let isSyncing = false

    const onScroll = (e: Event) => {
      if (isSyncing) return
      isSyncing = true
      const source = e.target as T
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
