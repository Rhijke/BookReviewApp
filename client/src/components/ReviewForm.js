import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/WriteReview.css';
// https://www.goodreads.com/review.xml
export const ReviewForm = props => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('0');
  const [bookId, setBookId] = useState();
  useEffect(() => {
    setBookId(props.match.params.bookId);
  }, []);

  const handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    switch (name) {
      case 'rating':
        setRating(target.value);
        break;
      case 'review':
        setReview(target.value);
        break;
      default:
        console.log('Default case');
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(bookId);
    console.log(review);
    console.log(rating);
    try {
      axios.post(`http://localhost:3002/writereview/${bookId}`, {
        bookId,
        rating,
        review
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3 className="page-header">Write a review</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group form-rating">
          <label>Rating</label>
          <select
            name="rating"
            className="form-control"
            onChange={handleInputChange}
          >
            <option value="0">No rating</option>
            <option value="1">&#xf005;</option>
            <option value="2">&#xf005; &#xf005;</option>
            <option value="3">&#xf005; &#xf005; &#xf005;</option>
            <option value="4">&#xf005; &#xf005; &#xf005; &#xf005;</option>
            <option value="5">
              &#xf005; &#xf005; &#xf005; &#xf005; &#xf005;
            </option>
          </select>
        </div>
        <div className="form-group form-review">
          <label>Review</label>
          <textarea
            name="review"
            type="text"
            rows="10"
            className="form-control"
            placeholder="Write your review here."
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
