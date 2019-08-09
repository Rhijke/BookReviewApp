import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/BookDetails.css';
const BookDetails = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({
    title: location.state.book.title
  });
  const [saved, setSaved] = useState(false);

  const searchBook = async () => {
    let response = await axios.get(
      `http://localhost:3002/${location.state.book['id']}`
    );
    console.log(response);
  };

  useEffect(() => {
    console.log(location.state);
    (async () => {
      await searchBook();
    })();
  }, []);
  if (loading === true) {
    return (
      <h2 className="page-header">Searching book details for {book.title}.</h2>
    );
  } else {
    return (
      <div className="detail-container">
        <h3 className="page-header">
          {book['title']} by {book['author']}
        </h3>

        <img src={`${book['image']}`} alt={`${book['title']} book cover`} />
        <h4 className="detail-item">
          Publication year: {`${book['publicationYear']}`}
        </h4>
        <h4 className="detail-item">ISBN: {`${book['isbn']}`}</h4>
        <h4 className="detail-item">Average Rating: {`${book['rating']}`}</h4>
        <button
          className="btn btn-dark"
          onClick={async () => {
            // let found = await saveBook.call(this, book['id']);
            // this.setState({
            //   saved: found
            // });
          }}
        >
          {saved ? 'Remove book' : 'Save Book'}
        </button>

        {book.description ? (
          <p dangerouslySetInnerHTML={{ __html: book.description }} />
        ) : null}
      </div>
    );
  }
};

export default BookDetails;
