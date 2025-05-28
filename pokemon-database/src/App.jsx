import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newName, setNewName] = useState('new Pokemon...')
  const [newType, setNewType] = useState('new Pokemon...')

  useEffect(() => {
    console.log('effect triggered')
    axios
      .get('http://localhost:3001/pokemon')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  },[])
  console.log('rendered',notes.length,'Pokemon')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      id: notes.length + 1,
      name: newName,
      type: newType
    }
    setNotes(notes.concat(noteObject))
    setNewName('')
    setNewType('')
    console.log('new Pokemon registered:',noteObject.id,newName,newType)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  const handleTypeChange = (event) => {
    setNewType(event.target.value)
    console.log(event.target.value)
  }

  return(
    <>
      <h1>Pokemon!</h1>
      <ul>
        {notes.map((note) => {
          return( <li note={note}>{note.id}. {note.name} - {note.type} type</li> )
        })}
      </ul>
      <form onSubmit={addNote}>
        <p>Name: 
          <input value={newName} onChange={handleNameChange}/>
        </p>
        <p>Type: 
          <input value={newType} onChange={handleTypeChange}/>
        </p>
        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default App