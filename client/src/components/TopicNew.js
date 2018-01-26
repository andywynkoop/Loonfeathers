import React, { Component } from 'react';
import { connect } from 'react-redux';
import topicList from '../assets/topic_list';
import * as actions from '../actions';

class TopicNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: '',
      generated: true,
      err: {}
    };
    this.generateTopic = this.generateTopic.bind(this);
  }
  componentDidMount() {
    this.generateTopic();
  }
  generateTopic() {
    let list = topicList();
    let topic = list[Math.floor(Math.random() * list.length)];
    let generated = true;
    this.setState({ topic, generated });
  }
  renderTopic() {
    if (this.state.generated) {
      return this.state.topic;
    } else {
      return (
        <input
          type="text"
          style={{ fontSize: '24px' }}
          className="center-align"
          placeholder="Enter your own topic"
          value={this.state.topic}
          onChange={event => this.setState({ topic: event.target.value })}
        />
      );
    }
  }
  validate() {
    const { topic, err } = this.state;
    const { game, setTopic } = this.props;
    if (topic.length < 10) {
      err.message = 'Topics must have at least 10 characters';
    } else {
      setTopic(game._id, topic);
    }
    this.setState({ err });
  }
  render() {
    const { game } = this.props;
    return (
      <div>
        <h3 className="purple-text text-lighten-2">Round {game.round}</h3>
        <h5 className="purple-text text-darken-4">
          {this.renderTopic.bind(this)()}
        </h5>
        <p className="red-text">{this.state.err.message}</p>
        <button
          className="btn purple lighten-3"
          style={{ minWidth: '200px' }}
          onClick={this.validate.bind(this)}
        >
          Select This Topic
        </button>
        <button
          className="btn purple lighten-1"
          style={{ margin: '5px 5px', minWidth: '200px' }}
          onClick={this.generateTopic}
        >
          Draw New Topic
        </button>
        <button
          className="btn purple darken-4"
          style={{ minWidth: '200px' }}
          onClick={() => this.setState({ generated: false, topic: '' })}
        >
          Submit Your Own
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, game }) => ({ auth, game });
export default connect(mapStateToProps, actions)(TopicNew);
