import { UserProfileEmployee } from '../../../../models/userProfile'
import { ProfileField } from '../interface/profileField'
import Input from '../../../../components/UI/Input/Input'
import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'

export default function EmployeeInfo(employee: UserProfileEmployee) {
  const employeeFields: ProfileField[] = [
    { name: 'Должность', value: employee.position.name },
    { name: 'Отдел', value: employee.department.name },
  ]

  return (
    <div className="employeeInfo">
      <ContainerBox className="employeeInfo_containerBoxs--right">
        <h6 className="heading_6">Контактные данные</h6>
        {employeeFields.map(field => (
          <Input
            key={field.name}
            disabled={true}
            label={field.name}
            value={field.value}
          />
        ))}
      </ContainerBox>
    </div>
  )
}
