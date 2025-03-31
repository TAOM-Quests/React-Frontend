import { useState } from "react";
import Input from "../../../../components/Input/Input";
import { UserProfile } from "../../../../models/userProfile";
import { ProfileField } from "../interface/profileField";
import { users } from "../../../../services/api/userModule/users/users";

export default function PersonInfo(profile: UserProfile) {
  const [lastName, setLastName] = useState(profile.lastName);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [patronymic, setPatronymic] = useState(profile.patronymic);
  const [sex, setSex] = useState(profile.sex);
  const [birthDate, setBirthDate] = useState(profile.birthDate);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);

  const [changingMode, setChangingMode] = useState(false);

  const personFields: ProfileField[] = [
    {name: 'Фамилия', value: lastName, onChange: (e) => setLastName(e.target.value)},
    {name: 'Имя', value: firstName, onChange: (e) => setFirstName(e.target.value)},
    {name: 'Отчество', value: patronymic, onChange: (e) => setPatronymic(e.target.value)},
    {name: 'Пол', value: sex, onChange: (e) => setSex(e.target.value)},
    // {
    //   name: 'Дата рождения',
    //   value: birthDate
    //     ? new Date(birthDate).toDateString()
    //     : '',
    //     onChange: (e) => setBirthDate(new Date(e.target.value))
    // },
    {name: 'Телефон', value: phone, onChange: (e) => setPhone(e.target.value)},
    {name: 'Email', value: email, onChange: (e) => setEmail(e.target.value)}
  ]

  const toggleChangingMode = async () => {
    if (changingMode) {
      const updatedFields = await users.updateProfile({
        id: profile.id,
        email,
        firstName,
        lastName,
        patronymic,
        birthDate: birthDate.toISOString(),
        sex,
        phone
      })

      setLastName(updatedFields.lastName)
      setFirstName(updatedFields.firstName)
      setPatronymic(updatedFields.patronymic)
      setSex(updatedFields.sex)
      setBirthDate(new Date(updatedFields.birthDate))
      setPhone(updatedFields.phone)
      setEmail(updatedFields.email)
    }

    setChangingMode(!changingMode);
  }
  
  return (
    <div>
      <h1>{lastName} {firstName} {patronymic}</h1>
      <button
        className="change-inputs"
        onClick={toggleChangingMode}>{changingMode ? 'Сохранить' : 'Изменить'}
      </button>

      <div className='person-info'>
        {personFields.map(field => 
          <Input
            className="person-field"
            label={field.name}
            value={field.value}
            disabled={!changingMode}
            onChange={field.onChange}
          />
        )}
      </div>
    </div>
  )
}