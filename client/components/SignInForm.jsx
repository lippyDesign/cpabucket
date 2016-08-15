import React, { Component } from 'react';

export default class SignInForm extends Component {
    render () {
        return (
            <form onSubmit={this.props.handleSignIn}>
                <h3 className="text-center">Sign In</h3>
                <h1 className="text-center">CPA Questions Bucket</h1>
                <div className="col-sm-12">
                    <div className="inner-addon left-addon">
                        <i className="glyphicon glyphicon-user"></i>
                        <input placeholder="username or email" type="text" className="form-control" ref="user_info"/>
                    </div>
                    <div className="inner-addon left-addon">
                        <i className="glyphicon glyphicon-lock"></i>
                        <input placeholder="password" type="password" className="form-control" ref="password"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="col-xs-12 btn btn-lg btn-primary marginBottomTen"><i className={this.props.spinnerOrIn} aria-hidden="true"></i> Sign In</button>
                        <a className="pull-right forgotPasswordLink" onClick={this.props.toggleResetPasswordForm}>Forgot password?</a>
                    </div>
                </div>
            </form>
        )
    }
}