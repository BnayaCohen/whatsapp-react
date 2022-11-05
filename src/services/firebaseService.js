import { initializeApp } from "firebase/app";
import {
    addDoc, collection, deleteDoc, getDoc, doc,
    getDocs, getFirestore, updateDoc, query, orderBy, startAt, endAt
} from "firebase/firestore";
import { userService } from "./userService";

export const firebaseService = {
    chatsQueryData,
    getChatById,
    saveChat,
    removeChat,
    usersQueryData,
    getUserById,
    saveUser,
    removeUser,
}

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//Gets a Collection Reference
const chatsRef = collection(db, 'chat')
const usersRef = collection(db, 'user')

async function chatsQueryData(filterBy = { term: '' }) {
    const q = query(chatsRef)
    try {
        const chatsSnapshot = await getDocs(q)
        // console.log('chatsSnapshot', chatsSnapshot)
        const currUser = await userService.getUser()
        const chatDocs = chatsSnapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }))
            .filter(chat => chat.user1Id === currUser._id || chat.user2Id === currUser._id)
        const regex = new RegExp(filterBy.term, "i")
        const filteredChats = await Promise.all(chatDocs.map(chat => userService.getUserById(chat.user1Id === currUser._id ? chat.user2Id : chat.user1Id)))
            .then((usersMap) => chatDocs.filter((_v, i) => regex.test(usersMap[i]?.name)))
        return filteredChats.sort((c1, c2) => (c2.msgs[c2.msgs.length - 1]?.sentAt || 0) - (c1.msgs[c1.msgs.length - 1]?.sentAt || 0))
    } catch (e) {
        console.error("Error geting documents: ", e);
    }
}

async function usersQueryData() {
    const q = query(usersRef)
    try {
        const usersSnapshot = await getDocs(q)
        // console.log('usersSnapshot', usersSnapshot)
        return usersSnapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }))
    } catch (e) {
        console.error("Error geting documents: ", e);
    }
}

async function getChatById(chatId) {
    const docRef = doc(chatsRef, chatId)
    try {
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return { _id: chatId, ...docSnap.data() }
        } else {
            console.log('No such document!')
        }
    } catch (e) {
        console.error("Error finding document: ", e);
    }
}

async function getUserById(userId) {
    const docRef = doc(usersRef, userId)
    try {
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return { _id: userId, ...docSnap.data() }
        } else {
            console.log('No such document!')
        }
    } catch (e) {
        console.error("Error finding document: ", e);
    }
}

async function saveChat(chat) {
    if (chat._id) {
        const copyChat = JSON.parse(JSON.stringify(chat))
        const chatRef = doc(chatsRef, chat._id)
        delete copyChat._id
        try {
            await updateDoc(chatRef, copyChat)
            return chat
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    } else {
        try {
            const newChat = await addDoc(chatsRef, chat)
            return { _id: newChat.id, ...chat }
        } catch (e) {
            console.error("Error saving document: ", e);
        }
    }
}

async function saveUser(user) {
    if (user._id) {
        const copyUser = JSON.parse(JSON.stringify(user))
        const userRef = doc(usersRef, user._id)
        delete copyUser._id
        try {
            await updateDoc(userRef, copyUser)
            return user
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    } else {
        try {
            const newUser = await addDoc(usersRef, user)
            return { _id: newUser.id, ...user }
        } catch (e) {
            console.error("Error saving document: ", e);
        }
    }
}

async function removeChat(chatId) {
    try {
        return await deleteDoc(doc(chatsRef, chatId))
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

async function removeUser(userId) {
    try {
        await deleteDoc(doc(usersRef, userId))
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}