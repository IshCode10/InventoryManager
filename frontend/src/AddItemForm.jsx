import { useState } from 'react'
import api from './api'

function AddItemForm({ onAdded }) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [unit, setUnit] = useState('')
  const [currentQty, setCurrentQty] = useState('')
  const [costPerUnit, setCostPerUnit] = useState('')
  const [lowStockThreshold, setLowStockThreshold] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      await api.post('/items/', {
        name,
        category,
        unit,
        current_qty: currentQty,
        cost_per_unit: costPerUnit,
        low_stock_threshold: lowStockThreshold,
      })
      setMessage('Item added.')
      setName('')
      setCategory('')
      setUnit('')
      setCurrentQty('')
      setCostPerUnit('')
      setLowStockThreshold('')
      if (onAdded) onAdded()
    } catch (err) {
      setMessage('Failed to add item. Check the fields and try again.')
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Inventory Item</h2>
      {message && <p className="text-sm text-gray-600 mb-3">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Unit</label>
          <input
            placeholder="lbs, each..."
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Quantity</label>
          <input
            type="number"
            step="0.01"
            value={currentQty}
            onChange={(e) => setCurrentQty(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Cost/Unit</label>
          <input
            type="number"
            step="0.01"
            value={costPerUnit}
            onChange={(e) => setCostPerUnit(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Low Stock At</label>
          <input
            type="number"
            step="0.01"
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          Add Item
        </button>
      </form>
    </div>
  )
}

export default AddItemForm