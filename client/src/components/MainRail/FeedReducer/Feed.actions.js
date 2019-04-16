import fetch from "isomorphic-fetch";

export const FETCHING_SEARCH_RESULTS = "FETCHING_SEARCH_RESULTS";
export const SEARCH_RESULTS_OK = "SEARCH_RESULTS_OK";
export const SEARCH_RESULTS_ERROR = "SEARCH_RESULTS_ERROR";

export const UPLOADING_NEW_POST = "UPLOADING_NEW_POST";
export const NEW_POST_UPLOADED = "NEW_POST_UPLOADED";
export const NEW_POST_ERROR = "NEW_POST_ERROR";

export const REMOVE_POST_MSG = "REMOVE_POST_MSG";

export const fetchSearchResults = (userID, searchStr) => {
  return function(dispatch) {
    dispatch({ type: FETCHING_SEARCH_RESULTS });

    return fetch(`/api/user/search/${userID}?search=${searchStr}`)
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: SEARCH_RESULTS_OK,
          payload: res
        })
      )
      .catch(err =>
        dispatch({
          type: SEARCH_RESULTS_ERROR,
          payload: err
        })
      );
  };
};

// Upload a Post

export const uploadPost = postData => {
  return function(dispatch) {
    dispatch({ type: UPLOADING_NEW_POST });

    return fetch("/api/user/create/post", {
      method: "POST",
      body: postData
    })
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: NEW_POST_UPLOADED,
          payload: res
        })
      )
      .catch(err =>
        dispatch({
          type: NEW_POST_ERROR,
          payload: err
        })
      );
  };
};

export const removePostMsg = () => ({ type: REMOVE_POST_MSG });
