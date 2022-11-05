import { storageService } from './storageService.js'
import { firebaseService } from './firebaseService.js'

const USER_KEY = 'loggedInUser'

async function query() {
  return await firebaseService.usersQueryData()
}

async function getUser() {
  let user = storageService.load(USER_KEY)
  if (user) {
    user.lastSeen = Date.now()
    firebaseService.saveUser(user)
    return user
  }
  else {
    user = await getUserById('5a566402183d319')
  }

  storageService.store(USER_KEY, user)
  return user
}

async function setDemoUser() {
  const user = await getUserById('5a566402183d319')
  user.lastSeen = Date.now()

  firebaseService.saveUser(user)
  storageService.store(USER_KEY, user)
  return user
}

async function getUserById(userId) {
  return await firebaseService.getUserById(userId)
  // return users.find(user => user._id === userId)
}

async function getUserByPhone(phone) {
  const users = await firebaseService.usersQueryData()
  return users.find(user => user.phone === phone)
}

async function removeUser(userId) {
  await firebaseService.removeUser(userId)
}

async function signup(phone, name, status) {
  let user = {
    phone,
    name,
    status,
    lastSeen: Date.now(),
  }
  user = await firebaseService.saveUser(user)
  storageService.store(USER_KEY, user)
  return user
}

function login(user) {
  storageService.store(USER_KEY, user)
  return user
}

function logout() {
  storageService.remove(USER_KEY)
}

export const userService = {
  query,
  getUser,
  setDemoUser,
  getUserById,
  getUserByPhone,
  removeUser,
  signup,
  login,
  logout,
}

//   [{
//     "_id": "5a56640269f443a5d64b32ca",
//     "phone": "+1 (968) 593-3824",
//     "name": "Ochoa Hyde",
//     "status": 'Available',
//     "lastSeen": 1665907316799,
//   },
//   {
//     "_id": "5a5664025f6ae9aa24a99fde",
//     "phone": "+1 (948) 464-2888",
//     "name": "Hallie Mclean",
//     "status": 'Available',
//     "lastSeen": 1665907359136,
//   },
//   {
//     "_id": "5a56640252d6acddd183d319",
//     "phone": "+1 (958) 502-3495",
//     "name": "Parsons Norris",
//     "status": 'Available',
//     "lastSeen": 1665907277183,
//   },
// ]