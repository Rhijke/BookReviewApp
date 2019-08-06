import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import '../App.js';
import Login2 from './Login2';
import io from 'socket.io-client';
const socket = io('http://localhost:3002');
console.log(socket);
function Nav(props) {
  const navStyle = {
    alignItems: 'center',
    height: '8vh'
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={navStyle}
    >
      <Link className="navbar-brand" to="/">
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse w-100 order-0" id="navbarNav">
        <ul className="navbar-nav ">
          <li className="nav-item ">
            <Link className="nav-link" to="/booklist">
              Book List
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/writereview">
              Write a Review
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-collapse collapse w-100 order-3">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Login2 provider={'goodreads'} key={'goodreads'} socket={socket} />
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              onClick={() => {
                console.log('clicked logout');
              }}
              to="/logout"
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
