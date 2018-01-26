import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import TopicNew from './TopicNew';

class Topic extends Component {
  componentDidMount() {
    console.log('topic mounted');
    const { gameStatus, auth, game } = this.props;
    if (!auth || !game) {
      this.props.history.push('/games');
    } else {
      gameStatus(game.name);
      if (
        game.submissions &&
        game.submissions.length > 1 &&
        game.submissions.find(
          submission => submission.playerId === auth.googleId
        )
      ) {
        this.props.history.push('/games/submit');
      }
      this.refreshInterval = setInterval(() => {
        gameStatus(game.name);
      }, 500);
      setTimeout(() => {
        clearInterval(this.refreshInterval);
      }, 10 * 60 * 1000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }
  render() {
    let { game, auth } = this.props;
    //Verify game exists
    if (!auth || !game || Object.keys(game).length === 0) {
      console.log(auth, game);
      console.log('dead');
      return <div />;
    }
    //check if the round has been closed by the manager
    if (!game.joinable) {
      return (
        <div>
          <div className="progress">
            <div className="indeterminate" />
          </div>
          <h5>Judging in progress. Waiting for new round to begin...</h5>
        </div>
      );
      //Round is open; check if player is the judge
    } else {
      if (game.topic) {
        console.log('err 1');
        this.props.history.push('/games/submit');
      }
      if (auth.googleId !== game.manager._id) {
        return (
          <div>
            <div className="progress">
              <div className="indeterminate" />
            </div>
            <h5>Waiting for {game.manager.displayName} to Select a Topic</h5>
          </div>
        );
      } else {
        clearInterval(this.refreshInterval);
        return (
          <div>
            <TopicNew />
          </div>
        );
      }
    }
  }
}

const mapStateToProps = ({ auth, game }) => ({ auth, game });

export default connect(mapStateToProps, actions)(Topic);
