import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/BookDetails.css';
const BookDetails = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({
    title: location.state.book.title,
    id: location.state.book.id,
    author: location.state.book.author
  });
  const [saved, setSaved] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState();

  const searchBook = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/${location.state.book['id']}`
      );
      console.log(response);
      const { data } = response;

      setBook({
        ...book,
        image: data['image_url'],
        publicationYear: data['publication_year'],
        isbn: data['isbn'],
        rating: data['average_rating'],
        description: data['description'],
        title: data['title'],
        author: data['authors']['author'][0]
          ? data['authors']['author'][0].name
          : data['authors']['author'].name
      });
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };
  const checkUser = async () => {
    try {
      const user = await axios.get(`http://localhost:3002/users/loggedIn`);
      setLoggedIn(user.data.loggedIn);
    } catch (err) {
      console.log(err);
      setError({
        status: err.response.status,
        statusText: err.response.statusText
      });
    }
  };

  const saveBook = async bookId => {
    console.log(`add ${bookId}`);
    try {
      const response = await axios.put(
        `http://localhost:3002/users/update/${bookId}`
      );
      alert(response.data.message);
      setSaved(true);
    } catch (err) {
      setError({
        status: err.response.status,
        statusText: err.response.statusText
      });
    }
  };
  const removeBook = async bookId => {
    console.log(`remove ${bookId}`);
    try {
      const response = await axios.delete(
        `http://localhost:3002/users/remove/${bookId}`
      );
      alert(response.data.message);
      setSaved(false);
    } catch (err) {
      setError({
        status: err.response.status,
        statusText: err.response.statusText
      });
    }
  };

  const checkSavedBook = async bookId => {
    const response = await axios.get(
      `http://localhost:3002/users/find/${bookId}`
    );
    console.log(response.data);
    setSaved(response.data['saved']);
  };

  useEffect(() => {
    console.log(location.state);
    (async () => {
      await searchBook();
      setLoading(false);
      await checkUser();
      await checkSavedBook(book['id']);
    })();
  }, []);
  if (error) {
    return (
      <h2 className="page-header">
        {error.status}: {error.statusText}
      </h2>
    );
  }
  if (loading === true) {
    return (
      <h2 className="page-header">Searching book details for {book.title}.</h2>
    );
  } else {
    return (
      <div
        className="card m-3 mb-5"
        style={{
          maxWidth: '60%'
        }}
      >
        <h3 className="card-header">
          {book['title']} by {book['author']}
        </h3>
        <div className="card-body">
          <div className="details">
            <div>
              <img
                style={{ height: 250, width: 150 }}
                src={`${book['image']}`}
                alt={`${book['title']} book cover`}
              />
            </div>
            <div>
              <h5 className="detail-item">
                Publication year: {`${book['publicationYear']}`}
              </h5>
              <h5 className="detail-item">ISBN: {`${book['isbn']}`}</h5>
              <h5 className="detail-item">
                Average Rating: {`${book['rating']}`}
              </h5>
            </div>
            <div className="card-body">
              <button
                className="btn btn-dark detail-item"
                disabled={!loggedIn}
                onClick={async () => {
                  if (!saved) {
                    await saveBook(book['id']);
                  } else {
                    await removeBook(book['id']);
                  }
                }}
              >
                {saved ? 'Remove book' : 'Save Book'}
              </button>
              <Link
                to={{
                  pathname: `/writereview/${book.id}`,
                  state: { book }
                }}
              >
                <button className="btn btn-dark detail-item">
                  Write Review
                </button>
              </Link>
            </div>
          </div>

          <div>
            {book.description ? (
              <p
                className="detail-item h5 card-text"
                dangerouslySetInnerHTML={{ __html: book.description }}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
};

export default BookDetails;
