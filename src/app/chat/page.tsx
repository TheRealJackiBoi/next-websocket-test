'use client'

import { useEffect, useRef, useState } from "react"
import { Socket } from "socket.io"
import { io } from "socket.io-client"

type Message = {
  sender: string
  message: string
}

interface ChatEventMap {
  'chat message': (msg: Message) => void
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [name, setName] = useState("")

  const socket = useRef<any>()


  useEffect(() => {
    socket.current = io('http://localhost:3001')

    socket.current.on('chat message', (msg: Message) => {
      setMessages(prev => [...prev, msg])
    })
    return () => {
      socket.current.disconnect()
    }
  }, [])

  const sendMessage = () => {
    const trimmedMessage = newMessage.trim()
    const trimmedName = name.trim()
    
    if (trimmedMessage.length === 0 || name.length === 0) {
      alert("Please enter a name and message")
      return
    }

    socket.current.emit('chat message', {
      sender: name,
      message: newMessage
    })
    setNewMessage("")
  }

  return (
    <main>
      <h1 className="text-4xl">Chat</h1>

      <div className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded p-2 border text-slate-900"
        />
        <input
          type="text"
          placeholder="Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="rounded p-2 border text-slate-900"
        />
        <button
          onClick={sendMessage}
          className="rounded bg-blue-700 p-2"
        >
          Send
        </button>
      </div>
      <div>
        <h2>Messages</h2>

        <ul>
          {messages.map((msg) => (
            <li key={msg.sender + msg.message}>
              <strong>{msg.sender}</strong>: {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}