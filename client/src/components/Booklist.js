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
  const [error, setError] = useState('');
  const checkUserAuth = async () => {
    try {
      let response = await axios.get('http://localhost:3002/booklist');
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(Object.keys(err));
      console.log(err['config']);
      setError(err);
    }
  };
  useEffect(() => {
    console.log('Use effect called');
    (async () => {
      try {
        let { name, savedBooks } = await checkUserAuth();
        setUser({
          ...user,
          name,
          savedBooks
        });
      } catch (err) {
        return;
      }
    })();
  }, []);

  if (user.name !== '') {
    return (
      <div>
        {console.log(user.name)}
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
        <h3 className="page-header">
          {' '}
          Please <Link to="/login">login </Link>to see your saved books.
        </h3>
      </div>
    );
  }
};

export default BookList;
