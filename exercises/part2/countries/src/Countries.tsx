import React, { useState, useEffect } from 'react'
import axios from "axios"

// Steps to use the env variable:
// 1. Create a .env file at the root of the project
// 2. In the .env file write REACT_APP_API_KEY=theAPIKey
// 3. Add the .env file in the .gitignore
// 4. Restart the create-react-app server
const api_key = process.env.REACT_APP_API_KEY

export type CountryType = {
    name: string;
    capital: string;
    population: number;
    languages: { name: string }[];
    flag: string;
}

type Weather = {
    temperature: number;
    wind_speed: number;
    wind_dir: string;
    weather_icons: string[];
}


const Country = ({ name, capital, population, languages, flag }: CountryType) => {

    const [weather, setWeather] = useState<Weather>()

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(response => {
                console.log("response.data", response.data);
                setWeather(response.data.current)
            })
    }, [capital])

    return (
        <>
            <h2>{name}</h2>
            <br />
    capital {capital}<br />
    population {population}
            <br />
            <h3>Spoken languages</h3>
            <ul>
                {languages.map(lang => <li key={lang.name}> {lang.name}  </li>)}
            </ul>
            <img style={{ marginTop: "1.5em", width: "6em" }} alt={`flag of ${name}`} src={flag} />
            <h3>Weather in {capital}</h3>
            <br />
            <b>temperature</b> {weather?.temperature} Celsius
            <div>
                <img style={{ marginTop: "0.5em" }} alt={`current weather icon`} src={weather?.weather_icons[0]} />
            </div>
            <b>wind</b> {weather?.wind_speed} mph direction {weather?.wind_dir}
        </>
    )

}



export const Countries = ({ countries, filter }: { countries: CountryType[], filter: string }) => {

    const [selectedCountry, setSelectedCountry] = useState<CountryType>()
    const matches = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    if (selectedCountry) {
        return <Country {...selectedCountry} />
    } else if (matches.length === 1) {
        return <Country {...matches[0]} />
    } else if (matches.length <= 10) {
        return <>{matches.map(country => <p key={country.name}>{country.name}<button onClick={() => setSelectedCountry(country)}>show</button> </p>)}</>
    } else if (matches.length > 10 && filter.length > 0) {
        return <p>Too many matches, specify another filter</p>
    } return null

}


