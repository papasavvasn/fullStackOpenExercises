import React, { useState } from 'react'

export type CountryType = {
    name: string;
    capital: string;
    population: number;
    languages: { name: string }[];
    flag: string;
}

const Country = ({ name, capital, population, languages, flag }: CountryType) => <>
    <h2>{name}</h2>
    <br />
    capital {capital}<br />
    population {population}
    <br />
    <h4>languages</h4>
    <ul>
        {languages.map(lang => <li key={lang.name}> {lang.name}  </li>)}
    </ul>
    <img style={{ marginTop: "1.5em", width: "6em" }} alt={`flag of ${name}`} src={flag} />
</>

export const Countries = ({ countries, filter }: { countries: CountryType[], filter: string }) => {

    const [selectedCountry, setSelectedCountry] = useState<CountryType>()
    const matches = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    if (selectedCountry) {
        return <Country {...selectedCountry} />
    }
    if (matches.length === 1) {
        return <Country {...matches[0]} />
    } else if (matches.length <= 10) {
        return <>{matches.map(country => <p key={country.name}>{country.name}<button onClick={() => setSelectedCountry(country)}>show</button> </p>)}</>
    } else if (matches.length > 10 && filter.length > 0) {
        return <p>Too many matches, specify another filter</p>
    } return null

}


