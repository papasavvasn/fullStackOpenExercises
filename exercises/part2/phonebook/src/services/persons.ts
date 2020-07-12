import axios from 'axios'
import { Person } from '../Persons'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => axios.get(baseUrl)

const addPerson = ({ name, number, id }: Person) => axios.post('http://localhost:3001/persons', { name, number, id })

export default {
    getPersons,
    addPerson
}