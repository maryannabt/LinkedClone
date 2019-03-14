import {
  FETCHING_SEARCH_RESULTS,
  SEARCH_RESULTS_OK,
  SEARCH_RESULTS_ERROR
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

    default:
      return state;
  }
};
