import { Modal } from '../../../../../components/UI/Modal/Modal'
import {
  NotificationChannel,
  NotificationRole,
  NotificationSettings,
  notificationSettingsConfig,
} from './notificationSettingsConfig'
import { useEffect, useState } from 'react'
import { Checkbox } from '../../../../../components/UI/Checkbox/Checkbox'
import './NotificationsModal.scss'

interface NotificationsModalProps {
  role: NotificationRole
  isOpen: boolean
  onClose: () => void
  onSave?: (settings: NotificationSettings) => void
  initialSettings?: NotificationSettings
}

export const NotificationsModal = ({
  role,
  isOpen,
  onSave,
  onClose,
  initialSettings = {},
}: NotificationsModalProps) => {
  const settingsList = notificationSettingsConfig[role] || []
  const [settings, setSettings] =
    useState<NotificationSettings>(initialSettings)

  useEffect(() => {
    setSettings(initialSettings)
  }, [initialSettings])

  const handleCheckbox = (key: string, channel: NotificationChannel) => {
    setSettings(prev => {
      const currentChannels = prev[key] || []
      const hasChannel = currentChannels.includes(channel)

      return {
        ...prev,
        [key]: hasChannel
          ? currentChannels.filter(ch => ch !== channel)
          : [...currentChannels, channel],
      }
    })
  }

  const handleSave = () => {
    onSave?.(settings)
    onClose()
  }

  if (!isOpen) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Настройки уведомлений"
      textButtonSave="Сохранить изменения"
      onSave={handleSave}
      isShowFooter
    >
      <div className="notifications-modal">
        {settingsList.map(setting => (
          <div key={setting.key} className="notifications-modal__setting">
            <span className="body_l_r">{setting.label}</span>
            <div className="notifications-modal__channels">
              <Checkbox
                isSelected={settings[setting.key]?.includes('email') || false}
                label="Email"
                onChange={() => handleCheckbox(setting.key, 'email')}
              />
              <Checkbox
                isSelected={
                  settings[setting.key]?.includes('telegram') || false
                }
                label="Telegram"
                onChange={() => handleCheckbox(setting.key, 'telegram')}
              />
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}
