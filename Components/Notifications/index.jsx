import { useSelector } from 'react-redux'
import { Box, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useRouter } from 'next/router'
import useNotifications from '../../Hooks/notifications'
const Notifications = ({ _id }) => {
  const router = useRouter()
  const { notifications, alertNotification } = useSelector(state => state.company)
  const { typesNotificationsFn, seeNotifications, editNotification, isOpen, setIsOpen, toggle } = useNotifications(_id)

  const styleBox = {
    width: '15rem',
    padding: '1rem',
    minHeight: '12rem',
    maxHeight: '60vh',
    backgroundColor: '#fff',
    position: 'absolute',
    top: '85%',
    borderRadius: '4px ',
    overflowY: 'auto',
    overflowX: 'hidden',
    zIndex: 10,
    boxShadow:
       'inset 0 -3em 3em rgba(0,0,0,0.1),0 0  0 2px rgb(255,255,255), 0.3em 0.3em 1em rgba(0,0,0,0.3)'
  }
  return (
    <>
      {alertNotification
        ? (
          <IconButton color='warning' onClick={seeNotifications}>
            <NotificationsActiveIcon />
          </IconButton>)
        : (
          <IconButton color='light' onClick={toggle}>
            <NotificationsIcon />
          </IconButton>
          )}
      {isOpen && <Box sx={styleBox}>
        {notifications.length
          ? (
            <List>
              {notifications.map(notification => (
                <ListItemButton
                  key={notification._id} sx={{ backgroundColor: notification.readed ? 'inherit' : '#CCC' }}
                  onClick={() => {
                    toggle()
                    editNotification(notification)
                    router.push(typesNotificationsFn(notification).path)
                  }}
                >
                  <ListItemText primary={typesNotificationsFn(notification).msg} />
                </ListItemButton>
              ))}
            </List>
            )
          : (<p>there is no notifications</p>)}
      </Box>}
    </>
  )
}

export default Notifications
