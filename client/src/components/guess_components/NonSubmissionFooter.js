import React, { Component } from 'react';

class NonSubmissionFooter extends Component {
  render() {
    const { game } = this.props;
    return (
      <footer className="page-footer yellow darken-3">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">
                {game.guesser.displayName}
                {"'s"} Turn to Guess
              </h5>
              <div className="grey-text text-lighten-4">
                <div className="progress">
                  <div className="indeterminate" />
                </div>
                <h5 className="purple-text text-darken-4">{game.latestNews}</h5>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default NonSubmissionFooter;
