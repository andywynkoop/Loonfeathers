import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class NewGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      err: {}
    };
  }
  componentDidMount() {
    this.props.fetchGames();
    this.props.setGame({});
  }
  validate(event) {
    event.preventDefault();
    const { name } = this.state;
    const { auth, games } = this.props;
    const { displayName, googleId } = auth;
    const gameList = games.map(game => game.name);
    let err = {};
    if (!auth) {
      err.message = 'You must be logged in before you can create a game!';
    } else if (name.length < 4) {
      err.message = 'Game names must have a minimum of 4 characters.';
    } else if (gameList.includes(name)) {
      err.message = 'This name is currently in use.';
    } else {
      this.props.newGame(name, displayName, googleId);
      this.props.history.push('/games/set-topic');
    }
    this.setState({ err });
  }
  render() {
    return (
      <form onSubmit={this.validate.bind(this)} style={{ marginTop: '20px' }}>
        <h3>New Game</h3>
        <div className="new-game-input">
          <input
            style={{ textAlign: 'center' }}
            placeholder="What would you like to call this game?"
            value={this.state.name}
            onChange={event => {
              this.setState({ name: event.target.value });
            }}
          />
        </div>
        <p className="red-text center-align">{this.state.err.message}</p>
        <button className="btn purple lighten-2" style={{ margin: '0px 5px' }}>
          Create
        </button>
        <Link to="/games">
          <button className="btn red lighten-1" style={{ margin: '0px 5px' }}>
            Back
          </button>
        </Link>
      </form>
    );
  }
}
const mapStateToProps = ({ auth, games }) => ({ auth, games });

export default connect(mapStateToProps, actions)(NewGame);
