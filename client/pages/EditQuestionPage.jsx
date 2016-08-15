import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Link, browserHistory } from 'react-router';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Aud } from '../../imports/collections/aud';
import { Bec } from '../../imports/collections/bec';
import { Far } from '../../imports/collections/far';
import { Reg } from '../../imports/collections/reg';

class EditQuestionPage extends Component {
    constructor() {
        super();
        this.state = {
            questionAthandId: '',
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
            isDeleteSectionVisible: 'displayNone',
            isDeleteButtonVisible: ''
        }
    }

    componentWillMount() { 
        
        if(!Meteor.userId()) {
            browserHistory.push('/');
        }
        
        let testSection;
        let section = this.props.params.questionId.substring(0, 3);
        let question = this.props.params.questionId.substring(3);
        this.setState({questionAthandId: question});
        switch(section) {
        case 'aud':
            this.setState({ isAUDSelected: true });
            testSection = this.props.aud
            break;
        case 'bec':
            this.setState({ isBECSelected: true });
            testSection = this.props.bec
            break;
        case 'far':
            this.setState({ isFARSelected: true });
            testSection = this.props.far
            break;
        case 'reg':
            this.setState({ isREGSelected: true });
            testSection = this.props.reg
            break;
        default:
            break;
        }

        for (let i = 0; i < testSection.length; i++) {
            if (testSection[i]._id === question) {
                switch(testSection[i].correctAnswer) {
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
                break;
            }
        }
    }

    getQuestion(section, questionId) {
        let testSection;
        switch(section) {
            case 'aud':
                testSection = this.props.aud;
                break;
            case 'bec':
                testSection = this.props.bec;
                break;
            case 'far':
                testSection = this.props.far;
                break;
            case 'reg':
                testSection = this.props.reg;
                break;
            default:
                break;
        }
        let questionInHand;
        for (let i = 0; i < testSection.length; i++) {
            if (testSection[i]._id === questionId) {
                questionInHand = testSection[i];
                break;
            }
        }
        return questionInHand;
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

    submitChangesTapped(event) {
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
                        Meteor.call('aud.updateQuestion', this.state.questionAthandId, questionBody, answer1, answer2, answer3, answer4, correctAnswer, explanation);
                        browserHistory.push('my-questions');
                    }
                    if (this.state.isBECSelected) {
                        Meteor.call('bec.updateQuestion', this.state.questionAthandId, questionBody, answer1, answer2, answer3, answer4, correctAnswer, explanation);
                        browserHistory.push('my-questions');
                    }
                    if (this.state.isFARSelected) {
                        Meteor.call('far.updateQuestion', this.state.questionAthandId, questionBody, answer1, answer2, answer3, answer4, correctAnswer, explanation);
                        browserHistory.push('my-questions');
                    }
                    if (this.state.isREGSelected) {
                        Meteor.call('reg.updateQuestion', this.state.questionAthandId, questionBody, answer1, answer2, answer3, answer4, correctAnswer, explanation);
                        browserHistory.push('my-questions');
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

    deleteQuestion(testSection, id) {
        browserHistory.push('/my-questions')
        Meteor.call(`${testSection}.remove`, id);
    }

    render() {
        let section = this.props.params.questionId.substring(0, 3);
        let question = this.props.params.questionId.substring(3);
        let questionInHand = (this.getQuestion(section, question)) ? this.getQuestion(section, question) : 'loading';

        let AUDClass = this.state.isAUDSelected ? 'marginLeftTen selectedLink paddingLeftRight5' : 'marginLeftTen paddingLeftRight5';
        let BECClass = this.state.isBECSelected ? 'marginLeftTen selectedLink paddingLeftRight5' : 'marginLeftTen paddingLeftRight5';
        let FARClass = this.state.isFARSelected ? 'marginLeftTen selectedLink paddingLeftRight5' : 'marginLeftTen paddingLeftRight5';
        let REGClass = this.state.isREGSelected ? 'marginLeftTen selectedLink paddingLeftRight5' : 'marginLeftTen paddingLeftRight5';
        
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <h1 className="text-center">Edit Question</h1>
                    <form className="form-inline col-xs-12" onSubmit={this.submitChangesTapped.bind(this)} >
                        <div className="form-group paddingBottom20">
                            <label className="paddingTop20">Question:</label>
                                <textarea
                                    rows="3"
                                    cols="150"
                                    className="form-control pull-left"
                                    type="text"
                                    ref="question"
                                    placeholder="enter the question"
                                    defaultValue={questionInHand.questionBody}
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
                                defaultValue={questionInHand.answerChoices[0]}
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
                                defaultValue={questionInHand.answerChoices[1]}
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
                                defaultValue={questionInHand.answerChoices[2]}
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
                                defaultValue={questionInHand.answerChoices[3]}
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
                                defaultValue={questionInHand.explanation}
                            />
                        </div>
                        <h4 className={this.state.errorMessageColor}>{this.state.errorMessage}</h4>
                        <button className="commentButton btn btn-warning btn-lg marginBottom10"><i className="fa fa-arrow-right" aria-hidden="true"></i> Submit Changes</button>
                    </form>
                    <div className="col-xs-12">
                        <div className={this.state.isDeleteButtonVisible}>
                            <button onClick={() => {this.setState({isDeleteSectionVisible: '', isDeleteButtonVisible: 'displayNone'})}} className="editButtons commentButton btn btn-danger btn-lg marginBottom10" ><i className="fa fa-trash-o" aria-hidden="true"></i> Delete</button>
                        </div>
                        <div className={this.state.isDeleteSectionVisible}>
                            <strong className="editButtons text-danger"><i className="fa fa-trash-o" aria-hidden="true"></i> Delete?</strong>
                            <button onClick={this.deleteQuestion.bind(this, section, question)} className="editButtons commentButton btn btn-danger btn-lg marginBottom10 marginLeftTen" >Yes</button>
                            <button onClick={() => {this.setState({isDeleteSectionVisible: 'displayNone', isDeleteButtonVisible: ''})}} className="editButtons commentButton btn btn-info btn-lg marginBottom10 marginLeftTen" >No</button>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <Link className="commentButton btn btn-primary btn-lg marginBottom10" to='/my-questions'><i className="fa fa-times" aria-hidden="true"></i> Cancel</Link>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default createContainer( ()=> {
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
}, EditQuestionPage);