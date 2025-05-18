import { Switcher } from '../../../UI/Switcher/Switcher'

interface SwitcherFilterProps {
  options: string[]
  filterValue: string
  setFilterValue: (value: string) => void
}

export const SwitcherFilter = ({
  options,
  filterValue,
  setFilterValue,
}: SwitcherFilterProps) => {
  const activeOption = filterValue || 'Все'

  return (
    <Switcher
      options={options}
      activeOption={activeOption}
      onChange={val => setFilterValue(val)}
    />
  )
}
