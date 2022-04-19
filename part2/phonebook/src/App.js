import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import PersonList from './Components/PersonList'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [name, setName] = useState('')
  const [foundUsers, setFoundUsers] = useState(persons)

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
      setFoundUsers(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()    
    const noteObject = {
      name: newName,
      number: newNumber,
    }
      var same = "";
      persons.forEach(name => {
        
        if (JSON.stringify(name) === JSON.stringify(noteObject)){
          window.alert(newName + ' is already added to phonebook');
          same = "true";
        }})

        if( same === "true"){
           return;
        }
        else{
          setPersons(persons.concat(noteObject))
          setFoundUsers(foundUsers.concat(noteObject))
          setNewName('')
          setNewNumber('')
        }}
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const filter = (event => {
    setName(event.target.value)
    const word = event.target.value
    if (word !== '') {
      const results = persons.filter((person) => {
        return person.name.toLowerCase().startsWith(word.toLowerCase())
      })
      setFoundUsers(results)
    } 
    else {
      setFoundUsers(persons)
    }
    setName(word)
  })
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={name} filter={filter} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <PersonList foundUsers={foundUsers}/>
    </div>
  )
}

export default App