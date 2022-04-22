import { useState, useEffect } from 'react'
import axios from 'axios'
import CountriesToShow from './Components/CountriesToShow'

const App = () => {
  
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com//v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const input = search.length === 0
    ? countries
    : countries.filter(country =>country.name.common.toLowerCase().includes(search.toLowerCase().trim()))

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }
 
  const handleClick = (event )=> {
    setSearch(event.target.value);
  };                                                                  
  
  return (
    <><div>  Find countries  <input value={search} onChange={handleSearchChange} /></div>
    <CountriesToShow  input = {input} search = {search} setSearch = {setSearch} handleClick = {handleClick}/></>
  )
}

export default App;
