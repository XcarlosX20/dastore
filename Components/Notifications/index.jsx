import { useSelector } from 'react-redux'
import { IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem } from '@mui/material'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useRouter } from 'next/router'
import useNotifications from '../../Hooks/useNotifications'
const Notifications = ({ _id }) => {
  const router = useRouter()
  const { notifications, alertNotification } = useSelector(state => state.company)
  const {
    typesNotificationsFn, editNotification, open,
    anchorEl, handleClick, onClose
  } = useNotifications(_id)

  return (
    <>
      {alertNotification
        ? (
          <IconButton color='warning' onClick={(e) => { handleClick(e) }}>
            <NotificationsActiveIcon />
          </IconButton>)
        : (
          <IconButton color='light' onClick={(e) => { handleClick(e) }}>
            <NotificationsIcon />
          </IconButton>
          )}

      <Menu
        id='notifications'
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
      >
        <MenuItem autoFocus disableRipple sx={{ cursor: 'auto' }}>
          <List>
            {notifications.length
              ? (
                  notifications.map(notification => (
                    <ListItemButton
                      divider
                      key={notification._id} sx={{ backgroundColor: notification.readed ? 'inherit' : '#CCC' }}
                      onClick={() => {
                        onClose()
                        editNotification(notification)
                        router.push(typesNotificationsFn(notification).path)
                      }}
                    >
                      <ListItemText primary={typesNotificationsFn(notification).msg} />
                    </ListItemButton>
                  ))
                )
              : <p>there is no notifications</p>}
          </List>
        </MenuItem>
      </Menu>

    </>
  )
}

export default Notifications
