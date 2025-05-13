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
  const userAchievementIds = [1, 3, 6]

  return (
    <div className="personTab">
      <PersonInfo
        profile={profile}
        updateProfile={updatePerson}
        isEmployee={isEmployee}
      />
      {isEmployee && <EmployeeInfo {...profile} />}
      {!isEmployee && (
        <AchievementsList
          allAchievements={allAchievements}
          userAchievementIds={userAchievementIds} //из профиля
        />
      )}
    </div>
  )
}
