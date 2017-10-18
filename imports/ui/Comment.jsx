import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return(
      <li className="comment">
        <p>{this.props.text}</p>
      </li>
    );
  }
}

export default Comment;
