import { UserProfileEmployee } from '../../../../models/userProfile'
import { ProfileField } from '../interface/profileField'
import Input from '../../../../components/Input/Input'

export default function EmployeeInfo(employee: UserProfileEmployee) {
  const employeeFields: ProfileField[] = [
    { name: 'Должность', value: employee.position },
    { name: 'Отдел', value: employee.department },
  ]

  return (
    <div>
      {employeeFields.map(field => (
        <Input
          className="employee-field"
          disabled
          label={field.name}
          value={field.value}
        />
      ))}
    </div>
  )
}
