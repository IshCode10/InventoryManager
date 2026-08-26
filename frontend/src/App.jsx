import { useState } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'))

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <div>
      <h1>Restaurant Inventory Tracker</h1>
      <Dashboard />
    </div>
  )
}

export default App