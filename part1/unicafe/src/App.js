import { useState } from 'react'

const Statistics = ({text,value}) => {
    return(
    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
  )
}
const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>{text}</button>
)
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState( 0)
  const [bad, setBad] = useState(0)
  const [all,setAll] = useState(0)

  if (all === 0)
  return (
    <div>
    <h1>give feedback</h1>
    <Button handleClick={() => setGood(good +1) + setAll(all+1)}  text="good" />
    <Button handleClick={() => setNeutral(neutral+1) + setAll(all+1)} text="neutral" />
    <Button handleClick={() => setBad(bad + 1)+ setAll(all+1)} text="bad" />
    <h1>statistics</h1>
    <p>No feedback given</p>
    </div>)

  return (
    <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good +1) + setAll(all+1)}  text="good" />
        <Button handleClick={() => setNeutral(neutral+1) + setAll(all+1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)+ setAll(all+1)} text="bad" />
        <h1>statistics</h1>
        <table>
          <tbody>
            <Statistics text="good" value={good}/>
            <Statistics text="neutral" value={neutral} />
            <Statistics text="bad" value={bad} />
            <Statistics text="all" value={all} />
            <Statistics text="average" value={(good-bad)/all + "%" }/>
            <Statistics text="positive" value={(good/all)*100} />
          </tbody>
        </table>
    </div>
  )
}
export default App