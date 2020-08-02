import React from 'react'
import personsService from "./services/persons"

export type Person = {
    name: string,
    number: string,
    id: string
}

type PersonProps = {
    persons: Person[],
    filter: string,
    setPersons: (persons: Person[]) => void,
    displayNotification: ({ message, type }: { message: string, type: "success" | "error" }) => void;
}

export const Persons = ({ persons, filter, setPersons, displayNotification }: PersonProps) => {

    const clickHandler = ({ id, name }: Person) => {
        if (window.confirm(`Delete ${persons.find(person => person.id === id)?.name}`)) {
            personsService.deletePerson(id).then(({ status }) => {
                if (status === 204) {
                    setPersons(persons.filter(person => person.id !== id))
                }
            }).catch(() => displayNotification({ message: `Information of ${name} has already been removed from the server`, type: "error" }))

        }
    }

    return <>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
            .map(person =>
                <p key={person.name}>{person.name} {person.number} <button onClick={() => clickHandler(person)}>Delete</button> </p>
            )}
    </>
}
