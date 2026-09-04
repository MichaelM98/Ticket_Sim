import { useState } from 'react'

function ChatPanel({ ticket }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input.trim()) return

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket, messages: newMessages }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '[Could not reach the AI server]' },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className="chat-panel">
      <div className="chat-panel-header">Conversation</div>
      <div className="chat-messages">
        <div className="chat-bubble customer">{ticket.description}</div>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.role === 'user' ? 'tech' : 'customer'}`}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="chat-bubble customer typing">...</div>}
      </div>
      <div className="chat-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your response..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatPanel
