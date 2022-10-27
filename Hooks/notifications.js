import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  addNotificationAction,
  editNotificationAction,
  setInfoCompanyAction
} from '../Actions/ActionsCompany'
import socket from '../config/socket'
const useNotifications = (_id) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const watchIfRequests = () => {
      if (_id) {
        socket.on(`notifications:${_id}`, (response) => {
          dispatch(addNotificationAction(response))
        })
      }
    }
    watchIfRequests()
  }, [_id, socket])
  const toggle = () => setIsOpen(!isOpen)
  const seeNotifications = () => {
    setIsOpen(true)
    dispatch(
      setInfoCompanyAction({
        property: ['alertNotification'],
        data: { alertNotification: false }
      })
    )
  }
  const editNotification = (notification) => {
    if (!notification.readed) {
      socket.emit('notification:edit', notification, (cb) => {
        dispatch(editNotificationAction(cb))
      })
    }
  }
  const typesNotificationsFn = (notification) => {
    const { type, body } = notification
    const notifications = {
      requests: {
        msg: `you have a new buy from ${body.correo || body.tlf}`,
        path: '/orders'
      },
      dateRef: {
        msg: 'your sales lapse has ready ended, let&apos;s see how your company&apos;s sales was',
        path: '/customization/sales-summary'
      }
    }
    return notifications[type]
  }
  return {
    typesNotificationsFn,
    seeNotifications,
    editNotification,
    isOpen,
    setIsOpen,
    toggle
  }
}

export default useNotifications
