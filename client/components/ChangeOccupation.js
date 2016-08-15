import React, { Component} from 'react';

export default class ChangeOccupation extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.changeOccupationTapped}>
                    <h3 className="text-center paddingTop10">Update Occupation</h3>
                    <div className="col-sm-12">
                        <div className="inner-addon left-addon">
                            <i className="glyphicon glyphicon-briefcase"></i>
                            <input defaultValue={this.props.occupation} placeholder="your occupation" type="text" className="form-control" ref="change_occupation"/>
                        </div>
                        <div className="form-group marginBottomTen">
                            <button type="submit" className="btn btn-lg btn-info col-xs-12">Update Occupation</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}