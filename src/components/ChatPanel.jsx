import { useState } from 'react'

function ChatPanel({ ticket }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('reply')
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input.trim()) return

    if (mode === 'note') {
      setMessages((prev) => [...prev, { type: 'note', content: input }])
      setInput('')
      return
    }

    const newMessages = [...messages, { type: 'chat', role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    // The AI should only ever see the real conversation, never internal notes.
    const conversationOnly = newMessages
      .filter((msg) => msg.type === 'chat')
      .map((msg) => ({ role: msg.role, content: msg.content }))

    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket, messages: conversationOnly }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { type: 'chat', role: 'assistant', content: data.reply }])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        { type: 'chat', role: 'assistant', content: '[Could not reach the AI server]' },
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

        {messages.map((msg, index) =>
          msg.type === 'note' ? (
            <div key={index} className="chat-bubble note">
              <div className="note-label">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
                Internal note — not visible to requester
              </div>
              {msg.content}
            </div>
          ) : (
            <div
              key={index}
              className={`chat-bubble ${msg.role === 'user' ? 'tech' : 'customer'}`}
            >
              {msg.content}
            </div>
          )
        )}
        {loading && <div className="chat-bubble customer typing">...</div>}
      </div>

      <div className="chat-input-area">
        <div className="chat-mode-toggle">
          <button
            className={mode === 'reply' ? 'active' : ''}
            onClick={() => setMode('reply')}
          >
            Reply
          </button>
          <button
            className={mode === 'note' ? 'active' : ''}
            onClick={() => setMode('note')}
          >
            Internal Note
          </button>
        </div>
        <div className="chat-input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={mode === 'note' ? 'Add an internal note...' : 'Type your response...'}
            disabled={loading}
          />
          <button onClick={sendMessage} disabled={loading}>
            {mode === 'note' ? 'Add Note' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPanel
