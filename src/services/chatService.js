import { userService } from './userService.js'
import { firebaseService } from './firebaseService.js'

export const chatService = {
    query,
    getChatById,
    removeChat,
    saveChat,
    getEmptyChat
}

let chats 
//  [
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

async function query(filterBy) {
chats =await queryCheck(filterBy)
    return chats
    return new Promise((resolve, reject) => {
        const currUserId =userService.getUser()._id
        const regex = new RegExp(filterBy.term, "i")
        const filteredChats = chats.filter(chat => regex.test(userService.getUserById(
            chat.user1Id === currUserId ? chat.user2Id : chat.user1Id).name))
        resolve(filteredChats)
    })
}

function getChatById(id) {
    return new Promise((resolve, reject) => {
        const chat = chats.find(chat => chat._id === id)
        chat ? resolve(chat) : reject(`Chat id ${id} not found!`)
    })
}

function removeChat(id) {
    return new Promise((resolve, reject) => {
        const index = chats.findIndex(chat => chat._id === id)
        if (index !== -1) {
            chats.splice(index, 1)
        }

        resolve(chats)
    })
}

function _updateChat(chat) {
    return new Promise((resolve, reject) => {
        const index = chats.findIndex(c => chat._id === c._id)
        if (index !== -1) {
            chats[index] = chat
        }
        resolve(chat)
    })
}

function _addChat(chat) {
    return new Promise((resolve, reject) => {
        chat._id = _makeId()
        chats.push(chat)
        resolve(chat)
    })
}

function saveChat(chat) {
    return chat._id ? _updateChat(chat) : _addChat(chat)
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

function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  async function queryCheck(filterBy) {
  return await firebaseService.queryData(filterBy)
//    await firebaseService.saveChat(JSON.parse(JSON.stringify(chats[2])))
  }
  
//   async function getChatById(chatId) {
//     return firebaseService.getEntityById(chatId)
//   }
  
//   async function saveChat(chat) {
//     return firebaseService.saveEntity(chat)
//   }
  
//   async function removeChat(chatId) {
//     return firebaseService.removeEntity(chatId)
//   }