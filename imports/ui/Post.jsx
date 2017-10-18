import React, { Component } from 'react';

class Post extends Component {
  render() {
    return(
      <div className="post">
        <hr />
        <img src={this.props.src}/>
        <h3>{this.props.caption}</h3>
        <p>{this.props.timestamp.toString()}</p>
      </div>
    );
  }
}

export default Post;
