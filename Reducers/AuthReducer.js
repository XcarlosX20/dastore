import { tokenAuth } from '../config/axios'
import {
  AUTH_COMPANY_START,
  AUTH_COMPANY_SUCCESS,
  AUTH_COMPANY_ERROR,
  LOGOUT,
  GET_COMPANY_START,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_ERROR
} from '../types'
const initialState = {
  company: null,
  auth: false,
  token: '',
  error: null,
  loading: false
}
export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_COMPANY_START:
    case GET_COMPANY_START:
      return {
        ...state,
        loading: true
      }
    case AUTH_COMPANY_SUCCESS:
      localStorage.setItem('token', action.payload)
      // cookies
      const date = new Date()
      date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000)
      const expires = date.toGMTString()
      document.cookie = `${'token'}=${
        action.payload
      }; expires ${expires}; path="/"`
      return {
        ...state,
        token: action.payload,
        loading: false,
        auth: true
      }

    case AUTH_COMPANY_ERROR:
    case GET_COMPANY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case GET_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        company: action.payload,
        auth: true
      }
    case LOGOUT:
      document.cookie = 'token=; path=/;'
      localStorage.removeItem('token')
      tokenAuth()
      return initialState

    default:
      return state
  }
}
