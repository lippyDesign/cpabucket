import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('aud', function audPublication() {
    return Aud.find();
  });
}

Meteor.methods({
    // use old function instead of fat arrow function
    // because fat arrow function binds to surrounding content and we would not be able to use this.userId
    'aud.insert'(questionBody, answer1, answer2, answer3, answer4, correctAnswer, explanation) {
        check(questionBody, String);
        check(answer1, String);
        check(answer2, String);
        check(answer3, String);
        check(answer4, String);
        check(correctAnswer, Number);
        check(explanation, String);
    
        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        let answerChoices = [];
        answerChoices.push(answer1);
        answerChoices.push(answer2);
        answerChoices.push(answer3);
        answerChoices.push(answer4);
        Aud.insert({
            questionBody,
            answerChoices,
            correctAnswer,
            explanation,
            votes: [],
            comments: [],
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'aud.updateQuestion'(questionId, questionBody, answer1, answer2, answer3, answer4, correctAnswer, explanation) {
        check(questionBody, String);
        check(answer1, String);
        check(answer2, String);
        check(answer3, String);
        check(answer4, String);
        check(correctAnswer, Number);
        check(explanation, String);
    
        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        let answerChoices = [];
        answerChoices.push(answer1);
        answerChoices.push(answer2);
        answerChoices.push(answer3);
        answerChoices.push(answer4);
        
        Aud.update({_id: questionId}, { $set: {questionBody, answerChoices, correctAnswer, explanation } } );
    },

    'aud.remove': function(question) {
        return Aud.remove(question);
    },

    'aud.addComment'(question, content) {
        check(content, String);
        Aud.update(question, { $push: {comments: { username: Meteor.users.findOne(this.userId).username, content,  date: new Date() } } } );
    },

    'aud.vote'(questionId, vote) {
        Aud.update(questionId, { $push: {votes: { owner: this.userId, vote } } } );
    },
    'aud.removeVote'(questionId, u_object) {
        Aud.update({_id: questionId}, {$pull: {votes: u_object}});
    },

});

export const Aud = new Mongo.Collection('aud');