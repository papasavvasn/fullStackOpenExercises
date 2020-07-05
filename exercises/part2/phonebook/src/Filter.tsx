import React from 'react'

type FilterProps = { filter: string, handleFilterChange: (event: { target: HTMLInputElement }) => void }

export const Filter = ({ filter, handleFilterChange }: FilterProps) => <div>filter shown with <input value={filter} onChange={handleFilterChange} /></div>
