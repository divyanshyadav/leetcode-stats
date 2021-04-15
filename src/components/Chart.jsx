import React from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {
    XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis,
} from 'react-vis';
import { COLORS } from '../constants';

function Chart({
    data, data2, data3, data4,
}) {
    return (
        <div>
            <XYPlot
                height={200}
                width={600}
                margin={{
                    left: 60,
                }}
            >
                <LineSeries curve="curveMonotoneX" data={data} color={COLORS.RED} />
                <LineSeries curve="curveMonotoneX" data={data2} color={COLORS.YELLOW} />
                <LineSeries curve="curveMonotoneX" data={data3} color={COLORS.GREEN} />
                <LineSeries curve="curveMonotoneX" data={data4} color={COLORS.BLUE} />
                <HorizontalGridLines style={{ stroke: '#B7E9ED' }} />
                <VerticalGridLines style={{ stroke: '#B7E9ED' }} />
                <XAxis
                    title="questions"
                    style={{
                        line: { stroke: '#ADDDE1' },
                        ticks: { stroke: '#ADDDE1' },
                        text: { stroke: 'none', fill: '#6b6b76', fontWeight: 500 },
                    }}
                />
                <YAxis
                    style={{
                        line: { stroke: '#ADDDE1' },
                        ticks: { stroke: '#ADDDE1' },
                        text: { stroke: 'none', fill: '#6b6b76', fontWeight: 500 },
                    }}
                    tickFormat={(d) => `${d} mins`}
                />
            </XYPlot>
        </div>
    );
}

export default Chart;
