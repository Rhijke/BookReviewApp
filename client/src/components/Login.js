import React, { Component } from 'react';
import { Redirect } from 'react-router';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    user: {},
    loggedIn: false
  };
  render() {
    if (this.state.loggedIn) return <Redirect to="/" />;
    return (
      <div className="mt-5 mr-auto col-md-4 offset-md-4">
        <div className="card card-body">
          <h2 class="text-center mb-3">
            <i class="fas fa-sign-in" /> Login
          </h2>
          <form method="post" action="http://localhost:3002/users/login">
            <div className="form-group">
              <label>Email</label>
              <input
                onChange={e => this.setState({ email: e.target.value })}
                className="form-control"
                placeholder={this.state.email ? `${this.state.email}` : 'Email'}
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

            <button className="btn btn-dark">Login</button>
          </form>
          <p class="mt-4">
            No Account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
