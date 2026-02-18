
const Persons = ({ persons, removeContact }) => (
  <div>
    {persons.map(person =>
      <p key={person.name}>
        {person.name} {person.number}
        <button onClick={() => removeContact(person.id)}>Delete</button>
      </p>
    )}
  </div>
)

export default Persons
