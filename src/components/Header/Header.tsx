import { Icon } from '../UI/Icon/Icon'
import './Header.scss'
import { selectAuth } from '../../redux/auth/authSlice'

import { HeaderMenu } from './HeaderMenu/HeaderMenu'
import { Avatar } from '../UI/Avatar/Avatar'
import { UserProfile } from '../../models/userProfile'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { users } from '../../services/api/userModule/users/users'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { OptionAvatar } from '../User/OptionAvatar/OptionAvatar'

export const Header = () => {
  const [userInfo, setUserInfo] = useState<UserProfile | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) {
          throw Error('User not found')
        }

        setUserInfo(await users.getProfile({ id: user.id }))
      } catch (e) {
        console.log(e)
        navigate('/login')
      }
    }

    fetchProfile()
  }, [])

  const handleNavigate = (path: string) => {
    setIsMobileMenuOpen(false)
    navigate(path)
  }

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">
          <Icon
            icon="TAOM"
            size="extraLarge"
            onClick={() => handleNavigate('/')}
            colorIcon="primary"
          />
        </div>
        <button
          className={`header__burger ${isMobileMenuOpen ? 'header__burger--open' : ''}`}
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}
      >
        <HeaderMenu onNavigate={handleNavigate} />
      </nav>

      <div className="header__user" onClick={() => navigate('/profile')}>
        <span className="body_l_sb">
          {userInfo?.firstName} {userInfo?.lastName}
        </span>
        <Avatar />
        <Icon icon="LOGOUT" colorIcon="primary" />
      </div>
      {isMobileMenuOpen && (
        <div
          className="header__overlay header__overlay--visible"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}
