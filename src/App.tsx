import { useState } from 'react'
import './assets/styles/style.scss'
// import { Dropdown, DropdownItemType } from './components/UI/Dropdown/Dropdown'
import { Dropdown, DropdownItemType } from './components/UI/Dropdown/Dropdown'
import image from './assets/images/mem.png'
const items: DropdownItemType[] = [
  {
    id: 124333445346356756576,
    text: 'Элемент 1',
    avatar: {
      src: image,
      description: 'Описание аватарки',
    },
  },
  {
    id: 4778546745675345726387,
    text: 'Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2',
    avatar: {
      src: image,
      description:
        'Описание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватаркиОписание аватарки',
    },
  },
  {
    id: 12354,
    text: 'Элемент 3',
    avatar: {
      src: image,
      description: 'Описание аватарки',
    },
  },
]

const items2: DropdownItemType[] = [
  {
    id: 9856,
    text: 'Элемент 1',
    iconBefore: 'CHECK',
  },
  {
    id: 5,
    text: 'Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2Элемент 2',
  },
  {
    id: 3648,
    text: 'Элемент 3',
    iconAfter: 'CHECK',
  },
]

function App() {
  const [count, setCount] = useState(0)

  const handleSelectChange = (selected: number | number[] | null) => {
    console.log('Выбрано:', selected)
  }

  return (
    <>
      <div>
        <Dropdown
          items={items2}
          // selected={null}
          onChangeDropdown={handleSelectChange}
          // id="my-dropdown"
          // onValueChange={handleValueChange}
        />
        <Dropdown
          items={items}
          // selected={null}
          placeholder="Search"
          onChangeDropdown={handleSelectChange}
          // id="my-dropdown13"
          // onValueChange={handleValueChange}
        />
        <Dropdown
          items={items}
          // selected={null}
          isMultiple={true}
          onChangeDropdown={handleSelectChange}
          // id="my-dropdown1"
          // onValueChange={handleValueChange}
        />
        <Dropdown
          items={items2}
          // selected={null}
          isMultiple={true}
          onChangeDropdown={handleSelectChange}
          // id="my-dropdown4"
          // onValueChange={handleValueChange}
        />
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
