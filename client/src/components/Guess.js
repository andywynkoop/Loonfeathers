import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SubmissionCard from './guess_components/SubmissionCard';
import SubmissionFooter from './guess_components/SubmissionFooter';
import NonSubmissionFooter from './guess_components/NonSubmissionFooter';
import LoadingSpinner from './LoadingSpinner';

class Guess extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedKey: '',
      submission: null
    };
    this.selectSubmission = this.selectSubmission.bind(this);
    this.idToPlayer = this.idToPlayer.bind(this);
  }
  componentDidMount() {
    const { auth, game, gameStatus } = this.props;
    if (!auth || !game) {
      this.props.history.push('/games/set-topic');
    } else {
      gameStatus(game.name);
      this.refreshInterval = setInterval(() => {
        gameStatus(game.name);
      }, 300);
    }
  }
  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }
  selectSubmission(selectedKey, submission) {
    this.setState({ selectedKey, submission });
  }
  renderSubmissions() {
    const { end, game } = this.props;
    const { submissions, _id } = game;
    if (submissions.length === 1) {
      end(_id);
      this.props.history.push('/games/set-topic');
    }
    return submissions.map(submission => {
      return (
        <SubmissionCard
          select={this.selectSubmission}
          submission={submission}
          key={submission.playerId}
          selectedKey={this.state.selectedKey}
        />
      );
    });
  }
  idToPlayer(id) {
    const { game } = this.props;
    let player = game.players.find(player => player._id === id);
    return player;
  }
  verifyGuess(player, submission) {
    const { game, correctGuess, incorrectGuess } = this.props;
    if (player._id === submission.playerId) {
      correctGuess(game._id, submission, game.guesser);
    } else {
      incorrectGuess(game._id);
    }
  }
  renderFooter(playersArray) {
    const { game, auth } = this.props;
    if (game.guesser._id === auth.googleId) {
      return (
        <SubmissionFooter
          submission={this.state.submission}
          players={playersArray}
          callback={this.verifyGuess.bind(this)}
        />
      );
    } else {
      return <NonSubmissionFooter game={game} />;
    }
  }
  render() {
    const { submissions } = this.props.game;
    if (!submissions) {
      return <LoadingSpinner />;
    }
    if (submissions.length === 0) {
      this.props.history.push('/games/set-topic');
      return <LoadingSpinner />;
    }
    const idsArray = submissions.map(sub => sub.playerId);
    let playersArray = idsArray.map(id => this.idToPlayer(id));
    playersArray = playersArray.filter(
      player => player.displayName !== this.props.auth.displayName
    );
    if (!submissions) {
      return null;
    }
    return (
      <div>
        <h5 className="purple-text text-darken-4">Submissions</h5>
        {this.renderSubmissions()}
        {this.renderFooter(playersArray)}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, game }) => ({ auth, game });
export default connect(mapStateToProps, actions)(Guess);
