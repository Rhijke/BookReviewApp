import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Book.css';
export const Book = book => {
  return (
    <Link
      key={book.title}
      to={{
        pathname: `/details/${book.title}`,
        state: book
      }}
    >
      {' '}
      <div className={'book-item'} key={book.id}>
        <h5>
          <img src={book.smallImage} alt="bookcover" />
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
