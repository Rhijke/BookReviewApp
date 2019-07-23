import React, { Component } from 'react';
import './css/WriteReview.css';
export class WriteReview extends Component {
  render() {
    return (
      <div>
        <h3 className="page-header">Write a review</h3>
        <form method="POST">
          <div className="form-group form-rating">
            <label>Rating</label>
            <select class="form-control">
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
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default WriteReview;
