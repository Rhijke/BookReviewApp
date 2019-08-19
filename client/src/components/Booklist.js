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
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const checkUserAuth = async () => {
    try {
      let response = await axios.get('http://localhost:3002/booklist');
      return response.data;
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const searchBook = async bookId => {
    try {
      const response = await axios.get(
        `http://localhost:3002/search/${bookId}`
      );
      console.log(response);
      const { data } = response;
      console.log(data);
      const book = {
        id: bookId,
        image: data['image_url'],
        publicationYear: data['publication_year'],
        isbn: data['isbn'],
        rating: data['average_rating'],
        description: data['description'],
        title: data['title'],
        author: data['authors']['author'][0]
          ? data['authors']['author'][0].name
          : data['authors']['author'].name,
        smallImage: data['small_image_url'],
        reviewId: data['work']['id']['_']
      };
      return book;
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const findBookDetails = async result => {
    const books = [];
    for (let i = 0; i < result.length; i++) {
      books.push(await searchBook(result[i]));
    }
    console.log(books);
    return books;
  };
  useEffect(() => {
    (async () => {
      try {
        let result = await checkUserAuth();
        if (!result.loggedIn) {
          return;
        } else {
          setLoggedIn(true);
          setUser({
            ...user,
            name: result.name,
            savedBooks: result.savedBooks
          });
          const books = await findBookDetails(result.savedBooks);
          setResults(books);
        }
      } catch (err) {
        return;
      }
    })();
  }, []);

  if (loggedIn && results) {
    return (
      <div>
        <div className="page-header">
          <h3>Book list for {user.name}</h3>
        </div>
        <div className="searchresults">
          {results.length > 0 ? (
            results.map(book => Book(book))
          ) : (
            <h3>Loading {user.savedBooks.length} books</h3>
          )}
        </div>
      </div>
    );
  }
  if (!loggedIn) {
    return (
      <div>
        <h3 className="page-header">
          Please <Link to="/login">login </Link>to see your saved books.
        </h3>
        <p>{error}</p>
      </div>
    );
  }
};

export default BookList;
