import React from 'react';
import DiscreteColorLegend from 'react-vis/dist/legends/discrete-color-legend';
import { getSeconds, secondsToHms, isToday } from '../utils/date';
import Chart from './Chart';
import { getColorByTimeRange } from '../utils/color';
import { COLORS } from '../constants';

function App() {
    const [data, setData] = React.useState({
        avgTime: {
            all: 0,
            easy: 0,
            medium: 0,
            hard: 0,
        },
        questions: [],
    });

    React.useEffect(() => {
        fetch('/data').then((response) => response.json())
            .then((res) => setData(res));
    }, []);

    return (
        <div style={{ margin: 'auto', width: '50%' }}>
            <h1>Leetcode stats</h1>
            <div>
                <DiscreteColorLegend
                    colors={[
                        COLORS.BLUE,
                        COLORS.RED,
                        COLORS.YELLOW,
                        COLORS.GREEN,
                    ]}
                    items={[
                        'All',
                        'Hard',
                        'Medium',
                        'Easy',
                    ]}
                    orientation="horizontal"
                />
                <Chart
                    data={data.questions.filter((q) => q.difficulty === 'hard').reduce((acc, question, index) => {
                        const { timeSpend } = question;
                        acc.push({ y: getSeconds(timeSpend) / (60), x: index + 1 });
                        return acc;
                    }, [])}
                    data2={data.questions.filter((q) => q.difficulty === 'medium').reduce((acc, question, index) => {
                        const { timeSpend } = question;
                        acc.push({ y: getSeconds(timeSpend) / (60), x: index + 1 });
                        return acc;
                    }, [])}
                    data3={data.questions.filter((q) => q.difficulty === 'easy').reduce((acc, question, index) => {
                        const { timeSpend } = question;
                        acc.push({ y: getSeconds(timeSpend) / (60), x: index + 1 });
                        return acc;
                    }, [])}
                />
            </div>
            <div>
                <h2>QUESTION COUNT</h2>
                <div>{`Total: ${data.questions.length}`}</div>
                <div>{`Easy: ${data.questions.filter((q) => q.difficulty === 'easy').length}`}</div>
                <div>{`Medium: ${data.questions.filter((q) => q.difficulty === 'medium').length}`}</div>
                <div>{`Hard: ${data.questions.filter((q) => q.difficulty === 'hard').length}`}</div>
                <div>{`Avg. daily: ${getAvgQuestionsSolvedDaily(data.questions)}`}</div>
            </div>
            <div>
                <h2>AVG. TIME</h2>
                <AvgTimeChart questions={data.questions} />
                <AvgTime seconds={data.avgTime.all} label="All" />
                <AvgTime seconds={data.avgTime.easy} label="Easy" />
                <AvgTime seconds={data.avgTime.medium} label="Medium" />
                <AvgTime seconds={data.avgTime.hard} label="Hard" />
            </div>
            <div>
                <h2>SOLVED TODAY</h2>
                <Table questions={data.questions.filter((q) => isToday(q.date))} />
            </div>
            <div>
                <h2>Questions taken &gt; 1 hour to complete</h2>
                <Table
                    questions={data.questions
                        .filter((q) => getSeconds(q.timeSpend) >= 60 * 60)
                        .sort((a, b) => getSeconds(b.timeSpend) - getSeconds(a.timeSpend))}
                />
            </div>
        </div>
    );
}

function getData(questions) {
    const sum = [];
    for (let i = 0; i < questions.length; i += 1) {
        if (i === 0) {
            sum[i] = getSeconds(questions[i].timeSpend);
        } else {
            sum[i] = getSeconds(questions[i].timeSpend) + sum[i - 1];
        }
    }

    const avgTimes = sum.map((s, index) => ({
        x: index + 1,
        y: s / ((index + 1) * 60),
    }));

    return avgTimes;
}

function AvgTimeChart({ questions = [] }) {
    const data = React.useMemo(() => ({
        all: getData(questions),
        easy: getData(questions.filter((q) => q.difficulty === 'easy')),
        medium: getData(questions.filter((q) => q.difficulty === 'medium')),
        hard: getData(questions.filter((q) => q.difficulty === 'hard')),
    }), [questions]);

    return (
        <Chart
            data={data.hard}
            data2={data.medium}
            data3={data.easy}
            data4={data.all}
        />
    );
}

function AvgTime({ seconds, label }) {
    return (
        <div>
            <span>{`${label}: `}</span>
            <ColorTime seconds={seconds} />
        </div>
    );
}

function ColorTime({ seconds }) {
    return (
        <span style={{ color: getColorByTimeRange(seconds) }}>
            {secondsToHms(seconds)}
        </span>
    );
}

function getAvgQuestionsSolvedDaily(questions = []) {
    if (questions.length === 0) return 0;

    const freqMap = new Map();
    questions.forEach((q) => {
        const { date } = q;
        if (!freqMap.has(date)) freqMap.set(date, 0);
        freqMap.set(date, freqMap.get(date) + 1);
    });

    let count = 0;
    for (const [_, value] of freqMap) {
        count += value;
    }

    return (count / freqMap.size).toFixed(2);
}

function Table({ questions }) {
    if (questions.length === 0) return null;

    return (
        <table border="1">
            <tbody>
                {questions
                    .map((q, index) => (
                        <tr key={index}>
                            <td><a href={q.link} target="_blank" rel="noopener noreferrer">{q.link}</a></td>
                            <td><ColorTime seconds={getSeconds(q.timeSpend)} /></td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

export default App;
