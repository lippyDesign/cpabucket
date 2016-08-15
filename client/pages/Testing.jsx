import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory, Link } from 'react-router';

import { Aud } from '../../imports/collections/aud';
import { Bec } from '../../imports/collections/bec';
import { Far } from '../../imports/collections/far';
import { Reg } from '../../imports/collections/reg';
import { UserScores } from '../../imports/collections/userScores';

import CommentList from '../components/CommentList';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ImageScore from '../components/ImageScore';

let randomNumber = 0;

class Testing extends Component {
    constructor() {
        super();
        this.state = {
            testSet: false,
            shuffledTest: [],
            questionNumber: 0,
            testType: '',
            testSize: 0,
            questionsAnswered: [],
            answeredWrong: 0,
            answeredRight: 0,
            nextButtonClass: 'displayNone',
            nextButtonTitle: '',
            areSectionsVisible: 'displayNone',
            buttonsDisabled: false,
            buttonColor: 'btn btn-secondary btn-lg btn-block col-xs-12 testButton',
            statsClass: 'displayNone',
            questionWrapperClass: 'questionWrapper text-center',
            upVoted: false,
            downVoted: true,
            testComplete: false
        }
    }

    componentWillMount() { 
        if(!Meteor.userId()) {
            browserHistory.push('/dashboard');
        }
    }

    userTappedAnswer(userTapped, correctAns) {
        if (!this.state.buttonsDisabled) {
            if (userTapped == correctAns) {
                this.setState({
                    nextButtonClass: 'btn btn-success btn-lg pull-right',
                    nextButtonTitle: 'Correct',
                    answeredRight: this.state.answeredRight += 1
                });
            } else {
                this.setState({
                    nextButtonClass: 'btn btn-danger btn-lg pull-right',
                    nextButtonTitle: 'Incorrect',
                    answeredWrong: this.state.answeredWrong += 1
                });
            }
            this.setState({
                buttonsDisabled: true,
                areSectionsVisible: ' paddingTopBottom10',
                buttonColor: 'btn btn-secondary btn-lg btn-block col-xs-12 testButton disabled',
                statsClass: ''
            });
            const {questionBody, explanation, _id} = this.state.shuffledTest[this.state.questionNumber];
            this.state.questionsAnswered = this.state.questionsAnswered.concat([
                {
                    questionBody,
                    explanation,
                    _id: `${_id}and${userTapped == correctAns}`,
                    answerOfUser: userTapped == correctAns ? 'Correct' : 'Incorrect'
                }
            ])
        } else {
            return
        }
    }
    voteTapped(id, vote) {
        let questionsAtHand;
        switch(this.state.testType) {
            case 'aud':
                questionsAtHand = this.props.aud;
                break;
            case 'bec':
                questionsAtHand = this.props.bec;
                break;
            case 'far':
                questionsAtHand = this.props.far;
                break;
            case 'reg':
                questionsAtHand = this.props.reg;
                break;
            default:
                break;
        }
        let q;
        for (let i = 0; i < questionsAtHand.length; i++) {
            if (questionsAtHand[i]._id === id) {
                q = questionsAtHand[i];
                var found = false;
                for(var z = 0; z < q.votes.length; z++) {
                    if (q.votes[z].owner === this.props.currentUser._id) {
                        Meteor.call(`${this.state.testType}.removeVote`, id, {owner: this.props.currentUser._id, vote: "up"});
                        Meteor.call(`${this.state.testType}.removeVote`, id, {owner: this.props.currentUser._id, vote: "down"});
                        break;
                    }
                }
                Meteor.call(`${this.state.testType}.vote`, id, vote);
                break;
            }
        } 
    }

    getUpsCount(id) {

        let questionsAtHand;
        switch(this.state.testType) {
            case 'aud':
                questionsAtHand = this.props.aud;
                break;
            case 'bec':
                questionsAtHand = this.props.bec;
                break;
            case 'far':
                questionsAtHand = this.props.far;
                break;
            case 'reg':
                questionsAtHand = this.props.reg;
                break;
            default:
                break;
        }
        
        let q;
        let count = 0;
        for (let i = 0; i < questionsAtHand.length; i++) {
            if (questionsAtHand[i]._id === id) {
                q = questionsAtHand[i];
                for (let z = 0; z < q.votes.length; z++) {
                    if (q.votes[z].vote === "up") {
                        count += 1;
                    }
                }
            }
        }
        return count
    }

    getDownsCount(id) {

        let questionsAtHand;
        switch(this.state.testType) {
            case 'aud':
                questionsAtHand = this.props.aud;
                break;
            case 'bec':
                questionsAtHand = this.props.bec;
                break;
            case 'far':
                questionsAtHand = this.props.far;
                break;
            case 'reg':
                questionsAtHand = this.props.reg;
                break;
            default:
                break;
        }
        
        let q;
        let count = 0;
        for (let i = 0; i < questionsAtHand.length; i++) {
            if (questionsAtHand[i]._id === id) {
                q = questionsAtHand[i];
                for (let z = 0; z < q.votes.length; z++) {
                    if (q.votes[z].vote === "down") {
                        count += 1;
                    }
                }
            }
        }
        return count;
    }

    calculateResults() {
        let pPos = this.state.answeredRight + this.state.answeredWrong; 
        let pEarned = this.state.answeredRight;
        let perc = 0;
        if(isNaN(pPos) || isNaN(pEarned)){
            perc = 0;
        }else{
           perc = ((pEarned/pPos) * 100).toFixed(2);
        }
        return (
            <ul className="list-group">
                <li className="list-group-item list-group-item-success">Answered correctly: <strong>{this.state.answeredRight}</strong></li>
                <li className="list-group-item list-group-item-danger">Answered incorrectly: <strong>{this.state.answeredWrong}</strong></li>
                <li className="list-group-item list-group-item-info">Your percentage: <strong className={this.state.displayPercentageClass}>{perc}%</strong></li>
            </ul>
        )
    }

    renderTestResults() {
        return (
            this.state.questionsAnswered.map( (result) => {
                let textColor = 'text-danger';
                if (result.answerOfUser === 'Correct') {
                    textColor = 'text-success'
                }
                return (
                    <ul className="list-group" key={result._id}>
                        <li className="list-group-item"><strong>Question: </strong>{result.questionBody}</li>
                        <li className="list-group-item"><strong>Your answer was </strong><span className={textColor}>{result.answerOfUser}</span></li>
                        <li className="list-group-item"><strong>Explanation: </strong>{result.explanation}</li>
                    </ul>
                )
            })
        )
    }

    updateProgress(test) {
        let pPos = this.state.answeredRight + this.state.answeredWrong; 
        let pEarned = this.state.answeredRight;
        let perc = 0;
        if(isNaN(pPos) || isNaN(pEarned)){
            perc = 0;
        }else{
           perc = ((pEarned/pPos) * 100).toFixed(2);
        }
        let score = `${perc}%`;
        Meteor.call('userScores.insert', test, score);
        this.setState({ testComplete: true })

        return
    }

    render() {
        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

        // if user selected a test
        if (this.state.testSet) {
            let questionToShow = (this.state.questionNumber < this.state.testSize) ? this.state.shuffledTest[this.state.questionNumber]: 'Test finished';
            // if we ran out of questions
            if (typeof questionToShow === 'string' || questionToShow instanceof String) {
                if (!this.state.testComplete) {
                    this.updateProgress(this.state.testType.toUpperCase());
                }
                return (
                    <div>
                        <Navbar active='test'/>
                        <div className="container">
                            <div className="text-center">
                                <h1>Finished!</h1>
                                <h3>You answered all of this test's questions</h3>
                                <Link className="btn btn-success btn-lg" to='/dashboard'>Home</Link>
                            </div>
                            <div>
                                <h3 className="text-center">Score</h3>
                                <div>
                                    {this.calculateResults()}
                                </div>
                                <h3 className="text-center">Summary</h3>
                                <div>
                                    {this.renderTestResults()}
                                </div>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                )
            } else {
                let {questionBody, answerChoices, correctAnswer, explanation, username, upVotes, downVotes, comments, _id} = questionToShow;
                let answers = ['A', 'B', 'C', 'D']
                return (
                    <div>
                        <Navbar testTitle={this.state.testType} qNumber={this.state.answeredRight + this.state.answeredWrong} testSize={this.state.testSize} />
                        <div className="container fontSize20">
                        <div>
                            <div className="col-xs-12 paddingTopBottom10 text-center">{questionBody}</div>
                            <div className="col-xs-12 paddingTopBottom10">{answerChoices.map( answer => <button onClick={this.userTappedAnswer.bind(this, answerChoices.indexOf(answer) + 1, correctAnswer)} className={this.state.buttonColor} key={answer}><strong className="text-info">{answers[answerChoices.indexOf(answer)]}.</strong> {answer}</button>)}</div>
                        </div>
                        <div className={this.state.areSectionsVisible}>
                            <div className="col-xs-12">
                                <small>Correct answer is: <strong className="text-info">{answers[correctAnswer - 1]}</strong></small>
                                <h3 className="text-center">Explanation</h3>
                                {explanation}
                                <hr/>
                            </div>
                            <div className="col-xs-12">
                                <p><small>Created by: <em>{ username }</em></small></p>
                            </div>
                            <div className="col-xs-12 col-lg-6 col-lg-push-6 nextButton">
                                <button
                                className={this.state.nextButtonClass}
                                onClick={ () => {
                                    this.setState({
                                        questionNumber: this.state.questionNumber += 1,
                                        areSectionsVisible: 'displayNone',
                                        buttonsDisabled: false,
                                        buttonColor: 'btn btn-secondary btn-lg btn-block col-xs-12 testButton'
                                    });
                                }}>{this.state.nextButtonTitle}, Next <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                            </div>
                            <div className="col-xs-12 col-lg-6 col-lg-pull-6 text-left">
                                <h3>Thoughts on this question</h3>
                                <button
                                className="btn btn-default"
                                onClick={this.voteTapped.bind(this, _id, 'up')}
                                >{this.getUpsCount(_id)} <i className="fa fa-thumbs-up text-success" aria-hidden="true"></i></button>
                                <button
                                className="btn btn-default marginLeftTen"
                                onClick={this.voteTapped.bind(this, _id, 'down')}
                                >{this.getDownsCount(_id)} <i className="fa fa-thumbs-down text-danger" aria-hidden="true"></i></button>
                                <ImageScore ups={this.getUpsCount.bind(this, _id)} downs={this.getDownsCount.bind(this, _id)} />
                            </div>
                            <div>
                                <h3 className="text-center">Discussion</h3>
                                <div className="col-xs-12">
                                    <form className=""
                                    onSubmit={ (event) => {
                                        event.preventDefault();
                                        if (this.refs.questionCommentField.value.trim() !== '') {
                                            Meteor.call(`${this.state.testType}.addComment`, _id, this.refs.questionCommentField.value.trim());
                                            this.refs.questionCommentField.value = '';
                                        }
                                    }}>
                                        <textarea
                                            rows="2"
                                            cols="150"
                                            className="form-control commentTextArea pull-left"
                                            type="text"
                                            ref="questionCommentField"
                                            placeholder="Comment"
                                        />
                                        <button className="commentButton btn btn-default pull-left">Add a Comment</button>
                                    </form>
                                </div>
                                <div className="col-xs-12 text-left">
                                    <CommentList _id={_id} testType={this.state.testType}/>
                                </div>
                            </div>
                            <div className={this.state.statsClass}>
                                <h3 className="text-center">Score</h3>
                                <div>
                                    {this.calculateResults()}
                                </div>
                                <h3 className="text-center">Summary</h3>
                                <div>
                                    {this.renderTestResults()}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                )
            }
            
        } else {
            return (
                <div>
                    <div className="marginBottom10">
                        <Navbar active='test'/>
                    </div>
                    <div className="container">
                <div className="col-xs-12 col-lg-6">
                    <ul className="list-group testSelector">
                        <li className="list-group-item"><h3 className="list-group-item-heading text-center">AUD practice test</h3></li>
                        <li className="list-group-item">
                            <ul>
                                <li><p className="list-group-item-text">Planning the engagement</p></li>
                                <li><p className="list-group-item-text">Internal controls</p></li>
                                <li><p className="list-group-item-text">Obtain and document information</p></li>
                                <li><p className="list-group-item-text">Review engagement and evaluate information</p></li>
                                <li><p className="list-group-item-text">Prepare communications</p></li>
                            </ul>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'aud', testSet: true });
                                    let aud = this.props.aud;
                                    let shuffled = shuffle(aud);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 50) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                AUD 50 Questions
                            </button>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'aud', testSet: true });
                                    let aud = this.props.aud;
                                    let shuffled = shuffle(aud);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 100) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                AUD 100 Questions
                            </button>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'aud', testSet: true });
                                    let aud = this.props.aud;
                                    let shuffled = shuffle(aud);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 150) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                AUD 150 Questions
                            </button>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'aud', testSet: true });
                                    let aud = this.props.aud;
                                    let shuffled = shuffle(aud);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 200) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                AUD 200 Questions
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-lg-6">
                    <ul className="list-group testSelector">
                        <li className="list-group-item"><h3 className="list-group-item-heading text-center">BEC practice test</h3></li>
                        <li className="list-group-item">
                            <ul>
                                <li><p className="list-group-item-text">Business structure</p></li>
                                <li><p className="list-group-item-text">Economic concepts</p></li>
                                <li><p className="list-group-item-text">Financial management</p></li>
                                <li><p className="list-group-item-text">Information technology</p></li>
                                <li><p className="list-group-item-text">Planning and measurement</p></li>
                            </ul>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'bec', testSet: true });
                                    let bec = this.props.bec;
                                    let shuffled = shuffle(bec);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 50) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                BEC 50 Questions
                            </button>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'bec', testSet: true });
                                    let bec = this.props.bec;
                                    let shuffled = shuffle(bec);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 100) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                BEC 100 Questions
                            </button>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'bec', testSet: true });
                                    let bec = this.props.bec;
                                    let shuffled = shuffle(bec);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 150) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                BEC 150 Questions
                            </button>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'bec', testSet: true });
                                    let bec = this.props.bec;
                                    let shuffled = shuffle(bec);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 200) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                BEC 200 Questions
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-lg-6">
                    <ul className="list-group testSelector">
                        <li className="list-group-item"><h3 className="list-group-item-heading text-center">FAR practice test</h3></li>
                        <li className="list-group-item">
                            <ul>
                                <li><p className="list-group-item-text">Concepts and standards for financial statements</p></li>
                                <li><p className="list-group-item-text">Typical items in financial statements</p></li>
                                <li><p className="list-group-item-text">Specific types of transactions and events</p></li>
                                <li><p className="list-group-item-text">Accounting and reporting for governmental entities</p></li>
                                <li><p className="list-group-item-text">Accounting and reporting for nongovernmental and not-for-profit organizations</p></li>
                            </ul>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'far', testSet: true });
                                    let far = this.props.far;
                                    let shuffled = shuffle(far);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 50) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                FAR 50 Questions
                            </button>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'far', testSet: true });
                                    let far = this.props.far;
                                    let shuffled = shuffle(far);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 100) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                FAR 100 Questions
                            </button>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'far', testSet: true });
                                    let far = this.props.far;
                                    let shuffled = shuffle(far);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 150) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                FAR 150 Questions
                            </button>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'far', testSet: true });
                                    let far = this.props.far;
                                    let shuffled = shuffle(far);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 200) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                FAR 200 Questions
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-lg-6">
                    <ul className="list-group testSelector">
                        <li className="list-group-item"><h3 className="list-group-item-heading text-center">REG practice test</h3></li>
                        <li className="list-group-item">
                            <ul>
                                <li><p className="list-group-item-text">Ethics and professional responsibility</p></li>
                                <li><p className="list-group-item-text">Business law</p></li>
                                <li><p className="list-group-item-text">Federal tax procedures and accounting issues</p></li>
                                <li><p className="list-group-item-text">Federal taxation of property transactions</p></li>
                                <li><p className="list-group-item-text">Federal taxation- individual and entities</p></li>
                            </ul>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'reg', testSet: true });
                                    let reg = this.props.reg;
                                    let shuffled = shuffle(reg);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 50) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                REG 50 Questions
                            </button>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'reg', testSet: true });
                                    let reg = this.props.reg;
                                    let shuffled = shuffle(reg);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 100) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                REG 100 Questions
                            </button>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'reg', testSet: true });
                                    let reg = this.props.reg;
                                    let shuffled = shuffle(reg);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 150) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                REG 150 Questions
                            </button>
                        </li>
                        <li className="list-group-item text-center">
                            <button
                                className="btn btn-info btn-lg"
                                onClick={() => {
                                    // set test kind and size
                                    this.setState({ testType: 'reg', testSet: true });
                                    let reg = this.props.reg;
                                    let shuffled = shuffle(reg);
                                    this.setState({ shuffledTest: this.state.shuffledTest.concat(shuffled)});
                                    if (shuffled.length < 200) {
                                        this.setState({ testSize: shuffled.length});
                                    }
                                }}
                            >
                                REG 200 Questions
                            </button>
                        </li>
                    </ul>
                </div>
                </div>
                    <Footer/>
                </div>
            )
        }
    }
}

export default createContainer( () => {
    Meteor.subscribe('aud');
    Meteor.subscribe('bec');
    Meteor.subscribe('far');
    Meteor.subscribe('reg');
    Meteor.subscribe('userScores');
    
    return {
        aud: Aud.find().fetch(),
        bec: Bec.find().fetch(),
        far: Far.find().fetch(),
        reg: Reg.find().fetch(),
        userScores: UserScores.find().fetch(),
        currentUser: Meteor.user(),
    }
        
    
}, Testing);