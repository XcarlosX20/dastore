import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addNotificationAction,
  editNotificationAction,
  getNotificationsAction,
  getInfoCompanyAction,
} from "../Actions/ActionsCompany";
import socket from "../config/socket";
const useNotifications = (_id) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    const watchIfRequests = () => {
      if (_id) {
        socket.on(`notifications:${_id}`, (response) => {
          dispatch(addNotificationAction(response));
        });
        dispatch(getInfoCompanyAction());
      }
    };
    watchIfRequests();
  }, [_id, socket]);
  useEffect(() => {
    if (open === true) {
      fetchNotifications();
    }
  }, [open]);
  const fetchNotifications = () => {
    dispatch(getNotificationsAction());
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => setAnchorEl(null);
  const editNotification = (notification) => {
    if (!notification.readed) {
      socket.emit("notification:edit", notification, (cb) => {
        dispatch(editNotificationAction(cb));
        console.log(cb);
      });
    }
  };
  const typesNotificationsFn = (notification) => {
    const { type, body } = notification;
    const notifications = {
      requests: {
        msg: `you have a new buy from ${body.correo || body.tlf}`,
        path: "/orders",
      },
      dateRef: {
        msg: "your sales lapse has ready ended, let&apos;s see how your company&apos;s sales was",
        path: "/customization/sales-summary",
      },
    };
    return notifications[type];
  };
  return {
    typesNotificationsFn,
    editNotification,
    handleClick,
    open,
    anchorEl,
    onClose,
  };
};

export default useNotifications;
