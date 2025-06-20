import { Modal } from '../../../../../components/UI/Modal/Modal'
import { useState } from 'react'
import { Checkbox } from '../../../../../components/UI/Checkbox/Checkbox'
import './NotificationsModal.scss'
import { UserNotificationsSettingsItem } from '../../../../../models/userNotificationsSettings'

interface NotificationsModalProps {
  isOpen: boolean
  onClose: (settings: UserNotificationsSettingsItem[]) => void
  notificationsSettings: UserNotificationsSettingsItem[]
}

export const NotificationsModal = ({
  isOpen,
  onClose,
  notificationsSettings,
}: NotificationsModalProps) => {
  const [settings, setSettings] = useState<UserNotificationsSettingsItem[]>(
    notificationsSettings,
  )

  const handleCheckbox = async (
    index: number,
    channel: 'email' | 'telegram',
    value: boolean,
  ) => {
    setSettings(prev => {
      prev[index][channel] = value
      return [...prev]
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose(settings)}
      title="Настройки уведомлений"
    >
      <div className="notifications-modal">
        {settings.map((setting, index) => (
          <div key={index} className="notifications-modal__setting">
            <span className="body_l_r">{setting.name}</span>
            <div className="notifications-modal__channels">
              <Checkbox
                isSelected={setting.email}
                label="Email"
                onChange={() => handleCheckbox(index, 'email', !setting.email)}
              />
              <Checkbox
                isSelected={setting.telegram}
                label="Telegram"
                onChange={() =>
                  handleCheckbox(index, 'telegram', !setting.telegram)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}
