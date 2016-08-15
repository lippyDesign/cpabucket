import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

let questions = [];
let randomNumber;

class SampleTestPage extends Component {
    constructor() {
        super();
        
        this.state = {
            questionAtHand: {},
            questionsAnswered: [],
            answeredWrong: 0,
            answeredRight: 0,
            nextButtonClass: 'displayNone',
            nextButtonTitle: '',
            areSectionsVisible: 'displayNone',
            buttonsDisabled: false,
            buttonColor: 'btn btn-secondary btn-lg btn-block col-xs-12 testButton',
            displayPercentageClass: 'displayNone',
            statsClass: 'displayNone',
            questionWrapperClass: 'questionWrapper text-center',
            finishedMessageClassName: 'displayNone'
        }
    }

    componentWillMount() { 
        if(Meteor.userId()) {
            browserHistory.push('/dashboard');
        }
        questions = this.getSampleTest();
        randomNumber = Math.floor(Math.random() * questions.length);
        this.setState({
            questionAtHand: questions[randomNumber]
        })
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
                areSectionsVisible: 'paddingTopBottom10',
                buttonColor: 'btn btn-secondary btn-lg btn-block col-xs-12 testButton disabled',
                displayPercentageClass: ''
            });
        } else {
            return
        }
    }

    submitCommentTapped(event) {
        event.preventDefault();
        console.log('submitCommentTapped');
    }

    nextTapped() {
        
        if (questions.length == 1) {
            this.setState({questionWrapperClass: 'displayNone', finishedMessageClassName: "text-center paddingBottom20"});
            return
        }
        let answeredQuestion = questions.splice(randomNumber, 1);
        randomNumber = Math.floor(Math.random() * questions.length);
        this.state.questionsAnswered = this.state.questionsAnswered.concat([
            {
                testQuestion: answeredQuestion[0].testQuestion,
                questionExplanation: answeredQuestion[0].questionExplanation,
                id: answeredQuestion[0].id,
                answerOfUser: this.state.nextButtonTitle
            }
            ])
        this.setState({
            questionAtHand: questions[randomNumber],
            nextButtonClass: 'displayNone',
            areSectionsVisible: 'displayNone',
            buttonsDisabled: false,
            buttonColor: 'btn btn-secondary btn-lg btn-block col-xs-12 testButton',
            statsClass: 'text-center'
        });
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
                    <ul className="list-group" key={result.id}>
                        <li className="list-group-item"><strong>Question: </strong>{result.testQuestion}</li>
                        <li className="list-group-item"><strong>Your answer was </strong><span className={textColor}>{result.answerOfUser}</span></li>
                        <li className="list-group-item"><strong>Explanation: </strong>{result.questionExplanation}</li>
                    </ul>
                )
            })
        )
    }

    getSampleTest() {
        return [
            {
                id: 'sample1',
                testQuestion: 'Which of the following items is tangible personal property?',
                answerChoices: ["Stock Certificate", "Note payable", "Promissory Note", "Hardware"],
                correctAnswer: 3,
                questionExplanation: "Tangible property can be touched, and seen. The remaining answers are all intangible property. Their value is not seen.",
                createdBy: 'Admin',
                testVotes: {ups: 0, downs: 0},
                testComments: [{id: 'Admin1', commentBy: 'Admin', comment: "Create an account today, it's free!"}, {id: 'Admin2', commentBy: 'Admin', comment: 'UpVotes, DownVotes and question discussion are disabled in this Sample Test.'}]
            },
            {
                id: 'sample2',
                testQuestion: "John is the grantor of a trust over which he has retained discretionary power to receive income. Anastasia, John's mother, receives all taxable income from the trust unless John exercises the discretionary power. To whom is the income (earned by the trust) is taxable?",
                answerChoices: ["To the trust to the extent it remains in the trust", "To John because he has retained discretionary power", "To Anastasia as the beneficiary of the trust", "To both in proportion to the distributions paid to them from the trust"],
                correctAnswer: 1,
                questionExplanation: "If a grantor retains discretionary power, then, the income from the trust is taxed to the grantor, whether or not the grantor receives the income.",
                createdBy: 'Admin',
                testVotes: {ups: 0, downs: 0},
                testComments: [{id: 'Admin1', commentBy: 'Admin', comment: "Create an account today, it's free!"}, {id: 'Admin2', commentBy: 'Admin', comment: 'UpVotes, DownVotes and question discussion are disabled in this Sample Test.'}]
            },
            {
                id: 'sample3',
                testQuestion: "Trees associated with land are considered what type of property?",
                answerChoices: ["Real property", "Tangible property", "Personal property", "Section 1231 property"],
                correctAnswer: 0,
                questionExplanation: "Trees are considered real property as they are permanently attached to the land and are closely associated with the use of the land.",
                createdBy: 'Admin',
                testVotes: {ups: 0, downs: 0},
                testComments: [{id: 'Admin1', commentBy: 'Admin', comment: "Create an account today, it's free!"}, {id: 'Admin2', commentBy: 'Admin', comment: 'UpVotes, DownVotes and question discussion are disabled in this Sample Test.'}]
            },
            {
                id: 'sample4',
                testQuestion: "Which of the following should be used in computing the basis of a partner's interest acquired from another partner? 1. Cash paid by transferee to transferor 2. Transferee's share of partnership liabilities",
                answerChoices: ["Only 2", "Only 1", "Neither 1 nor 2", "Both 1 and 2"],
                correctAnswer: 3,
                questionExplanation: "The basis of a partnership interest is the cash contributed + the adjusted basis of any property contributed + any increase in partner's individual liablities because of an assumption of partnership liabilities is considered a contribution",
                createdBy: 'Admin',
                testVotes: {ups: 0, downs: 0},
                testComments: [{id: 'Admin1', commentBy: 'Admin', comment: "Create an account today, it's free!"}, {id: 'Admin2', commentBy: 'Admin', comment: 'UpVotes, DownVotes and question discussion are disabled in this Sample Test.'}]
            },
            {
                id: 'sample5',
                testQuestion: "What is the waiting period between the registration and the filing date?",
                answerChoices: ["30 days", "45 days", "60 days", "20 days"],
                correctAnswer: 3,
                questionExplanation: "The waiting period is 20 days. During that time a company cannot sell the stock. Oral offers are allowed however. After 20 days, the securities can be sold on an open market.",
                createdBy: 'Admin',
                testVotes: {ups: 0, downs: 0},
                testComments: [{id: 'Admin1', commentBy: 'Admin', comment: "Create an account today, it's free!"}, {id: 'Admin2', commentBy: 'Admin', comment: 'UpVotes, DownVotes and question discussion are disabled in this Sample Test.'}]
            },
            {
                id: 'sample6',
                testQuestion: "Which form does a company file if its CFO resigns?",
                answerChoices: ["10-K", "10-Q", "8-K", "6-K"],
                correctAnswer: 2,
                questionExplanation: "8-K must be filled 4 days after any major corporate event. These changes are typically: merger information, changes in corporate control, and sale of major business lines.",
                createdBy: 'Admin',
                testVotes: {ups: 0, downs: 0},
                testComments: [{id: 'Admin1', commentBy: 'Admin', comment: "Create an account today, it's free!"}, {id: 'Admin2', commentBy: 'Admin', comment: 'UpVotes, DownVotes and question discussion are disabled in this Sample Test.'}]
            },
            {
                id: 'sample7',
                testQuestion: "In order to continue working at a law firm, Andy had to take several classes in regards to patent law. Where can Andy take the deduction for the classes?",
                answerChoices: ["As an adjustment to income, deductible from gross income", "As an itemized deduction", "As a credit", "As either A or B"],
                correctAnswer: 1,
                questionExplanation: "The classes can be deducted as a 2% miscellaneous deduction before AGI, because they are required to keep Andy's job. Since Andy took only a few classes, he is not considered to be in pursuit of a four-year degree, therefore the classes cannot be deducted elsewhere. If the employer reimburses Andy for these expenses, they are not deductible.",
                createdBy: 'Admin',
                testVotes: {ups: 0, downs: 0},
                testComments: [{id: 'Admin1', commentBy: 'Admin', comment: "Create an account today, it's free!"}, {id: 'Admin2', commentBy: 'Admin', comment: 'UpVotes, DownVotes and question discussion are disabled in this Sample Test.'}]
            },
            {
                id: 'sample8',
                testQuestion: "Corp Nexus is being audited by United LLP in connection with attaining a loan form Oakland Bank. If United LLP commits negligence and Nexus defaults on the loan, which party can sue United LLP?",
                answerChoices: ["Oakland Bank's customers", "Oakland Bank", "Both A and B", "Neither A or B"],
                correctAnswer: 1,
                questionExplanation: "Since the bank's customers are not using United LLP's audit report, they cannot sue. However, the Bank is relying on United's audit report, therefore the bank can sue for negligence.",
                createdBy: 'Admin',
                testVotes: {ups: 0, downs: 0},
                testComments: [{id: 'Admin1', commentBy: 'Admin', comment: "Create an account today, it's free!"}, {id: 'Admin2', commentBy: 'Admin', comment: 'UpVotes, DownVotes and question discussion are disabled in this Sample Test.'}]
            },
            {
                id: 'sample9',
                testQuestion: "A corporation decides to change from a calendar year to a fiscal year. What document would govern this particular action?",
                answerChoices: ["Proxy statement", "A corporate agreement", "Bylaws", "Form 1120"],
                correctAnswer: 2,
                questionExplanation: "The bylaws spell out the tax filing year, the record of where the corporate books are held, description of the rights and power of all the directors and offices, and their compensation.  A proxy statement is a statement that is filed in advance for shareholder votes. Form 1120 is federal corporate form.",
                createdBy: 'Admin',
                testVotes: {ups: 0, downs: 0},
                testComments: [{id: 'Admin1', commentBy: 'Admin', comment: "Create an account today, it's free!"}, {id: 'Admin2', commentBy: 'Admin', comment: 'UpVotes, DownVotes and question discussion are disabled in this Sample Test.'}]
            },
            {
                id: 'sample10',
                testQuestion: "A client has left ABC Accountants and started as a new client in the firm XYZ Accountants. XYZ asked for the wokrpapers associated with the basis calculation of partnership interest. Does ABC have an obligation to provide those workpapers to XYZ?",
                answerChoices: ["Yes, they belong to the client","Yes, when information is requested with prior year's returns, an accounting firm must provide information","No, because ABC owns the workpapers","No, because the client owns the workpapers and must decide"],
                correctAnswer: 2,
                questionExplanation: "Workpapers belong to the accountant that prepares them, they do not belong to the client. They can be shown to a prospective purchaser of the CPA firm, under a subpoena, or to defend a lawsuit against the client.",
                createdBy: 'Admin',
                testVotes: {ups: 0, downs: 0},
                testComments: [{id: 'Admin1', commentBy: 'Admin', comment: "Create an account today, it's free!"}, {id: 'Admin2', commentBy: 'Admin', comment: 'UpVotes, DownVotes and question discussion are disabled in this Sample Test.'}]
            },
            {
                id: 'sample11',
                testQuestion: "A business owner, Joel, wants to create his own business. He does not want to be personally liable for the business. How should he incorporate?",
                answerChoices: ["LLC", "Joint Venture", "Sole proprietorship", "Either A or B"],
                correctAnswer: 0,
                questionExplanation: "Joel should register his business as Limited Liability Company. It will limit his liability to the assets of the company.",
                createdBy: 'Admin',
                testVotes: {ups: 0, downs: 0},
                testComments: [{id: 'Admin1', commentBy: 'Admin', comment: "Create an account today, it's free!"}, {id: 'Admin2', commentBy: 'Admin', comment: 'UpVotes, DownVotes and question discussion are disabled in this Sample Test.'}]
            }
        ]
    }
    render() {

        let { testQuestion, answerChoices, correctAnswer, questionExplanation, testVotes, testComments, createdBy } = this.state.questionAtHand;
            return (
                <div>
                    <Navbar active='sampleTest'/>
                    <div className="container">
                        <div className={this.state.questionWrapperClass}>
                            <div className="col-xs-12 paddingTopBottom10">{testQuestion}</div>
                            <div className="col-xs-12 paddingTopBottom10">{answerChoices.map( answer => <button onClick={this.userTappedAnswer.bind(this, answerChoices.indexOf(answer), correctAnswer)} className={this.state.buttonColor} key={answer}>{answerChoices.indexOf(answer) + 1}. {answer}</button>)}</div>
                            <div className={this.state.areSectionsVisible}>
                                <h3>Explanation</h3>
                                {questionExplanation}
                            </div>
                            <div className={this.state.areSectionsVisible}>
                                <p className="text-right"><small>Created by { createdBy }</small></p>
                            </div>
                            <div className="col-xs-12 col-lg-6 col-lg-push-6 nextButton">
                                <button onClick={this.nextTapped.bind(this)} className={this.state.nextButtonClass}>{this.state.nextButtonTitle}, Next <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                            </div>
                            <div className="col-xs-12 col-lg-6 col-lg-pull-6 text-left">
                                <span className={this.state.areSectionsVisible}>
                                   
                                </span>
                            </div>
                        </div>
                        <div className={this.state.finishedMessageClassName}>
                            <h1>Finished!</h1>
                            <h3>You just answered all of this Sample Test's questions</h3>
                            <h4>Sing up today, it's free!</h4>
                            <Link className="btn btn-success btn-lg" to='/sign-up'>Sign Up</Link>
                        </div>
                        <div>
                            <h3 className="text-center">Score</h3>
                            <div>
                                {this.calculateResults()}
                            </div>
                            <h3 className={this.state.statsClass}>Summary</h3>
                            <div>
                                {this.renderTestResults()}
                            </div>
                        </div>
                    </div>

                    <Footer/>
                </div>
            )
    }
}

export default SampleTestPage;