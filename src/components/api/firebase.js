import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBmrvUS8ejDW6g4Fj9U4jeOLxW0RHeIXvI',
  authDomain: 'bookreviewapp-1e115.firebaseapp.com',
  databaseURL: 'https://bookreviewapp-1e115.firebaseio.com',
  projectId: 'bookreviewapp-1e115',
  storageBucket: '',
  messagingSenderId: '236760632044',
  appId: '1:236760632044:web:4fbaa5d68b1f7d96'
};

firebase.initializeApp(firebaseConfig);
export default firebase;
