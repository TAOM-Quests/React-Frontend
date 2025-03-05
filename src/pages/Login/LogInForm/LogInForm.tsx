import React from "react"
import Input, { InputProps } from "../../../components/Input/Input"
import SubmitButton, { SubmitButtonProps } from "../../../components/SubmitButton/SubmitButton"
import { users } from "../../../services/api/userModule/users/users"

export default function LogInForm() {
  const {
    loginProps,
    passwordProps,
    submitButtonProps
  } = getProps()

  const authUser = (event: React.FormEvent) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={submitButtonAction}>
      <Input {...loginProps}/>
      <Input {...passwordProps}/>
      <SubmitButton {...submitButtonProps}/>
    </form>
  )
}

function getProps() {
  const loginProps: InputProps = {
    label: "Login",
    className: "login-input"
  }

  const passwordProps: InputProps = {
    label: "Password",
    className: "password-input"
  }

  const submitButtonProps: SubmitButtonProps = {
    text: "Login"
  }

  return {
    loginProps,
    passwordProps,
    submitButtonProps
  }
}