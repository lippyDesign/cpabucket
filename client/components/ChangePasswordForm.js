import React, { Component } from 'react';

export default class ChangePasswordForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.changePassworedTapped}>
                <h3 className="text-center">Change Password</h3>
                <div className="col-sm-12">
                    <div className="inner-addon left-addon">
                        <i className="glyphicon glyphicon-lock"></i>
                        <input placeholder="old password" type="password" className="form-control" ref="old_password"/>
                    </div>
                    <div className="inner-addon left-addon">
                        <i className="glyphicon glyphicon-lock"></i>
                        <input placeholder="new password" type="password" className="form-control" ref="new_password"/>
                    </div>
                    <div className="inner-addon left-addon">
                        <i className="glyphicon glyphicon-lock"></i>
                        <input placeholder="confirm password" type="password" className="form-control" ref="confirm_new_password"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-lg btn-warning marginBottomTen col-xs-12">Change Password</button>
                    </div>
                </div>
            </form>
        )
    }
}