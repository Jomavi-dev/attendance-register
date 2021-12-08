import { useState, useEffect, useRef } from 'react'
import AuthService from '../../services/AuthService'
import MessageBox from '../Message/Message'

function Register(props) {
  const [user, setUser] = useState({ username: '', password: '' })
  const [message, setMessage] = useState(null)
  let timerID = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(timerID)
    }
  }, [])

  const resetForm = () => {
    setUser({ username: '', password: '', role: '' })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    AuthService.register(user).then(data => {
      const { message } = data
      setMessage(message)
      resetForm()
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push('/login')
        }, 2000)
      }
    })
  }

  const { username, password } = user
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 mx-4">Register</h2>

      {message && <MessageBox {...message} />}

      <form onSubmit={handleSubmit} className="container-form">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            required
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            value={username}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            required
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary form-control">Register</button>
      </form>
    </div >
  )
}

export default Register