import { useEffect, useRef, useState } from 'react'
import { NumberInput } from '../../../components/UI/NumberInput/NumberInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux/reduxHooks'
import { selectAuth, setUser } from '../../../redux/auth/authSlice'
import { users } from '../../../services/api/userModule/users/users'
import { Button } from '../../../components/UI/Button/Button'
import { useNavigate } from 'react-router'

/**
 * Для работы страницы подтверждения пароля
 * необходимо в localStorage сохранить email и пароль
 */

export const EmailConfirm = () => {
  const [code, setCode] = useState(0)
  const [time, setTime] = useState(1000 * 60)
  const [errorText, setErrorText] = useState('')

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

  const confirmEmail = async (): Promise<void> => {
    if (!email) throw new Error('Email not found')

    const isConfirmed = await users.confirmEmail({ email, code })

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

  return (
    <div>
      <NumberInput value={code} onChange={newCode => setCode(newCode ?? 0)} />
      {time === 0 ? (
        <Button onClick={sendCode} text="Отправить код повторно" />
      ) : (
        <span>Отправить код повторно можно через {time / 1000}</span>
      )}
      <Button onClick={confirmEmail} />
      {errorText && <span>{errorText}</span>}
    </div>
  )
}
