import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return(
      <div className="comment">
        <p><em>{this.props.user}</em>: {this.props.text}</p>
      </div>
    );
  }
}

export default Comment;
