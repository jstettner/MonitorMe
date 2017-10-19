import React, { Component } from 'react';
import Comment from './Comment';
import { withTracker } from 'meteor/react-meteor-data';

class Post extends Component {
  constructor() {
    super();
    this.state = {
      comment: ""
    };

    this.makeComment = this.makeComment.bind(this);
    this.setComment = this.setComment.bind(this);
  }

  setComment(event) {
    this.setState({
      comment: event.target.value
    });
  }

  makeComment(e) {
    e.preventDefault();
    if(this.state.comment != "") {
      Posts.update({ _id: this.props.id }, { $push: { comments: {user: localStorage.getItem('user'), text: this.state.comment} } });
    }
    this.setState({comment: ""});
  }

  render() {
    return(
      <div className="post row">
        <div className="col-md-5">
          <h3>Mess:</h3>
          <img src={this.props.src}/>
          <h4>{this.props.caption}</h4>
          <p>{this.props.timestamp.toString()}</p>
        </div>
        <div className="col-md-5">
          <h3>Blame:</h3>
          {this.props.comments && this.props.comments.length > 0 ?
          <div className="comments">
            {this.props.comments.slice(0).reverse().map(function(comment, i){
               return <Comment key={i} user={comment.user} text={comment.text}/>;})}
          </div>
          :
            <p>no comments yet.</p>
          }
          <form>
            <div className="form-group">
              <label htmlFor="comment">Comment</label>
              <input id="comment" type="text" className="form-control" placeholder="Blame Someone" value={this.state.comment} onChange={this.setComment.bind(this)} />
            </div>
            <button type="submit" onClick={this.makeComment} className="btn btn-default">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({}, { sort: { timestamp: -1 } }).fetch(),
  };
})(Post);
