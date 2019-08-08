import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Book } from './Book';

const BookList = ({ match }) => {
  const [user, setUser] = useState({
    name: '',
    savedBooks: []
  });
  const [results, setResults] = useState([]);
  const [notLoggedIn, setLoggedIn] = useState(true);
  const [error, setError] = useState('');
  const checkUserAuth = async () => {
    try {
      let response = await axios.get('http://localhost:3002/booklist');
      return response.data;
    } catch (err) {
      console.log('Catch called');
      console.log(err);
      setError(err);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        let result = await checkUserAuth();
        console.log(result);
        if (result.loggedIn) {
          return;
        } else {
          setLoggedIn(false);
          setUser({
            ...user,
            name: result.name,
            savedBooks: result.savedBooks
          });
        }
      } catch (err) {
        return;
      }
    })();
  }, []);

  if (notLoggedIn) {
    return (
      <div>
        <div className="page-header">
          <h3>Book list for {user.name}</h3>
        </div>
        <div className="searchresults">
          {/* {user.savedBooks.length > 0 ? user.savedBooks.map(book => Book(book)) : null} */}
          {user.savedBooks.length > 0
            ? user.savedBooks.map(book => <p>book</p>)
            : null}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {console.log(user)}
        {console.log(notLoggedIn)}
        <h3 className="page-header">
          Please <Link to="/login">login </Link>to see your saved books.
        </h3>
      </div>
    );
  }
};

export default BookList;
