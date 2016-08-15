import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

class DashboardPage extends Component {
    constructor() {
        super();
        this.state = {
            numQuestionsSelector: 'displayNone'
        }
    }

    componentWillMount() {
        if(!Meteor.userId()) {
            browserHistory.push('/');
        }
    }

    getTestItems() {
        return [
            {
                bigText: "Practice Tests",
                smallText: ['Auditing and Attestation (AUD)', 'Business Environment and Concepts (BEC)', 'Financial Accounting and Reporting (FAR)', 'Regulation (REG)'],
                icon: "fa fa-check-square",
                url: "testing",
            },
            {
                bigText: "Add a Question",
                smallText: ["Do you have CPA knowledge you would like to share with others? Help the CPA community to study for the test by adding a question."],
                icon: "fa fa-plus",
                url: "create-question"
            },
            {
                bigText: "My Questions",
                smallText: ["Review the questions created by you"],
                icon: "fa fa-user",
                url: "my-questions"
            },
            {
                bigText: "My Progress",
                smallText: ["Review the tests you had taken"],
                icon: "fa fa-bar-chart",
                url: "progress"
            },
            {
                bigText: "Settings",
                smallText: ["You can change settings and update your profile"],
                icon: "fa fa-cogs",
                url: "settings"
            },
            {
                bigText: "About CPA",
                smallText: ["A short overview of the CPA format"],
                icon: "fa fa-book",
                url: "about-cpa"
            },
        ]
    }

    renderMainItems() {
        return (
            this.getTestItems().map( ({ bigText, smallText, icon, url }) => {
                return (
                    <div onClick={() => {browserHistory.push(url)}} className="list-group singleMainItem" key={bigText}>
                        <div className="dashboardItem">
                            <p className="text-center"><span className="text-center mainMenuIcon"><i className={icon}></i></span></p>
                            <h4 className="list-group-item-heading text-center">{bigText}</h4>
                            <ul>{smallText.map( item => <li className="listStyleNone" key={item}><p className="list-group-item-text colorBlack">{item}</p></li>)}</ul>
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        let user = this.props.currentUser ? this.props.currentUser.username : 'user';
        
        let userTwitter = Meteor.users.find().fetch() ? Meteor.users.find().fetch().map( user => user.profile.name) : 'twitter user'
        
        if (!user) {
            user = userTwitter
        }
        return (
            <div>
                <Navbar active="dashboard" />
                <div className="container">
                    <h3>Hello {user}!</h3>
                    <div className="cardWrapper">
                        {this.renderMainItems()}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default createContainer( () => {
    return {
        currentUser: Meteor.user()
    };
}, DashboardPage);