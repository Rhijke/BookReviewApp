import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book } from './Book';

const BookList = ({ match }) => {
  const [user, setUser] = useState({});
  const [results, setResults] = useState([]);
  const updateUser = newUser => {
    setUser(newUser);
  };
  const checkUserAuth = async () => {
    try {
      let response = await axios.get('http://localhost:3002/booklist');
      console.log(response);
      console.log(response.data);
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
      let msg = await checkUserAuth();
      console.log(msg);
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
