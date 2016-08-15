import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { UserScores } from '../../imports/collections/userScores';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProgressGraph from '../components/ProgressGraph';

class ProgressPage extends Component {

    componentWillMount() {
        if (!Meteor.userId()) {
            browserHistory.push('/');
        }
    }
    renderScores() {
        if (this.props.userScores) {
            if (this.props.userScores.length === 0) {
                return (
                    <h5 className="text-center">You have not taken any tests yet. <Link to="testing" className="btn btn-success btn-lg">Take a Test</Link></h5>
                )
            }
            return this.props.userScores.map( ({ score, test, createdAt, _id }) => {
                return (
                    <div className="col-xs-12 col-lg-4 progressScoresWrapper" key={_id}>
                        <ul className="list-group progressScores">
                            <li className="list-group-item"><strong className="text-primary">test:</strong> <span className="bold">{test}</span></li>
                            <li className="list-group-item"><strong className="text-primary">score:</strong> {score}</li>
                            <li className="list-group-item"><strong className="text-primary">taken on:</strong> {createdAt.toDateString()}</li>
                        </ul>
                    </div>
                )
            })
        }
    }

    getData() {
        if (this.props.userScores) {
            if (this.props.userScores.length == 0) {
                return [0];
            }
            return this.props.userScores.map( ({ score }) => {
                // remove the percent sign
                str = score.slice(0, -1);
                // convert string to number
                n = Number(str);
                return n;
            })
        }
    }

    render() {
        const user = this.props.currentUser ? this.props.currentUser.username : 'user';
        const data = this.getData();
        return (
            <div>
                <Navbar active='progress' />
                <div className="progressPageWrapper container">
                    <h2 className="text-center"><span className="text-info">{user}</span>, you can track your results here</h2>
                    <ProgressGraph data={data}/>
                    <div>
                        <h3 className="text-center">Your test scores:</h3>
                        <div>
                            {this.renderScores()}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default createContainer( () => {
    Meteor.subscribe('userScores');

    return {
        currentUser: Meteor.user(),
        userScores: UserScores.find({owner: Meteor.userId()}).fetch()
    }
}, ProgressPage);