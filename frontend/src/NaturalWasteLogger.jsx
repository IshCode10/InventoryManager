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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Log Waste (Natural Language)</h2>
      <p className="text-sm text-gray-500 mb-4">
        Describe what happened in plain English — AI will fill in the details.
      </p>
      <form onSubmit={handleParse} className="flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='e.g. "wasted 3 lbs of chicken, it expired"'
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Parsing...' : 'Parse'}
        </button>
      </form>

      {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

      {suggestion && (
        <div className="mt-4 border border-gray-200 rounded-md p-4 bg-gray-50">
          {suggestion.matched_item_id ? (
            <>
              <p className="text-sm text-gray-800">
                Log <span className="font-semibold">{suggestion.parsed.quantity} {suggestion.parsed.unit}</span> of{' '}
                <span className="font-semibold">{suggestion.matched_item_name}</span> — reason: {suggestion.parsed.reason}?
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Match confidence: {Math.round(suggestion.confidence)}%
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleConfirm}
                  className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-700 transition"
                >
                  Confirm & Log
                </button>
                <button
                  onClick={() => setSuggestion(null)}
                  className="text-sm text-gray-500 hover:text-gray-800 px-4 py-2 transition"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-600">
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