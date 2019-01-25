import fetch from "isomorphic-fetch";

export const VERIFY_TOKEN = "VERIFY_TOKEN";
export const TOKEN_VERIFIED_OK = "TOKEN_VERIFIED_OK";
export const TOKEN_VERIFIED_ERROR = "TOKEN_VERIFIED_ERROR";

export const CREATING_NEW_USER = "CREATING_NEW_USER";
export const NEW_USER_CREATED = "NEW_USER_CREATED";
export const CREATING_USER_ERROR = "CREATING_USER_ERROR";

export const CLEAR_LOGIN_FORM_ERROR_MSG = "CLEAR_LOGIN_FORM_ERROR_MSG";

export const UPDATING_USER_LOCATION = "UPDATING_USER_LOCATION";
export const USER_LOCATION_UPDATED = "USER_LOCATION_UPDATED";
export const USER_LOCATION_UPDATE_ERROR = "USER_LOCATION_UPDATE_ERROR";

export const UPDATING_USER_JOB = "UPDATING_USER_JOB";
export const USER_JOB_UPDATED = "USER_JOB_UPDATED";
export const USER_JOB_UPDATE_ERROR = "USER_JOB_UPDATE_ERROR";

export const verifyToken = token => {
  return function(dispatch) {
    dispatch({ type: VERIFY_TOKEN });

    return fetch("/api/auth/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: TOKEN_VERIFIED_OK,
          payload: res
        })
      )
      .catch(err =>
        dispatch({
          type: TOKEN_VERIFIED_ERROR,
          payload: err
        })
      );
  };
};

export const createNewUser = userData => {
  return function(dispatch) {
    dispatch({ type: CREATING_NEW_USER });

    return fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...userData
      })
    })
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: NEW_USER_CREATED,
          payload: res
        })
      )
      .catch(err =>
        dispatch({
          type: CREATING_USER_ERROR,
          payload: err
        })
      );
  };
};

export const clearLoginFormErrMsg = () => ({
  type: CLEAR_LOGIN_FORM_ERROR_MSG
});

export const updateUserLocation = userData => {
  return function(dispatch) {
    dispatch({ type: UPDATING_USER_LOCATION });

    return fetch(`/api/auth/update/${userData.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...userData
      })
    })
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: USER_LOCATION_UPDATED,
          payload: res
        })
      )
      .catch(err =>
        dispatch({
          type: USER_LOCATION_UPDATE_ERROR,
          payload: err
        })
      );
  };
};

export const updateUserJob = userData => {
  return function(dispatch) {
    dispatch({ type: UPDATING_USER_JOB });

    return fetch(`/api/auth/update/${userData.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...userData
      })
    })
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: USER_JOB_UPDATED,
          payload: res
        })
      )
      .catch(err =>
        dispatch({
          type: USER_JOB_UPDATE_ERROR,
          payload: err
        })
      );
  };
};
