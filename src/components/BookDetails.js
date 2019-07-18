import React, { Component } from 'react';
import './css/BookDetails.css';
import { fetchReviews } from './api/fetchReviews';

export class BookDetails extends Component {
  state = {
    book: this.props.location.state
  };
  getReviews = async () => {
    const reviews = await fetchReviews(this.state.book['id']);
    this.setState({
      description: reviews.summary
    });
  };
  componentDidMount() {
    this.getReviews();
  }
  render() {
    return (
      <div className="detail-container">
        {console.log(this.state.book)}
        <h3 className="page-header">
          {this.state.book['title']} by {this.state.book['author']}
        </h3>
        <img
          src={`${this.state.book['image']}`}
          alt={`${this.state.book['title']} book cover`}
        />
        <h4 className="detail-item">
          Publication year: {`${this.state.book['publicationYear']}`}
        </h4>
        <h4 className="detail-item">
          Average Rating: {`${this.state.book['rating']}`}
        </h4>
        {this.state.description ? (
          <p dangerouslySetInnerHTML={{ __html: this.state.description }} />
        ) : null}
      </div>
    );
  }
}

export default BookDetails;
