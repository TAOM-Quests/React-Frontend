import React, { useState } from 'react'
import { users } from '../../../services/api/userModule/users/users'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../../hooks/redux/reduxHooks'
import { setUser } from '../../../redux/auth/authSlice'
import './SignInForm.scss'
import Input from '../../../components/UI/Input/Input'
import { Button } from '../../../components/UI/Button/Button'
import { validateEmail } from '../../../validation/validateEmail'
import { validatePassword } from '../../../validation/validatePassword'
import { validateRepeatPassword } from '../../../validation/validateRepeatPassword'

export default function SignInForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const emailValidator = validateEmail(email)
  const passwordValidator = validatePassword(password)
  const repeatPasswordValidator = validateRepeatPassword(
    password,
    repeatPassword,
  )

  const tryCreateUser = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitted(true)

    if (
      !emailValidator.isValid ||
      !passwordValidator.isValid ||
      !repeatPasswordValidator.isValid
    ) {
      return
    }

    try {
      const createdUser = await users.create({ email, password })
      localStorage.setItem('token', createdUser.token)
      dispatch(setUser(createdUser))
      navigate('/')
    } catch (e) {}
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
        errorText={isSubmitted ? emailValidator.error : ''}
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
      <Button type="submit" text="Зарегистрироваться" />
    </form>
  )
}
