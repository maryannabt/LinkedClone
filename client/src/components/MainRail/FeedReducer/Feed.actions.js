import fetch from "isomorphic-fetch";

export const FETCHING_SEARCH_RESULTS = "FETCHING_SEARCH_RESULTS";
export const SEARCH_RESULTS_OK = "SEARCH_RESULTS_OK";
export const SEARCH_RESULTS_ERROR = "SEARCH_RESULTS_ERROR";

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
