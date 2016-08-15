import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { Aud } from '../../imports/collections/aud';
import { Bec } from '../../imports/collections/bec';
import { Far } from '../../imports/collections/far';
import { Reg } from '../../imports/collections/reg';

import Navbar from '../components/Navbar';

class MyQuestionsPage extends Component {

    countVotes(votes) {
        let counterUp = 0;
        let counterDown = 0;
        for (i = 0; i < votes.length; i++) {
            if (votes[i].vote === "up") {
                counterUp++;
            }
            if (votes[i].vote === "down") {
                counterDown++;
            }
        }
        return <li className="list-group-item"><span className="text-success">Up: {counterUp}</span>, <span className="text-danger">Down: {counterDown}</span></li>
    }

    componentWillMount() { 
        if(!Meteor.userId()) {
            browserHistory.push('/');
        }
    }
    
    editQuestion(testSection, id) {
        browserHistory.push(`/edit-question/${testSection}${id}`);
    }

    renderAudQuestions() {
        if (this.props.aud) {
            if (this.props.aud.length == 0) {
                return <h5>None</h5>
            }
            return this.props.aud.map( ({ questionBody, answerChoices, correctAnswer, explanation, votes, comments, _id }) => {
                return (
                    <ul className="list-group myQuestionsSingleQuestion" key={_id}>
                        <li className="list-group-item"><h4 className="list-group-item-heading">{questionBody}</h4></li>
                        {this.answerChoiceHelper(answerChoices, correctAnswer)}
                        <li className="list-group-item"><strong>Explanation:</strong> {explanation}</li>
                        {this.countVotes(votes)}
                        <li className="list-group-item">
                            <h5>Comments:</h5>
                            <ul className="list-group">
                                {comments.map( comment => <li className="list-group-item" key={comment.content + comment.username}><small className="text-info">{comment.username}: </small><small>{comment.content}</small></li>)}
                            </ul>
                        </li>
                        <li className="list-group-item">
                            <button onClick={this.editQuestion.bind(this, 'aud', _id)} className="btn btn-warning editDeleteButton"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                        </li>
                    </ul>
                )
            })
        }
    }

    renderBecQuestions() {
        if (this.props.bec) {
            if (this.props.bec.length == 0) {
                return <h5>None</h5>
            }
            return this.props.bec.map( ({ questionBody, answerChoices, correctAnswer, explanation, votes, comments, _id }) => {
                return (
                    <ul className="list-group myQuestionsSingleQuestion" key={_id}>
                        <li className="list-group-item text-center"><h4 className="list-group-item-heading">{questionBody}</h4></li>
                        {this.answerChoiceHelper(answerChoices, correctAnswer)}
                        <li className="list-group-item">Explanation: {explanation}</li>
                        {this.countVotes(votes)}
                        <li className="list-group-item">
                            <h5>Comments:</h5>
                            <ul className="list-group">
                                {comments.map( comment => <li className="list-group-item" key={comment.content + comment.username}><small className="text-info">{comment.username}: </small><small>{comment.content}</small></li>)}
                            </ul>
                        </li>
                        <li className="list-group-item">
                            <button onClick={this.editQuestion.bind(this, 'bec', _id)} className="btn btn-warning editDeleteButton"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                        </li>
                    </ul>
                )
            })
        }
    }
    renderFarQuestions() {
        if (this.props.far) {
            if (this.props.far.length == 0) {
                return <h5>None</h5>
            }
            return this.props.far.map( ({ questionBody, answerChoices, correctAnswer, explanation, votes, comments, _id }) => {
                return (
                    <ul className="list-group myQuestionsSingleQuestion" key={_id}>
                        <li className="list-group-item text-center"><h4 className="list-group-item-heading">{questionBody}</h4></li>
                        {this.answerChoiceHelper(answerChoices, correctAnswer)}
                        <li className="list-group-item">Explanation: {explanation}</li>
                        {this.countVotes(votes)}
                        <li className="list-group-item">
                            <h5>Comments:</h5>
                            <ul className="list-group">
                                {comments.map( comment => <li className="list-group-item" key={comment.content + comment.username}><small className="text-info">{comment.username}: </small><small>{comment.content}</small></li>)}
                            </ul>
                        </li>
                        <li className="list-group-item">
                            <button onClick={this.editQuestion.bind(this, 'far', _id)} className="btn btn-warning editDeleteButton"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                        </li>
                    </ul>
                )
            })
        }
    }
    renderRegQuestions() {
        if (this.props.reg) {
            if (this.props.reg.length == 0) {
                return <h5>None</h5>
            }
            return this.props.reg.map( ({ questionBody, correctAnswer, answerChoices, explanation, votes, comments, _id }) => {
                return (
                    <ul className="list-group myQuestionsSingleQuestion" key={_id}>
                        <li className="list-group-item text-center"><h4 className="list-group-item-heading">{questionBody}</h4></li>
                        {this.answerChoiceHelper(answerChoices, correctAnswer)}
                        <li className="list-group-item"><strong>Explanation:</strong> {explanation}</li>
                        {this.countVotes(votes)}
                        <li className="list-group-item">
                            <h5>Comments:</h5>
                            <ul className="list-group">
                                {comments.map( comment => <li className="list-group-item" key={comment.content + comment.username}><small className="text-info">{comment.username}: </small><small>{comment.content}</small></li>)}
                            </ul>
                        </li>
                        <li className="list-group-item">
                            <button onClick={this.editQuestion.bind(this, 'reg', _id)} className="btn btn-warning editDeleteButton"><i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</button>
                        </li>
                    </ul>
                )
            })
        }
    }
    answerChoiceHelper(answers, correct_answer) {
        let answerNumber = 0;
        return (
            answers.map( (answer) => {
                let styleClass = (answers.indexOf(answer) + 1 === correct_answer) ? 'list-group-item text-success' : 'list-group-item text-danger';
                answerNumber += 1;
                return <li key={answer} className={styleClass}><strong>{answerNumber}.</strong> {answer}</li>
            })
        )
    }

    render() {
        const user = this.props.currentUser ? this.props.currentUser.username : 'user';
        return (
            <div>
                <Navbar/>
                <div className="testSelectionWrapper container">
                    <h2 className="text-center">Questions created by {user}</h2>
                    <h3 className="text-center text-info">AUD section questions</h3>
                    {this.renderAudQuestions()}
                    <h3 className="text-center text-info">BEC section questions</h3>
                    {this.renderBecQuestions()}
                    <h3 className="text-center text-info">FAR section questions</h3>
                    {this.renderFarQuestions()}
                    <h3 className="text-center text-info">REG section questions</h3>
                    {this.renderRegQuestions()}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default createContainer( () => {
    Meteor.subscribe('aud');
    Meteor.subscribe('bec');
    Meteor.subscribe('far');
    Meteor.subscribe('reg');
    return {
        aud: Aud.find({owner: Meteor.userId()}).fetch(),
        bec: Bec.find({owner: Meteor.userId()}).fetch(),
        far: Far.find({owner: Meteor.userId()}).fetch(),
        reg: Reg.find({owner: Meteor.userId()}).fetch(),
        currentUser: Meteor.user()
    }
}, MyQuestionsPage);