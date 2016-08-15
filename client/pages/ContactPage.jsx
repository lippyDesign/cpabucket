import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm.jsx';

class ContactPage extends Component {
  constructor() {
    super();
    this.state = {
      warningMessageColor: '',
      warningMessageContent: ''
    }
  }

  contactUsTapped(e) {
    e.preventDefault();

    const email_of_user = this.refs.contactForm.refs.email.value.trim();
    const message_content = this.refs.contactForm.refs.message.value.trim();

    if (email_of_user !== '' && message_content !== '') {
      Meteor.call('sendEmail', 'wouldntyou@liketoknow.com', email_of_user, 'NEW MESSAGE regarding CPA Bucket', message_content);

      this.refs.contactForm.refs.email.value = '';
      this.refs.contactForm.refs.message.value = '';
      this.setState({
        warningMessageColor: 'text-success text-center',
        warningMessageContent: 'message sent'
      });
    } else {
      this.setState({
        warningMessageColor: 'text-danger text-center',
        warningMessageContent: 'Make sure all fields are filld out'
      })
    }
  }  
    
  render() {
      let userEmail = this.props.currentUser ? this.props.currentUser.emails[0].address : ''
      return (
        <div>
            <Navbar/>
              <div className=" contactWrapper">
                <div className="col-xs-12 col-lg-6 col-lg-offset-3">
                  <ContactForm contactUsTapped={this.contactUsTapped.bind(this)} ref="contactForm" userEmail={userEmail}/>
                  <p className={this.state.warningMessageColor}>{this.state.warningMessageContent}</p>
                </div>
              </div>
            <Footer/>
          </div>
      )
  }
}

export default createContainer( ()=> {
  return {
    currentUser:  Meteor.user()
  }
}, ContactPage)