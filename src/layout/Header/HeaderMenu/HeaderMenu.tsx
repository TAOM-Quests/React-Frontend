import { useState } from 'react'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../redux/auth/authSlice'
import { NavLink, useNavigate } from 'react-router'
import { ContextMenu } from '../../../components/ContextMenu/ContextMenu'
import './HeaderMenu.scss'
import { Icon } from '../../../components/UI/Icon/Icon'

interface MenuItem {
  id: number
  label: string
  path?: string
  submenu?: MenuItem[]
  onlyEmployee?: boolean
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    label: 'Квесты',
    submenu: [
      {
        id: 11,
        label: 'Кафедра прикладной информатики и высшей математики',
        path: '/quest/1',
      },
      { id: 12, label: 'Кафедра связей с общественностью', path: '/quest/2' },
      { id: 13, label: 'Кафедра экономики и финансов', path: '/quest/3' },
      { id: 14, label: 'Кафедра управления', path: '/quest/4' },
      { id: 15, label: 'Кафедра дизайна', path: '/quest/5' },
    ],
  },
  {
    id: 2,
    label: 'Игры',
    submenu: [
      {
        id: 21,
        label: 'Кафедра прикладной информатики и высшей математики',
        path: '/games',
      },
      { id: 22, label: 'Кафедра связей с общественностью', path: '/games' },
      { id: 23, label: 'Кафедра экономики и финансов', path: '/games' },
      { id: 24, label: 'Кафедра управления', path: '/games' },
      { id: 25, label: 'Кафедра дизайна', path: '/games' },
    ],
  },
  { id: 3, label: 'Лидеры', path: '/leaders' },
  { id: 4, label: 'Календарь', path: '/event/calendar' },
  {
    id: 5,
    label: 'Конструктор квестов',
    path: '/quest/create',
    onlyEmployee: true,
  },
]

interface HeaderMenuProps {
  onNavigate?: (path: string) => void
}

export const HeaderMenu = ({ onNavigate }: HeaderMenuProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)

  const user = useAppSelector(selectAuth)
  const navigate = useNavigate()

  const handleToggleMenu = (id: number) => {
    setOpenMenuId(prev => (prev === id ? null : id))
  }

  return (
    // <nav className="header__nav">
    <ul className="header__nav-list">
      {menuItems
        .filter(item => !item.onlyEmployee || (user && user.isEmployee))
        .map(item => {
          if (item.submenu) {
            // Для пунктов с подменю используем ContextMenu
            const options = item.submenu.map(sub => ({
              id: sub.id,
              text: sub.label,
              onSelect: () => {
                setSelectedId(sub.id)
                setOpenMenuId(null)
                if (sub.path) {
                  onNavigate ? onNavigate(sub.path) : navigate(sub.path)
                }
              },
            }))

            return (
              <li key={item.id} className="header__nav-item">
                <ContextMenu
                  options={options}
                  selectedId={selectedId}
                  isVisible={openMenuId === item.id}
                  onToggle={() => handleToggleMenu(item.id)}
                >
                  <span className="body_l_sb  header__nav-link     header__nav-link-menu">
                    {item.label} <Icon icon="ANGLE_DOWN" colorIcon="primary" />
                  </span>
                </ContextMenu>
              </li>
            )
          } else {
            return (
              <li key={item.id} className="header__nav-item">
                <NavLink
                  to={item.path!}
                  className={({ isActive }) =>
                    isActive
                      ? 'body_l_sb header__nav-link header__nav-link--active'
                      : 'body_l_sb header__nav-link'
                  }
                  onClick={() => {
                    setSelectedId(null)
                    if (onNavigate && item.path) onNavigate(item.path)
                  }}
                >
                  {item.label}
                </NavLink>
              </li>
            )
          }
        })}
    </ul>
    // </nav>
  )
}
