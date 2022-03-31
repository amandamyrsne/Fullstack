import { useState } from 'react'

const Header = ({header}) =>{
  return(
  <h1>{header}</h1>
  )
}
const Header2 = ({header2}) =>{
  return(
  <h1>{header2}</h1>
  )
}
const Statistics = ({good, neutral, bad, all}) => {
  if (all === 0){
    return (
      <div>
      No feedback given
      </div>
    )
  }
    return(
      <div>
        <table>
          <tbody>
            <tr>
              <td> good</td>
              <td> {good}</td>
            </tr>
            <tr> 
              <td>neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr> 
              <td>bad </td>
              <td>{bad}</td>
            </tr>
            <tr> 
              <td>all</td>
              <td>{all}</td>
            </tr>
            <tr> 
              <td>average</td>
              <td>{good*1 + neutral*0 + bad*-1}</td>
            </tr>
            <tr> 
              <td>positiv</td>
              <td>{good/all*100}</td>
              <td>%</td>
            </tr>
          </tbody>
      </table>
    </div>
  )
}
const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)
const App = () => {
  // save clicks of each button to its own state
  const header = 'give feedback'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState( 0)
  const [bad, setBad] = useState(0)
  const header2 = 'statistics'

  return (
    <div>
        <Header header={header} />
        <Button handleClick={() => setGood(good +1)} text="good" />
        <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
        <Header2 header2 = {header2}/>
        <Statistics good = {good} bad = {bad} neutral = {neutral} all = {good+neutral+bad}/>  
    </div>
  )
}
export default App