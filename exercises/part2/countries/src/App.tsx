import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Filter } from './Filter'
import { Countries, CountryType } from './Countries'


const App = () => {

  const [countries, setCountries] = useState<CountryType[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  function handleFilterChange(event: { target: HTMLInputElement }) {
    setFilter(event.target.value)
  }

  return (
    <div>
      <br />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries filter={filter} countries={countries} />
    </div>
  )
}

export default App
