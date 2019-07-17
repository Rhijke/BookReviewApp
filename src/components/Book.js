import React from 'react';
import { Link } from 'react-router-dom';
export const Book = book => {
  return (
    <Link key={book.id} to={`/details/${book.id}`}>
      {' '}
      <div key={book.id}>
        <image src={book.smallImage} />

        <h5>
          {book.title}{' '}
          <span>
            {' '}
            <i> by {book.author}</i>
          </span>
        </h5>
      </div>{' '}
    </Link>
  );
};
