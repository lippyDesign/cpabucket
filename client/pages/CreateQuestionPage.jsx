import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import { Aud } from '../../imports/collections/aud';
import { Bec } from '../../imports/collections/bec';
import { Far } from '../../imports/collections/far';
import { Reg } from '../../imports/collections/reg';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

class CreateQuestionPage extends Component {
    constructor() {
        super();
        this.state = {
            isAUDSelected: false,
            isBECSelected: false,
            isFARSelected: false,
            isREGSelected: false,
            answerSelected: false,
            answerOneClass: 'marginLeftTen paddingLeftRight5',
            answerTwoClass: 'marginLeftTen paddingLeftRight5',
            answerThreeClass: 'marginLeftTen paddingLeftRight5',
            answerFourClass: 'marginLeftTen paddingLeftRight5',
            errorMessage: '',
            errorMessageColor: '',
            myQuestionsButtonVisible: 'displayNone'
        }
    }

    correctAnswerSelected(answerNumber) {
        switch(answerNumber) {
            case 1:
                this.setState({
                    answerSelected: 1,
                    answerOneClass: 'marginLeftTen selectedLink paddingLeftRight5',
                    answerTwoClass: 'marginLeftTen paddingLeftRight5',
                    answerThreeClass: 'marginLeftTen paddingLeftRight5',
                    answerFourClass: 'marginLeftTen paddingLeftRight5',
                });
                break;
            case 2:
                this.setState({
                    answerSelected: 2,
                    answerOneClass: 'marginLeftTen paddingLeftRight5',
                    answerTwoClass: 'marginLeftTen selectedLink paddingLeftRight5',
                    answerThreeClass: 'marginLeftTen paddingLeftRight5',
                    answerFourClass: 'marginLeftTen paddingLeftRight5',
                });
                break;
            case 3:
                this.setState({
                    answerSelected: 3,
                    answerOneClass: 'marginLeftTen paddingLeftRight5',
                    answerTwoClass: 'marginLeftTen paddingLeftRight5',
                    answerThreeClass: 'marginLeftTen selectedLink paddingLeftRight5',
                    answerFourClass: 'marginLeftTen paddingLeftRight5',
                });
                break;
            case 4:
                this.setState({
                    answerSelected: 4,
                    answerOneClass: 'marginLeftTen paddingLeftRight5',
                    answerTwoClass: 'marginLeftTen paddingLeftRight5',
                    answerThreeClass: 'marginLeftTen paddingLeftRight5',
                    answerFourClass: 'marginLeftTen selectedLink paddingLeftRight5',
                });
                break;
            default:
                this.setState({
                    answerSelected: false,
                    answerOneClass: 'marginLeftTen paddingLeftRight5',
                    answerTwoClass: 'marginLeftTen paddingLeftRight5',
                    answerThreeClass: 'marginLeftTen paddingLeftRight5',
                    answerFourClass: 'marginLeftTen paddingLeftRight5',
                });
        }
    }

    submitQuestionTapped(event) {
        event.preventDefault();

        const questionBody = this.refs.question.value.trim();
        const answer1 = this.refs.answer1.value.trim();
        const answer2 = this.refs.answer2.value.trim();
        const answer3 = this.refs.answer3.value.trim();
        const answer4 = this.refs.answer4.value.trim();
        const explanation = this.refs.explanation.value.trim();
        const correctAnswer = this.state.answerSelected;

        // make sure the fields are not empty
        if (questionBody !== '' && answer1 !== '' && answer2 !== '' && answer3 !== '' && answer4 !== '' && explanation !== '') {
            // make sure user selected at least one test section
            if (this.state.isAUDSelected || this.state.isBECSelected || this.state.isFARSelected || this.state.isREGSelected) {
                // make sure user provided a correct answer
                if (correctAnswer) {
                    //insert the question into all collections that user selected (AUD, BEC, FAR, REG);
                    if (this.state.isAUDSelected) {
                        Meteor.call('aud.insert', questionBody, answer1, answer2, answer3, answer4, correctAnswer, explanation);
                        this.setState({ errorMessage: "Your question has been added into the database, you can review it by going to", errorMessageColor: 'text-success', myQuestionsButtonVisible: '' });
                    }
                    if (this.state.isBECSelected) {
                        Meteor.call('bec.insert', questionBody, answer1, answer2, answer3, answer4, correctAnswer, explanation);
                        this.setState({ errorMessage: "Your question has been added into the database, you can review it by going to", errorMessageColor: 'text-success', myQuestionsButtonVisible: '' });
                    }
                    if (this.state.isFARSelected) {
                        Meteor.call('far.insert', questionBody, answer1, answer2, answer3, answer4, correctAnswer, explanation);
                        this.setState({ errorMessage: "Your question has been added into the database, you can review it by going to", errorMessageColor: 'text-success', myQuestionsButtonVisible: '' });
                    }
                    if (this.state.isREGSelected) {
                        Meteor.call('reg.insert', questionBody, answer1, answer2, answer3, answer4, correctAnswer, explanation);
                        this.setState({ errorMessage: "Your question has been added into the database, you can review it by going to", errorMessageColor: 'text-success', myQuestionsButtonVisible: '' });
                    }
                    this.refs.question.value = '';
                    this.refs.answer1.value = '';
                    this.refs.answer2.value = '';
                    this.refs.answer3.value = '';
                    this.refs.answer4.value = '';
                    this.refs.explanation.value = '';
                    this.setState({
                        isAUDSelected: false,
                        isBECSelected: false,
                        isFARSelected: false,
                        isREGSelected: false,
                        answerSelected: false,
                        answerOneClass: 'marginLeftTen paddingLeftRight5',
                        answerTwoClass: 'marginLeftTen paddingLeftRight5',
                        answerThreeClass: 'marginLeftTen paddingLeftRight5',
                        answerFourClass: 'marginLeftTen paddingLeftRight5',
                    });
                } else {
                    this.setState({ errorMessage: 'please select an answer choice that corresponds with the correct answer', errorMessageColor: 'text-danger' });
                }
            } else {
                this.setState({ errorMessage: 'please select at least one test section that your question covers (AUD, BEC, FAR, REG)', errorMessageColor: 'text-danger' });
            }
        } else {
            this.setState({ errorMessage: 'all fields must be filled in', errorMessageColor: 'text-danger' });
        }
        
    }

    render() {
        let AUDClass = this.state.isAUDSelected ? 'marginLeftTen selectedLink paddingLeftRight5' : 'marginLeftTen paddingLeftRight5';
        let BECClass = this.state.isBECSelected ? 'marginLeftTen selectedLink paddingLeftRight5' : 'marginLeftTen paddingLeftRight5';
        let FARClass = this.state.isFARSelected ? 'marginLeftTen selectedLink paddingLeftRight5' : 'marginLeftTen paddingLeftRight5';
        let REGClass = this.state.isREGSelected ? 'marginLeftTen selectedLink paddingLeftRight5' : 'marginLeftTen paddingLeftRight5';
        return (
            <div>
                <Navbar active='createQuestion'/>
                <div className="container">
                    <h1 className="text-center">Create a Question</h1>
                    <label>Test Sections:</label>
                    <p>Please select all test sections that apply to your question</p>
                    <div className="selectTestLinks">
                        <a onClick={() => { this.setState({ isAUDSelected: !this.state.isAUDSelected }) }} className={AUDClass}><strong>AUD</strong></a>
                        <a onClick={() => { this.setState({ isBECSelected: !this.state.isBECSelected }) }} className={BECClass}><strong>BEC</strong></a>
                        <a onClick={() => { this.setState({ isFARSelected: !this.state.isFARSelected }) }} className={FARClass}><strong>FAR</strong></a>
                        <a onClick={() => { this.setState({ isREGSelected: !this.state.isREGSelected }) }} className={REGClass}><strong>REG</strong></a>
                    </div>
                    <form className="form-inline col-xs-12" onSubmit={this.submitQuestionTapped.bind(this)} >
                        <div className="form-group paddingBottom20">
                            <label className="paddingTop20">Question:</label>
                                <textarea
                                    rows="3"
                                    cols="150"
                                    className="form-control pull-left"
                                    type="text"
                                    ref="question"
                                    placeholder="enter the question"
                                />
                        </div>
                        <div>
                            <label className="paddingTop20">Answer choices:</label>
                            <p>Please create only one correct answer</p>
                        </div>
                        <div className="form-group paddingBottom20">
                            <label>A.</label>
                            <textarea
                                rows="2"
                                cols="100"
                                className="form-control"
                                type="text"
                                ref="answer1"
                                placeholder="answer choice 1"
                            />
                        </div>
                        <div className="form-group paddingBottom20">
                            <label>B.</label>
                            <textarea
                                rows="2"
                                cols="100"
                                className="form-control"
                                type="text"
                                ref="answer2"
                                placeholder="answer choice 2"
                            />
                        </div>
                        <div className="form-group paddingBottom20">
                            <label>C.</label>
                            <textarea
                                rows="2"
                                cols="100"
                                className="form-control"
                                type="text"
                                ref="answer3"
                                placeholder="answer choice 3"
                            />
                        </div>
                        <div className="form-group paddingBottom20">
                            <label>D.</label>
                            <textarea
                                rows="2"
                                cols="100"
                                className="form-control"
                                type="text"
                                ref="answer4"
                                placeholder="answer choice 4"
                            />
                        </div>
                        <div className="paddingBottom20">
                            <label>Correct answer:</label>
                            <p>Please select a letter corresponding to the correct answer choice above</p>
                            <div className="selectTestLinks fontSize20">
                                <a onClick={this.correctAnswerSelected.bind(this, 1)} className={this.state.answerOneClass}><strong>A</strong></a>
                                <a onClick={this.correctAnswerSelected.bind(this, 2)} className={this.state.answerTwoClass}><strong>B</strong></a>
                                <a onClick={this.correctAnswerSelected.bind(this, 3)} className={this.state.answerThreeClass}><strong>C</strong></a>
                                <a onClick={this.correctAnswerSelected.bind(this, 4)} className={this.state.answerFourClass}><strong>D</strong></a>
                            </div>
                        </div>
                        <div className="form-group paddingBottom20">
                            <label className="paddingTop20">Explanation:</label>
                            <textarea
                                rows="3"
                                cols="150"
                                className="form-control pull-left"
                                type="text"
                                ref="explanation"
                                placeholder="enter the explanation"
                            />
                        </div>
                        <h4 className={this.state.errorMessageColor}>{this.state.errorMessage} <Link className={`text-primary ${this.state.myQuestionsButtonVisible}`} to="my-questions">My Questions</Link></h4>
                        <button className="commentButton btn btn-warning btn-lg pull-left marginBottom10"><i className="fa fa-cloud-upload" aria-hidden="true"></i> Submit</button>
                    </form>
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
        aud: Aud.find({}, { sort: { createdAt: -1 } }).fetch(),
        bec: Bec.find({}, { sort: { createdAt: -1 } }).fetch(),
        far: Far.find({}, { sort: { createdAt: -1 } }).fetch(),
        reg: Reg.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
},CreateQuestionPage);