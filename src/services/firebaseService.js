import { initializeApp } from "firebase/app";
import {
    addDoc, collection, deleteDoc, getDoc, doc,
    getDocs, getFirestore, updateDoc, query, orderBy, startAt, endAt
} from "firebase/firestore";
import { userService } from "./userService";

export const firebaseService = {
    queryData,
    getChatById,
    saveChat,
    removeChat,
}

const firebaseConfig = {
    apiKey: "AIzaSyAl6jkW4TSjMyiriijdQL2DGL5C_PFHGME",
    authDomain: "whatsapp-c415f.firebaseapp.com",
    projectId: "whatsapp-c415f",
    storageBucket: "whatsapp-c415f.appspot.com",
    messagingSenderId: "460845537909",
    appId: "1:460845537909:web:6c0d0006587e3ba820b63c",
    measurementId: "G-LY6K4B7MBK"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//Gets a Collection Reference
const chatsRef = collection(db, 'chat')

async function queryData(filterBy = { term: '' }) {
    const q = query(chatsRef)
    try {
        const chatsSnapshot = await getDocs(q)
        // console.log('chatsSnapshot', chatsSnapshot)
        const chatDocs = chatsSnapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }))
        const currUserId = userService.getUser()._id
        const regex = new RegExp(filterBy.term, "i")
        const filteredChats = chatDocs.filter(chat => regex.test(userService.getUserById(
            chat.user1Id === currUserId ? chat.user2Id : chat.user1Id).name))
            console.log(filteredChats);
        return filteredChats.sort((c1, c2) => (c2.msgs[c2.msgs.length - 1]?.sentAt||0) - (c1.msgs[c1.msgs.length - 1]?.sentAt||0))
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
            return { _id: newChat.id, ...newChat }
        } catch (e) {
            console.error("Error saving document: ", e);
        }
    }
}

async function removeChat(chatId) {
    try {
        await deleteDoc(doc(chatsRef, chatId))
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}