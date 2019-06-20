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
import {
  FETCHING_POSTS,
  POSTS_FETCHED_OK,
  POSTS_FETCHED_ERROR
} from "./Feed.actions";
import { REMOVE_POST_ARR } from "./Feed.actions";
import {
  UPLOAD_NEW_LIKE,
  LIKE_UPLOADED_OK,
  LIKE_UPLOADED_ERROR
} from "./Feed.actions";

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

    case FETCHING_POSTS:
      return {
        ...state,
        fetchingPosts: true
      };

    case POSTS_FETCHED_OK:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        fetchingPosts: false,
        postOffSet: state.postOffSet + 10
      };

    case POSTS_FETCHED_ERROR:
      return {
        ...state,
        err: action.payload.err
      };

    case REMOVE_POST_ARR:
      return {
        ...state,
        posts: [],
        postOffSet: 0
      };

    case UPLOAD_NEW_LIKE:
      return {
        ...state
      };

    case LIKE_UPLOADED_OK:
      return {
        ...state
      };

    case LIKE_UPLOADED_ERROR:
      return {
        ...state,
        err: action.payload.err
      };

    default:
      return state;
  }
};
