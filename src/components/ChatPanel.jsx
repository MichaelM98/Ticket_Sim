function ChatPanel({ ticket, messages, mode, onModeChange, input, onInputChange, onSend, loading }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      onSend()
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
            onClick={() => onModeChange('reply')}
          >
            Reply
          </button>
          <button
            className={mode === 'note' ? 'active' : ''}
            onClick={() => onModeChange('note')}
          >
            Internal Note
          </button>
        </div>
        <div className="chat-input-row">
          <input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={mode === 'note' ? 'Add an internal note...' : 'Type your response...'}
            disabled={loading}
          />
          <button onClick={onSend} disabled={loading}>
            {mode === 'note' ? 'Add Note' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPanel
