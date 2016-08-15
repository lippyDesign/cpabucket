import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SignInForm from '../components/SignInForm';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

class SignInPage extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
            spinnerOrIn: 'fa fa-sign-in',
            isPasswordResetFormVisible: 'displayNone',
            messagePasswordResetColor: '',
            messagePasswordResetContent: ''
        }
    }
    componentWillMount() { 
        if (Meteor.userId()) {
            browserHistory.push('/dashboard');
        }
    }

    handleSignIn(event) {
        event.preventDefault();
        
        // Display Loading Spinner
            this.setState({
            spinnerOrIn: 'fa fa-circle-o-notch fa-spin'
            })
    
        // Find the text field via the React refs
        const user_info = this.refs.signinForm.refs.user_info.value.trim();
        const password = this.refs.signinForm.refs.password.value.trim();
    
        // Login user
        Meteor.loginWithPassword(user_info, password, (err) => {
        
            if (err) {
                this.setState({message: err.reason});
                // Hide Loading Spinner
                this.setState({
                    spinnerOrIn: 'fa fa-sign-in'
                });
                
            } else {
                // Hide Loading Spinner
                this.setState({
                    spinnerOrIn: 'fa fa-sign-in'
                });
                // redirect to dashboard page
                browserHistory.push("/dashboard");
            }
        });
    }
    /*
    loginWithTwitter() {
        Meteor.loginWithTwitter();
        //browserHistory.push('/dashboard');
        <a onClick={this.loginWithTwitter()}>Login</a>
    }*/

    toggleResetPasswordForm(event) {
        event.preventDefault();
        
        if (this.state.isPasswordResetFormVisible === '') {
            this.setState({
                isPasswordResetFormVisible: 'displayNone'
            })
        } else {
            this.setState({
                isPasswordResetFormVisible: ''
            })
        }
    }

    resetPassword(event) {
        event.preventDefault();
        
        const emailForUsersPassword = this.refs.passwordForm.refs.emailForUsersPassword.value.trim();
        
        if (emailForUsersPassword !== "") {
            Accounts.forgotPassword({email: emailForUsersPassword}, (er) => {
                if (er) {
                    this.setState({
                        messagePasswordResetColor: 'text-danger text-center',
                        messagePasswordResetContent: (er.reason)
                    })
                } else {
                    this.setState({
                        messagePasswordResetColor: 'text-success text-center',
                        messagePasswordResetContent: "We sent you an email with instructions on how to reset your password"
                    })
                    this.refs.passwordForm.refs.emailForUsersPassword.value = '';
                }
            })
        } else {
            this.setState({
                messagePasswordResetColor: 'text-danger text-center',
                messagePasswordResetContent: "Please enter a valid email"
            })
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
                    <div className="paddingBottom20">
                        <SignInForm ref="signinForm" handleSignIn={this.handleSignIn.bind(this)} toggleResetPasswordForm={this.toggleResetPasswordForm.bind(this)} spinnerOrIn={this.state.spinnerOrIn}/>
                        
                        <div className={this.state.isPasswordResetFormVisible}>
                            <ForgotPasswordForm ref="passwordForm" resetPassword={this.resetPassword.bind(this)}/>
                            <p className={this.state.messagePasswordResetColor}>{this.state.messagePasswordResetContent}</p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default SignInPage;