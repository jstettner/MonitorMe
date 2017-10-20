import React, { Component } from 'react';
import Header from './Header';
import Post from './Post';
import { withTracker } from 'meteor/react-meteor-data';
import '../api/model.js';
import { FilesCollection } from 'meteor/ostrio:files';
import ReactLoading from 'react-loading';

class App extends Component {
  constructor() {
    super();
    this.state = {
      photo: null,
      caption: "",
      preview: false,
      uploading: false
    };

    if(!localStorage.getItem('user')) {
      localStorage.setItem('user', Random.id(10));
    }

    this.submitEntry = this.submitEntry.bind(this);
  }

  uploadPhoto(event) {
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({photo: e.target.result, preview: true});
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
      this.setState({preview: false, uploading: true})
      Posts.insert({
        photo: this.state.photo,
        timestamp: new Date(),
        caption: (this.state.caption != "" ? this.state.caption.trim() : "Untitled"),
        comments: [],
      }, () => this.setState({photo: null, caption: "", preview: false, uploading: false}));
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
            <label htmlFor="file" className="inputlabel">{this.state.photo ? "Reupload" : "Upload"} a Mess</label>
            <input id="file" className="inputfile" type="file" accept="image/*" onChange={this.uploadPhoto.bind(this)}/>
            <p className="help-block">You must have a photo to submit.</p>
            <p className="visible-xs visible-sm">IF YOU ARE ON MOBILE, you must enable the camera for your browser in Settings > Privacy > Camera.</p>
          </div>
          {this.state.preview && (
            <div className="row">
              <img src={this.state.photo}/>
            </div>
          )}
          {this.state.uploading && (
            <div className="uploading">
              <h2>STILL UPLOADING... PLEASE WAIT...</h2>
              <ReactLoading type="cubes" color="#4283f4" />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="caption">Photo Caption</label>
            <input type="text" id="caption" className="form-control" placeholder="Enter a caption" value={this.state.caption} onChange={this.setCaption.bind(this)} />
          </div>
          <button type="submit" onClick={this.submitEntry} className="btn btn-default">Submit</button>
        </form>
        <hr />
        <h2> Messes </h2>
        {this.props.loading && (
          <div className="uploading">
            <h2>Loading...</h2>
            <ReactLoading type="cubes" color="#4283f4" />
          </div>
        )}
        <div className="posts">
          {this.props.posts.map((post) => (<div key={post._id}><Post id={post._id} src={post.photo} caption={post.caption} timestamp={post.timestamp} comments={post.comments}/><hr /></div>))}
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  const postsHandle = Meteor.subscribe('posts');
  const loading = !postsHandle.ready();

  return {
    loading,
    posts: Posts.find({}, { sort: { timestamp: -1 } }).fetch(),
  };
})(App);
