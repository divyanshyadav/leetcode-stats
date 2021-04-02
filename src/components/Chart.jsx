import React from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {
    XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis,
} from 'react-vis';

function Chart({ data }) {
    return (
        <div>
            <XYPlot height={150} width={600}>
                <LineSeries data={data} />
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="Question" />
                <YAxis title="time (hr)" />
            </XYPlot>
        </div>
    );
}

export default Chart;
