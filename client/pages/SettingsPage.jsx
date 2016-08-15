import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ChangeOccupation from '../components/ChangeOccupation';
import ChangeCity from '../components/ChangeCity';
import ChangePasswordForm from '../components/ChangePasswordForm';
import DeleteAccount from '../components/DeleteAccount';

class SettingsPage extends Component {
    constructor() {
        super();
        this.state = {
            errorMessage: '',
            passwordMessage: '',
            messageColor: '',
            cityMessage: '',
            occupationMessage: '',
            cityMessageColor: '',
            occupationMessageColor: ''
        }
    }

    componentWillMount() {
        if (!Meteor.userId()) {
            browserHistory.push('/');
        }
    }

    changePassworedTapped(e) {
        e.preventDefault();
        var oldPassword = this.refs.changePassword.refs.old_password.value.trim();
        var newPassword = this.refs.changePassword.refs.new_password.value.trim();
        var confirmPassword = this.refs.changePassword.refs.confirm_new_password.value.trim();
        if (confirmPassword === newPassword && newPassword !== "") {
            Accounts.changePassword(oldPassword, newPassword, (er)=> {
                if (er) {
                    this.setState({ passwordMessage: er.reason, messageColor: 'text-danger' })
                } else {
                    this.setState({ passwordMessage: 'New password has been set', messageColor: 'text-success' })
                    this.refs.changePassword.refs.old_password.value = ''
                    this.refs.changePassword.refs.new_password.value = ''
                    this.refs.changePassword.refs.confirm_new_password.value = ''
                }
            });
        } else {
            this.setState({ passwordMessage: 'Passwords do not match or a field is empty', messageColor: 'text-danger' });
        }
    }

    changeCityTapped(e){
        e.preventDefault();
        var newCity = this.refs.changeCity.refs.change_city.value.trim();
        if (newCity !== '') {
            Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.city": newCity}});
            this.setState({ cityMessage: `City changed to ${newCity}`, cityMessageColor: 'text-success' });
        } else {
            this.setState({ cityMessage: "Please enter your city", cityMessageColor: 'text-danger' });
        }
        
    }

    changeOccupationTapped(e){
        e.preventDefault();
        var newOccupation = this.refs.changeOccupation.refs.change_occupation.value.trim();
        if (newOccupation !== '') {
            Meteor.users.update({_id: Meteor.userId()}, {$set: {"profile.occupation": newOccupation}});
            this.setState({ occupationMessage: `Occupation changed to ${newOccupation}`, occupationMessageColor: 'text-success' });
        } else {
            this.setState({ occupationMessage: "Please enter your occupation", occupationMessageColor: 'text-danger' });
        }
    }

    deleteAccountTapped(e) {
        e.preventDefault();
        /*
        this function will delete users account as long as user confirms to delete account and enters a valid password for the account;
        to match the password, we use the change password method from METEOR. After the password change (to the same password) had been successful,
        we delete the account
        */
        if (confirm("Delete this account?")) {

            let passwordToDeleteAccount = this.refs.deleteAccount.refs.password.value.trim();

            Accounts.changePassword(passwordToDeleteAccount, passwordToDeleteAccount, (er)=> {
                if (er) {
                    console.log(er.reason);
                    this.setState({errorMessage: er.reason})
                    return
                } else {
                    Meteor.users.remove({_id: Meteor.userId()});
                    browserHistory.push('/');
                }
            });
        } else {
            return
        }
    }

    render() {
        let city = this.props.currentUser ? this.props.currentUser.profile.city : '';
        let occupation = this.props.currentUser ? this.props.currentUser.profile.occupation : ''

        return (
            <div>
                <Navbar active='settings'/>
                <div className="container">
                    <h1 className="text-center">Settings Page</h1>
                    <div className="col-xs-12 col-lg-6 col-lg-offset-3 settingsItem marginBottom20">
                        <ChangeCity ref="changeCity" changeCityTapped={this.changeCityTapped.bind(this)} city={city}/>
                        <p className={`text-center ${this.state.cityMessageColor}`}>{this.state.cityMessage}</p>
                    </div>
                    <div className="col-xs-12 col-lg-6 col-lg-offset-3 settingsItem marginBottom20">
                        <ChangeOccupation ref="changeOccupation" changeOccupationTapped={this.changeOccupationTapped.bind(this)} occupation={occupation}/>
                        <p className={`text-center ${this.state.occupationMessageColor}`}>{this.state.occupationMessage}</p>
                    </div>
                    <div className="col-xs-12 col-lg-6 col-lg-offset-3 settingsItem marginBottom20">
                        <ChangePasswordForm ref="changePassword" changePassworedTapped={this.changePassworedTapped.bind(this)}/>
                        <p className={`text-center ${this.state.messageColor}`}>{this.state.passwordMessage}</p>
                    </div>
                    <div className="col-xs-12 col-lg-6 col-lg-offset-3 paddingBottom20 settingsItem marginBottom20">
                        <DeleteAccount ref="deleteAccount" deleteAccountTapped={this.deleteAccountTapped.bind(this)}/>
                        <p className="text-center text-danger">{this.state.errorMessage}</p>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default createContainer(() => {
    return {
        currentUser: Meteor.user()
    };
}, SettingsPage);