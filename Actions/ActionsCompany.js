import Swal from "sweetalert2";
import { axiosClient } from "../config/axios";
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
export function setCategoriesAction(categories) {
  return async (dispatch) => {
    dispatch(setCategoriesStart());
    try {
      const editCategories = await axiosClient.put("api/companies", {
        categories,
      });
      if (editCategories.status === 202) {
        dispatch(setCategoriesSuccess(categories));
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "There was an error",
        icon: "info",
      });
      dispatch(setCategoriesError(true));
    }
  };
}
const setCategoriesStart = () => ({
  type: SETCATEGORIES_START,
});
const setCategoriesSuccess = (categories) => ({
  type: SETCATEGORIES_SUCCESS,
  payload: categories,
});
const setCategoriesError = (boolean) => ({
  type: SETCATEGORIES_ERROR,
  payload: boolean,
});
export function getInfoCompanyAction() {
  return async (dispatch) => {
    dispatch(getInfoCompanyStart());
    try {
      const res = await axiosClient.get("api/companies/info");
      if (res.status === 200) {
        dispatch(getInfoCompanySuccess(res.data));
      }
    } catch (err) {
      Swal.fire({
        title: "There was an error",
        icon: "info",
      });
      dispatch(getInfoCompanyError(true));
    }
  };
}
const getInfoCompanyStart = () => ({
  type: GET_INFOCOMPANY_START,
});
const getInfoCompanySuccess = (infoCompany) => ({
  type: GET_INFOCOMPANY_SUCCESS,
  payload: infoCompany,
});
const getInfoCompanyError = (boolean) => ({
  type: GET_INFOCOMPANY_ERROR,
  payload: boolean,
});
export function setInfoCompanyAction({ property, data }) {
  return async (dispatch) => {
    dispatch(setInfoCompanyStart());
    // console.log(data);
    try {
      let endpoint = "api/companies/info?";

      property.forEach((i, index) => {
        endpoint +=
          `property${index}=` +
          i +
          `${property.length - 1 === index ? "" : "&"}`;
      });
      const res = await axiosClient.put(endpoint, {
        data,
      });
      if (res.status === 201) {
        dispatch(getInfoCompanyAction());

        Swal.fire({
          icon: "success",
          title: "Changes saved",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err) {
      Swal.fire({
        title: "There was an error. please try it later",
        icon: "info",
      });
      dispatch(setInfoCompanyError(true));
    }
  };
}
const setInfoCompanyStart = () => ({
  type: SET_INFOCOMPANY_START,
});
const setInfoCompanySuccess = (data) => ({
  type: SET_INFOCOMPANY_SUCCESS,
  payload: data,
});
const setInfoCompanyError = (boolean) => ({
  type: SET_INFOCOMPANY_ERROR,
  payload: boolean,
});
export function addCategoriesAction(cat) {
  return async (dispatch) => {
    dispatch({
      type: ADD_CATEGORIES_START,
    });
    try {
      const {
        data: { category },
      } = await axiosClient.post("api/companies/info/categories", {
        category: cat,
      });
      dispatch({
        type: ADD_CATEGORIES_SUCCESS,
        payload: category,
      });
    } catch (err) {
      Swal.fire({
        title: err?.response?.msg || "There was an error. please try it later",
        icon: "info",
      });
      dispatch(setInfoCompanyError(true));
    }
  };
}
export function deleteCategoryAction(category) {
  return async (dispatch) => {
    dispatch({
      type: DELETE_CATEGORY_START,
    });
    try {
      await axiosClient.delete(`api/companies/info/categories/${category}`);
      dispatch({
        type: DELETE_CATEGORY_SUCCESS,
        payload: category,
      });
    } catch (err) {
      Swal.fire({
        title: err?.response?.msg || "There was an error. please try it later",
        icon: "info",
      });
      dispatch(setInfoCompanyError(true));
    }
  };
}
