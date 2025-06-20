import React, { useState } from 'react'
import { users } from '../../../services/api/userModule/users/users'
import { useNavigate } from 'react-router'
import './SignInForm.scss'
import Input from '../../../components/UI/Input/Input'
import { Button } from '../../../components/UI/Button/Button'
import { validateEmail } from '../../../validation/validateEmail'
import { validatePassword } from '../../../validation/validatePassword'
import { validateRepeatPassword } from '../../../validation/validateRepeatPassword'
import { Checkbox } from '../../../components/UI/Checkbox/Checkbox'

const CHECKBOX_DATA = [
  {
    label: 'Мне уже есть 14 лет',
  },
  {
    label:
      'Согласен(на) на обработку персональных данных в соответствии с Федеральным законом от 27 июля 2006 года № 152-ФЗ «О персональных данных»',
  },
  {
    label: (
      <>
        Согласен(на) с{' '}
        <a
          href="https://taom.academy/upload/%E2%84%9611_13_02_2023.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Политикой в отношении обработки персональных данных
        </a>
      </>
    ),
  },
]

export default function SignInForm() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [signInError, setSignInError] = useState('')
  const [checkboxes, setCheckboxes] = useState([false, false, false])

  const allCheckboxesChecked = checkboxes.every(Boolean)

  const emailValidator = validateEmail(email)
  const passwordValidator = validatePassword(password)
  const repeatPasswordValidator = validateRepeatPassword(
    password,
    repeatPassword,
  )

  const tryCreateUser = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitted(true)
    setSignInError('')

    if (
      !emailValidator.isValid ||
      !passwordValidator.isValid ||
      !repeatPasswordValidator.isValid
    ) {
      return
    }

    const foundUser = await users.getUsers({ email })

    if (foundUser.length) {
      setSignInError('Пользователь с таким email уже существует')
      return
    }

    localStorage.setItem('user', JSON.stringify({ email, password }))
    navigate('/email/confirm')
  }

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const handleCheckboxChange = (idx: number) => {
    setCheckboxes(prev =>
      prev.map((checked, i) => (i === idx ? !checked : checked)),
    )
  }

  return (
    <form className="signIn_form" onSubmit={tryCreateUser}>
      <h4 className="heading_4 signIn_form__heading">Регистрация</h4>
      <Input
        type="email"
        label="Почта"
        placeholder="Введите почту"
        className="email-input"
        value={email}
        onChange={e => setEmail(e.target.value)}
        errorText={isSubmitted ? emailValidator.error || signInError : ''}
      />
      <Input
        type={showPassword ? 'text' : 'password'}
        label="Пароль"
        placeholder="Введите пароль"
        className="password-input"
        iconAfter={showPassword ? 'EYE_CLOSED' : 'EYE'}
        onClickIconAfter={toggleShowPassword}
        value={password}
        onChange={e => setPassword(e.target.value)}
        errorText={isSubmitted ? passwordValidator.error : ''}
      />

      <Input
        type={showPassword ? 'text' : 'password'}
        label="Повтор пароля"
        placeholder="Введите пароль повторно"
        className="repeatPassword-input"
        iconAfter={showPassword ? 'EYE_CLOSED' : 'EYE'}
        onClickIconAfter={toggleShowPassword}
        value={repeatPassword}
        onChange={e => setRepeatPassword(e.target.value)}
        errorText={isSubmitted ? repeatPasswordValidator.error : ''}
      />
      <Button
        type="submit"
        text="Зарегистрироваться"
        disabled={!allCheckboxesChecked}
      />
      <div className="signIn_form__checkboxes">
        {CHECKBOX_DATA.map((item, idx) => (
          <Checkbox
            key={idx}
            isSelected={checkboxes[idx]}
            onChange={() => handleCheckboxChange(idx)}
            label={item.label}
          />
        ))}
      </div>
    </form>
  )
}
