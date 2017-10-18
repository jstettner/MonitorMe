import React, { Component } from 'react';
import Header from './Header';
import SubmitPage from './Submit';
import Post from './Post';
import { createContainer } from 'meteor/react-meteor-data';
import '../api/model.js';
import { FilesCollection } from 'meteor/ostrio:files';

class App extends Component {
  constructor() {
    super();
    this.state = {
      photo: null,
      caption: "adsf"
    };

    this.submitEntry = this.submitEntry.bind(this);
  }

  uploadPhoto(event) {
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({photo: e.target.result});
        };
        reader.readAsDataURL(event.target.files[0]);
    }
  }

  submitEntry() {
    Posts.insert({
      photo: this.state.photo,
      timestamp: new Date(),
      caption: "asdf"
    }, () => this.setState({photo: null}));
  }

  render() {
    return(
      <div className="container">
        <input id="fileInput" type="file" accept="image/*" onChange={this.uploadPhoto.bind(this)}/>
        {this.state.photo &&
          <img src={this.state.photo}/>
        }
        <button onClick={this.submitEntry}>
          Submit this entry
        </button>
        {this.props.posts.map((post) => (<Post key={post._id} src={post.photo} caption={post.caption} timestamp={post.timestamp}/>))}
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('posts');

  return {
    posts: Posts.find({}, { sort: { timestamp: -1 } }).fetch(),
  };
}, App);
