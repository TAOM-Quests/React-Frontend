import { useState } from 'react'
import LogInForm from './LogInForm/LogInForm'
import SignInForm from './SignInForm/SignInForm'
import { Button } from '../../components/UI/Button/Button'

export default function Login() {
  const [isLogInForm, setIsLogInForm] = useState(true)

  return (
    <>
      {isLogInForm ? <LogInForm /> : <SignInForm />}
      <Button
        text={isLogInForm ? 'Зарегистрироваться' : 'Войти'}
        onClick={() => setIsLogInForm(!isLogInForm)}
      />
    </>
  )
}
