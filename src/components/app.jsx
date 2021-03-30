import React from "react";
import { secondsToHms } from '../utils'

function App() {
  const [data, setData] = React.useState({
    avgTime: {
      easy: 0,
      medium: 0,
      hard: 0
    }
  });

  React.useEffect(() => {
    fetch('/data').then(response => response.json())
    .then(data => setData(data))
  }, [])

  return (
    <div>
      <h1>Stats</h1>
      <div>
        <h2>Avg. Time</h2>
        <div>{'Easy: ' + secondsToHms(data.avgTime.easy)}</div>
        <div>{'Medium: ' + secondsToHms(data.avgTime.medium)}</div>
        <div>{'Hard: ' + secondsToHms(data.avgTime.hard)}</div>
      </div>
    </div>
  )
}

export default App;