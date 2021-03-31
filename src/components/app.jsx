import React from "react";
import { getSeconds, secondsToHms, isToday } from '../utils/date'

function App() {
  const [data, setData] = React.useState({
    avgTime: {
      all: 0,
      easy: 0,
      medium: 0,
      hard: 0
    },
    questions: []
  });

  React.useEffect(() => {
    fetch('/data').then(response => response.json())
    .then(data => setData(data))
  }, [])

  return (
    <div>
      <h1>Leetcode stats</h1>
      <div>
        <h2>Avg. time to solve</h2>
        <div>{'All: ' + secondsToHms(data.avgTime.all)}</div>
        <div>{'Easy: ' + secondsToHms(data.avgTime.easy)}</div>
        <div>{'Medium: ' + secondsToHms(data.avgTime.medium)}</div>
        <div>{'Hard: ' + secondsToHms(data.avgTime.hard)}</div>
      </div>
      <div>
        <h2>Solved today</h2>
        <Table questions={data.questions.filter(q => isToday(q.date))}/>
      </div>
      <div>
        <h2>Time taken >= 1 hour</h2>
        <Table 
          questions={data.questions
            .filter(q => getSeconds(q.timeSpend) >= 60 * 60)
            .sort((a, b) => getSeconds(b.timeSpend) - getSeconds(a.timeSpend))}
        />
      </div>
    </div>
  )
}

function Table ({ questions = [] }) {
  if (questions.length === 0) return null

  return (
    <table border="1">
      <tbody>
        {questions
        .map((q, index) => {
          return (
            <tr key={index}>
              <td><a href={q.link} target="_blank" rel="noopener noreferrer">{q.link}</a></td>
              <td>{secondsToHms(getSeconds(q.timeSpend))}</td>
            </tr>
          )
        })}
      </tbody>
  </table>
  )
}

export default App;