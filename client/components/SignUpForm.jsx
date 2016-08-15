import React, { Component } from 'react';

export default class SignUpForm extends Component {
    render () {
        return (
            <form onSubmit={this.props.handleSignUp}>
                <h3 className="text-center">Sign Up Today</h3>
                <h1 className="text-center">CPA Questions Bucket</h1>
                <div className="col-sm-12">
                    <div className="inner-addon left-addon">
                        <i className="glyphicon glyphicon-user"></i>
                        <input placeholder="username" ref="username" type="text" className="form-control" />
                    </div>
                    <div className="inner-addon left-addon">
                        <i className="glyphicon glyphicon-envelope"></i>
                        <input placeholder="email" ref="email" type="email" className="form-control" />
                    </div>
                    <div className="inner-addon left-addon">
                        <i className="glyphicon glyphicon-lock"></i>
                        <input placeholder="password" ref="password" type="password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="col-xs-12 btn btn-lg btn-success marginBottomTen"><i className={this.props.spinnerOrUp} aria-hidden="true"></i> Sign Up</button>
                    </div>
                </div>
            </form>
        )
    }
}