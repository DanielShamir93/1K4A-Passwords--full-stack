import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_CONFIRM,
  ACCOUNT_CHANGED_RENDER,
  EDIT_ACCOUNT,
  LOGGED_IN_USER,
} from "./actionsTypes";

export const setEmailAction = (email = "") => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_EMAIL,
      payload: email,
    });
  };
};

export const setPasswordAction = (password = "") => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_PASSWORD,
      payload: password,
    });
  };
};

export const setConfirmAction = (confirm = "") => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_CONFIRM,
      payload: confirm,
    });
  };
};

export const accountChangedRenderAction = () => {
  return (dispatch, getState) => {
    dispatch({
      type: ACCOUNT_CHANGED_RENDER,
    });
  };
};

export const editAccountAction = (account = {}) => {
  return (dispatch, getState) => {
    dispatch({
      type: EDIT_ACCOUNT,
      payload: account,
    });
  };
};

export const loggedInUserAction = (user = {}) => {
  return (dispatch, getState) => {
    dispatch({
      type: LOGGED_IN_USER,
      payload: user,
    });
  };
};
