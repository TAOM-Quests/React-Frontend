// import { useState, useMemo } from 'react'

import {
  TableColumn,
  TableEdit,
} from '../../../components/Table/TableEdit/TableEdit'

// import './WordleWordsEditor.scss'
// import { Checkbox } from '../../../components/UI/Checkbox/Checkbox'
// import { Icon } from '../../../components/UI/Icon/Icon'

// interface Word {
//   id: number
//   value: string
//   selected: boolean
// }

// const initialWords: Word[] = [
//   { id: 1, value: 'Слово', selected: false },
//   { id: 2, value: 'Слово', selected: false },
//   { id: 3, value: 'Слово', selected: false },
//   { id: 4, value: 'Слово', selected: false },
//   { id: 5, value: 'Слово', selected: false },
//   { id: 6, value: 'Слово', selected: false },
// ]

// export const WordleWordsEditor = () => {
//   const [words, setWords] = useState<Word[]>(initialWords)
//   const [search, setSearch] = useState('')
//   const [editMode, setEditMode] = useState(false)
//   const [newWord, setNewWord] = useState('')

//   // Фильтрация по поиску
//   const filteredWords = useMemo(
//     () =>
//       words.filter(w => w.value.toLowerCase().includes(search.toLowerCase())),
//     [words, search],
//   )

//   // Считаем выбранные
//   const selectedCount = words.filter(w => w.selected).length

//   // Выделить все
//   const handleSelectAll = (checked: boolean) => {
//     setWords(words => words.map(w => ({ ...w, selected: checked })))
//   }

//   // Выделить одну строку
//   const handleSelect = (id: number) => {
//     setWords(words =>
//       words.map(w => (w.id === id ? { ...w, selected: !w.selected } : w)),
//     )
//   }

//   // Удалить одну строку
//   const handleDelete = (id: number) => {
//     setWords(words => words.filter(w => w.id !== id))
//   }

//   // Удалить выбранные
//   const handleDeleteSelected = () => {
//     setWords(words => words.filter(w => !w.selected))
//   }

//   // Редактировать/сохранить
//   const handleEditMode = () => {
//     if (editMode) {
//       // Здесь можно отправить изменения на сервер
//     }
//     setEditMode(!editMode)
//   }

//   // Изменение слова
//   const handleWordChange = (id: number, value: string) => {
//     setWords(words =>
//       words.map(w => (w.id === id ? { ...w, value: value.slice(0, 5) } : w)),
//     )
//   }

//   // Добавить слово
//   const handleAddWord = () => {
//     const val = newWord.trim()
//     if (val.length === 5 && !words.some(w => w.value === val)) {
//       setWords([...words, { id: Date.now(), value: val, selected: false }])
//       setNewWord('')
//     }
//   }

//   // Для чекбокса "выделить все"
//   const allSelected =
//     filteredWords.length > 0 && filteredWords.every(w => w.selected)
//   const someSelected = filteredWords.some(w => w.selected) && !allSelected

//   return (
//     <div className="wordle-editor">
//       <h2>Редактирование «5 букв»</h2>
//       <div className="top-bar">
//         <input
//           className="search"
//           placeholder="Поиск по слову"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />
//         <button className="edit-btn" onClick={handleEditMode}>
//           {editMode ? 'Сохранить изменения' : 'Редактировать'}
//         </button>
//       </div>
//       <div className="table">
//         <div className="header-row">
//           <Checkbox
//             isSelected={allSelected}
//             onChange={e => handleSelectAll(e.target.checked)}
//             label="Слово"
//             // Для индикации "частично выделено" можно добавить класс/иконку если someSelected
//           />
//         </div>
//         {filteredWords.map(w => (
//           <div className="word-row" key={w.id}>
//             <Checkbox
//               isSelected={w.selected}
//               onChange={() => handleSelect(w.id)}
//               isDisabled={false}
//             />
//             <input
//               className="word-input"
//               value={w.value}
//               disabled={!editMode}
//               maxLength={5}
//               onChange={e => handleWordChange(w.id, e.target.value)}
//             />
//             <button
//               className="icon-btn"
//               onClick={() => handleDelete(w.id)}
//               disabled={!editMode}
//               title="Удалить"
//               tabIndex={-1}
//             >
//               <Icon icon="CHECK" size="18px" />
//             </button>
//           </div>
//         ))}
//         <div className="add-row">
//           <input
//             className="word-input"
//             placeholder="Добавьте слово"
//             value={newWord}
//             onChange={e => setNewWord(e.target.value)}
//             maxLength={5}
//             // disabled={!editMode}
//             onKeyDown={e => e.key === 'Enter' && handleAddWord()}
//           />
//           <button
//             className="icon-btn"
//             onClick={handleAddWord}
//             // disabled={!editMode}
//             title="Добавить"
//             tabIndex={-1}
//           >
//             <Icon icon="PLUS" size="18px" />
//           </button>
//         </div>
//       </div>
//       {selectedCount > 0 && (
//         <div className="footer">
//           <span>
//             Выбрано {selectedCount} строк из {words.length}
//           </span>
//           <button
//             className="delete-btn"
//             onClick={handleDeleteSelected}
//             disabled={!editMode}
//           >
//             Удалить
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

import React from 'react'
import Input from '../../../components/UI/Input/Input'

interface WordRow {
  id: number
  word: string
}

const columns: TableColumn<WordRow>[] = [
  {
    key: 'word',
    title: 'Слово',
    render: (row, onChange, disabled) => (
      <Input
        value={row.word}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Слово"
      />
    ),
  },
  {
    key: 'word',
    title: 'Слово',
    render: (row, onChange, disabled) => (
      <Input
        value={row.word}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Слово"
      />
    ),
  },
  {
    key: 'word',
    title: 'Слово',
    render: (row, onChange, disabled) => (
      <Input
        value={row.word}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Слово"
      />
    ),
  },
  {
    key: 'word',
    title: 'Слово',
    render: (row, onChange, disabled) => (
      <Input
        value={row.word}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Слово"
      />
    ),
  },
  {
    key: 'word',
    title: 'Слово',
    render: (row, onChange, disabled) => (
      <Input
        value={row.word}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Слово"
      />
    ),
  },
  {
    key: 'word',
    title: 'Слово',
    render: (row, onChange, disabled) => (
      <Input
        value={row.word}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Слово"
      />
    ),
  },
  {
    key: 'word',
    title: 'Слово',
    render: (row, onChange, disabled) => (
      <Input
        value={row.word}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Слово"
      />
    ),
  },
  {
    key: 'word',
    title: 'Слово',
    render: (row, onChange, disabled) => (
      <Input
        value={row.word}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Слово"
      />
    ),
  },
  {
    key: 'word',
    title: 'Слово',
    render: (row, onChange, disabled) => (
      <Input
        value={row.word}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Слово"
      />
    ),
  },
  {
    key: 'word',
    title: 'Слово',
    render: (row, onChange, disabled) => (
      <Input
        value={row.word}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Слово"
      />
    ),
  },
  {
    key: 'word',
    title: 'Слово',
    render: (row, onChange, disabled) => (
      <Input
        value={row.word}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Слово"
      />
    ),
  },
  {
    key: 'word',
    title: 'Слово',
    render: (row, onChange, disabled) => (
      <Input
        value={row.word}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Слово"
      />
    ),
  },
]

const initialRows: WordRow[] = [
  { id: 1, word: 'Пример' },
  { id: 2, word: 'Тест' },
]

const addRowTemplate = {
  word: '',
  question: '',
}

export const TableEditAlwaysAddRow = () => {
  return (
    <div style={{ padding: 20 }}>
      <TableEdit<WordRow>
        columns={columns}
        initialRows={initialRows}
        addRowTemplate={addRowTemplate}
      />
    </div>
  )
}
