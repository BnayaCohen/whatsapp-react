const INITIAL_STATE = {
    chats: null,
    currChat: null,
    filterBy: { term: '' }
}


// action = {type: SET_CHATS, chats: [...]}
export function chatReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'SET_CHATS':
            return {
                ...state,
                chats: action.chats
            }

        case 'SET_CHAT':
            return {
                ...state,
                currChat: action.chat
            }

        case 'ADD_CHAT':
            return {
                ...state,
                chats: [...state.chats, action.chat]
            }

        case 'REMOVE_CHAT':
            return {
                ...state,
                chats: state.chats.filter(chat => chat._id !== action.chatId)
            }

        case 'UPDATE_CHAT':
            return {
                ...state,
                chats: state.chats.map(chat => chat._id === action.chat._id ? action.chat : chat)
            }

        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }

        default:
            return state;
    }
}