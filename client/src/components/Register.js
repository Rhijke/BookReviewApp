import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Error from './Error';

export class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: []
  };
  handleSubmit = async e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    let response = await axios.post('http://localhost:3002/users/register', {
      user
    });
    let errors = response.data;
    errors.forEach(err => {
      this.setState(prevState => ({
        errors: [...prevState.errors, err.msg]
      }));
    });

    this.state.errors.forEach(err => console.log(err));
  };
  render() {
    let errors = this.state.errors.length > 0;
    console.log(errors);
    return (
      <div className="mt-5 mr-auto col-md-4 offset-md-4">
        <div className="card card-body">
          <h2 className="text-center mb-3">
            <i className="fas fa-user-plus" /> Register
          </h2>
          <div>
            {this.state.errors.length > 0 ? (
              <Error msg={this.state.errors[0]} />
            ) : null}
          </div>

          <form onSubmit={this.handleSubmit}>
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
            <button type="submit" className="btn btn-dark">
              Create Account
            </button>
          </form>
          <p className="mt-4">
            Have An Account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Register;
