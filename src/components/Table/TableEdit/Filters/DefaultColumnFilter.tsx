import Input from '../../../UI/Input/Input'

interface DefaultColumnFilterProps {
  title: string
  filterValue: string
  setFilterValue: (value: string) => void
}

export const DefaultColumnFilter = ({
  title,
  filterValue,
  setFilterValue,
}: DefaultColumnFilterProps) => (
  <Input
    type="text"
    value={filterValue}
    onChange={e => setFilterValue(e.target.value)}
    placeholder={`Фильтр по ${title}`}
  />
)
