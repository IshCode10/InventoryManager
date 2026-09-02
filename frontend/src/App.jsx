import { useState } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'
import WasteLogForm from './WasteLogForm'
import NaturalWasteLogger from './NaturalWasteLogger'
import AddItemForm from './AddItemForm'

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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-900">Restaurant Inventory Tracker</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-800 transition"
        >
          Log Out
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        <NaturalWasteLogger onLogged={() => setRefreshKey((k) => k + 1)} />
        <WasteLogForm onLogged={() => setRefreshKey((k) => k + 1)} />
        <AddItemForm onAdded={() => setRefreshKey((k) => k + 1)} />
        <Dashboard refreshKey={refreshKey} />
      </main>
    </div>
  )
}

export default App