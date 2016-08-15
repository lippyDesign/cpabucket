import React, { Component } from 'react';

export default class ContactForm extends Component {
    
    render() {
        return (
            <div>  
                <h1 className="text-center">Contact Us</h1>
                <p className="text-center">Do you have a question? We are here to help!</p>
                <p className="text-center">Else, If you know of ways we can make our app better, please send us feedback so we could improve the experience for you!</p>
                <p className="text-center">Thanx!</p>
                <p className="text-center">The CPA Bucket team!</p>
                <form onSubmit={this.props.contactUsTapped}>
                    <div className="col-sm-12">
                        <div className="inner-addon left-addon">
                            <i className="glyphicon glyphicon-envelope"></i>
                            <input defaultValue={this.props.userEmail} placeholder="email" ref="email" type="email" className="form-control" />
                        </div>
                        <div className="inner-addon left-addon">
                            <i className="glyphicon glyphicon-pencil"></i>
                            <textarea rows="7" cols="150" placeholder="message" ref="message" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="col-xs-12 btn btn-lg btn-primary marginBottomTen"><i className="fa fa-paper-plane" aria-hidden="true"></i> Send</button>
                        </div>
                    </div>
                </form>
            </div>
        );
  }
}