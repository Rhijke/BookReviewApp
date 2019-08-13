import React, { useState, useEffect } from 'react';
import './css/WriteReview.css';
// https://www.goodreads.com/review.xml
export const WriteReview = props => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [bookId, setBookId] = useState();
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <div>
      <h3 className="page-header">Write a review</h3>
      <form method="POST">
        <div className="form-group form-rating">
          <label>Rating</label>
          <select className="form-control">
            <option>&#xf005;</option>
            <option>&#xf005; &#xf005;</option>
            <option>&#xf005; &#xf005; &#xf005;</option>
            <option>&#xf005; &#xf005; &#xf005; &#xf005;</option>
            <option>&#xf005; &#xf005; &#xf005; &#xf005; &#xf005;</option>
          </select>
        </div>
        <div className="form-group form-review">
          <label>Review</label>
          <textarea
            type="text"
            rows="10"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Write your review here."
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WriteReview;
