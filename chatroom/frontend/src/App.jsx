import { useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [ messages, setMessages ] = useState([])
  const [ newMessage, setNewMessage ] = useState('New message...')
  const [ user, setUser ] = useState('User')

  // hook that gets and sets messages from server
  useEffect(() => {
    axios
      .get('http://localhost:4000/messages')
      .then((response) => {
        console.log('GET request response:',response.data)
        setMessages(response.data)
      })
  }, [])

  // POST request to the server containing a new object with author and content props
  const sendMessage = (event) => {
    event.preventDefault()
    const messageObject = {
      content: newMessage,
      author: user
    }
    setMessages(messages.concat(messageObject))
    axios
      .post('http://localhost:4000/messages',messageObject)
      .then(response => console.log('POST request response:',response.data))
  }

  // event handler for when the user changes the message input
  const handleMessageChange = (event) => {
    const newText = event.target.value
    console.log('Message text updated:',newText)
    setNewMessage(newText)
  }

  // event handler for when the user changes their username
  const handleUserChange = (event) => {
    const newUser = event.target.value
    console.log('User updated:',newUser)
    setUser(newUser)
  }

  // the output of the App is our rendered React application
  return (
    <>
      <h1>Chatroom</h1>
      <input value={user} onChange={handleUserChange} />
      <ul>
        {messages.map((message) => {
          return( <li>{message.author}: {message.content}</li> )
        })}
      </ul>
      <form onSubmit={sendMessage} >
        <input value={newMessage} onChange={handleMessageChange} />
        <button type="submit">Send</button>
      </form>
    </>
  )
}

export default App