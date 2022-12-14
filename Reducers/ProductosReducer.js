import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  DOWNLOAD_PRODUCTS_SUCCESS,
  DOWNLOAD_PRODUCTS_ERROR,
  DOWNLOAD_PRODUCTS_START,
  GET_DELETE_PRODUCT,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  GET_EDIT_PRODUCT,
  EDIT_PRODUCT_ERROR,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_START,
  GET_SEARCH_RESULTS_START,
  GET_SEARCH_RESULTS_SUCCESS,
  GET_SEARCH_RESULTS_ERROR
} from '../types'
const initialState = {
  products: [],
  error: null,
  loading: false,
  productDelete: null,
  productEdit: null,
  searchResults: null
}
export default function (state = initialState, action) {
  switch (action.type) {
    case DOWNLOAD_PRODUCTS_START:
    case ADD_PRODUCT:
    case EDIT_PRODUCT_START:
    case GET_SEARCH_RESULTS_START:
      return {
        ...state, loading: true
      }
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload]
      }
    case GET_SEARCH_RESULTS_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload
      }
    case GET_SEARCH_RESULTS_ERROR:
    case DOWNLOAD_PRODUCTS_ERROR:
    case ADD_PRODUCT_ERROR:
    case DELETE_PRODUCT_ERROR:
    case EDIT_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case DOWNLOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload
      }
    case GET_DELETE_PRODUCT:
      return {
        ...state,
        productDelete: action.payload
      }
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(product => product._id !== state.productDelete),
        productDelete: null
      }
    case GET_EDIT_PRODUCT:
      return {
        ...state,
        productEdit: action.payload
      }
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        productEdit: null,
        products: state.products.map(product => product._id === action.payload._id ? product = action.payload : product)
      }
    default:
      return state
  }
}
