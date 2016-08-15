import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('userScores', function userScoresPublication() {
    return UserScores.find();
  });
}

Meteor.methods({
    // use old function instead of fat arrow function
    // because fat arrow function binds to surrounding content and we would not be able to use this.userId
    'userScores.insert'(test, score) {
        check(test, String);
        check(score, String);
    
        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        UserScores.insert({
            test,
            score,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },

    'userScores.remove': function(question) {
        return UserScores.remove(question);
    },

});

export const UserScores = new Mongo.Collection('userScores');