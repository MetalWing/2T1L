import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const config = {
  apiKey: 'AIzaSyARnZ0IItdq2gGYTHJua_1HjxBQnQcFD3Y',
  authDomain: 't1l-47385.firebaseapp.com',
  databaseURL: 'https://t1l-47385-default-rtdb.firebaseio.com'
};

firebase.initializeApp(config);

export const db = firebase.database();