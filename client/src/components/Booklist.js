import React, { useState, useEffect } from 'react';
import { Book } from './Book';
import { fetchBookList } from './api/fetchBookList';
import firebase from './api/firebase';

const BookList = ({ match }) => {
  const [results, setResults] = useState([]);

  const searchBook = async () => {
    let searchResults = await fetchBookList();
    setResults(searchResults);
  };

  useEffect(() => {
    searchBook();
  }, []);

  if (firebase.auth().currentUser) {
    return (
      <div>
        <div className="page-header">
          <h3>Book list for {firebase.auth().currentUser.email}</h3>
        </div>
        <div className="searchresults">
          {results.length > 0 ? results.map(book => Book(book)) : null}
        </div>
      </div>
    );
  } else {
    return (
      <h3 className="page-header"> Please login to see your saved books.</h3>
    );
  }
};

export default BookList;
