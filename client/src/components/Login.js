import React, { Component } from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import Error from './Error';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loggedIn: false
  };

  handleSubmit = async e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(user);
    try {
      let response = await axios.post('http://localhost:3002/users/login', {
        email: user.email,
        password: user.password
      });
      console.log(response);
      if (response.status === 200) {
        this.setState({
          errors: [],
          password: '',
          email: '',
          loggedIn: true,
          successMsg: response.data.message
        });
        console.log(this.state);
      }
    } catch (err) {
      console.log(Object.keys(err));
      console.log(err.response);
      let formError = err['response']['data']['message'];
      if (!this.state.errors.some(err => err === formError)) {
        this.setState(prevState => ({
          errors: [...prevState.errors, formError]
        }));
      }
    }
  };
  render() {
    return (
      <div className="mt-5 mr-auto col-md-4 offset-md-4">
        <div className="card card-body">
          <h2 className="text-center mb-3">
            <i className="fas fa-sign-in" /> Login
          </h2>
          <div>
            {this.state.errors.length > 0
              ? this.state.errors.map(err => <Error key={err} msg={err} />)
              : null}
            {this.state.loggedIn ? (
              <div className="alert alert-dismissible alert-success">
                <button type="button" className="close" data-dismiss="alert">
                  &times;
                </button>
                {this.state.successMsg}
              </div>
            ) : null}
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                onChange={e => this.setState({ email: e.target.value })}
                className="form-control"
                placeholder={this.state.email ? `${this.state.email}` : 'Email'}
                name="email"
                value={this.state.loggedIn ? '' : `${this.state.email}`}
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                onChange={e => this.setState({ password: e.target.value })}
                className="form-control"
                placeholder="Password"
                value={this.state.loggedIn ? '' : `${this.state.password}`}
                name="password"
                type="password"
              />
            </div>

            <button className="btn btn-dark">Login</button>
          </form>
          <p className="mt-4">
            No Account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
