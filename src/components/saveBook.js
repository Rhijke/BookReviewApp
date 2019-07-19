import React from 'react';
import firebase from './api/firebase';

export const saveBook = book => {
  if (firebase.auth().currentUser) {
    let userID = firebase.auth().currentUser.uid;
    let dbCollectionUser = firebase
      .firestore()
      .collection('users')
      .doc(`${userID}`);

    firebase
      .firestore()
      .collection('users')
      .doc(`${userID}`)
      .get()
      .then(doc => {
        let savedBooks = doc.data().savedBooks;
        if (!savedBooks.includes(book)) {
          dbCollectionUser
            .update({
              savedBooks: firebase.firestore.FieldValue.arrayUnion(book)
            })
            .then(function() {
              console.log('Book successfully added!');
            });
        } else {
          dbCollectionUser
            .update({
              savedBooks: firebase.firestore.FieldValue.arrayRemove(book)
            })
            .then(function() {
              console.log('Book successfully removed!');
            });
        }
      });
  }
};
