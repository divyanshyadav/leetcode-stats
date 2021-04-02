import React from 'react';
import { getSeconds, secondsToHms, isToday } from '../utils/date';
import Chart from './Chart';

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
        <div>
            <h1>Leetcode stats</h1>
            <div>
                <Chart data={data.questions.reduce((acc, question, index) => {
                    const { timeSpend } = question;
                    acc.push({ y: getSeconds(timeSpend) / (60 * 60), x: index + 1 });
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
                <AvgTime seconds={data.avgTime.all} label="ALL" />
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

const COLORS = {
    GREEN: 'green',
    RED: 'red',
    YELLOW: 'rgb(251, 140, 0)',
};

const SECONDS = {
    THIRTY_MIN: 30 * 60,
    ONE_HOUR: 60 * 60,
};

function getColorByTimeRange(seconds) {
    if (seconds < SECONDS.THIRTY_MIN) {
        return COLORS.GREEN;
    }

    if ((seconds) >= SECONDS.THIRTY_MIN && seconds <= SECONDS.ONE_HOUR) {
        return COLORS.YELLOW;
    }

    return COLORS.RED;
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
