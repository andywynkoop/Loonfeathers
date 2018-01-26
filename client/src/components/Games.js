import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import LoadingSpinner from './LoadingSpinner';
import GameCard from './GameCard';

class Games extends Component {
  constructor(props) {
    super(props);
    this.renderGamesList = this.renderGamesList.bind(this);
  }
  componentDidMount() {
    this.props.setGame({});
    this.props.fetchUser(); //refesh?
    this.props.fetchGames();
    this.refreshInterval = setInterval(() => {
      this.props.fetchGames();
    }, 500);
    setTimeout(() => {
      clearInterval(this.refreshInterval);
    }, 5 * 60 * 1000);
  }
  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }
  renderLatestGame() {
    const { auth, games } = this.props;
    if (auth && auth.latest) {
      let latest_game = games.find(game => game.name === auth.latest);
      if (latest_game) {
        return (
          <div>
            <h5 className="green-text text-darken-4">Resume Latest</h5>
            <GameCard
              game={latest_game}
              redirect={path => this.props.history.push(path)}
            />
          </div>
        );
      }
      return <div />;
    }
  }
  renderGamesList() {
    const { games } = this.props;
    if (!games) {
      return (
        <div>
          <LoadingSpinner />
        </div>
      );
    } else if (games.length === 0) {
      return (
        <div className="purple-text text-darken-2">No Available Games</div>
      );
    } else {
      return games.map(game => {
        return (
          <div key={game._id}>
            <GameCard
              game={game}
              redirect={path => this.props.history.push(path)}
            />
          </div>
        );
      });
    }
  }
  render() {
    return (
      <div className="center-align purple-text text-darken-3">
        <h4>Games</h4>
        {this.renderLatestGame()}
        <h5 className="green-text text-darken-4">Available Games</h5>
        <Link to="/games/create">
          <button
            className="btn green lighten-4 purple-text text-darken-4"
            style={{ margin: '10px 0px' }}
          >
            Create New +
          </button>
        </Link>
        <div>{this.renderGamesList()}</div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, games }) => ({ auth, games });
export default connect(mapStateToProps, actions)(Games);
