import React, { useState, useEffect, FormEvent } from 'react'
import { EntryAdder } from "./EntryAdder"
import { Filter } from './Filter'
import { Persons, Person } from './Persons'
import personService from './services/persons'
import { Notification } from './Notification'


const App = () => {

  const [persons, setPersons] = useState<Person[]>([])
  const [newName, setNewName] = useState<string>('')
  const [newNumber, setNewNumber] = useState<string>('')
  const [filter, setFilter] = useState<string>('')
  const [notification, setNotification] = useState<string | null>(null)
  const [notificationType, setNotificationType] = useState<"error" | "success">("success")

  useEffect(() => {
    personService.getPersons()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const displayNotification = ({ message, type }: { message: string, type: "success" | "error" }) => {

    setNotificationType(type)
    setNotification(
      `${message}`
    )
    setTimeout(() => {
      setNotification(null)
    }, 5000)


  }

  const EntryAdderCallbacks = {
    addName: (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const names = persons.map(person => person.name)
      if (!names.includes(newName)) {
        personService.addPerson({ name: newName, number: newNumber, id: new Date().getTime() + persons.length + "" })
          .then(({ data }) => {
            setPersons([...persons, { name: data.name, number: data.number, id: data.id }])
            displayNotification({ message: `Added ${data.name}`, type: "success" })
          }
          )
      } else {
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one`)) {
          personService.updatePerson({ number: newNumber, id: persons.find(person => person.name === newName)!.id, name: newName })
            .then(({ status, data }) => {
              if (status === 200) {
                setPersons([...persons.filter(person => person.id !== data.id), data])
                displayNotification({ message: `Updated ${data.name}`, type: "success" })
              }
            }).catch(() => displayNotification({ message: `Information of ${newName} has already been removed from the server`, type: "error" }))
        }
      }
      setNewName("")
      setNewNumber("")
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
      <Notification message={notification} type={notificationType} />
      <EntryAdder newName={newName} newNumber={newNumber} {...EntryAdderCallbacks} />
      <Persons filter={filter} persons={persons} setPersons={setPersons} displayNotification={displayNotification} />
    </div>
  )
}

export default App
