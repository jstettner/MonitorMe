import React, { Component } from 'react';
import Header from './Header';
import Post from './Post';
import { withTracker } from 'meteor/react-meteor-data';
import '../api/model.js';
import { FilesCollection } from 'meteor/ostrio:files';
import cryptoRandomString from 'crypto-random-string';

const inputStyle = {
  maxWidth: '300px',
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      photo: null,
      caption: ""
    };

    if(!localStorage.getItem('user')) {
      localStorage.setItem('user', cryptoRandomString(10));
    }

    console.log(localStorage.getItem('user'));

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

  submitEntry(e) {
    e.preventDefault();
    if(this.state.photo) {
      Posts.insert({
        photo: this.state.photo,
        timestamp: new Date(),
        caption: (this.state.caption != "" ? this.state.caption : "uncaptioned"),
        comments: [],
      }, () => this.setState({photo: null, caption: ""}));
    }
  }

  render() {
    return(
      <div className="container column">
        <Header />
        <hr />
        <h2>Report a Mess</h2>
        <form className="submit container">
          <div className="form-group">
            <label htmlFor="exampleInputFile">File input</label>
            <input className="pb-5" id="fileInput" type="file" accept="image/*" onChange={this.uploadPhoto.bind(this)}/>
            <p className="help-block">You must have a photo to submit.</p>
          </div>
          {this.state.photo && (
            <div className="row">
              <img src={this.state.photo}/>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Photo Caption</label>
            <input type="text" className="form-control" placeholder="Enter a caption" style={inputStyle} value={this.state.caption} onChange={this.setCaption.bind(this)} />
          </div>
          <button type="submit" onClick={this.submitEntry} className="btn btn-default">Submit</button>
        </form>
        <hr />
        <h2> Messes </h2>
        <div className="posts">
          {this.props.posts.map((post) => (<div key={post._id}><Post id={post._id} src={post.photo} caption={post.caption} timestamp={post.timestamp} comments={post.comments}/><hr /></div>))}
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
})(App);
