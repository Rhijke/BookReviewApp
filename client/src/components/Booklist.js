import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book } from './Book';

const BookList = ({ match }) => {
  const [user, setUser] = useState({
    name: 'nbasd',
    savedBooks: [1, 2, 3]
  });
  const [results, setResults] = useState([]);

  const updateUser = async newUser => {
    setUser(newUser);
  };
  const checkUserAuth = async () => {
    try {
      let response = await axios.get('http://localhost:3002/booklist');
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(Object.keys(err));
      console.log(err['config']);
      return err;
    }
  };
  useEffect(() => {
    console.log('Use effect called');
    (async () => {
      let { name, savedBooks } = await checkUserAuth();
      setUser({
        ...user,
        name,
        savedBooks
      });
    })();
  }, []);

  if (user) {
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
        <h3 className="page-header"> Please login to see your saved books.</h3>
      </div>
    );
  }
};

export default BookList;
