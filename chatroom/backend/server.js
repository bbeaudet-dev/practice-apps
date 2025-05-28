import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()
app.use(cors())
app.use(express.json())

const port = 4000

// GET all messages
app.get('/messages',(request,response) => {
    const existingMessagesString = fs.readFileSync('db.json',{encoding: 'utf8'})
    const existingMessagesObject = JSON.parse(existingMessagesString)
    const existingMessagesArray = existingMessagesObject.messages
    console.log('Executed GET request')
    return response.json(existingMessagesArray)
})

// POST new message to server
app.post('/messages',(request,response) => {
    const message = request.body
    console.log('New message:',message)
    // 1. parse existing file into JS object
    const existingMessagesString = fs.readFileSync('db.json',{encoding: 'utf8'})
    const existingMessagesObject = JSON.parse(existingMessagesString)
    const existingMessagesArray = existingMessagesObject.messages
    // 2. append new message to JS object
    let newMessagesArray = [...existingMessagesArray, {id: existingMessagesArray.length + 1, ...message}]
    const newMessagesObject = {messages: newMessagesArray}
    // 3. stringify updated object and write to database
    const newMessagesString = JSON.stringify(newMessagesObject)
    fs.writeFile('db.json',newMessagesString,'utf8',() => {})
    return response.json(message)
})

app.listen(port, () => console.log(`Server running on port ${port}`))