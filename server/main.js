import { Meteor } from 'meteor/meteor';
import '../imports/api/model.js';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('posts', function () {
    return Posts.find(
      { },
      {
        sort: { timestamp: -1 }
      }
    )
  });

  Posts.allow({
    insert: function (doc) {
      // anybody can insert
      return true;
    },
  });
});
