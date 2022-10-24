import {
  SETCATEGORIES_ERROR,
  SETCATEGORIES_START,
  SETCATEGORIES_SUCCESS,
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
} from "../types";
const initialState = {
  description: "",
  categories: [],
  workdays: [],
  workTime: { startTime: "", endTime: "" },
  employees: [],
  loading: false,
  error: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INFOCOMPANY_START:
    case GET_INFOCOMPANY_START:
    case ADD_CATEGORIES_START:
    case DELETE_CATEGORY_START:
      return { ...state, loading: true, error: false };
    case SET_INFOCOMPANY_SUCCESS:
    case GET_INFOCOMPANY_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        workdays: action.payload.workdays,
        workTime: action.payload.workTime,
        employees: action.payload.employees,
        loading: false,
        error: false,
      };
    case ADD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        loading: false,
        error: false,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        categories: state.categories.filter((i) => i !== action.payload),
      };
    case SET_INFOCOMPANY_ERROR:
    case GET_INFOCOMPANY_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
