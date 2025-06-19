import { useEffect, useState } from 'react'
import LogInForm from './LogInForm/LogInForm'
import SignInForm from './SignInForm/SignInForm'
import './Login.scss'
import { serverFiles } from '../../services/api/commonModule/serverFiles/serverFiles'

const LOGO_IMAGE_ID = 14
const LOGIN_IMAGE_ID = 15

export default function Login() {
  const [isLogInForm, setIsLogInForm] = useState(true)
  const [logoImageUrl, setLogoImageUrl] = useState('')
  const [loginImageUrl, setLoginImageUrl] = useState('')

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const logoImage = await serverFiles.getFile(LOGO_IMAGE_ID)
        const loginImage = await serverFiles.getFile(LOGIN_IMAGE_ID)
        setLogoImageUrl(logoImage.url)
        setLoginImageUrl(loginImage.url)
      } catch (e) {
        console.log(`[Login] ${e}`)
      }
    }

    fetchImages()
  })

  return (
    <div className="container_min_width login_page">
      <div className="login_page__left">
        <div className="login_page__logo">
          <img
            src={logoImageUrl}
            alt="Логотип Тольяттинской академии управления"
          />
        </div>
        <div className="login_page__taom_login">
          <img
            src={loginImageUrl}
            alt="Баннер Тольяттинской академии управления"
          />
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
