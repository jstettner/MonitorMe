import React, { Component } from 'react';

class Post extends Component {
  render() {
    return(
      <div className="post">
        <img src={this.props.src}/>
        <h1>
          {this.props.caption}
        </h1>
      </div>
    );
  }
}

export default Post;
