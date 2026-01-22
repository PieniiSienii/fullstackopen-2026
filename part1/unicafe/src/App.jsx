import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
  return <p>{text} {value}</p>
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  let average = 0
  let goodPercentage = 0

  if (all == 0) {
    return <p>No feedback given</p>
  }
  
  average = (good - bad) / all
  goodPercentage = (good/ all) *100

  return (
    <div>
      <StatisticsLine text="Good" value={good} />
      <StatisticsLine text= "Neutral" value={neutral} />
      <StatisticsLine text="Bad" value={bad} />
      <StatisticsLine text="All" value={all} />
      <StatisticsLine text="Average" value={`${average.toFixed(1)}`} />
      <StatisticsLine text="Positive" value= {`${goodPercentage.toFixed(1)} %`}/>
    </div>
  )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad +1)
  }


  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App