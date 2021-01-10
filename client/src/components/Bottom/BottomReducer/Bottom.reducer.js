import { FETCHING_USER_MSGS, USER_MSGS_OK, USER_MSGS_ERROR } from './Bottom.actions'

let initialState = {
    users: [],
    error: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_USER_MSGS:
            return { ...state }

        case USER_MSGS_OK:
            return {
                ...state,
                users: action.payload
            }

        case USER_MSGS_ERROR:
            return {
                ...state,
                error: action.payload.error
            }

        default:
            return state
    }
}