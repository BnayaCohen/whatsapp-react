import { initializeApp } from "firebase/app";
import {
    addDoc, collection, deleteDoc, getDoc, doc,
    getDocs, getFirestore, updateDoc, query, orderBy, startAt, endAt
} from "firebase/firestore";

export const firebaseService = {
    queryData,
    getEntityById,
    saveEntity,
    removeEntity,
}
// console.log('process.env.VITE_SOME_KEY', import.meta.env);

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//Gets a Collection Reference
const tasksRef = collection(db, 'task')

async function queryData(filterBy) {
    let q = tasksRef
    if (filterBy?.txt) {
        const txt = filterBy.txt.toLowerCase()
        q = query(tasksRef, orderBy("title"), startAt(txt), endAt(txt + '\uf8ff'))
    }
    try {
        const tasksSnapshot = await getDocs(q)
        console.log('tasksSnapshot', tasksSnapshot)
        return tasksSnapshot.docs.map((doc) => {
            return { _id: doc.id, ...doc.data() }
        })
    } catch (e) {
        console.error("Error geting documents: ", e);
    }
}

async function getEntityById(entityId) {
    const docRef = doc(tasksRef, entityId)
    try {
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            return { _id: entityId, ...docSnap.data() }
        } else {
            console.log('No such document!')
        }
    } catch (e) {
        console.error("Error finding document: ", e);
    }
}

async function saveEntity(entity) {
    if (entity._id) {
        const copyEntitiy = JSON.parse(JSON.stringify(entity))
        const entityRef = doc(tasksRef, entity._id)
        delete copyEntitiy._id
        try {
            await updateDoc(entityRef, copyEntitiy)
            return entity
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    } else {
        try {
            const task = await addDoc(tasksRef, entity)
            return { _id: task.id, ...entity }
        } catch (e) {
            console.error("Error saving document: ", e);
        }
    }
}

async function removeEntity(entityId) {
    try {
        await deleteDoc(doc(tasksRef, entityId))
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}