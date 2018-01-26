import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderLinks() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="2">
            <Link to="/profile">{this.props.auth.displayName}</Link>
          </li>,
          <li key="1">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper purple lighten-2">
          <Link to={this.props.auth ? '/games' : '/'} className="left">
            <div className="brand-logo hide-on-small-only">Loonfeathers</div>
            <div
              className="left hide-on-med-and-up"
              style={{ fontSize: '20px' }}
            >
              Loonfeathers
            </div>
          </Link>
          <ul id="nav-mobile" className="right">
            {this.renderLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
