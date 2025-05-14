import { Icon } from '../../components/UI/Icon/Icon'
import './Header.scss'
import { logout, selectAuth } from '../../redux/auth/authSlice'
import { HeaderMenu } from './HeaderMenu/HeaderMenu'
import { Avatar } from '../../components/UI/Avatar/Avatar'
import { useNavigate } from 'react-router'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { useState } from 'react'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigate = useNavigate()
  const user = useAppSelector(selectAuth)

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

      {user ? (
        <div className="header__user" onClick={() => navigate('/profile')}>
          <span className="body_l_sb user-name-header">{user.name}</span>
          <Avatar src={user.image?.url} />
          <Icon icon="LOGOUT" colorIcon="primary" />
        </div>
      ) : (
        <Icon
          icon="LOGOUT"
          colorIcon="primary"
          onClick={() => {
            logout()
            navigate('/')
          }}
        />
      )}
      {isMobileMenuOpen && (
        <div
          className="header__overlay header__overlay--visible"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}
