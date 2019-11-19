import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: 'AIzaSyD1YEKWYVsat_uB1JYXWEEAk6H5c3D_Oe4',
  authDomain: 'react-ex1-ed361.firebaseapp.com',
  databaseURL: 'https://react-ex1-ed361.firebaseio.com',
  projectId: 'react-ex1-ed361',
  storageBucket: 'react-ex1-ed361.appspot.com',
  messagingSenderId: '993986346163',
  appId: '1:993986346163:web:45455ce1169b0ca24bc4c6',
  measurementId: 'G-94XCKTJXP8'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const storage = firebase.storage();

export { database, storage, firebase as default };
