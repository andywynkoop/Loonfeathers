import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class WaitingRoom extends Component {
  componentDidMount() {
    const { gameStatus, auth, game } = this.props;
    if (!auth) {
      this.props.history.push('/games');
    } else {
      gameStatus(game.name);
      this.refreshInterval = setInterval(() => {
        gameStatus(game.name);
      }, 500);
      setTimeout(() => {
        clearInterval(this.refreshInterval);
        this.props.history.push('/games');
      }, 5 * 60 * 1000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }
  renderMessage() {
    const { game, auth, close } = this.props;
    let nonManagerMessage = `Waiting for ${
      game.manager.displayName
    } to close submissions...`;
    let managerMessage = `You're in charge. Close submissions for this round once all players have submitted entries and you're ready to begin judging.`;

    if (auth.googleId === game.manager._id) {
      return (
        <div>
          <h6 className="purple-text text-darken-2">{managerMessage}</h6>
          <button
            className="btn red darken-4 white-text"
            style={{ marginTop: '10px' }}
            onClick={() => close(game._id)}
          >
            Close Submissions
          </button>
        </div>
      );
    } else {
      return <h6 className="purple-text text-darken-2">{nonManagerMessage}</h6>;
    }
  }
  render() {
    const { game } = this.props;
    if (!game) {
      return <div />;
    }
    if (game.joinable) {
      let pluralOrNot =
        game.submissions.length === 1 ? 'Submission' : 'Submissions';
      return (
        <div>
          <div className="progress">
            <div className="indeterminate" />
          </div>
          <h4 className="purple-text text-darken-2">
            {game.submissions.length} {pluralOrNot} so far.
          </h4>
          {this.renderMessage()}
        </div>
      );
    } else {
      this.props.history.push('/games/guess');
      return <h5 className="red-text text-darken-4">Submissions Closed</h5>;
    }
  }
}

const mapStateToProps = ({ auth, game }) => ({ auth, game });
export default connect(mapStateToProps, actions)(WaitingRoom);
