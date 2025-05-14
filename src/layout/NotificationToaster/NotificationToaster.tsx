import { Notification } from '../../models/notification'
import { toast, ToastContainer } from 'react-toastify'
import { ContainerBox } from '../../components/ContainerBox/ContainerBox'
import './NotificationToaster.scss'
import { io } from 'socket.io-client'
import classNames from 'classnames'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { selectAuth } from '../../redux/auth/authSlice'

export const NotificationToaster = () => {
  const user = useAppSelector(selectAuth)

  const socket = io(import.meta.env.VITE_NOTIFICATIONS_WEB_SOCKET_URL)

  socket.on('notification', (notification: Notification) => {
    if (notification.userId === user?.id) {
      toast(<CustomNotification {...notification} />)
    }
  })

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

const CustomNotification = ({
  name,
  type,
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
