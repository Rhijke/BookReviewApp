import React, { Component } from 'react';
import './css/Login.css';
export class Login extends Component {
  render() {
    return (
      <div>
        <h3 className="page-header">Please login.</h3>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="text"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              type="password"
            />
          </div>
          <button className="btn btn-dark">Create Account</button>
          <button className="btn btn-dark">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
