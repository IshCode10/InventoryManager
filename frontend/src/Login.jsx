import { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from './api'

function Login({ onLogin, onSwitchToRegister }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post(`${API_BASE_URL}/token/`, { username, password })
      localStorage.setItem('access_token', response.data.access)
      onLogin()
    } catch (err) {
      setError('Login failed. Check your username and password.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Restaurant Inventory Tracker</h1>
        <p className="text-sm text-gray-500 mb-6">Log in to continue</p>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2 mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-700 transition mt-2"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Don't have an account?{' '}
          <button onClick={onSwitchToRegister} className="text-blue-600 hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login