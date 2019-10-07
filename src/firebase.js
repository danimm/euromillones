import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyA20Rs7VLhLC_NgPpDICOGGM1Q7brM2uM8',
  authDomain: 'euromillon-aee88.firebaseapp.com',
  databaseURL: 'https://euromillon-aee88.firebaseio.com',
  projectId: 'euromillon-aee88',
  storageBucket: 'euromillon-aee88.appspot.com',
  messagingSenderId: '144958940852',
  appId: '1:144958940852:web:26cdcc97d7f504ac'
}

const firebaseapp = firebase.initializeApp(config)

firebaseapp.firestore()

export default firebaseapp.firestore()
