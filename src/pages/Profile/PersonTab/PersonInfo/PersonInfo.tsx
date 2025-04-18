import { useState } from 'react'
import { Input } from '../../../../components/UI/Input/Input'
import { UserProfile } from '../../../../models/userProfile'
import { ProfileField } from '../interface/profileField'
import { users } from '../../../../services/api/userModule/users/users'
import { Icon } from '../../../../components/UI/Icon/Icon'
import { Button } from '../../../../components/UI/Button/Button'
import './PersonInfo.scss'
import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { Avatar } from '../../../../components/UI/Avatar/Avatar'
import { DateInput } from '../../../../components/UI/DateInput/DateInput'

export interface PersonInfoProps {
  profile: UserProfile
  updateProfile: (profile: UserProfile) => void
}

export default function PersonInfo({
  profile,
  updateProfile,
}: PersonInfoProps) {
  const [lastName, setLastName] = useState(profile.lastName)
  const [firstName, setFirstName] = useState(profile.firstName)
  const [patronymic, setPatronymic] = useState(profile.patronymic)
  const [sex, setSex] = useState(profile.sex)
  const [birthDate, setBirthDate] = useState(profile.birthDate)
  // const [birthDate, setBirthDate] = useState<Date | null>(
  //   profile.birthDate ? new Date(profile.birthDate) : null,
  // )
  const [phone, setPhone] = useState(profile.phone)
  const [email, setEmail] = useState(profile.email)

  const handleDateSelect = (date: Date | null) => {
    setBirthDate(date)
  }

  const [changingMode, setChangingMode] = useState(false)

  const personFieldsNames: ProfileField[] = [
    {
      name: 'Фамилия',
      value: lastName,
      onChange: e => setLastName(e.target.value),
    },
    {
      name: 'Имя',
      value: firstName,
      onChange: e => setFirstName(e.target.value),
    },
    {
      name: 'Отчество',
      value: patronymic,
      onChange: e => setPatronymic(e.target.value),
    },
  ]

  const personFieldsInfo: ProfileField[] = [
    { name: 'Пол', value: sex, onChange: e => setSex(e.target.value) },
  ]

  const personFieldsContacts: ProfileField[] = [
    { name: 'Телефон', value: phone, onChange: e => setPhone(e.target.value) },
    { name: 'Email', value: email, onChange: e => setEmail(e.target.value) },
  ]

  const toggleChangingMode = async () => {
    if (changingMode) {
      const updatedFields = await users.updateProfile({
        id: profile.id,
        email,
        firstName,
        lastName,
        patronymic,
        birthDate: birthDate?.toISOString(),
        sex,
        phone,
      })

      updateProfile({
        ...profile,
        ...updatedFields,
        birthDate: updatedFields.birthDate
          ? new Date(updatedFields.birthDate)
          : null,
      })
    }

    setChangingMode(!changingMode)
  }

  return (
    <div className="personInfo">
      {/* <h1>
        {lastName} {firstName} {patronymic}
      </h1> */}
      <div className="personInfo--header">
        <Icon icon="MENU_DOTS" />
        <Button
          text={changingMode ? 'Сохранить' : 'Изменить профиль'}
          colorType={changingMode ? 'primary' : 'secondary'}
          onClick={toggleChangingMode}
          iconBefore={!changingMode ? 'EDIT' : undefined}
        />
      </div>
      <ContainerBox>
        <div className="personInfo--info">
          <Avatar size="extraLarge" isRound={false} />

          <div className="personInfo--personFields">
            <div className="personInfo--personFieldsNames">
              {personFieldsNames.map(field => (
                <Input
                  className="personInfo--field"
                  label={field.name}
                  value={field.value}
                  disabled={!changingMode}
                  onChange={e => field.onChange?.(e)}
                />
              ))}
            </div>
            <div className="personInfo--personFieldsInfo">
              {personFieldsInfo.map(field => (
                <Input
                  className="personInfo--field"
                  label={field.name}
                  value={field.value}
                  disabled={!changingMode}
                  onChange={e => field.onChange?.(e)}
                />
              ))}
              <DateInput
                label="Дата рождения"
                value={birthDate ? new Date(birthDate).toDateString() : ''}
                onDateSelect={handleDateSelect}
              />

              {/* //   name: 'Дата рождения',
    //   value: birthDate
    //     ? new Date(birthDate).toDateString()
    //     : '',
    //     onChange: (e) => setBirthDate(new Date(e.target.value))
    // */}
            </div>
          </div>
        </div>
      </ContainerBox>
    </div>
  )
}
