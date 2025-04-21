import React, { useState } from 'react'
import { users } from '../../../services/api/userModule/users/users'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../../hooks/redux/reduxHooks'
import { setUser } from '../../../redux/auth/authSlice'
import './SignInForm.scss'
import Input from '../../../components/UI/Input/Input'
import { Button } from '../../../components/UI/Button/Button'

export default function SignInForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errorsMessage, setErrorsMessage] = useState<{
    email?: string
    password?: string
    repeatPassword?: string
  }>({})
  const [showPassword, setShowPassword] = useState(false)

  const tryCreateUser = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorsMessage({})

    if (password !== repeatPassword) {
      setErrorsMessage({
        password: 'Пароли не совпадают',
        repeatPassword: 'Пароли не совпадают',
      })
      return
    }

    try {
      const createdUser = await users.create({ email, password })
      localStorage.setItem('token', createdUser.token)
      dispatch(setUser(createdUser))
      navigate('/')
    } catch (e) {
      if (e instanceof Error) {
        const message = e.message.toLowerCase()
        if (message.includes('email')) {
          setErrorsMessage({ email: e.message })
        } else if (message.includes('password')) {
          setErrorsMessage({ password: e.message })
        } else if (message.includes('repeatPassword')) {
          setErrorsMessage({ repeatPassword: e.message })
        } else {
          setErrorsMessage({
            email: e.message,
            password: e.message,
            repeatPassword: e.message,
          })
        }
      } else {
        setErrorsMessage({
          email: String(e),
          password: String(e),
          repeatPassword: String(e),
        })
      }
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
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
        errorText={errorsMessage.email}
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
        errorText={errorsMessage.password}
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
        errorText={errorsMessage.repeatPassword}
      />
      <Button type="submit" text="Зарегистрироваться" />
    </form>
  )
}
