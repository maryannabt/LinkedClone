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
import {
  UPDATING_USER_LOCATION,
  USER_LOCATION_UPDATED,
  USER_LOCATION_UPDATE_ERROR
} from "./Login.actions";
import {
  UPDATING_USER_JOB,
  USER_JOB_UPDATED,
  USER_JOB_UPDATE_ERROR
} from "./Login.actions";
import {
  FINISH_TUTORIAL,
  FINISH_TUTORIAL_OK,
  FINISH_TUTORIAL_ERROR
} from "./Login.actions";
import {
  FINISH_TUTORIAL_NO_AVATAR,
  FINISH_TUTORIAL_NO_AVATAR_OK,
  FINISH_TUTORIAL_NO_AVATAR_ERROR
} from "./Login.actions";
import {
  LOGGING_IN,
  LOGGING_IN_SUCCESSFULLY,
  LOGGING_IN_ERROR
} from "./Login.actions";
import { CLEAR_LOGIN_ERROR } from "./Login.actions";
import { LOG_USER_OUT } from "./Login.actions";

let initialState = {
  userDoneTutorial: false,
  userLocationUpdated: false,
  userJobUpdated: false,
  auth: false,
  token: "",
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
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

    // Create new user
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

    // User location update
    case UPDATING_USER_LOCATION:
      return {
        ...state,
        userLocationUpdated: false
      };

    case USER_LOCATION_UPDATED:
      return {
        ...state,
        userLocationUpdated: true,
        user: action.payload.selectedUserUpdate
      };

    case USER_LOCATION_UPDATE_ERROR:
      return {
        ...state,
        userLocationUpdated: action.payload
      };

    // User job update
    case UPDATING_USER_JOB:
      return {
        ...state,
        userJobUpdated: false
      };

    case USER_JOB_UPDATED:
      return {
        ...state,
        userJobUpdated: true,
        user: action.payload.selectedUserUpdate
      };

    case USER_JOB_UPDATE_ERROR:
      return {
        ...state,
        userJobUpdated: action.payload
      };

    // Tutorial done with avatar
    case FINISH_TUTORIAL:
      return { ...state, userDoneTutorial: false };

    case FINISH_TUTORIAL_OK:
      return {
        ...state,
        userDoneTutorial: true,
        user: action.payload.selectedUserUpdate
      };

    case FINISH_TUTORIAL_ERROR:
      return {
        ...state,
        userDoneTutorial: action.payload
      };

    // Tutorial done without avatar
    case FINISH_TUTORIAL_NO_AVATAR:
      return { ...state, userDoneTutorial: false };

    case FINISH_TUTORIAL_NO_AVATAR_OK:
      return {
        ...state,
        userDoneTutorial: true,
        user: action.payload.selectedUserUpdate
      };

    case FINISH_TUTORIAL_NO_AVATAR_ERROR:
      return {
        ...state,
        userDoneTutorial: action.payload
      };

    // Logging In
    case LOGGING_IN:
      return {
        ...state
      };

    case LOGGING_IN_SUCCESSFULLY:
      return {
        ...state,
        auth: action.payload.auth,
        token: action.payload.token,
        user: action.payload.user,
        loginErrMsg: action.payload.message,
        sentData: action.payload.sentData
      };

    case LOGGING_IN_ERROR:
      return {
        ...state,
        error: action.payload
      };

    case CLEAR_LOGIN_ERROR:
      return { ...state, loginErrMsg: null, sentData: null };

    // Log Out
    case LOG_USER_OUT:
      return {
        auth: false,
        token: null,
        user: null,
        loginErrMsg: null
      };

    default:
      return state;
  }
};
