import React from 'react'
import personsService from "./services/persons"

export type Person = {
    name: string,
    number: string,
    id: string
}

export const Persons = ({ persons, filter, setPersons }: { persons: Person[], filter: string, setPersons: (persons: Person[]) => void }) => {

    const clickHandler = (id: string) => {
        if (window.confirm(`Delete ${persons.find(person => person.id === id)?.name}`)) {
            personsService.deletePerson(id).then(({ status }) => {
                if (status === 200) {
                    setPersons(persons.filter(person => person.id !== id))
                }
            })

        }
    }

    return <>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map(person =>
                <p key={person.name}>{person.name} {person.number} <button onClick={() => clickHandler(person.id)}>Delete</button> </p>
            )}
    </>
}
