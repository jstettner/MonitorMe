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
      caption: "..."
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

  setCaption(event) {
    this.setState({
      caption: event.target.value
    });
  }

  submitEntry() {
    if(this.state.photo) {
      Posts.insert({
        photo: this.state.photo,
        timestamp: new Date(),
        caption: (this.state.caption != "" ? this.state.caption : "...")
      }, () => this.setState({photo: null, caption: "..."}));
    }
  }

  render() {
    return(
      <div className="container">
        <div className="submit">
          <input id="fileInput" type="file" accept="image/*" onChange={this.uploadPhoto.bind(this)}/>
          <button onClick={this.submitEntry}>
            Submit this entry
          </button>
          <div>
          {this.state.photo &&
            <img src={this.state.photo}/>
          }
          </div>
          <div>
            <p>Caption: </p>
            <input id="caption" type="text" value={this.state.caption} onChange={this.setCaption.bind(this)}/>
          </div>
        </div>
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
