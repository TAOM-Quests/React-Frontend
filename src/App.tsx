import { useState } from 'react'
import './assets/styles/style.scss'
// import { Dropdown, DropdownItemType } from './components/UI/Dropdown/Dropdown'
import { Dropdown, DropdownItemType } from './components/UI/Dropdown/Dropdown'
import image from './assets/images/mem.png'
import React from 'react'
import { Checkbox } from './components/UI/Checkbox/Checkbox'
import { Option } from './components/UI/Option/Option'
import { Tag } from './components/UI/Tag/Tag'
import { Button } from './components/UI/Button/Button'
import Input from './components/UI/Input/Input'
const items: DropdownItemType[] = [
  {
    id: '124333445346356756576',
    text: 'Элемент 1',
    avatar: {
      src: image,
      description: 'Описание аватарки',
    },
  },
  {
    id: '4778546745675345726387',
    text: 'Элемент 2',
    avatar: {
      src: image,
      description: 'Описание аватарки',
    },
  },
  {
    id: 'fduidfihehjerihfekj',
    text: 'Элемент 3',
    avatar: {
      src: image,
      description: 'Описание аватарки',
    },
  },
]

const items2: DropdownItemType[] = [
  {
    id: 'jefj0w3u09ru',
    text: 'Элемент 1',
    iconBefore: 'CHECK',
  },
  {
    id: 'y598ty8r3r',
    text: 'Элемент 2',
  },
  {
    id: 'bcbcjs',
    text: 'Элемент 3',
    iconAfter: 'CHECK',
  },
]

function App() {
  const [count, setCount] = useState(0)

  const handleSelectChange = (selected: string | string[] | null) => {
    console.log('Выбрано:', selected)
  }

  const handleValueChange = (value: string) => {
    console.log('Значение в Input:', value)
  }

  return (
    <>
      <div>
        <Dropdown
          items={items2}
          // selected={null}
          onChange={handleSelectChange}
          id="my-dropdown"
          // onValueChange={handleValueChange}
        />
        <Dropdown
          items={items}
          // selected={null}
          onChange={handleSelectChange}
          id="my-dropdown13"
          // onValueChange={handleValueChange}
        />
        <Dropdown
          items={items}
          // selected={null}
          multiple={true}
          onChange={handleSelectChange}
          id="my-dropdown1"
          // onValueChange={handleValueChange}
        />
        <Dropdown
          items={items2}
          // selected={null}
          multiple={true}
          onChange={handleSelectChange}
          id="my-dropdown4"
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
