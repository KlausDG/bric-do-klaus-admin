import { firebase } from '@firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


// firebase init - add your own config here
const firebaseConfig = {
  apiKey: 'AIzaSyC20EK8oLRpy72CGsiWdTHKADUAYjf7Z7U',
  authDomain: 'coisas-do-klaus.firebaseapp.com',
  databaseURL: '',
  projectId: 'coisas-do-klaus',
  storageBucket: "coisas-do-klaus.appspot.com",
  messagingSenderId: "1091923954172",
  appId: "1:1091923954172:web:25903bb3a8004a98ed8a79"
}
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const usersCollection = db.collection('users')
const itemsCollection = db.collection('items')

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  itemsCollection,
}


