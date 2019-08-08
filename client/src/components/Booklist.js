import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book } from './Book';
import { fetchBookList } from './api/fetchBookList';

const BookList = ({ match }) => {
  const [user, setUser] = useState({});
  const [results, setResults] = useState([]);

  const searchBook = async () => {
    let searchResults = await fetchBookList();
    setResults(searchResults);
  };

  useEffect(() => {
    (async () => {
      let user = await axios.get('http://localhost:3002/users/booklist');
      console.log(user);
    })();

    // searchBook();
  }, []);

  if (false) {
    return (
      <div>
        <div className="page-header">
          <h3>Book list for </h3>
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
