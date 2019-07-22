import firebase from './firebase';
import { fetchBookDetails } from './fetchBookDetails';
export const fetchBookList = async () => {
  if (firebase.auth().currentUser) {
    let userID = firebase.auth().currentUser.uid;

    let doc = await firebase
      .firestore()
      .collection('users')
      .doc(`${userID}`)
      .get();

    let savedBooks = doc.data().savedBooks;
    for (let i = 0; i < savedBooks.length; i++) {
      savedBooks[i] = await fetchBookDetails(savedBooks[i]);
    }

    console.log(savedBooks);
    return savedBooks;
  }

  return false;
};
