import React, { useState, FormEvent } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  function addName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (!names.includes(newName)) {
      names.push(newName)
      setPersons([...persons, { name: newName }])
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }


  function handleChange(event: { target: HTMLInputElement }) {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App
