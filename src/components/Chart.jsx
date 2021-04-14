import React from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {
    XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis,
} from 'react-vis';

function Chart({
    data, data2, data3, data4,
}) {
    return (
        <div>
            <XYPlot height={200} width={600}>
                <LineSeries curve="curveMonotoneX" data={data} color="red" />
                <LineSeries curve="curveMonotoneX" data={data2} color="rgb(251, 140, 0)" />
                <LineSeries curve="curveMonotoneX" data={data3} color="green" />
                <LineSeries curve="curveMonotoneX" data={data4} color="blue" />
                <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
                <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
                <XAxis
                    title="questions"
                    style={{
                        line: { stroke: '#ADDDE1' },
                        ticks: { stroke: '#ADDDE1' },
                        text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 },
                    }}
                />
                <YAxis
                    title="minutes"
                    style={{
                        line: { stroke: '#ADDDE1' },
                        ticks: { stroke: '#ADDDE1' },
                        text: { stroke: 'none', fill: '#6b6b76', fontWeight: 600 },
                    }}
                />
            </XYPlot>
        </div>
    );
}

export default Chart;
