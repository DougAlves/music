import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC98I7UVrJJURQaxi91LhVroTRcU7dPPI4',
  authDomain: 'music-94840.firebaseapp.com',
  projectId: 'music-94840',
  storageBucket: 'music-94840.appspot.com',
  messagingSenderId: '73756822417',
  appId: '1:73756822417:web:0817ce966d661608456830',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage,
};
