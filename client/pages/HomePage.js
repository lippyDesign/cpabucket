import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import FeaturesThreeColumn from '../components/FeaturesThreeColumn';

class HomePage extends Component {

    componentWillMount() { 
        if(Meteor.userId()) {
            browserHistory.push('/dashboard');
        }
    }

    getListOfFeatures() {
        return [
                {
                    bigText: "It's Free!",
                    smallText: "Our service is free to use. You can browse our material and test your knowledge without ever entering any kind of payment information.",
                    icon: 'fa fa-smile-o fa-3x'
                },
                {
                    bigText: "User Centered",
                    smallText: "Our framework revolves around you. You will be able to up-vote and down-vote questions, as well as, leave comments and participate in discussions.",
                    icon: 'fa fa-user fa-3x'
                },
                {
                    bigText: "Lightning Fast",
                    smallText: "We value every second of your time. The set up process for every section is quick and clear. Learning is just a few clicks aways.",
                    icon: 'fa fa-bolt fa-3x'
                }
            ]
    }

    render() {
        return (
            <div className="homePageWrapper">
                <Navbar/>
                <div className="jumbotronWrapper">
                    <div className="jumbotron">
                        <h3>A cool way to study for the test and help others</h3>
                        <h1>CPA Questions Bucket</h1> 
                        <div className="jumbotronParagraphWrapper">
                            <p className="jumbotronParagraph">CPA Question Bucket is a social platform for learning and teaching others</p>
                        </div>
                        <div className="jumbotronButtonWrapper">
                            <Link to="/sign-up" className="btn btn-success btn-lg">Sign Up, it's Free!</Link>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <FeaturesThreeColumn features={this.getListOfFeatures()}/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default HomePage;