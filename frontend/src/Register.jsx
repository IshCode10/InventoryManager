import { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from './api'

function Register({ onRegister, onSwitchToLogin }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post(`${API_BASE_URL}/register/`, {
        username,
        email,
        password,
      })
      localStorage.setItem('access_token', response.data.access)
      onRegister()
    } catch (err) {
      const data = err.response?.data
      const firstError = data ? Object.values(data)[0] : null
      setError(Array.isArray(firstError) ? firstError[0] : 'Registration failed. Try a different username.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-gray-900 mb-1">Create an Account</h1>
        <p className="text-sm text-gray-500 mb-6">Sign up to get started</p>

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
              required
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-700 transition mt-2"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-blue-600 hover:underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  )
}

export default Register