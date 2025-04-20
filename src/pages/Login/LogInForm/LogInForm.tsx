import React, { useState } from 'react'
import { users } from '../../../services/api/userModule/users/users'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../../hooks/redux/reduxHooks'
import { setUser } from '../../../redux/auth/authSlice'
import Input from '../../../components/UI/Input/Input'
import { Button } from '../../../components/UI/Button/Button'
import './LogInForm.scss'

export default function LogInForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorsMessage, setErrorsMessage] = useState<{
    email?: string
    password?: string
  }>({})
  const [showPassword, setShowPassword] = useState(false)

  const tryAuthUser = async (event: React.FormEvent) => {
    event.preventDefault()
    setErrorsMessage({})

    try {
      const foundUser = await users.auth({ email, password })
      localStorage.setItem('token', foundUser.token)
      dispatch(setUser(foundUser))
      navigate('/')
    } catch (e) {
      if (e instanceof Error) {
        const message = e.message.toLowerCase()
        if (message.includes('email')) {
          setErrorsMessage({ email: e.message })
        } else if (message.includes('password')) {
          setErrorsMessage({ password: e.message })
        } else {
          setErrorsMessage({ email: e.message, password: e.message })
        }
      } else {
        setErrorsMessage({ email: String(e), password: String(e) })
      }
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <form className="login_form" onSubmit={tryAuthUser}>
      <h4 className="heading_4 login_form__heading">
        Войдите в личный кабинет
      </h4>
      <Input
        type="email"
        label="Почта"
        placeholder="Введите почту"
        className="email-input"
        valueInput={email}
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
        valueInput={password}
        onChange={e => setPassword(e.target.value)}
        errorText={errorsMessage.password}
      />
      <Button type="submit" text="Войти" />
    </form>
  )
}
