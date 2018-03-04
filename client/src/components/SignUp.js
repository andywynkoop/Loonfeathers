import React, { Component } from 'react';
import crypto from 'crypto';

class SignUp extends Component {
  state = {
    existingUsers: [],
    username: '',
    password: '',
    error: {}
  };
  componentDidMount() {
    console.log('fetch current usernames here; probably with an async');
  }
  weak = password => true;
  hide = password =>
    password
      .split('')
      .map(char => '*')
      .join('');
  hash = password =>
    crypto
      .createHmac('sha256', password)
      .update('Loonfeathers')
      .digest('hex');
  validate = event => {
    event.preventDefault();
    this.setState({ error: {} });
    let error = {};
    const { existingUsers, username, password } = this.state;
    if (username.length < 7) {
      error.username = 'Your username needs to be at least 7 characters';
    }
    if (existingUsers.includes(username)) {
      error.username = 'This username is already taken';
    }
    if (password.length < 12) {
      error.password = 'Your password needs to be at least 12 characters';
    } else if (this.weak(password)) {
      error.password = 'This password is weak af';
    }
    this.setState({ error });
  };
  render() {
    const { username, password, error } = this.state;
    console.log(this.hash(password));
    return (
      <div>
        <form onSubmit={this.validate} style={{ textAlign: 'left' }}>
          <h5>Create new account</h5>

          <input
            type="text"
            value={username}
            onChange={event => this.setState({ username: event.target.value })}
            placeholder="Choose a username!"
          />
          <p className="red-text text-darken-2">{error.username}</p>
          <input
            type="text"
            value={this.hide(password)}
            onChange={event => this.setState({ password: event.target.value })}
            placeholder="And a password..."
          />
          <p className="red-text text-darken-2">{error.password}</p>
          <button type="submit" className="btn green darken-2">
            Create!
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
