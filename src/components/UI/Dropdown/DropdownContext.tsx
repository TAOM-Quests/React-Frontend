import React, { createContext, useEffect, useState } from 'react'

interface DropdownContextProps {
  children: React.ReactNode
}

interface DropdownContextValue {
  isOpen: boolean
  setIsOpen: (isOpen: boolean, id: string | null) => void
  currentDropdownId: string | null
  setCurrentDropdownId: (id: string | null) => void
}

const DropdownContext = createContext<DropdownContextValue>({
  isOpen: false,
  setIsOpen: () => {},
  currentDropdownId: null,
  setCurrentDropdownId: () => {},
})

const DropdownProvider: React.FC<DropdownContextProps> = ({ children }) => {
  const [isOpen, setIsOpenState] = useState(false)
  const [currentDropdownId, setCurrentDropdownIdState] = useState<
    string | null
  >(null)

  const handleSetIsOpen = (isOpen: boolean, id: string | null) => {
    setIsOpenState(isOpen)
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
        handleSetIsOpen(false, null)
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
        isOpen,
        setIsOpen: handleSetIsOpen,
        currentDropdownId,
        setCurrentDropdownId: setCurrentDropdownIdState,
      }}
    >
      {children}
    </DropdownContext.Provider>
  )
}

export { DropdownProvider, DropdownContext }
