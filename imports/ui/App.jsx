import React, { Component } from 'react';
import Header from './Header';
import Post from './Post';
import { createContainer } from 'meteor/react-meteor-data';
import '../api/model.js';
import { FilesCollection } from 'meteor/ostrio:files';

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
        caption: (this.state.caption != "" ? this.state.caption : "uncaptioned")
      }, () => this.setState({photo: null, caption: ""}));
    }
  }

  render() {
    return(
      <div className="container column">
        <Header />
        <hr />
        <form className="submit">
          <h3>Submit a mess</h3>
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
