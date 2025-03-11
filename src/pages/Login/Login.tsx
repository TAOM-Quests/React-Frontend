import { useState } from "react";
import LogInForm from "./LogInForm/LogInForm";
import SignInForm from "./SignInForm/SignInForm";

export default function LoginPage() {
  const [isLogInForm, setIsLogInForm] = useState(true);

  return (
    <>
      {isLogInForm
        ? <LogInForm />
        : <SignInForm />
      }
      <button onClick={() => setIsLogInForm(!isLogInForm)}>
        {isLogInForm
          ? 'Зарегистрироваться'
          : 'Войти'
        }
      </button>
    </>
  )
}