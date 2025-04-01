import { useEffect, useState } from "react";
import TabButton from "../../components/TabButton/TabButton";
import { users } from "../../services/api/userModule/users/users";
import { selectAuth, setUser } from "../../redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux/reduxHooks";
import { UserProfile } from "../../models/userProfile";
import PersonTab from "./PersonTab/PersonTab";
import { useNavigate } from "react-router";

const TABS = [
  'Персональные данные',
  'Мои мероприятия',
  'Мои квесты'
]

export default function Profile() {
  const [profile, setProfile]: [UserProfile | null, any] = useState(null)
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
      }
      catch (e) {
        console.log(e)
        navigate('/login')
      }
    }

    fetchProfile()
  }, [])

  const updateProfile = (updatedProfile: UserProfile) => {
    dispatch(setUser({
      ...user!,
      email: updatedProfile.email
    }))
    setProfile(updatedProfile)
  }

  const getActiveTab = () => {
    if (tabIndex === 0) return <PersonTab profile={profile!} updatePerson={updateProfile}/>
  };

  return (
    <div>
      {TABS.map((tab, index) => (
        <TabButton text={tab} isActive={tabIndex === index} onClick={() => setTabIndex(index)}/>
      ))}
      {profile &&
        getActiveTab()}
    </div>
  )
}