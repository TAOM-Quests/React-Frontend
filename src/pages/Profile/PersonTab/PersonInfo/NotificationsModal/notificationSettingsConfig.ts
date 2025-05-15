export type NotificationChannel = 'email' | 'telegram'

export type NotificationRole = 'applicant' | 'teacher' | 'inspector'

export type NotificationSettings = Record<string, NotificationChannel[]>

export interface NotificationSetting {
  key: string
  label: string
}

export interface NotificationSettingsConfig {
  [role: string]: NotificationSetting[]
}

export const notificationSettingsConfig: NotificationSettingsConfig = {
  applicant: [
    { key: 'event_day', label: 'Напоминание о мероприятии за день' },
    { key: 'feedback', label: 'Напоминание об обратной связи' },
  ],
  teacher: [
    { key: 'event_declined', label: 'Напоминание об отклоненном мероприятии' },
  ],
  inspector: [
    { key: 'event_check', label: 'Напоминание о проверке мероприятия' },
  ],
}
