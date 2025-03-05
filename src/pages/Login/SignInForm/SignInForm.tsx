import React, { useState } from "react"
import Input, { InputProps } from "../../../components/Input/Input"
import SubmitButton from "../../../components/SubmitButton/SubmitButton"
import InputPassword from "../../../components/InputPassword/InputPassword"
import { users } from "../../../services/api/userModule/users/users"
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage"

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const tryCreateUser = async (event: React.FormEvent) => {
    event.preventDefault()

    if (password !== repeatPassword) {
      setErrorMessage('Пароли не совпадают');
      return
    }

    try {
      const createdUser = await users.create({email, password})
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage(e as string);
      }
    }
  }

  return (
    <form onSubmit={tryCreateUser}>
      <Input {...getEmailProps(email, (e => setEmail(e.target.value)))}/>
      <InputPassword {...getPasswordProps(password, (e => setPassword(e.target.value)))}/>
      <InputPassword {...getRepeatPasswordProps(repeatPassword, (e => setRepeatPassword(e.target.value)))}/>
      <ErrorMessage text={errorMessage}/>
      <SubmitButton text="Зарегистрироваться"/>
    </form>
  )
}

function getEmailProps(
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ): InputProps {
  return {
    value,
    onChange,
    label: "Email",
    className: "email-input"
  }
}

function getPasswordProps(
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ): InputProps {
  return {
    value,
    onChange,
    label: "Пароль",
    className: "password-input"
  }
}

function getRepeatPasswordProps(
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ): InputProps {
  return {
    value,
    onChange,
    label: "Повтор пароля",
    className: "repeat-password-input"
  }
}