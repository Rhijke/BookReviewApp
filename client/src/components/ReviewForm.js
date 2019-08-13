import React, { useState, useEffect } from 'react';
import './css/WriteReview.css';
// https://www.goodreads.com/review.xml
export const ReviewForm = props => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('0');
  const [bookId, setBookId] = useState();
  useEffect(() => {
    console.log(props);
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
            <option vale="4">&#xf005; &#xf005; &#xf005; &#xf005;</option>
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
