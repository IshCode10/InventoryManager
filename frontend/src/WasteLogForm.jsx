import { useState, useEffect } from 'react'
import api from './api'

function WasteLogForm({ onLogged }) {
  const [items, setItems] = useState([])
  const [itemId, setItemId] = useState('')
  const [quantity, setQuantity] = useState('')
  const [reason, setReason] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
  api.get('/items/')
    .then((response) => setItems(response.data))
    .catch((err) => console.error('Failed to load items for dropdown:', err))
}, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      await api.post('/waste-logs/', {
        item: itemId,
        quantity,
        reason,
      })
      setMessage('Waste logged.')
      setQuantity('')
      setReason('')
      if (onLogged) onLogged()
    } catch (err) {
      setMessage('Failed to log waste. Check the fields and try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log Waste</h2>
      {message && <p>{message}</p>}
      <select value={itemId} onChange={(e) => setItemId(e.target.value)} required>
        <option value="">Select an item</option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>
      <input
        type="number"
        step="0.01"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <input
        placeholder="Reason (e.g. expired, dropped)"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        required
      />
      <button type="submit">Log Waste</button>
    </form>
  )
}

export default WasteLogForm