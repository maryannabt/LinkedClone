export const FETCHING_USER_MSGS = 'FETCHING_USER_MSGS';
export const USER_MSGS_OK = 'USER_MSGS_OK';
export const USER_MSGS_ERROR = 'USER_MSGS_ERROR';

export const fetchMsgs = (userID, str) => {

    return function(dispatch) {

        dispatch({ type: FETCHING_USER_MSGS })

        return fetch(`/api/user/search/${userID}?search=${str}`)

            .then((res) => res.json())
            .then(res => dispatch({
                type: USER_MSGS_OK,
                payload: res
            }))
            .catch(err => dispatch({
                type: USER_MSGS_ERROR,
                payload: err
            }))
    }
}