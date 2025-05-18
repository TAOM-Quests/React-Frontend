import {
  TableColumn,
  TableEdit,
} from '../../../components/Table/TableEdit/TableEdit'
import Input from '../../../components/UI/Input/Input'

interface WordRow {
  id: number
  word: string
  departmentId: number
}

const columns: TableColumn<WordRow>[] = [
  {
    key: 'word',
    title: 'Слово',
    render: (row, onChange, isDisabled) => (
      <Input
        value={row.word}
        onChange={e => onChange(e.target.value)}
        disabled={isDisabled}
        placeholder="Слово"
      />
    ),
  },
]

const initialRows: WordRow[] = [
  {
    id: 1,
    word: 'Пример',
    departmentId: 1,
  },
  {
    id: 2,
    word: 'Пример',
    departmentId: 1,
  },
]

const addRowTemplate = {
  word: '',
}

export const TableEditAlwaysAddRow = () => {
  return (
    <div style={{ padding: 20 }}>
      <TableEdit<WordRow>
        title="Редактирование игры «5 букв»"
        columns={columns}
        initialRows={initialRows}
        addRowTemplate={addRowTemplate}
      />
    </div>
  )
}
