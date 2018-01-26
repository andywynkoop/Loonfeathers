import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submission: '',
      err: {}
    };
  }
  componentDidMount() {
    const { auth, game, gameStatus } = this.props;
    if (!auth || auth.null) {
      this.props.history.push('/games');
    } else {
      gameStatus(game.name);
      this.refreshInterval = setInterval(() => {
        gameStatus(game.name);
      }, 500);
    }
    const { submissions } = game;
    if (submissions.find(sub => sub.playerId === auth.googleId)) {
      this.props.history.push('/games/waiting-room');
    }
  }
  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }
  validate() {
    const { submit, auth, game } = this.props;
    let err = {};
    if (this.state.submission.length < 5) {
      err.message = 'Your submission must contain at least 5 characters';
    } else if (!game.joinable) {
      err.message = 'This game is currently closed. Redirecting...';
      this.props.history.push('/games/set-topic');
    } else {
      submit(game._id, {
        playerId: auth.googleId,
        content: this.state.submission
      });
      this.props.history.push('/games/waiting-room');
    }
    this.setState({ err });
  }
  render() {
    const { game } = this.props;
    if (!game) {
      return <div>No game available</div>;
    }
    return (
      <div>
        <h6
          className="purple-text text-darken-4"
          style={{ margin: '20px 0px' }}
        >
          {game.topic}
        </h6>
        <div className="input-field">
          <p className="purple-text text-darken-2 left-align">My submission:</p>
          <textarea
            id="text-area"
            className="materialize-textarea purple lighten-5 purple-text text-darken-4 center-align"
            rows={6}
            value={this.state.submission}
            onChange={event =>
              this.setState({ submission: event.target.value })
            }
          />
        </div>
        <p className="red-text">{this.state.err.message}</p>
        <button
          className="btn purple lighten-3"
          onClick={() => {
            this.setState({ submission: game.topic });
          }}
          style={{ minWidth: '200px' }}
        >
          Copy Prompt
        </button>
        <button
          className="btn purple lighten-1"
          onClick={() => this.setState({ submission: '' })}
          style={{ margin: '5px 5px', minWidth: '200px' }}
        >
          Clear Field
        </button>
        <button
          className="btn purple darken-2"
          onClick={this.validate.bind(this)}
          style={{ minWidth: '200px' }}
        >
          Submit
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, game }) => ({ auth, game });
export default connect(mapStateToProps, actions)(Submit);
