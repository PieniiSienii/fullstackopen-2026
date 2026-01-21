import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allclicks, setSum] = useState(0)
  const [averageList, setAverage] = useState([])
  
  const handleGoodClick = () => {
    setAverage(averageList.concat(1))
    setGood(good + 1)
    setSum(allclicks + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setSum(allclicks + 1)
    setAverage(averageList.concat(0))
  }

  const handleBad = () => {
    setBad(bad +1)
    setSum(allclicks + 1)
    setAverage(averageList.concat(-1  ))
  }

let average = 0
let goodPercentage = 0

if (averageList.length !== 0) {
  const sum = averageList.reduce((a, b) => a + b, 0)
  average = sum / averageList.length
  const goodCount = averageList.filter(item => item === 1).length
  goodPercentage = (goodCount / averageList.length) * 100
}

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {allclicks}</p>
      <p>Average {average} </p>
      <p>Positive % {goodPercentage.toFixed(2)}</p>
    </div>
  )
}

export default App