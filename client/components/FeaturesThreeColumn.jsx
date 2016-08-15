import React, { Component } from 'react';

class FeaturesThreeColumn extends Component {

    // Takes an array of objects from parent component and breaks it down into (features.bigText, features.smallText, features.icon)
    // returns three colums

    getFeatures() {
        return this.props.features.map( ({ bigText, smallText, icon }) => {
            return (
                <div key={bigText} className="col-xs-12 col-lg-4 text-center">
                    <h1><i className={icon} aria-hidden="true"></i></h1>
                    <h2>{bigText}</h2>
                    <p>{smallText}</p>
                </div>
            );
        });
    }

    render() {
        return (
            <div>{this.getFeatures()}</div>
        )
    }
}

export default FeaturesThreeColumn;