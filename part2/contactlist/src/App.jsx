import { useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactService from './services/contacts'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const filterPersons = persons.filter(person => 
    person.name.toLowerCase()
    .includes(filter.toLowerCase())
  )

  useEffect(() => {
    console.log('effect')
    contactService
      .getAll()
        .then(initialContacts => {
          console.log('promise fullfilled')
          setPersons(initialContacts)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const nameExists = persons.find(person => person.name === newName)
    
    if (nameExists) {
      if (nameExists.number !== newNumber) {
        const shouldUpdate = confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`
        )
        if (shouldUpdate) {
          const updatedPerson = { ...nameExists, number: newNumber}
          contactService
          .update(nameExists.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== nameExists.id ? person : returnedPerson))
            setNotification(`${newName} updatet succesfully!`)
            setTimeout(() => setNotification(null), 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setNotification(
              `Infomation of ${newName} has already been removed from the server`
            )
            setNotificationType('error')
            setPersons(persons.filter(p => p.id !== nameExists.id))
            setTimeout(() => setNotification(null), 5000);
          })
        }
      }
      else {
        alert(`${newName} already added to phonebook`)
        return 
      }
    }
    else {
      const newContact = {name: newName, number: newNumber}
      contactService
      .addNew(newContact)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewName('')
        setNewNumber('')
        setNotification(`${newName} added succesfully!`)
        setNotificationType('added')
        setTimeout(() => setNotification(null), 5000)
      })
    }
  }

  const removeContact = (id) => {
    const shouldRemove = confirm('Are you sure you want to delete this contact?')

    if (shouldRemove) {
      contactService
      .remove(id)
        .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotification('Contact removed succesfully!')
        setNotificationType('added')
      })
    .catch(error => {
      setNotification('This contact was already removed from the server')
      setNotificationType('error')
      setPersons(persons.filter(person => person.if !== id))
      setTimeout(() => setNotification(null), 5000)
    })
  }
}


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />
      <Filter filter={filter} setFilter={setFilter}/>

      <h2>Add a new</h2>
      <PersonForm
        addContact={addContact}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={filterPersons} removeContact={removeContact} />
    </div>
  )
}
export default App