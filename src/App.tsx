import { useState } from 'react'
import './assets/styles/style.scss'
import { Dropdown, DropdownItemType } from './components/UI/Dropdown/Dropdown'
import image from './assets/images/mem.png'
import React from 'react'

const items: DropdownItemType[] = [
  {
    id: '1',
    text: 'Элемент 1',
    iconBefore: 'CHECK',
  },
  {
    id: '2',
    text: 'Элемент 2',
    avatar: {
      src: image,
      description: 'Описание аватарки',
    },
  },
  {
    id: '3',
    text: 'Элемент 3',
    iconAfter: 'CHECK',
  },
]

function App() {
  const [count, setCount] = useState(0)

  const [selected, setSelected] = React.useState('1')

  const handleSelect = (selected: string | string[]) => {
    if (Array.isArray(selected)) {
      throw new Error('Cannot select multiple items')
    }
    setSelected(selected)
  }

  return (
    <>
      <div>
        <Dropdown
          items={items}
          selected={selected}
          onChange={handleSelect}
          id={''}
        />
        <Dropdown
          items={items}
          multiple={true}
          selected={[]}
          onChange={handleSelect}
          id={'1'}
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
