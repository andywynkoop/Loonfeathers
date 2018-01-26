import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';

class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: {}
    };
  }
  join() {
    const { auth, game, joinGame, setGame, gameStatus } = this.props;
    if (!auth) {
      let err = {};
      err.message = 'You must be logged in to join a game!';
      this.setState({ err });
    } else {
      joinGame(game.name); //server ops
      setGame(game); //internal state
      gameStatus(game.name);
      this.props.redirect('/games/set-topic');
    }
  }
  render() {
    const { game } = this.props;
    return (
      <div className="row">
        <div className="col s12 m6 offset-m3">
          <div className="card white">
            <div className="card-content purple-text">
              <span className="card-title">{game.name}</span>
              <p>Players: {game.players.length}</p>
            </div>
            <div className="card-action purple lighten-5">
              <button
                className="btn purple darken-1 white-text"
                onClick={this.join.bind(this)}
              >
                Join this Game +
              </button>
            </div>
          </div>
        </div>
        <p className="red-text">{this.state.err.message}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, actions)(GameCard);
