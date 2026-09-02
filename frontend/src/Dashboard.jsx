import { useState, useEffect } from 'react'
import api from './api'

function Dashboard({ refreshKey }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/items/')
      .then((response) => setItems(response.data))
      .catch(() => setError('Could not load inventory. Is the backend running?'))
  }, [refreshKey])

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Inventory</h2>
      </div>
      {error && <p className="px-6 py-4 text-red-600">{error}</p>}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Quantity</th>
              <th className="px-6 py-3 font-medium">Unit</th>
              <th className="px-6 py-3 font-medium">Cost/Unit</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => {
              const isLow = parseFloat(item.current_qty) <= parseFloat(item.low_stock_threshold)
              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-3 text-gray-600">{item.category}</td>
                  <td className="px-6 py-3 text-gray-600">{item.current_qty}</td>
                  <td className="px-6 py-3 text-gray-600">{item.unit}</td>
                  <td className="px-6 py-3 text-gray-600">${item.cost_per_unit}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isLow ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {isLow ? 'LOW STOCK' : 'OK'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard