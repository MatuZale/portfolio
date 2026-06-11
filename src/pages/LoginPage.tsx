import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const { login } = useContext(AuthContext)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault()

    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: form.email, password: form.password })
    })

    if (!res.ok) {
      alert('Nie można się zalogować')
      return
    }

    const data = await res.json()
    login(data.token)
    navigate('/')
  }

  return (
    <main>
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button type="submit">Zaloguj</button>
      </form>
    </main>
  )
}

export default LoginPage