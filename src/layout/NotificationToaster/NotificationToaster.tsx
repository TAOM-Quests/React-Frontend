import { Notification } from '../../models/notification'
import { toast, ToastContainer } from 'react-toastify'
import { ContainerBox } from '../../components/ContainerBox/ContainerBox'
import './NotificationToaster.scss'
import classNames from 'classnames'

const NOTIFICATIONS_WEB_SOCKET_URL = 'ws://localhost:8080/ws/notifications'

const CustomNotification = ({
  name,
  type = 'quests',
  imageUrl,
  description,
}: Notification) => (
  <ContainerBox
    className={classNames(
      'notification-content',
      `notification-content--${type}`,
    )}
  >
    <div className="notification-content__image">
      <img src={imageUrl} alt={name} />
    </div>
    <div style={{ flex: 1 }}>
      <div className="heading_6">{name}</div>
      <div className="body_l_m">{description}</div>
    </div>
  </ContainerBox>
)

export const NotificationToaster = () => {
  const socket = new WebSocket(NOTIFICATIONS_WEB_SOCKET_URL)

  socket.onmessage = event => {
    const notification = JSON.parse(event.data)
    toast(<CustomNotification {...notification} />)
  }

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  )
}
