import { firebaseService } from './firebaseService.js'

export const chatService = {
    query,
    getChatById,
    removeChat,
    saveChat,
    getEmptyChat
}

async function query(filterBy) {
    return await firebaseService.chatsQueryData(filterBy)
}

async function getChatById(chatId) {
    return await firebaseService.getChatById(chatId)
}

async function removeChat(chatId) {
    return await firebaseService.removeChat(chatId)
}

async function saveChat(chat) {
    return await firebaseService.saveChat(chat)
}

function getEmptyChat() {
    return {
        user1Id: '',
        user2Id: '',
        isSeenByUser1: true,
        isSeenByUser2: true,
        msgs: [{
            content: '',
            sentAt: Date.now(),
            userId: ''
        }]
    }
}

function _makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

// const chats = [
//     {
//         "_id": "5a56b32ca",
//         "user1Id": "5a566402183d319",
//         "user2Id": "5a56640269f443a5d64b32ca",
//         "isSeenByUser1": true,
//         "isSeenByUser2": true,
//         "msgs": [{
//             "content": 'Hola!',
//             "sentAt": 1665907296837,
//             "userId": '5a56640269f443a5d64b32ca'
//         }, {
//             "content": 'How are you?',
//             "sentAt": 1665907316799,
//             "userId": '5a566402183d319'
//         }]
//     },
//     {
//         "_id": "5a56644a99fde",
//         "user1Id": "5a566402183d319",
//         "user2Id": "5a5664025f6ae9aa24a99fde",
//         "isSeenByUser1": false,
//         "isSeenByUser2": true,
//         "msgs": [{
//             "content": 'Hi!',
//             "sentAt": 1665907296837,
//             "userId": '5a5664025f6ae9aa24a99fde'
//         }, {
//             "content": 'How are you?',
//             "sentAt": 1665907316799,
//             "userId": '5a566402183d319'
//         }]
//     },
//     {
//         "_id": "5a566d183d319",
//         "user1Id": "5a566402183d319",
//         "user2Id": "5a56640252d6acddd183d319",
//         "isSeenByUser1": false,
//         "isSeenByUser2": false,
//         "msgs": [{
//             "content": 'Shalom!',
//             "sentAt": 1665907296837,
//             "userId": '5a566402183d319'
//         },
//         {
//             "content": 'How are you?',
//             "sentAt": 1665907316799,
//             "userId": '5a56640252d6acddd183d319'
//         }]
//     },
// ]