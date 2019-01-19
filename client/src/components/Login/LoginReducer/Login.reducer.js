import {
  VERIFY_TOKEN,
  TOKEN_VERIFIED_OK,
  TOKEN_VERIFIED_ERROR
} from "./Login.actions";
import {
  CREATING_NEW_USER,
  NEW_USER_CREATED,
  CREATING_USER_ERROR
} from "./Login.actions";
import { CLEAR_LOGIN_FORM_ERROR_MSG } from "./Login.actions";

let originalState = {
  userDoneTutorial: false,
  userLocationUpdated: false,
  userJobUpdated: false,
  auth: false,
  token: "",
  user: {}
};

export default (state = originalState, action) => {
  switch (action.type) {
    //Loging In//
    case VERIFY_TOKEN:
      return { ...state, loginErrMsg: null };

    case TOKEN_VERIFIED_OK:
      return {
        ...state,
        auth: action.payload.auth,
        user: action.payload.user
      };

    case TOKEN_VERIFIED_ERROR:
      return {
        ...state,
        err: action.payload.err
      };

    //Creare new User//
    case CREATING_NEW_USER:
      return { ...state };

    case NEW_USER_CREATED:
      return {
        ...state,
        user: action.payload.user,
        userDoneTutorial: false,
        token: action.payload.token,
        auth: action.payload.auth,
        errorMsg: action.payload.message
      };

    case CREATING_USER_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case CLEAR_LOGIN_FORM_ERROR_MSG:
      return {
        ...state,
        errorMsg: null
      };

    default:
      return state;
  }
};
