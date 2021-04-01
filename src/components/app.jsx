import React from 'react';
import { getSeconds, secondsToHms, isToday } from '../utils/date';

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
                <h2>COUNT</h2>
                <div>{`Total: ${data.questions.length}`}</div>
                <div>{`Easy: ${data.questions.filter((q) => q.difficulty === 'easy').length}`}</div>
                <div>{`Medium: ${data.questions.filter((q) => q.difficulty === 'medium').length}`}</div>
                <div>{`Hard: ${data.questions.filter((q) => q.difficulty === 'hard').length}`}</div>
                <div>{`Avg. daily: ${getAvgQuestionsSolvedDaily(data.questions)}`}</div>
            </div>
            <div>
                <h2>AVG. TIME</h2>
                <div>{`All: ${secondsToHms(data.avgTime.all)}`}</div>
                <div>{`Easy: ${secondsToHms(data.avgTime.easy)}`}</div>
                <div>{`Medium: ${secondsToHms(data.avgTime.medium)}`}</div>
                <div>{`Hard: ${secondsToHms(data.avgTime.hard)}`}</div>
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

    return Math.floor(count / freqMap.size);
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
                            <td>{secondsToHms(getSeconds(q.timeSpend))}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

export default App;
