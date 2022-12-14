import { userService } from '../../services/userService.js'

export function loadUsers() {

    return async (dispatch, getState) => {
        try {
            const currUser = await userService.getUser()
            let users = await userService.query()
            users = users.filter(user => user._id !== currUser._id)
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function loadUser() {
    return async (dispatch, getState) => {
        const user = await userService.getUser()
        dispatch({ type: 'SET_USER', user })
        return user
    }
}

export function setDemo() {
    return async (dispatch,) => {
        const user = await userService.setDemoUser()
        dispatch({ type: 'SET_USER', user })
        return user
    }
}

export function updateUser(user) {
    return async (dispatch) => {
        dispatch({ type: 'UPDATE_USER', user })
    }
}

export function login(user) {
    return async (dispatch) => {
        user.lastSeen = Date.now()
        userService.login(user)
        dispatch({ type: 'SET_USER', user })
    }
}

export function logout() {
    return (dispatch) => {
        userService.logout()
        dispatch({ type: 'SET_USER', user: null })
    }
}

export function signup(phone, name, status) {
    return async (dispatch) => {
        const user = await userService.signup(phone, name, status)
        dispatch({ type: 'SET_USER', user })
    }
}