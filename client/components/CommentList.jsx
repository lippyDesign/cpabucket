import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Aud } from '../../imports/collections/aud';
import { Bec } from '../../imports/collections/bec';
import { Far } from '../../imports/collections/far';
import { Reg } from '../../imports/collections/reg';

class CommentList extends Component {
    getComments() {
        let questionsAtHand;
        switch(this.props.testType) {
            case 'aud':
                questionsAtHand = this.props.aud;
                break;
            case 'bec':
                questionsAtHand = this.props.bec;
                break;
            case 'far':
                questionsAtHand = this.props.far;
                break;
            case 'reg':
                questionsAtHand = this.props.reg;
                break;
            default:
                break;
        }

        let q;
        for (let i = 0; i < questionsAtHand.length; i++) {
            if (questionsAtHand[i]._id === this.props._id) {
                q = questionsAtHand[i];
            }
        }
        q.comments.reverse();
        return q.comments.map( comment => <li className="list-group-item list-group-item-warning" key={comment.content}><small className="text-info">{comment.username}: </small><small>{comment.content}</small></li>);
    }

    render() {
        
        return (
            <div>
            <ul className="paddingTopBottom10 list-group commentsUl">
                {this.getComments()}
            </ul>
            </div>
        )
    }
}
export default createContainer( () =>{
    Meteor.subscribe('aud');
    Meteor.subscribe('bec');
    Meteor.subscribe('far');
    Meteor.subscribe('reg');
    
    return {
        aud: Aud.find().fetch(),
        bec: Bec.find().fetch(),
        far: Far.find().fetch(),
        reg: Reg.find().fetch(),
        currentUser: Meteor.user(),
    }
}, CommentList);