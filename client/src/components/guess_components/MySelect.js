import React, { Component } from 'react';

class MySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selection: ''
    };
  }
  componentDidMount() {
    const { name } = this.props;
    this.setState({ selection: { displayName: name } });
  }
  closeBox(selection) {
    let { open } = this.state;
    open = !open;
    this.setState({
      selection,
      open
    });
    this.props.callback(selection);
  }
  renderListItems() {
    const { open, selection } = this.state;
    const { options } = this.props;
    if (!open) {
      return (
        <li onClick={() => this.setState({ open: true })}>
          {selection.displayName} ▾
        </li>
      );
    } else {
      return options.map(option => {
        return (
          <li
            key={option.displayName}
            onClick={() => this.closeBox.bind(this)(option)}
          >
            {option.displayName}
          </li>
        );
      });
    }
  }
  render() {
    return (
      <div className="row">
        <ul
          style={{ fontSize: '20px' }}
          className="white green-text text-darken-4 col s12 m6 offset-m3"
        >
          {this.renderListItems.bind(this)()}
        </ul>
      </div>
    );
  }
}

export default MySelect;
