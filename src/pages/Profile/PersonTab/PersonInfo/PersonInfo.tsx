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
import {
  Dropdown,
  DropdownItemType,
} from '../../../../components/UI/Dropdown/Dropdown'
import {
  validateDateOfBirth,
  validateName,
  validatePhone,
} from '../../../../validation/validators'
import moment from 'moment'
import { useMask } from '@react-input/mask'

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
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber)
  const [email, setEmail] = useState(profile.email)

  const inputNumberRef = useMask({
    mask: '+0 (___) ___-__-__',
    replacement: { _: /\d/ },
  })

  const handleDateSelect = (date: Date | null) => {
    setBirthDate(date)
  }

  const handleChangeSex = (
    selectedItem: DropdownItemType | DropdownItemType[] | null,
  ) => {
    if (selectedItem !== null && !Array.isArray(selectedItem)) {
      setSex(selectedItem.text)
    } else {
      setSex('')
    }
  }

  const [changingMode, setChangingMode] = useState(false)

  const lastNameValidator = validateName(lastName, false)
  const firstNameValidator = validateName(firstName, false)
  const patronymicValidator = validateName(patronymic, false)
  const birthDateValidator = validateDateOfBirth(birthDate, false)
  const phoneValidator = validatePhone(phoneNumber, false)

  const personFieldsNames: ProfileField[] = [
    {
      name: 'Фамилия',
      placeholder: 'Введите фамилию',
      value: lastName,
      onChange: e => setLastName(e.target.value),
      error: lastNameValidator.error,
    },
    {
      name: 'Имя',
      placeholder: 'Введите имя',
      value: firstName,
      onChange: e => setFirstName(e.target.value),
      error: firstNameValidator.error,
    },
    {
      name: 'Отчество',
      placeholder: 'Введите отчество',
      value: patronymic,
      onChange: e => setPatronymic(e.target.value),
      error: patronymicValidator.error,
    },
  ]

  const sexItems: DropdownItemType[] = [
    {
      id: 0,
      text: 'Мужской',
    },
    {
      id: 1,
      text: 'Женский',
    },
  ]

  const personFieldsContacts: ProfileField[] = [
    {
      name: 'Телефон',
      placeholder: 'Введите телефон',
      value: phoneNumber,
      onChange: e => setPhoneNumber(e.target.value),
      // error: phoneValidator.error,
    },
    {
      name: 'Почта',
      placeholder: 'Введите почту',
      value: email,
      onChange: e => setEmail(e.target.value),
    },
  ]

  const toggleChangingMode = async () => {
    if (changingMode) {
      const updatedFields = await users.updateProfile({
        id: profile.id,
        email,
        firstName,
        lastName,
        patronymic,
        birthDate: birthDate instanceof Date ? birthDate.toISOString() : null,
        sex,
        phoneNumber,
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
          onClick={() => {
            if (
              birthDateValidator.isValid &&
              firstNameValidator.isValid &&
              lastNameValidator.isValid &&
              patronymicValidator.isValid
            ) {
              toggleChangingMode()
            }
          }}
          iconBefore={!changingMode ? 'EDIT' : undefined}
        />
      </div>
      <div className="personInfo_containerBoxs">
        <ContainerBox>
          <div className="personInfo--info">
            <Avatar size="extraLarge" isRound={false} />
            <div className="personInfo--personFields">
              <div className="personInfo--personFieldsNames">
                {personFieldsNames.map(field => (
                  <Input
                    key={field.name}
                    className="personInfo--field"
                    label={field.name}
                    placeholder={field.placeholder}
                    value={field.value}
                    disabled={!changingMode}
                    onChange={e => field.onChange?.(e)}
                    errorText={field.error}
                  />
                ))}
              </div>
              <div className="personInfo--personFieldsInfo">
                <Dropdown
                  items={sexItems}
                  value={sex}
                  label="Пол"
                  placeholder="Выберите вариант"
                  disabled={!changingMode}
                  onChangeDropdown={handleChangeSex}
                />
                <DateInput
                  label="Дата рождения"
                  placeholder="Введите дату рождения"
                  value={birthDate}
                  // value={
                  //   birthDate ? new Date(birthDate).toLocaleDateString() : ''
                  // }
                  // value={birthDate ? birthDate.toLocaleDateString('ru-RU') : ''}
                  disabled={!changingMode}
                  onDateSelect={handleDateSelect}
                  errorText={birthDateValidator.error}
                />
              </div>
            </div>
          </div>
        </ContainerBox>
        <ContainerBox className="personInfo_containerBoxs--right">
          <h6 className="heading_6">Контактные данные</h6>
          {personFieldsContacts.map(field => (
            <Input
              key={field.name}
              // className="personInfo--field"
              type="text"
              label={field.name}
              placeholder={field.placeholder}
              value={field.value}
              disabled={!changingMode}
              onChange={e => field.onChange?.(e)}
              // errorText={field.error}
            />
          ))}
        </ContainerBox>
      </div>
    </div>
  )
}
