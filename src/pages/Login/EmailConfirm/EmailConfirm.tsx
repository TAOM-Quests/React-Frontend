import { FormEvent, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/reduxHooks'
import { selectAuth, setUser } from '../../../redux/auth/authSlice'
import { users } from '../../../services/api/userModule/users/users'
import { Button } from '../../../components/UI/Button/Button'
import { useNavigate } from 'react-router'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import './EmailConfirm.scss'
/**
 * Для работы страницы подтверждения пароля
 * необходимо в localStorage сохранить email и пароль
 */

export const EmailConfirm = () => {
  const [time, setTime] = useState(1000 * 60)
  const [errorText, setErrorText] = useState('')
  const [codeDigits, setCodeDigits] = useState<string[]>(['', '', '', ''])
  const isCodeComplete = () => codeDigits.every(digit => digit !== '')

  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isFirstRenderRef = useRef(true)
  const user = useAppSelector(selectAuth)

  const { email, password } = JSON.parse(localStorage.getItem('user') ?? '')

  useEffect(() => {
    if (isFirstRenderRef.current) {
      try {
        sendCode()
      } catch (e) {
        console.log(`[EmailConfirm] ${e}`)
      }
      isFirstRenderRef.current = false
    }
  })

  useEffect(() => {
    if (time === 0) return

    setTimeout(() => setTime(prev => prev - 1000), 1000)
  }, [time])

  const sendCode = async () => {
    if (!email) throw new Error('Email not found')

    setTime(1000 * 60)
    await users.sendEmailConfirmCode({ email })
  }

  const confirmEmail = async (e: FormEvent): Promise<void> => {
    e.preventDefault()

    if (!email) throw new Error('Email not found')

    const codeStr = codeDigits.join('')
    if (codeStr.length < 4) {
      setErrorText('Введите полный 4-значный код')
      return
    }
    const codeNum = Number(codeStr)

    const isConfirmed = await users.confirmEmail({ email, code: codeNum })

    if (isConfirmed) {
      if (user?.id) {
        await users.updateProfile({ id: user.id, email })
        dispatch(setUser({ ...user, email }))
      } else {
        const createdUser = await users.create({ email, password })
        localStorage.setItem('token', createdUser.token)
        dispatch(setUser(createdUser))
      }

      localStorage.removeItem('user')
      navigate('/')
    } else {
      setErrorText('Неверный код')
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setErrorText('')

    const val = e.target.value

    if (!/^\d?$/.test(val)) return

    const newCodeDigits = [...codeDigits]
    newCodeDigits[index] = val
    setCodeDigits(newCodeDigits)

    if (val && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && codeDigits[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === 'Enter') {
      if (isCodeComplete()) {
        e.preventDefault()
        confirmEmail(e)
      }
    }
  }

  return (
    <div className="container_min_width email_confirm">
      <ContainerBox className="email_confirm__container">
        <form onSubmit={confirmEmail} className="email_confirm__form">
          <div className="email_confirm__heading">
            <h4 className="heading_4">Введите код из сообщения</h4>
            <p className="body_m_r">
              На почту {email} отправлен код подтверждения
            </p>
          </div>

          <div className="email_confirm__code">
            {/* <label className="body_s_sb email_confirm__code--label">
              Код из сообщения
            </label> */}

            <div className="email_confirm__code--inputs">
              {codeDigits.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(e, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  ref={el => {
                    inputRefs.current[index] = el
                  }}
                  className="email_confirm__code--input"
                  inputMode="numeric"
                  pattern="\d*"
                  autoComplete="one-time-code"
                />
              ))}
            </div>
            {errorText && (
              <p className="body_s_m email_confirm__error">{errorText}</p>
            )}
          </div>

          {time === 0 ? (
            <div>
              <Button
                size="small"
                colorType="secondary"
                onClick={sendCode}
                text="Отправить код повторно"
              />
            </div>
          ) : (
            <p className="body_m_r">
              Отправить код повторно можно через {time / 1000}
            </p>
          )}
          <Button type="submit" text="Подтвердить" />
        </form>
      </ContainerBox>
    </div>
  )
}
