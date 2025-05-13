import { useState } from 'react'
import { Notification } from '../../models/notification'

const NOTIFICATIONS_WEB_SOCKET_URL = 'ws://localhost:8080/ws/notifications'

export const NotificationToaster = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const socket = new WebSocket(NOTIFICATIONS_WEB_SOCKET_URL)

  socket.onmessage = event => {
    const notification = JSON.parse(event.data)
    setNotifications(prevNotifications => [...prevNotifications, notification])
  }

  return (
    <div>
      {notifications.map(notification => (
        <div className="notification-content">
          <div className="notification-content__image">
            <img src={notification.imageUrl} alt={notification.name} />
          </div>
          <div className="flex:1;">
            <div className="heading_6">${notification.name}</div>
            <div className="body_l_m">${notification.description}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
