import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/WriteReview.css';
// https://www.goodreads.com/review.xml
export const ReviewForm = props => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('0');
  const [bookId, setBookId] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setBookId(props.match.params.bookId);
    (async () => {
      try {
        let result = await checkUserAuth();
        if (!result.loggedIn) {
          return;
        } else {
          setLoggedIn(true);
        }
      } catch (err) {
        return;
      }
    })();
  }, []);

  const checkUserAuth = async () => {
    try {
      let response = await axios.get('http://localhost:3002/loggedIn');
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

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

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      let response = await axios.post(
        `http://localhost:3002/writereview/${bookId}`,
        {
          bookId,
          rating,
          review
        }
      );
      console.log(response);
      console.log(response.data.goodreadsAuth);
      if (response.data.goodreadsAuth === false) {
        let response = await axios.get(
          'http://localhost:3002/connect/goodreads'
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoodreadsAuth = e => {
    window.open('http://localhost:3002/connect/goodreads');
    console.log(window.location.href);
  };
  console.log(loggedIn);
  if (loggedIn) {
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
  } else {
    return (
      <div>
        <h3 className="page-header">
          <button onClick={handleGoodreadsAuth} className="h3 nav-link">
            Please login to Goodreads.
          </button>
        </h3>
      </div>
    );
  }
};

export default ReviewForm;
