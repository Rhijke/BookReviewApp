import React, { Component } from 'react';
import './css/Login.css';
import firebase from './api/firebase';
import { Redirect } from 'react-router';
export class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loggedIn: false
  };

  handleLogin = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess.bind(this))
      .catch(error => {
        let errorMessage = error.message;
        this.onLoginFailure.bind(this)(errorMessage);
      });
  };

  handleLogout = e => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('logged out');
        this.resetState(false);
      });
  };

  onLoginFailure = errorMessage => {
    this.setState({ error: errorMessage, loggedIn: false });
  };
  resetState = loginState => {
    this.setState({
      email: '',
      password: '',
      error: '',
      loggedIn: loginState
    });
  };

  onLoginSuccess = () => {
    this.resetState(true);
    console.log('successful login');
  };

  render() {
    if (this.state.loggedIn) return <Redirect to="/" />;
    return (
      <div>
        <h3 className="page-header">Please login.</h3>
        <form onSubmit={this.handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={e => this.setState({ email: e.target.value })}
              className="form-control"
              placeholder="Email"
              name="email"
              type="text"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={e => this.setState({ password: e.target.value })}
              className="form-control"
              placeholder="Password"
              name="password"
              type="password"
            />
          </div>
          <button className="btn btn-dark">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
