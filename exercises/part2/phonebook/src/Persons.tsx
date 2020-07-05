import React from 'react'

export const Persons = ({ persons, filter }: { persons: { name: string, number: string }[], filter: string }) => <>
    {persons.filter(person => person.name.toLowerCase().includes(filter)).map(person => <p key={person.name}>{person.name} {person.number}</p>)}</>
