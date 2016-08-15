import React, { Component } from 'react';

export default class ForgotPasswordForm extends Component {
  
  render() {
    
    return (
      <form onSubmit={this.props.resetPassword}>
        <div className="col-sm-12">
            <div className="inner-addon left-addon">
                <i className="glyphicon glyphicon-envelope"></i>
                <input placeholder="registered email" type="email" className="form-control" ref="emailForUsersPassword"/>
            </div>
            <div className="form-group">
                <button className="col-xs-12 btn btn-lg btn-warning marginBottomTen"><i className="fa fa-paper-plane" aria-hidden="true"></i> Send Password</button>
            </div>
        </div>
     </form>
    );
  }
}