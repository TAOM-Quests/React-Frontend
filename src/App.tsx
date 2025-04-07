import { useState } from 'react'
import './assets/styles/style.scss'
import Input from './components/UI/Input/Input'

function App() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('')

  const [email, setEmail] = useState('')
  const [emailErrors, setEmailErrors] = useState<string[]>([])

  const validateEmail = (email: string) => {
    const errors: string[] = []

    if (email.length < 2) {
      errors.push('Email must be at least 2 characters long.')
    }
    if (email.length > 50) {
      errors.push('Email is too long.')
    }
    if (!email.includes('@')) {
      errors.push('Email must include an "@" symbol.')
    }
    if (!email.includes('.')) {
      errors.push('Email must include an "." symbol.')
    }

    return errors
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    const validationErrors = validateEmail(newEmail)
    setEmailErrors(validationErrors)
  }

  return (
    <>
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

      <div style={{ padding: '20px', maxWidth: '400px' }}>
        <h1>Примеры Input</h1>

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          helperText="We'll never share your email with anyone else."
          errorText={emailErrors[0]}
          invalid={emailErrors.length > 0}
        />

        {/* Нормальное состояние */}
        <Input
          label="Normal"
          placeholder="Введите текст"
          value={value}
          onChange={e => setValue(e.target.value)}
          helperText="Normal (Стандартный)"
        />

        {/* Состояние Hover */}
        <Input
          label="Hover"
          placeholder="Наведение"
          value={value}
          onChange={e => setValue(e.target.value)}
          helperText="Hover (Наведение)"
        />

        {/* Состояние Focus */}
        <Input
          label="Focus"
          placeholder="Активное поле"
          value={value}
          onChange={e => setValue(e.target.value)}
          helperText="Focus (Активное)"
        />

        {/* Disabled */}
        <Input
          label="Disabled"
          placeholder="Недоступно"
          value=""
          disabled
          helperText="Disabled (Недоступен)"
        />

        {/* Invalid */}
        <Input
          label="Invalid"
          placeholder="Ошибка"
          value=""
          invalid
          errorText="Invalid (Ошибка)"
        />

        {/* С иконками */}
        <Input
          label="С иконками"
          placeholder="Введите текст"
          value={value}
          onChange={e => setValue(e.target.value)}
          iconAfter="ADD_IMAGE"
          iconBefore="EDIT"
        />
      </div>
    </>
  )
}

export default App
