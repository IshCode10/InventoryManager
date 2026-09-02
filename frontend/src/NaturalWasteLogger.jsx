import { useState } from 'react'
import api from './api'

function NaturalWasteLogger({ onLogged }) {
  const [text, setText] = useState('')
  const [suggestion, setSuggestion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleParse = async (e) => {
    e.preventDefault()
    setError('')
    setSuggestion(null)
    setLoading(true)
    try {
      const response = await api.post('/parse-waste/', { text })
      setSuggestion(response.data)
    } catch (err) {
      setError('Could not parse that. Try the manual form below instead.')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async () => {
    try {
      await api.post('/waste-logs/', {
        item: suggestion.matched_item_id,
        quantity: suggestion.parsed.quantity,
        reason: suggestion.parsed.reason,
        raw_text: suggestion.raw_text,
      })
      setSuggestion(null)
      setText('')
      if (onLogged) onLogged()
    } catch (err) {
      setError('Failed to save. Try again.')
    }
  }

  return (
    <div>
      <h2>Log Waste (Natural Language)</h2>
      <form onSubmit={handleParse}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='e.g. "wasted 3 lbs of chicken, it expired"'
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Parsing...' : 'Parse'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {suggestion && (
        <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
          {suggestion.matched_item_id ? (
            <>
              <p>
                Log <strong>{suggestion.parsed.quantity} {suggestion.parsed.unit}</strong> of{' '}
                <strong>{suggestion.matched_item_name}</strong> — reason: {suggestion.parsed.reason}?
              </p>
              <p style={{ fontSize: '0.85em', color: '#666' }}>
                Match confidence: {Math.round(suggestion.confidence)}%
              </p>
              <button onClick={handleConfirm}>Confirm & Log</button>
              <button onClick={() => setSuggestion(null)}>Cancel</button>
            </>
          ) : (
            <p>
              Couldn't confidently match "{suggestion.parsed.item_name}" to an inventory item.
              Please use the manual form below.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default NaturalWasteLogger