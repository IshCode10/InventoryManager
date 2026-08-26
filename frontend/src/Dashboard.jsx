import { useState, useEffect } from 'react'
import api from './api'

function Dashboard() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/items/')
      .then((response) => setItems(response.data))
      .catch(() => setError('Could not load inventory. Is the backend running?'))
  }, [])

  return (
    <div>
      <h2>Inventory</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Cost/Unit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isLow = parseFloat(item.current_qty) <= parseFloat(item.low_stock_threshold)
            return (
              <tr key={item.id} style={{ color: isLow ? 'red' : 'inherit' }}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.current_qty}</td>
                <td>{item.unit}</td>
                <td>${item.cost_per_unit}</td>
                <td>{isLow ? 'LOW STOCK' : 'OK'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard