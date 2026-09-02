import { useState } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import WasteLogForm from './WasteLogForm'
import NaturalWasteLogger from './NaturalWasteLogger'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'))
  const [refreshKey, setRefreshKey] = useState(0)

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <div>
      <h1>Restaurant Inventory Tracker</h1>
      <button onClick={handleLogout}>Log Out</button>
      <NaturalWasteLogger onLogged={() => setRefreshKey((k) => k + 1)} />
      <WasteLogForm onLogged={() => setRefreshKey((k) => k + 1)} />
      <Dashboard refreshKey={refreshKey} />
    </div>
  )
}

export default App