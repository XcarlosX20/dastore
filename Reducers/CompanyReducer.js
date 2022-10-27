import {
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  EDIT_NOTIFICATION,
  GET_INFOCOMPANY_START,
  GET_INFOCOMPANY_ERROR,
  GET_INFOCOMPANY_SUCCESS,
  SET_INFOCOMPANY_START,
  SET_INFOCOMPANY_ERROR,
  SET_INFOCOMPANY_SUCCESS,
  ADD_CATEGORIES_START,
  ADD_CATEGORIES_SUCCESS,
  GET_CATEGORIES_START,
  GET_CATEGORIES_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_START,
  ADD_NOTIFICATION
} from '../types'
const initialState = {
  alertNotification: false,
  notifications: [],
  description: '',
  categories: [],
  workdays: [],
  workTime: { startTime: '', endTime: '' },
  employees: [],
  loading: false,
  error: false
}
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INFOCOMPANY_START:
    case GET_INFOCOMPANY_START:
    case ADD_CATEGORIES_START:
    case GET_NOTIFICATIONS_START:
    case DELETE_CATEGORY_START:
      return { ...state, loading: true, error: false }
    case SET_INFOCOMPANY_SUCCESS:
    case GET_INFOCOMPANY_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        workdays: action.payload.workdays,
        workTime: action.payload.workTime,
        employees: action.payload.employees,
        alertNotification: action.payload.alertNotification,
        loading: false,
        error: false
      }
    case ADD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false,
        error: false
      }
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        categories: state.categories.filter((i) => i !== action.payload)
      }
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload
      }
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        alertNotification: true
      }
    case EDIT_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map((i) =>
          i._id === action.payload._id ? (i = action.payload) : i
        )
      }
    case SET_INFOCOMPANY_ERROR:
    case GET_INFOCOMPANY_ERROR:
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}
