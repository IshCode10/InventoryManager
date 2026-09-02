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
      await api.post('/waste-logs/', { item: itemId, quantity, reason })
      setMessage('Waste logged.')
      setQuantity('')
      setReason('')
      if (onLogged) onLogged()
    } catch (err) {
      setMessage('Failed to log waste. Check the fields and try again.')
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Log Waste</h2>
      {message && <p className="text-sm text-gray-600 mb-3">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Item</label>
          <select
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select an item</option>
            {items.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Quantity</label>
          <input
            type="number"
            step="0.01"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
          <label className="text-xs font-medium text-gray-500">Reason</label>
          <input
            placeholder="e.g. expired, dropped"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Log Waste
        </button>
      </form>
    </div>
  )
}

export default WasteLogForm