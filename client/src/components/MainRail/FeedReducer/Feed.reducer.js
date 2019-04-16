import {
  FETCHING_SEARCH_RESULTS,
  SEARCH_RESULTS_OK,
  SEARCH_RESULTS_ERROR
} from "./Feed.actions";
import {
  UPLOADING_NEW_POST,
  NEW_POST_UPLOADED,
  NEW_POST_ERROR
} from "./Feed.actions";
import { REMOVE_POST_MSG } from "./Feed.actions";

let originalState = {
  posts: [],
  uploadedComment: {},
  uploadedSubComment: {},
  fetchingPosts: false,
  searchSuggestions: [],
  postOffSet: 0
};

export default (state = originalState, action) => {
  switch (action.type) {
    case FETCHING_SEARCH_RESULTS:
      return state;

    case SEARCH_RESULTS_OK:
      return { ...state, searchSuggestions: action.payload };

    case SEARCH_RESULTS_ERROR:
      return { ...state, err: action.payload.err };

    case UPLOADING_NEW_POST:
      return { ...state };

    case NEW_POST_UPLOADED:
      return {
        ...state,
        postSaved: action.payload.postSaved,
        posts: [action.payload.post, ...state.posts]
      };

    case NEW_POST_ERROR:
      return {
        ...state,
        postSaved: false
      };

    case REMOVE_POST_MSG:
      return {
        ...state,
        postSaved: null
      };

    default:
      return state;
  }
};
