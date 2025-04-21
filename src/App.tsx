import { useCallback, useState } from 'react'
import './assets/styles/style.scss'
import { Dropdown, DropdownItemType } from './components/UI/Dropdown/Dropdown'
import image from './assets/images/mem.png'
import { Badge } from './components/UI/Badge/Badge'
import { DateInput } from './components/UI/DateInput/DateInput'
import { TimeInput } from './components/UI/TimeInput/TimeInput'
import { Modal } from './components/UI/Modal/Modal'

import { Toggle } from './components/UI/Toggle/Toggle'
import { Switcher } from './components/UI/Switcher/Switcher'
import { NumberInput } from './components/UI/NumberInput/NumberInput'

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

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date)
  }

  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const handleTimeSelect = (time: string | null) => {
    setSelectedTime(time)
  }

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const [isToggled, setIsToggled] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsToggled(event.target.checked)
  }

  const [activeOption, setActiveOption] = useState('Персональные данные')

  const options = ['Персональные данные', 'Мои мероприятия', 'Мои квесты']

  const handleOptionChange = (option: string) => {
    /*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Обработчик изменения выбранной опции
     * @param {string} option - выбранная опция
     */
    /*******  7aefc9c4-9c8f-41a9-b013-94e7217e48c4  *******/
    setActiveOption(option)
  }

  const [value, setValue] = useState<number | null>(null)

  // useCallback нужен для мемоизации функции
  const handleChange = useCallback((newValue: number | null) => {
    setValue(newValue)
  }, [])
  return (
    <>
      <div>
        <NumberInput
          label="123"
          placeholder="85"
          value={value}
          onChange={handleChange}
          min={0}
          max={100}
        />
        <p>Значение: {value === null ? 'Пусто' : value}</p>
      </div>
      <div>
        <Switcher
          options={options}
          activeOption={activeOption}
          onChange={handleOptionChange}
        />
        <p>Выбрано: {activeOption}</p>
      </div>

      <h1>Toggle Example</h1>

      <Toggle
        checked={isToggled}
        onChange={handleToggleChange}
        disabled={isDisabled}
      />

      <p>Toggle is: {isToggled ? 'ON' : 'OFF'}</p>

      <label>
        Disable Toggle:
        <input
          type="checkbox"
          checked={isDisabled}
          onChange={e => setIsDisabled(e.target.checked)}
        />
      </label>
      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="My Modal Title">
          <p>
            This is the modal content. This is the modal content.This is the
            modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content. This is the modal
            content. This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content. This is the modal content. This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content. This is
            the modal content. This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.This is the modal content.This is
            the modal content.This is the modal content.This is the modal
            content.This is the modal content.
          </p>
        </Modal>
      </div>
      <div>
        <TimeInput onTimeSelect={handleTimeSelect} />
        {selectedTime && <p>Выбранное время: {selectedTime}</p>}
        <h1>Calendar Example</h1>
        <DateInput onDateSelect={handleDateSelect} />
        <DateInput onDateSelect={handleDateSelect} />
        <DateInput onDateSelect={handleDateSelect} />
        {selectedDate && (
          <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
        )}
      </div>
      <div style={{ width: 100 }}>
        <Badge text="Primary" type="primary" />
        <Badge text="Accent" type="accent" />
        <Badge text="Info" type="info" />
        <Badge text="Caution" type="caution" />
        <Badge text="Critical" type="critical" />
        <Badge text="Success" type="success" />
        <Badge text="Neutral" type="neutral" />
      </div>

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
