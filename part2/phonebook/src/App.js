import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import PersonList from './Components/PersonList'
import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number: newNumber,
    }


    let same = false;
    persons.forEach(name => {
      console.log(name.name, noteObject.name)
      if (JSON.stringify(name.name) === JSON.stringify(noteObject.name)) {
        if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')){
            personsService
            .update(name.id, noteObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== name.id ? person : returnedPerson))
          })
        }

        same = true;
      }
    })
    console.log(same)
    if (same === true) {
      setNewName('')
      setNewNumber('')
      return;
    }
    else {

      personsService
        .create(noteObject)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
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
      setPersons(results)
    }
    else {
      setPersons(persons)
    }
    setName(word)
  })
  const deleteAccount = (id) => {

    console.log(persons, id)

    const personname = persons.find(person => person.id === id)
    console.log('person name', personname)
    if (window.confirm(`Delete ${personname.name}?`)) {
      personsService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))

        })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={name} filter={filter} />
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonList persons={persons} deleteAccount={deleteAccount} />
    </div>
  )
}

export default App