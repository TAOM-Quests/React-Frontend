import { UserProfile, UserProfileEmployee } from "../../../models/userProfile";
import EmployeeInfo from "./EmployeeInfo/EmployeeInfo";
import PersonInfo from "./PersonInfo/PersonInfo";

export default function PersonTab(profile: UserProfile | UserProfileEmployee) {
  const isEmployee = 'position' in profile

  return (
    <div>
      <PersonInfo {...profile}/>

      {isEmployee &&
        <EmployeeInfo {...profile}/>
      }
    </div>
  )
}