import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Landing extends Component {
  renderOptions() {
    if (!this.props.auth) {
      let btnStyle = { width: '250px', margin: '5px' };
      return (
        <div>
          <a href="/auth/google">
            <button className="btn purple darken-3" style={btnStyle}>
              Log in with Google
            </button>
          </a>
          <br />
          <Link to="/sign-up">
            <button className="btn green darken-2" style={btnStyle}>
              Create Account
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <Link to="/games">
          <button className="btn purple darken-3">Start Playing</button>
        </Link>
      );
    }
  }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 className="purple-text text-darken-3">Loonfeathers</h1>
        <h5>How well do you now your idiot friends?</h5>
        {this.renderOptions.bind(this)()}
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Landing);
