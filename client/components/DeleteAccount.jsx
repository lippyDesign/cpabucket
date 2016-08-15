import React, { Component } from 'react';

export default class DeleteAccount extends Component {
    render() {
        return (
            <form onSubmit={this.props.deleteAccountTapped}>
                <h3 className="text-center">Delete Account</h3>
                <div className="col-sm-12">
                    <div className="inner-addon left-addon">
                        <i className="glyphicon glyphicon-lock"></i>
                        <input placeholder="password" type="password" className="form-control" ref="password"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-lg btn-danger marginBottomTen col-xs-12">Delete Account</button>
                    </div>
                </div>
            </form>
        )
    }
}