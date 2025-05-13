// Notification.tsx
import { useEffect } from 'react'
import ToasterUi, { ToastType } from 'toaster-ui'
import './Notification.scss'

const toaster = new ToasterUi()

export interface NotificationProps {
  type?: ToastType
  title: string
  description: string
  imageUrl?: string
  duration?: number
}

export const Notification = ({
  type = 'default',
  title,
  description,
  imageUrl,
  duration = 3000,
}: NotificationProps) => {
  // Формируем HTML для уведомления
  const content = `
    <div class="notification-content">
      <div class="notification-content__image">${imageUrl ? `<img  src="${imageUrl}" alt="${title}"/">` : ''}</div>
      <div style="flex:1;">
        <div class="heading_6">${title}</div>
        <div class="body_l_m">${description}</div>
      </div>
    </div>
  `

  useEffect(() => {
    toaster.addToast(content, type, {
      duration,
      autoClose: true,
      allowHtml: true,
      styles: {
        minWidth: '320px',
        padding: '20px',
      },
    })
  }, [])

  return null
}
