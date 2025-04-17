import { UserProfile, UserProfileEmployee } from "../../../models/userProfile";
import EmployeeInfo from "./EmployeeInfo/EmployeeInfo";
import PersonInfo from "./PersonInfo/PersonInfo";

interface PersonTabProps {
  profile: UserProfile | UserProfileEmployee
  updatePerson: (profile: UserProfile) => void
}

export default function PersonTab({
  profile,
  updatePerson
}: PersonTabProps) {
  const isEmployee = 'position' in profile

  return (
    <div>
      <PersonInfo
        profile={profile}
        updateProfile={updatePerson}
      />

      {isEmployee &&
        <EmployeeInfo {...profile}/>
      }
    </div>
  )
}