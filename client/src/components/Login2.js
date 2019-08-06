import React, { Component } from 'react';
import PropTypes from 'prop-types';

const linkButton = {
  background: 'none',
  border: 'none',
  cursor: 'pointer'
};

export default class Login2 extends Component {
  state = {
    user: {},
    disabled: ''
  };

  componentDidMount() {
    const { socket, provider } = this.props;
    socket.on('goodreads', user => {
      this.popup.close();
      this.setState({ user });
    });
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: '' });
      }
    }, 1000);
  }
  openPopup() {
    const { provider, socket } = this.props;
    const url = `http://localhost:3002/${provider}?socketId=${socket.ids}`;

    return window.open(url);
  }
  startAuth = () => {
    console.log('start auth called');
    if (!this.state.disabled) {
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: 'disabled' });
    }
  };

  closeCard = () => {
    this.setState({ user: {} });
  };
  render() {
    const { name } = this.state.user;

    return (
      <div>
        {name ? (
          <button style={linkButton} className="nav-link">
            {name}
          </button>
        ) : (
          <button
            style={linkButton}
            className="nav-link"
            onClick={this.startAuth.bind(this)}
          >
            Login
          </button>
        )}
      </div>
    );
  }
}

Login2.propTypes = {
  socket: PropTypes.object.isRequired
};
