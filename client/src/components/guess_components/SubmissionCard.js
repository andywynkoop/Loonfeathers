import React, { Component } from 'react';

class SubmissionCard extends Component {
  render() {
    const { select, submission, selectedKey } = this.props;
    const { content, playerId } = submission;
    const className =
      selectedKey !== playerId ? 'card' : 'card purple lighten-4';
    return (
      <div
        onClick={() => {
          select(playerId, submission);
        }}
      >
        <div className="row">
          <div className="col s12 m8 offset-m2">
            <div className={className}>
              <div className="card-content purple-text text-darken-4">
                <h6>{content}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SubmissionCard;
