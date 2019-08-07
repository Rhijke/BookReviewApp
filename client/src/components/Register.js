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
      <div className="mt-5 mr-auto col-md-4 offset-md-4">
        <div className="card card-body">
          <h2 className="text-center mb-3">
            <i className="fas fa-user-plus" /> Register
          </h2>
          <form method="post" action="http://localhost:3002/login">
            <div className="form-group">
              <label>Name</label>
              <input
                onChange={e => this.setState({ name: e.target.value })}
                className="form-control"
                placeholder={this.state.name ? `${this.state.name}` : 'Name'}
                name="name"
                type="text"
              />
            </div>
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
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                onChange={e => this.setState({ password2: e.target.value })}
                className="form-control"
                placeholder="Confirm Password"
                name="password2"
                type="password"
              />
            </div>
            <button className="btn btn-dark">Create Account</button>
          </form>
          <p class="mt-4">
            Have An Account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Register;
