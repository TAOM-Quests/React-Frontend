import { useEffect, useState } from 'react'
import { users } from '../../services/api/userModule/users/users'
import { selectAuth, setUser } from '../../redux/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux/reduxHooks'
import { UserProfile } from '../../models/userProfile'
import PersonTab from './PersonTab/PersonTab'
import { useNavigate } from 'react-router'
import EventsTab from './EventsTab/EventsTab'
import { Switcher } from '../../components/UI/Switcher/Switcher'
import './Profile.scss'
const TABS = ['Персональные данные', 'Мои мероприятия', 'Мои квесты']

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [tabIndex, setTabIndex] = useState(0)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectAuth)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!user) {
          throw Error('User not found')
        }

        setProfile(await users.getProfile({ id: user.id }))
      } catch (e) {
        console.log(e)
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
      }),
    )
    setProfile(updatedProfile)
  }

  const getActiveTab = () => {
    switch (tabIndex) {
      case 0:
        return <PersonTab profile={profile!} updatePerson={updateProfile} />
      case 1:
        return <EventsTab user={user!} />
    }
  }

  return (
    <div className="profile">
      <div className="profile--header">
        <h5 className="heading_5 profile--title">Личный кабинет</h5>
        <Switcher
          options={TABS}
          onChange={option => setTabIndex(TABS.indexOf(option))}
          activeOption={TABS[tabIndex]}
        />
      </div>

      {profile && getActiveTab()}
    </div>
  )
}
