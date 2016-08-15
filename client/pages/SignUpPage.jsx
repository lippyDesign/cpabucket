import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SignUpForm from '../components/SignUpForm';

class SignUpPage extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
            spinnerOrUp: 'fa fa-user-plus'
        }
    }
    componentWillMount() { 
        if (Meteor.userId()) {
            browserHistory.push('/dashboard');
        }
    }

    handleSignUp(event) {
        event.preventDefault();
        // Find the text field via the React refs
        const username = this.refs.sign_up_form.refs.username.value.trim();
        const email = this.refs.sign_up_form.refs.email.value.trim();
        const password = this.refs.sign_up_form.refs.password.value.trim();
        
        if (password !== "" && email !== "" && username !== "") {
        
            // Display Loading Spinner
            this.setState({
                spinnerOrUp: 'fa fa-circle-o-notch fa-spin'
            });
        
            var accountInfo = {
                email,
                password,
                username,
                profile: {
                    city: '',
                    occupation: '',
                    avatar: 'http://placehold.it/150x150',
                }
            }
                
            Accounts.createUser(accountInfo, (err) => {
                // if there was an error creating an account, hide spinner, display error message
                if (err) {
                    this.setState({message: err.reason, spinnerOrUp: 'fa fa-user-plus'});                 
                    return;
                } else {
                    this.refs.sign_up_form.refs.username.value = '';
                    this.refs.sign_up_form.refs.email.value = '';
                    this.refs.sign_up_form.refs.password.value = '';
                    // redirect to dashboard page
                    browserHistory.push("/dashboard");
                }
            });

        } else {
            this.setState({message: 'Passwords do not match or a field is empty'});
            return;
        }
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="messanger">
                    <h3 className="text-center text-danger">{this.state.message}</h3>
                </div>
                <div className="formWrapper">
                    <SignUpForm ref="sign_up_form" handleSignUp={this.handleSignUp.bind(this)} spinnerOrUp={this.state.spinnerOrUp}/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default SignUpPage;