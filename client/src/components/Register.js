import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

export class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    error: ''
  };
  render() {
    if (this.state.loggedIn) return <Redirect to="/" />;
    return (
      <div>
        <h3 className="page-header">Please login.</h3>
        <form method="post" action="http://localhost:3002/login">
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={e => this.setState({ email: e.target.value })}
              className="form-control"
              placeholder={
                this.state.user.email ? `${this.state.user.email}` : 'Email'
              }
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
        <button
          className="btn btn-dark"
          style={{ margin: 5 }}
          onClick={this.createAccount}
        >
          <Link
            to="/createaccount"
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Create Account
          </Link>
        </button>
      </div>
    );
  }
}

export default Register;
