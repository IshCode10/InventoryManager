import { useState } from 'react'
import axios from 'axios'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      })
      localStorage.setItem('access_token', response.data.access)
      onLogin()
    } catch (err) {
      setError('Login failed. Check your username and password.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  )
}

export default Login