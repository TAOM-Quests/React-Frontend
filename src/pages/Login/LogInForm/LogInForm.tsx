import React, { useState } from 'react'
// import Input, { InputProps } from '../../../components/Input/Input'
import SubmitButton from '../../../components/SubmitButton/SubmitButton'
import { users } from '../../../services/api/userModule/users/users'
// import InputPassword from '../../../components/InputPassword/InputPassword'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../../hooks/redux/reduxHooks'
import { setUser } from '../../../redux/auth/authSlice'
import Input, { InputProps } from '../../../components/UI/Input/Input'

export default function LogInForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const tryAuthUser = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const foundUser = await users.auth({ email, password })
      localStorage.setItem('token', foundUser.token)
      dispatch(setUser(foundUser))
      navigate('/')
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message)
      } else {
        setErrorMessage(e as string)
      }
    }
  }

  return (
    <form onSubmit={tryAuthUser}>
      <Input {...getEmailProps(email, e => setEmail(e.target.value))} />
      <Input
        {...getPasswordProps(password, e => setPassword(e.target.value))}
      />
      <ErrorMessage text={errorMessage} />
      <SubmitButton text="Войти" />
    </form>
  )
}

function getEmailProps(
  inputValue: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
): InputProps {
  return {
    inputValue,
    onChange,
    label: 'Email',
    className: 'email-input',
  }
}

function getPasswordProps(
  inputValue: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
): InputProps {
  return {
    inputValue,
    onChange,
    label: 'Пароль',
    className: 'password-input',
  }
}
