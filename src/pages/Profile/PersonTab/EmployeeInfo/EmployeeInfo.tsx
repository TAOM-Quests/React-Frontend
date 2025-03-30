import { useState } from "react";
import { UserProfileEmployee } from "../../../../models/userProfile"
import { ProfileField } from "../interface/profileField";
import Input from "../../../../components/Input/Input";

export default function EmployeeInfo(employee: UserProfileEmployee) {
  const [position, setPosition] = useState(employee.position);
  const [department, setDepartment] = useState(employee.department);

  const employeeFields: ProfileField[] = [
    {name: 'Должность', value: position, onChange: (e) => setPosition(e.target.value)},
    {name: 'Отдел', value: department, onChange: (e) => setDepartment(e.target.value)}
  ]

  return (
    <div>
      {employeeFields.map((field) =>
        <Input
          className="employee-field"
          disabled
          label={field.name}
          value={field.value}
          onChange={field.onChange}
        />
      )}
    </div>
  )
}