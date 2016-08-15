import React from 'react';
import { Sparklines, SparklinesLine, SparklinesBars } from 'react-sparklines';

export default (props) => {
    if (props.data.length < 2) {
        return <div></div>
    }
    return (
        <div>
            <h3 className="text-center">Your progress graph:</h3>
            <Sparklines data={props.data} width={100} height={20}>
                <SparklinesLine color="#03a9f4" />
            </Sparklines>
        </div>
    )
}