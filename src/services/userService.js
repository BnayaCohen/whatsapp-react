import { storageService } from './storageService.js'

const USER_KEY = 'loggedInUser'

function getUser() {
  let user = storageService.load(USER_KEY)
  if (user) return user
  else user = {
    name: "Dea Folt",
    coins: 200,
  }
  storageService.store(USER_KEY, user)
  return user
}

function signup(name) {
  const user = {
    name,
    coins: 200,
  }
  storageService.store(USER_KEY, user)
  return user
}

function logout(){
  storageService.remove(USER_KEY)
}

export const userService = {
  getUser,
  signup,
  logout,
}