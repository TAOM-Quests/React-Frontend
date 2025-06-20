import { useEffect, useMemo, useState } from 'react'
import { users } from '../../services/api/userModule/users/users'
import { selectAuth, setUser } from '../../redux/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/reduxHooks'
import { UserProfile } from '../../models/userProfile'
import PersonTab from './PersonTab/PersonTab'
import { useNavigate, useSearchParams } from 'react-router'
import EventsTab from './EventsTab/EventsTab'
import { Switcher } from '../../components/UI/Switcher/Switcher'
import './Profile.scss'
import QuestsTab from './QuestsTab/QuestsTab'
import AdminTab from './AdminTab/AdminTab'

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectAuth)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) {
          throw Error('User not found')
        }

        setProfile(await users.getProfile({ id: user.id }))
      } catch (e) {
        console.log(`[Profile] ${e}`)
        navigate('/login')
      }
    }

    fetchProfile()
  }, [])

  const updateProfile = (updatedProfile: UserProfile) => {
    dispatch(
      setUser({
        ...user!,
        email: updatedProfile.email,
        image: updatedProfile.image,
        name: `${updatedProfile.lastName ?? ''} ${updatedProfile.firstName ?? ''}`.trim(),
      }),
    )
    setProfile(updatedProfile)
  }

  const TABS = useMemo(() => {
    const baseTabs = ['Персональные данные', 'Мои мероприятия', 'Мои квесты']
    if (user?.isAdmin) {
      baseTabs.push('Панель управления')
    }
    return baseTabs
  }, [user?.isAdmin])

  const getTabIndex = () => Number(searchParams.get('tab'))

  const getActiveTab = () => {
    const tabIndex = getTabIndex()

    switch (tabIndex) {
      case 0:
        return <PersonTab profile={profile!} updatePerson={updateProfile} />
      case 1:
        return <EventsTab user={user!} />
      case 2:
        return <QuestsTab user={user!} />
      case 3:
        return <AdminTab />
    }
  }

  return (
    <div className="profile container_min_width">
      <div className="profile--header">
        <h5 className="heading_5 profile--title">Личный кабинет</h5>
        <Switcher
          options={TABS}
          onChange={option =>
            setSearchParams({ tab: `${TABS.indexOf(option)}` })
          }
          activeOption={TABS[getTabIndex()]}
        />
      </div>

      {profile && getActiveTab()}
    </div>
  )
}
