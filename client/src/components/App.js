import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Profile from './Profile';
import Landing from './Landing';
import Games from './Games';
import NewGame from './NewGame';
import Topic from './Topic';
import Submit from './Submit';
import WaitingRoom from './WaitingRoom';
import Guess from './Guess';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div className="center-align">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/games" component={Games} />
            <Route exact path="/games/create" component={NewGame} />
            <Route exact path="/games/set-topic" component={Topic} />
            <Route exact path="/games/submit" component={Submit} />
            <Route exact path="/games/waiting-room" component={WaitingRoom} />
            <Route exact path="/games/guess" component={Guess} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
