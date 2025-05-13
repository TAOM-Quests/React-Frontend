import { UserProfile, UserProfileEmployee } from '../../../models/userProfile'
import {
  AchievementsList,
  allAchievements,
} from '../AchievementsList/AchievementsList'
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
        updateProfile={updatePerson}
        isEmployee={isEmployee}
      />
      {isEmployee && <EmployeeInfo {...profile} />}
      {!isEmployee && <AchievementsList achievements={allAchievements} />}
    </div>
  )
}
