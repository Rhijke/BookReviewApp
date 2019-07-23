import React from 'react';
import firebase from './firebase';

export const saveBook = async book => {
  if (firebase.auth().currentUser) {
    let userID = firebase.auth().currentUser.uid;
    let dbCollectionUser = firebase
      .firestore()
      .collection('users')
      .doc(`${userID}`);

    let doc = await firebase
      .firestore()
      .collection('users')
      .doc(`${userID}`)
      .get();

    let savedBooks = doc.data().savedBooks;
    if (!savedBooks.includes(book)) {
      let resolve = await dbCollectionUser.update({
        savedBooks: firebase.firestore.FieldValue.arrayUnion(book)
      });
      console.log(resolve);
      return true;
    } else {
      let resolve = dbCollectionUser.update({
        savedBooks: firebase.firestore.FieldValue.arrayRemove(book)
      });
      if (resolve) {
        console.log('Book successfully removed!');
        return false;
      }
    }
  }
};

export const checkSavedBook = async book => {
  if (firebase.auth().currentUser) {
    let userID = firebase.auth().currentUser.uid;
    let doc = await firebase
      .firestore()
      .collection('users')
      .doc(`${userID}`)
      .get();

    let savedBooks = doc.data().savedBooks;
    console.log(savedBooks);

    if (savedBooks.includes(book)) {
      console.log('found');
      return true;
    }
    return false;
  }
};
