import React, { Component } from 'react';
import MySelect from './MySelect';
import LoadingSpinner from '../LoadingSpinner';

class SubmissionFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null,
      verifyingGuess: false
    };
  }
  registerSelection(selection) {
    let player = selection;
    this.setState({ player });
  }
  handleGuess() {
    this.setState({ verifyingGuess: true });
    this.props.callback(this.state.player, this.props.submission);
    setTimeout(() => {
      this.setState({ verifyingGuess: false });
    }, 1000);
  }
  renderGuessContent() {
    // Text showing my guess if valid OR "Select a player from below"
    // OR "Select a submission (passed to this component as props)"
    const { submission } = this.props;
    const { player } = this.state;
    if (!submission) {
      return <p>Select a submission from above</p>;
    } else if (!player) {
      return <p>Select a player from below</p>;
    } else {
      return (
        <div>
          <p>
            {player.displayName} submitted {submission.content}
          </p>
          <button
            className="btn green darken-4 white-text"
            onClick={this.handleGuess.bind(this)}
          >
            Place Guess
          </button>
        </div>
      );
    }
  }
  render() {
    let { verifyingGuess } = this.state;
    if (verifyingGuess) {
      return <LoadingSpinner />;
    }
    return (
      <footer className="page-footer green">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">My Guess</h5>
              <div className="grey-text text-lighten-4">
                {this.renderGuessContent.bind(this)()}
              </div>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Players</h5>
              <div>
                <MySelect
                  name="Select a Player"
                  options={this.props.players}
                  callback={this.registerSelection.bind(this)}
                />
                <p> </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default SubmissionFooter;
