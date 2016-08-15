import React, { Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

export default class ChangeCity extends Component {

    render() {
        return (
            <div>
                <form onSubmit={this.props.changeCityTapped}>
                    <h3 className="text-center">Update City</h3>
                    <div className="col-sm-12">
                        <div className="inner-addon left-addon">
                            <i className="glyphicon glyphicon-map-marker"></i>
                            <input defaultValue={this.props.city} placeholder="your city" type="text" className="form-control" ref="change_city"/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-lg btn-info marginBottomTen col-xs-12">Update City</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}