import React from 'react';
import { italic } from 'ansi-colors';
export const Book = book => {
  return (
    <div key={book.id}>
      <image src={book.smallImage} />

      <h5>
        {book.title}{' '}
        <span>
          {' '}
          <i> by {book.author}</i>
        </span>
      </h5>
    </div>
  );
};
