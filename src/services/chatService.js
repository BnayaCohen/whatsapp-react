import { userService } from './userService.js'

export const chatService = {
    getChats,
    getChatById,
    deleteChat,
    saveChat,
    getEmptyChat
}

const chats = [
    {
        "_id": "5a56b32ca",
        "userId": "5a56640269f443a5d64b32ca",
        "isSeen": true,
        "msgs": [{
            "content": 'Hola!',
            "sentAt": 1665907296837,
            "isUserSent": false
        }, {
            "content": 'How are you?',
            "sentAt": 1665907316799,
            "isUserSent": true
        }]
    },
    {
        "_id": "5a56644a99fde",
        "userId": "5a5664025f6ae9aa24a99fde",
        "isSeen": false,
        "msgs": [{
            "content": 'Hi!',
            "sentAt": 1665907296837,
            "isUserSent": false
        }, {
            "content": 'How are you?',
            "sentAt": 1665907316799,
            "isUserSent": true
        }]
    },
    {
        "_id": "5a566d183d319",
        "userId": "5a56640252d6acddd183d319",
        "isSeen": false,
        "msgs": [{
            "content": 'Shalom!',
            "sentAt": 1665907296837,
            "isUserSent": false
        },
        {
            "content": 'How are you?',
            "sentAt": 1665907316799,
            "isUserSent": true
        }]
    },
]

function getChats(filterBy) {
    return new Promise((resolve, reject) => {
        const regex = new RegExp(filterBy.term, "i")
        const filteredChats = chats.filter(chat => regex.test(userService.getUserById(chat.userId).name))
        resolve(filteredChats)
    })
}

function getChatById(id) {
    return new Promise((resolve, reject) => {
        const chat = chats.find(chat => chat._id === id)
        chat ? resolve(chat) : reject(`Chat id ${id} not found!`)
    })
}

function deleteChat(id) {
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
        name: '',
        email: '',
        phone: ''
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