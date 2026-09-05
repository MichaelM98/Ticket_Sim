import { useState } from 'react'
import ChatPanel from './ChatPanel'
import FeedbackPanel from './FeedbackPanel'

function TicketDetail({ ticket, conversation, onUpdateConversation, onRecordScore, onBack, onUpdateStatus }) {
  const { messages, feedback, score, feedbackLoading } = conversation
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('reply')
  const [loading, setLoading] = useState(false)

  const initials = ticket.requester
    .split(' ')
    .map((word) => word[0])
    .join('')

  function conversationOnly(msgList) {
    return msgList
      .filter((msg) => msg.type === 'chat')
      .map((msg) => ({ role: msg.role, content: msg.content }))
  }

  async function sendMessage() {
    if (!input.trim()) return

    if (mode === 'note') {
      onUpdateConversation({ messages: [...messages, { type: 'note', content: input }] })
      setInput('')
      return
    }

    const newMessages = [...messages, { type: 'chat', role: 'user', content: input }]
    onUpdateConversation({ messages: newMessages })
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket, messages: conversationOnly(newMessages) }),
      })
      const data = await res.json()
      onUpdateConversation({
        messages: [...newMessages, { type: 'chat', role: 'assistant', content: data.reply }],
      })
    } catch (error) {
      console.error(error)
      onUpdateConversation({
        messages: [
          ...newMessages,
          { type: 'chat', role: 'assistant', content: '[Could not reach the AI server]' },
        ],
      })
    } finally {
      setLoading(false)
    }
  }

  async function requestFeedback() {
    const transcript = conversationOnly(messages)
    if (transcript.length === 0) return // nothing to review yet

    onUpdateConversation({ feedbackLoading: true })
    try {
      const res = await fetch('http://localhost:3001/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticket, messages: transcript }),
      })
      const data = await res.json()
      onUpdateConversation({ feedback: data.feedback, score: data.score, feedbackLoading: false })
      onRecordScore(data.score)
    } catch (error) {
      console.error(error)
      onUpdateConversation({ feedback: 'Could not get feedback right now.', feedbackLoading: false })
    }
  }

  function handleResolve() {
    onUpdateStatus(ticket.id, 'Resolved')
    requestFeedback()
  }

  return (
    <div className="ticket-detail">
      <button className="back-link" onClick={onBack}>← Back to queue</button>

      <div className="detail-header">
        <div>
          <div className="detail-title">{ticket.subject}</div>
          <div className="ticket-meta">
            <span className={`badge pill-${ticket.priority.toLowerCase()}`}>{ticket.priority}</span>
            <span className="badge pill-cat">{ticket.category}</span>
            <span className={`badge pill-${ticket.status.toLowerCase()}`}>{ticket.status}</span>
          </div>
        </div>
        <div className="ticket-actions">
          <button onClick={handleResolve}>Mark Resolved</button>
          <button onClick={() => onUpdateStatus(ticket.id, 'Closed')}>Close Ticket</button>
          <button onClick={() => onUpdateStatus(ticket.id, 'Escalated')}>Escalate to Tier 2</button>
        </div>
      </div>

      <div className="detail-body">
        <ChatPanel
          ticket={ticket}
          messages={messages}
          mode={mode}
          onModeChange={setMode}
          input={input}
          onInputChange={setInput}
          onSend={sendMessage}
          loading={loading}
        />

        <div className="right-rail">
          <div className="info-card">
            <div className="info-card-title">Requester</div>
            <div className="requester-row">
              <div className="avatar avatar-accent">{initials}</div>
              <div>
                <div className="requester-name">{ticket.requester}</div>
                <div className="requester-dept">{ticket.department}</div>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="info-card-title">Details</div>
            <div className="info-row">
              <span>Ticket ID</span>
              <span>#{ticket.id}</span>
            </div>
            <div className="info-row">
              <span>Category</span>
              <span>{ticket.category}</span>
            </div>
          </div>

          {(feedback || feedbackLoading) && (
            <FeedbackPanel feedback={feedback} score={score} loading={feedbackLoading} />
          )}
        </div>
      </div>
    </div>
  )
}

export default TicketDetail
