import { chatService } from "../../services/chatService"
import { userService } from "../../services/userService"

export function loadChats() {

    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().chatModule
            const chats = await chatService.query(filterBy)
            dispatch({ type: 'SET_CHATS', chats })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function loadChat(chatId, userId) {

    return async (dispatch) => {
        try {
            const chat = await chatService.getChatById(chatId)
            if (chat.user1Id === userId) {
                chat.isSeenByUser1 = true
            } else {
                chat.isSeenByUser2 = true
            }
            dispatch({ type: 'UPDATE_CHAT', chat })
            dispatch({ type: 'SET_CHAT', chat }) 
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeChat(chatId) {

    return async (dispatch, getState) => {
        try {
            const chat = await chatService.removeChat(chatId)
            dispatch({ type: 'REMOVE_CHAT', chatId })
            return chat
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function addMessage(chat, msg) {

    return async (dispatch) => {
        try {
            chat.msgs.push(msg)
            if (chat.user1Id === userService.getUser()._id) {
                chat.isSeenByUser1 = true
                chat.isSeenByUser2 = false
            } else {
                chat.isSeenByUser1 = false
                chat.isSeenByUser2 = true
            }
            await chatService.saveChat(chat)
            dispatch({ type: 'UPDATE_CHAT', chat })
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