import React, { Component } from 'react';
import { connect } from 'react-redux';

class Profile extends Component {
  renderLoginButton() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h5>Who are you?</h5>
        <a href="/auth/google">
          <button className="btn btn-success">Login with Google</button>
        </a>
      </div>
    );
  }
  render() {
    if (!this.props.auth) {
      return <div>{this.renderLoginButton()}</div>;
    }
    return (
      <div style={{ marginTop: '30px' }}>
        <h2>Profile</h2>
        <p>
          Eventually, I should be able to make modifications to player variables
          from this page.
        </p>
        <h5>Name:{this.props.auth.displayName}</h5>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Profile);
