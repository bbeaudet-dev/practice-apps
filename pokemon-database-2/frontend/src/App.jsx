import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [ entries, setEntries ] = useState(['test'])
  const [ newName, setNewName ] = useState('new name')
  const [ newType, setNewType ] = useState('new type')

  useEffect(() => {
    axios 
      .get('http://localhost:3333/pokemon')
      .then(response => {
        console.log('GET request response:',response.data)
        setEntries(response.data)
      })
  },[])

  const newEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      name: newName,
      type: newType
    }
    setEntries(entries.concat(entryObject))
    console.log(entryObject)
    axios
      .post('http://localhost:3333/pokemon',entryObject)
      .then(response => console.log(response.data))
  }

  const handleNameChange = (event) => {
    const name = event.target.value
    console.log('Name updated:',name)
    setNewName(name)
  }

  const handleTypeChange = (event) => {
    const type = event.target.value
    console.log('Type updated:',type)
    setNewType(type)
  }

  return (
    <>
      <h1>Pokemon Database</h1>
      <ol>
        {entries.map((entry) => {
          return (<li key={entry.id}>{entry.name} - type: {entry.type}</li>)
        })}
      </ol>
      <form onSubmit={newEntry} >
        <input value={newName} onChange={handleNameChange} />
        <input value={newType} onChange={handleTypeChange} />
        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default App