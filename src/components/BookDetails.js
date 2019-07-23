import React, { Component } from 'react';
import './css/BookDetails.css';
import { saveBook, checkSavedBook } from './api/saveBook';
import { fetchBookDescription } from './api/fetchBookDetails';

export class BookDetails extends Component {
  state = {
    book: this.props.location.state
  };

  handleSavedBook = async () => {
    let found = await checkSavedBook(this.state.book['id']);
    console.log(this.state.book);
    let desc = await fetchBookDescription(this.state.book['id']);
    console.log(desc);
    this.setState(prevState => ({
      saved: found,
      book: {
        ...prevState.book,
        description: desc
      }
    }));
    console.log(found);
  };

  componentWillMount() {
    console.log(this.handleSavedBook());
    this.setState({
      saved: checkSavedBook.call(this, this.state.book['id'])
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
            let found = await saveBook.call(this, this.state.book['id']);
            this.setState({
              saved: found
            });
          }}
        >
          {this.state.saved ? 'Remove book' : 'Save Book'}
        </button>

        {this.state.book.description ? (
          <p
            dangerouslySetInnerHTML={{ __html: this.state.book.description }}
          />
        ) : null}
      </div>
    );
  }
}

export default BookDetails;
