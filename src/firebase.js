// firebase
import firebase from 'firebase'
require('firebase/firestore')

//storage for uploading imgs
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyBKivYrmxjj_8QjCsmoiUJECAGITOREot4",
  authDomain: "tianyuan-ae158.firebaseapp.com",
  databaseURL: "https://tianyuan-ae158.firebaseio.com",
  projectId: "tianyuan-ae158",
  storageBucket: "tianyuan-ae158.appspot.com",
  messagingSenderId: "266027599129",
  appId: "1:266027599129:web:53341b5e076f5807ec3188"
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();