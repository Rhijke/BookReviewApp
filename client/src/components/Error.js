import React, { Component } from 'react';

export class Error extends Component {
  render() {
    return (
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        {this.props.msg}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

export default Error;
