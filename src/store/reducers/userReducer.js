const INITIAL_STATE = {
    loggedInUser: null,
    users:[],
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }

        case 'SET_USER':
            return {
                ...state,
                loggedInUser: JSON.parse(JSON.stringify(action.user))
            }

        case 'UPDATE_USER':
            return {
                ...state,
                loggedInUser: { ...action.user }
            }

        default:
            return state
    }
}