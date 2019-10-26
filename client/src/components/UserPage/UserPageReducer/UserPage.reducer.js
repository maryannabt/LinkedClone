import {
  FETCHING_USER_DATA,
  USER_FETCHED_OK,
  USER_FETCHED_ERROR
} from "./UserPage.actions";
import { REMOVE_USERPAGE_DATA } from "./UserPage.actions";

let initialState = {
  fetchDone: false,
  selectedUser: {},
  usersToFollow: [],
  userLastComments: [],
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER_DATA:
      return {
        ...state,
        selectedUser: {},
        usersToFollow: [],
        userLastComments: [],
        fetchDone: false
      };

    case USER_FETCHED_OK:
      return {
        ...state,
        selectedUser: action.payload.user,
        usersToFollow: action.payload.usersToFollow,
        userLastComments: action.payload.userLastComments,
        fetchDone: true
      };

    case USER_FETCHED_ERROR:
      return {
        ...state,
        error: action.payload.err
      };

    case REMOVE_USERPAGE_DATA:
      return {
        ...state,
        selectedUser: {},
        usersToFollow: [],
        userLastComments: [],
        fetchDone: false
      };

    default:
      return state;
  }
};
