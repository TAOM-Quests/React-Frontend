import { useState } from 'react'
import LogInForm from './LogInForm/LogInForm'
import SignInForm from './SignInForm/SignInForm'
import Logo from '../../assets/images/logo.svg'
import TaomLogin from '../../assets/images/taomLogin.svg'
import './Login.scss'

export default function Login() {
  const [isLogInForm, setIsLogInForm] = useState(true)

  return (
    <div className="login_page">
      <div className="login_page__left">
        <div className="login_page__logo">
          <img src={Logo} alt="Логотип Тольяттинской академии управления" />
        </div>
        <div className="login_page__taom_login">
          <img src={TaomLogin} alt="Баннер Тольяттинской академии управления" />
        </div>
      </div>
      <div className="login_page__right">
        {isLogInForm ? <LogInForm /> : <SignInForm />}
        <a
          className="body_m_r login_page__link"
          onClick={() => setIsLogInForm(!isLogInForm)}
        >
          {isLogInForm ? 'Зарегистрироваться' : 'Войти'}
        </a>
      </div>
    </div>
  )
}
