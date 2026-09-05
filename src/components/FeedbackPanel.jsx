function FeedbackPanel({ feedback, score, loading }) {
  return (
    <div className="info-card feedback-card">
      <div className="info-card-title">Feedback</div>
      {loading ? (
        <div className="feedback-loading">Reviewing your conversation...</div>
      ) : (
        <>
          {score != null && <div className="feedback-score">{score} / 5</div>}
          <div className="feedback-text">{feedback}</div>
        </>
      )}
    </div>
  )
}

export default FeedbackPanel
