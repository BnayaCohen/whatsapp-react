import { storageService } from './storageService.js'

const users = [
  {
    "_id": "5a56640269f443a5d64b32ca",
    "phone": "+1 (968) 593-3824",
    "name": "Ochoa Hyde",
    "status": 'Available',
    "lastSeen": 1665907316799,
    "Photo": null
  },
  {
    "_id": "5a5664025f6ae9aa24a99fde",
    "phone": "+1 (948) 464-2888",
    "name": "Hallie Mclean",
    "status": 'Available',
    "lastSeen": 1665907359136,
    "Photo": null
  },
  {
    "_id": "5a56640252d6acddd183d319",
    "phone": "+1 (958) 502-3495",
    "name": "Parsons Norris",
    "status": 'Available',
    "lastSeen": 1665907277183,
    "Photo": null
  },
]

const USER_KEY = 'loggedInUser'

function getUser() {
  let user = storageService.load(USER_KEY)
  if (user) return user
  else user = {
    _id: '5a566402183d319',
    phone: '+1 (958) 502-3495',
    name: 'Dea Folt',
    status: 'Available Right now',
    lastSeen: Date.now(),
    Photo: null
  }
  storageService.store(USER_KEY, user)
  return user
}

function getUserById(userId){
  return users.find(user => user._id === userId)
}

function isPhoneExist(phone){
  return users.some(user => user.phone === phone)
}

function signup(name) {
  const user = {
    name,
  }
  storageService.store(USER_KEY, user)
  return user
}

function logout() {
  storageService.remove(USER_KEY)
}

export const userService = {
  getUser,
  getUserById,
  isPhoneExist,
  signup,
  logout,
}