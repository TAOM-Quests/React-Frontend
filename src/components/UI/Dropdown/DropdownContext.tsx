import React, { createContext, useEffect, useState } from 'react'

interface DropdownContextProps {
  children: React.ReactNode
}

interface DropdownContextValue {
  currentDropdownId: string | null
  setCurrentDropdownId: (id: string | null) => void
}

const DropdownContext = createContext<DropdownContextValue>({
  currentDropdownId: null,
  setCurrentDropdownId: () => {},
})

const DropdownProvider: React.FC<DropdownContextProps> = ({ children }) => {
  const [currentDropdownId, setCurrentDropdownIdState] = useState<
    string | null
  >(null)

  const handleSetCurrentDropdownId = (id: string | null) => {
    setCurrentDropdownIdState(id)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target) return

      const dropdownElements = document.querySelectorAll('.dropdown')
      let isInsideDropdown = false

      dropdownElements.forEach(dropdownElement => {
        if (dropdownElement.contains(event.target as Node)) {
          isInsideDropdown = true
        }
      })

      if (!isInsideDropdown) {
        handleSetCurrentDropdownId(null)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <DropdownContext.Provider
      value={{
        currentDropdownId,
        setCurrentDropdownId: setCurrentDropdownIdState,
      }}
    >
      {children}
    </DropdownContext.Provider>
  )
}

export { DropdownProvider, DropdownContext }
