import { UserProfile, UserProfileEmployee } from '../../../models/userProfile'
import { AchievementsList } from '../AchievementsList/AchievementsList'
import EmployeeInfo from './EmployeeInfo/EmployeeInfo'
import PersonInfo from './PersonInfo/PersonInfo'
import './PersonTab.scss'

interface PersonTabProps {
  profile: UserProfile | UserProfileEmployee
  updatePerson: (profile: UserProfile) => void
}

export default function PersonTab({ profile, updatePerson }: PersonTabProps) {
  const isEmployee = 'position' in profile

  return (
    <div className="personTab">
      <PersonInfo
        profile={profile}
        isEmployee={isEmployee}
        updateProfile={updatePerson}
      />
      {isEmployee && <EmployeeInfo {...(profile as UserProfileEmployee)} />}
      {!isEmployee && <AchievementsList achievements={profile.achievements} />}
    </div>
  )
}
