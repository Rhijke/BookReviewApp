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
    try {
      let response = await axios.get(
        `http://localhost:3002/${location.state.book['id']}`
      );
      console.log(response);
      let { data } = response;

      setBook({
        ...book,
        author: location.state.book.author,
        image: data['image_url'],
        publicationYear: data['publication_year'],
        isbn: data['isbn'],
        rating: data['average_rating'],
        description: data['description']
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(location.state);
    (async () => {
      await searchBook();
      setLoading(false);
    })();
  }, []);
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
