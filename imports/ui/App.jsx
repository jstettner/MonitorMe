import React, { Component } from 'react';
import Header from './Header';
import SubmitPage from './Submit';
import Post from './Post';
import { createContainer } from 'meteor/react-meteor-data';
import '../api/model.js';

class App extends Component {
  submitEntry() {
    var cameraOptions = {
      width: 800,
      height: 600
    };

    MeteorCamera.getPicture(cameraOptions, function (error, data) {
      if (error) {
        // e.g. camera permission denied, or unsupported browser (Safari on iOS, looking at you)
        console.log(error);
      } else {
        // Insert a note in the client's collection; Meteor will persist it on the server.
        Posts.insert({
          photo: data,
          timestamp: new Date(),
          caption: "asdf"
        });
      }
    });
  }

  render() {
    return(
      <div className="container">
        <button onClick={this.submitEntry}>
          Take Photo
        </button>
        {this.props.posts.map((post) => (<Post id={post.id} src={post.photo} caption={post.caption} timestamp={post.timestamp}/>))}
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({}, { sort: { timestamp: -1 } }).fetch,
  };
}, App);
