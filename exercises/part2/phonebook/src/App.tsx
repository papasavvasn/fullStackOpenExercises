import React, { useState, useEffect, FormEvent } from 'react'
import { EntryAdder } from "./EntryAdder"
import { Filter } from './Filter'
import { Persons, Person } from './Persons'
import personService from './services/persons'


const App = () => {

  const [persons, setPersons] = useState<Person[]>([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getPersons()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const EntryAdderCallbacks = {
    addName: (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const names = persons.map(person => person.name)
      if (!names.includes(newName)) {
        personService.addPerson({ name: newName, number: newNumber, id: persons.length + 1 + "" })
          .then(({ data }) => setPersons([...persons, { name: data.name, number: data.number, id: data.id }]))
      } else {
        window.alert(`${newName} is already added to phonebook`)
      }
    },
    handleNameChange: (event: { target: HTMLInputElement }) => {
      setNewName(event.target.value)
    },
    handleNumberChange: (event: { target: HTMLInputElement }) => {
      setNewNumber(event.target.value)
    }
  }

  function handleFilterChange(event: { target: HTMLInputElement }) {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <EntryAdder newName={newName} newNumber={newNumber} {...EntryAdderCallbacks} />
      <Persons filter={filter} persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App
