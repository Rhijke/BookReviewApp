import React from 'react';
import { Link } from 'react-router-dom';
import './css/Book.css';
export const Book = book => {
  return (
    <Link
      key={book.id}
      to={{
        pathname: `/details/${book.id}`,
        state: { book }
      }}
    >
      <div className={'book-item'} key={book.id['_']}>
        <h5>
          <img src={book.smallImage} alt="bookcover" />
          {book.title}
          <span>
            <i> by {book.author}</i>
          </span>
        </h5>
      </div>{' '}
    </Link>
  );
};
