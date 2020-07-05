import React from 'react'

export type Person = {
    name: string,
    number: string,
    id: number
}

export const Persons = ({ persons, filter }: { persons: Person[], filter: string }) => <>
    {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <p key={person.name}>{person.name} {person.number}</p>)}</>
