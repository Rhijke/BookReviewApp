import React, { Component } from 'react';
import './css/BookDetails.css';
import { fetchReviews } from './api/fetchReviews';
import { saveBook, checkSavedBook } from './saveBook';

export class BookDetails extends Component {
  state = {
    book: this.props.location.state
  };

  handleSavedBook = async () => {
    let found = await checkSavedBook(this.state.book['title']);
    this.setState({
      saved: found
    });
    console.log(found);
  };

  // componentDidMount() {
  //   this.setState({ loading: true });
  //   this.handleSavedBook().then(() => {
  //     this.setState({
  //       loading: false
  //     });
  //   });
  // }

  componentWillMount() {
    console.log('will mount');
    console.log(this.state.book['title']);
    console.log(this.handleSavedBook());
    this.setState({
      saved: checkSavedBook.call(this, this.state.book['title'])
    });
  }
  render() {
    if (this.state.loading) return <h2>Searching for book details.</h2>;
    return (
      <div className="detail-container">
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
        <button
          className="btn btn-dark"
          onClick={async () => {
            let found = await saveBook.call(this, this.state.book['title']);
            this.setState({
              saved: found
            });
          }}
        >
          {this.state.saved ? 'Remove book' : 'Save Book'}
        </button>
        {this.state.description ? (
          <p dangerouslySetInnerHTML={{ __html: this.state.description }} />
        ) : null}
      </div>
    );
  }
}

export default BookDetails;
