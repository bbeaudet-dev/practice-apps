import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()
const port = 3333
app.use(cors())
app.use(express.json())

app.get('/pokemon',(request,response) => {
    const database = JSON.parse(fs.readFileSync('db.json')).pokemon
    response.send(database)
    console.log('Sent:',database)
})

// POST route for adding new entry and saving to memory
app.post('/pokemon',(request,response) => {
    const existingDatabase = JSON.parse(fs.readFileSync('db.json')).pokemon
    console.log('Existing:',existingDatabase)
    const entry = request.body
    const newDatabase = JSON.stringify({pokemon: [...existingDatabase, {id: existingDatabase.length + 1, name: entry.name,type: entry.type}]})
    console.log('New:',newDatabase)
    fs.writeFile('db.json', newDatabase,'', () => {})
})

// GET route for one entry
// bonus: save POST to file
// bonus: DELETE and PUT routes

app.listen(port,() => console.log(`Server running on port ${port}`))