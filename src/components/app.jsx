import React from "react";
import { getSeconds, secondsToHms } from '../utils'

function App() {
  const [data, setData] = React.useState({
    avgTime: {
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
        <h2>Avg. Time</h2>
        <div>{'Easy: ' + secondsToHms(data.avgTime.easy)}</div>
        <div>{'Medium: ' + secondsToHms(data.avgTime.medium)}</div>
        <div>{'Hard: ' + secondsToHms(data.avgTime.hard)}</div>
      </div>
      <div>
        <h2>Taken more than 1 hour to solve</h2>
        <table border="1">
          {data.questions
            .filter(q => getSeconds(q.timeSpend) >= 60 * 60)
            .sort((a, b) => getSeconds(b.timeSpend) - getSeconds(a.timeSpend))
            .map(q => {
              return (
                <tr>
                  <td><a href={q.link} target="_blank" rel="noopener noreferrer">{q.link}</a></td>
                  <td>{secondsToHms(getSeconds(q.timeSpend))}</td>
                </tr>
              )
            })}
        </table>
      </div>
    </div>
  )
}

export default App;