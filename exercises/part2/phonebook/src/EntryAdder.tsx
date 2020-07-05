import React, { FormEvent } from 'react'

type EntryAdderProps = {
    addName: (event: FormEvent<HTMLFormElement>) => void
    newName: string;
    handleNameChange: (event: { target: HTMLInputElement }) => void
    newNumber: string;
    handleNumberChange: (event: { target: HTMLInputElement }) => void
}

export const EntryAdder = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }: EntryAdderProps) => <>
    <h2>Add a new</h2>
    <form onSubmit={addName}>
        <div>
            name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form></>