import { useState } from 'react'
import { Input } from '../../../../components/UI/Input/Input'
import { UserProfile } from '../../../../models/userProfile'
import { ProfileField } from '../interface/profileField'
import { users } from '../../../../services/api/userModule/users/users'
import { Icon } from '../../../../components/UI/Icon/Icon'
import { Button } from '../../../../components/UI/Button/Button'
import './PersonInfo.scss'
import { ContainerBox } from '../../../../components/ContainerBox/ContainerBox'
import { DateInput } from '../../../../components/UI/DateInput/DateInput'
import {
  Dropdown,
  DropdownItemType,
} from '../../../../components/UI/Dropdown/Dropdown'
import { MaskedInput } from '../../../../components/MaskedInput/MaskedInput'
import { validateName } from '../../../../validation/validateName'
import { validateDateOfBirth } from '../../../../validation/validateDateOfBirth'
import { validateEmail } from '../../../../validation/validateEmail'
import { validatePhone } from '../../../../validation/validatePhone'
import { ImageContainer } from '../../../../components/UI/ImageContainer/ImageContainer'
import { ContextMenu } from '../../../../components/ContextMenu/ContextMenu'
import { OptionProps } from '../../../../components/UI/Option/Option'
import { NotificationsModal } from './NotificationsModal/NotificationsModal'
import { NotificationSettings } from './NotificationsModal/notificationSettingsConfig'
import { ChangePasswordModal } from './ChangePasswordModal/ChangePasswordModal'

export interface PersonInfoProps {
  profile: UserProfile
  updateProfile: (profile: UserProfile) => void
  isEmployee?: boolean
}

export default function PersonInfo({
  profile,
  updateProfile,
  isEmployee,
}: PersonInfoProps) {
  const [image, setImage] = useState(profile.image)
  const [lastName, setLastName] = useState(profile.lastName)
  const [firstName, setFirstName] = useState(profile.firstName)
  const [patronymic, setPatronymic] = useState(profile.patronymic)
  const [sex, setSex] = useState(profile.sex)
  const [birthDate, setBirthDate] = useState(profile.birthDate)
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber)
  const [email, setEmail] = useState(profile.email)

  const [changingMode, setChangingMode] = useState(false)
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const [isNotificationsModalOpen, setNotificationsModalOpen] = useState(false)
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({})

  const [isChangePasswordModalOpen, setChangePasswordModalOpen] =
    useState(false)

  const role = isEmployee ? 'teacher' : 'applicant'

  const lastNameValidator = validateName(lastName, false)
  const firstNameValidator = validateName(firstName, false)
  const patronymicValidator = validateName(patronymic, false)
  const birthDateValidator = validateDateOfBirth(birthDate, false)
  const emailValidator = validateEmail(email, false)
  const phoneNumberValidator = validatePhone(phoneNumber, false)

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
      name: 'Почта',
      placeholder: 'Введите почту',
      value: email,
      onChange: e => setEmail(e.target.value),
      error: emailValidator.error,
    },
  ]

  const settingProfileOptions: OptionProps[] = [
    {
      text: 'Настройки уведомлений',
      onSelect: () => setNotificationsModalOpen(true),
    },
    {
      text: 'Сменить пароль',
      onSelect: () => setChangePasswordModalOpen(true),
    },
  ]

  const handleSaveNotificationSettings = (settings: NotificationSettings) => {
    setNotificationSettings(settings)
    // Здесь нужно добавить сохранение на сервер
  }

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

  const toggleChangingMode = async () => {
    if (changingMode) {
      const updatedFields = await users.updateProfile({
        id: profile.id,
        sex,
        email,
        lastName,
        firstName,
        patronymic,
        phoneNumber,
        imageId: image?.id ?? null,
        birthDate: birthDate instanceof Date ? birthDate.toISOString() : null,
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

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }

  const handlePasswordChangeSuccess = () => {
    alert('Пароль успешно изменён')
    // Можно добавить дополнительную логику, например, разлогинить пользователя
  }

  return (
    <div className="personInfo">
      <div className="personInfo--header">
        <div className="personInfo--header__menu">
          <ContextMenu
            isVisible={openMenu}
            onToggle={toggleMenu}
            options={settingProfileOptions}
          >
            <Icon icon="MENU_DOTS" />
          </ContextMenu>
        </div>

        <Button
          text={changingMode ? 'Сохранить' : 'Изменить профиль'}
          colorType={changingMode ? 'primary' : 'secondary'}
          onClick={() => {
            if (
              birthDateValidator.isValid &&
              firstNameValidator.isValid &&
              lastNameValidator.isValid &&
              patronymicValidator.isValid &&
              emailValidator.isValid &&
              phoneNumberValidator.isValid
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
            <ImageContainer
              className="personInfo--info__imageContainer"
              disabled={!changingMode}
              selectedImages={profile.image ? [profile.image] : []}
              onSelectImages={selectedImages => {
                console.log(selectedImages)
                setImage(selectedImages[0])
              }}
            />
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
              className="personInfo--field"
              type="text"
              label={field.name}
              placeholder={field.placeholder}
              value={field.value}
              disabled={!changingMode}
              onChange={e => field.onChange?.(e)}
              errorText={field.error}
            />
          ))}
          <MaskedInput
            mask="+7 (999) 999-99-99"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            label="Телефон"
            placeholder="+7 (___) ___-__-__"
            disabled={!changingMode}
            errorText={phoneNumberValidator.error}
          />
        </ContainerBox>
      </div>

      {isNotificationsModalOpen && (
        <NotificationsModal
          isOpen={isNotificationsModalOpen}
          onClose={() => setNotificationsModalOpen(false)}
          role={role}
          initialSettings={notificationSettings}
          onSave={handleSaveNotificationSettings}
        />
      )}

      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isChangePasswordModalOpen}
          onClose={() => setChangePasswordModalOpen(false)}
          onSuccess={handlePasswordChangeSuccess}
        />
      )}
    </div>
  )
}
