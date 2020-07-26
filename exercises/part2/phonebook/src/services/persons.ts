import axios from 'axios'
import { Person } from '../Persons'
const baseUrl = '/api/persons'

const getPersons = () => axios.get(baseUrl)

const addPerson = ({ name, number, id }: Person) => axios.post(baseUrl, { name, number, id })

const deletePerson = (id: string) => axios.delete(`${baseUrl}/${id}`)

const updatePerson = ({ name, number, id }: Person) => axios.put(`${baseUrl}/${id}`, { number, name, id })

export default {
    addPerson,
    deletePerson,
    getPersons,
    updatePerson
}