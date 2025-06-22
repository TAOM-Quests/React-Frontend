import React, { useState } from 'react'
import { users } from '../../../services/api/userModule/users/users'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../../hooks/redux/reduxHooks'
import { setUser } from '../../../redux/auth/authSlice'
import Input from '../../../components/UI/Input/Input'
import { Button } from '../../../components/UI/Button/Button'
import './LogInForm.scss'
import { validateEmail } from '../../../validation/validateEmail'
import { validatePassword } from '../../../validation/validatePassword'

export default function LogInForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [authError, setAuthError] = useState('')

  const emailValidator = validateEmail(email)
  const passwordValidator = validatePassword(password)

  const tryAuthUser = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitted(true)
    setAuthError('')

    if (!emailValidator.isValid || !passwordValidator.isValid) {
      return
    }

    try {
      const foundUser = await users.auth({ email, password })
      localStorage.setItem('token', foundUser.token)
      dispatch(setUser(foundUser))
      navigate('/')
    } catch (e) {
      if (e instanceof Error) {
        setAuthError('Неверная почта или пароль')
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
        value={email}
        onChange={e => setEmail(e.target.value)}
        errorText={isSubmitted ? emailValidator.error || authError : ''}
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
      <Button type="submit" text="Войти" />
    </form>
  )
}
