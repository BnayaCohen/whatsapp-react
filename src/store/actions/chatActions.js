import { chatService } from "../../services/chatService"


export function loadChats() {

    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().chatModule
            const chats = await chatService.getChats(filterBy)
            dispatch({ type: 'SET_CHATS', chats })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function loadChat(chatId) {

    return async (dispatch) => {
        try {
            const chat = await chatService.getChatById(chatId)
            dispatch({ type: 'SET_CHAT', chat })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeChat(chatId) {

    return async (dispatch, getState) => {
        try {
            const chat = await chatService.deleteChat(chatId)
            dispatch({ type: 'REMOVE_CHAT', chatId })
            return chat
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {

    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}